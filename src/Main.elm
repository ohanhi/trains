port module Main exposing (main, parseUrl)

import Browser exposing (UrlRequest(..))
import Browser.Navigation
import DateFormat
import Dict
import Json.Decode exposing (Decoder)
import Model exposing (..)
import RemoteData exposing (..)
import RemoteData.Http as Http
import Task
import Time exposing (Posix)
import Url exposing (Url)
import Url.Builder
import Url.Parser exposing ((</>))
import View exposing (Msg(..), view)


port setStorage : String -> Cmd msg


type alias Flags =
    { timestamp : Int
    , storedState : String
    }


init : Flags -> Url -> Browser.Navigation.Key -> ( Model, Cmd Msg )
init flags url key =
    let
        storedState =
            flags.storedState
                |> decodeStoredState
                |> Result.withDefault defaultStoredState

        ( model, trainsCmd ) =
            urlChange
                { trains = NotAsked
                , stations = Dict.empty
                , wagonCounts = Dict.empty
                , currentTime = Time.millisToPosix flags.timestamp
                , lastRequestTime = Time.millisToPosix 0
                , route = SelectDepRoute
                , zone = Time.utc
                , navKey = key
                , language = storedState.language
                , showTrainsViaAirport = storedState.showTrainsViaAirport
                }
                url
    in
    ( model
    , Cmd.batch
        [ getStations
        , trainsCmd
        , Time.here |> Task.perform TimeZoneResponse
        ]
    )


urlChange : Model -> Url -> ( Model, Cmd Msg )
urlChange model url =
    let
        route =
            parseUrl url

        ( trains, trainsCmd ) =
            case route of
                ScheduleRoute from to ->
                    ( Loading, getTrains { from = from, to = to } )

                TrainRoute from to trainNumber ->
                    ( Loading, getTrain { from = from, to = to } trainNumber )

                _ ->
                    ( NotAsked, Cmd.none )
    in
    ( { model | route = route, trains = trains }
    , trainsCmd
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        UrlChange url ->
            urlChange model url

        UpdateTime time ->
            updateTime { model | currentTime = time }

        TimeZoneResponse zone ->
            ( { model | zone = zone }
            , getCompositions model.currentTime zone
            )

        TrainsResponse webData ->
            ( { model | trains = webData }
            , Cmd.none
            )

        StationsResponse (Success stations) ->
            ( { model | stations = stations }
            , Cmd.none
            )

        StationsResponse _ ->
            ( model, Cmd.none )

        TrainWagonCountsResponse (Success wagonCounts) ->
            ( { model | wagonCounts = wagonCounts }
            , Cmd.none
            )

        TrainWagonCountsResponse _ ->
            ( model, Cmd.none )

        LinkClicked urlRequest ->
            case urlRequest of
                Internal url ->
                    ( model, Browser.Navigation.pushUrl model.navKey (Url.toString url) )

                External url ->
                    ( model, Browser.Navigation.load url )

        SetLanguage language ->
            let
                nextModel =
                    { model | language = language }
            in
            ( nextModel, setStorage (encodeStoredState nextModel) )

        SetShowTrainsViaAirport value ->
            let
                nextModel =
                    { model | showTrainsViaAirport = value }
            in
            ( nextModel, setStorage (encodeStoredState nextModel) )


updateTime : Model -> ( Model, Cmd Msg )
updateTime ({ currentTime, route } as model) =
    let
        currentMillis =
            Time.posixToMillis currentTime

        requestMillis =
            Time.posixToMillis model.lastRequestTime
    in
    case route of
        ScheduleRoute from to ->
            if currentMillis - requestMillis >= 10000 then
                ( { model | lastRequestTime = currentTime }
                , getTrains { from = from, to = to }
                )

            else
                ( model, Cmd.none )

        TrainRoute from to trainNumber ->
            if currentMillis - requestMillis >= 10000 then
                ( { model | lastRequestTime = currentTime }
                , getTrain { from = from, to = to } trainNumber
                )

            else
                ( model, Cmd.none )

        _ ->
            ( model, Cmd.none )


parseUrl : Url -> Route
parseUrl url =
    let
        routeParser =
            Url.Parser.oneOf
                [ Url.Parser.top
                    |> Url.Parser.map SelectDepRoute
                , Url.Parser.string
                    |> Url.Parser.map SelectDestRoute
                , (Url.Parser.string </> Url.Parser.string)
                    |> Url.Parser.map ScheduleRoute
                , (Url.Parser.string </> Url.Parser.string </> Url.Parser.int)
                    |> Url.Parser.map TrainRoute
                ]
    in
    case url.fragment of
        Nothing ->
            SelectDepRoute

        Just fragment ->
            { url
              -- The station shortcodes may include ÅÄÖ
                | path = Url.percentDecode fragment |> Maybe.withDefault ""
                , fragment = Nothing
            }
                |> Url.Parser.parse routeParser
                |> Maybe.withDefault SelectDepRoute


getStations : Cmd Msg
getStations =
    get "https://rata.digitraffic.fi/api/v1/metadata/stations"
        StationsResponse
        stationsDecoder


getCompositions : Posix -> Time.Zone -> Cmd Msg
getCompositions posix zone =
    let
        localDate =
            DateFormat.format
                [ DateFormat.yearNumber
                , DateFormat.text "-"
                , DateFormat.monthFixed
                , DateFormat.text "-"
                , DateFormat.dayOfMonthFixed
                ]
                zone
                posix

        url =
            Url.Builder.crossOrigin "https://rata.digitraffic.fi/api/v1/compositions"
                [ localDate ]
                []
    in
    get url TrainWagonCountsResponse trainWagonCountDecoder


getTrains : Targets -> Cmd Msg
getTrains targets =
    let
        trainsUrl =
            Url.Builder.crossOrigin "https://rata.digitraffic.fi/api/v1/live-trains/station"
                [ targets.from ]
                [ Url.Builder.int "minutes_before_departure" 120
                , Url.Builder.int "minutes_after_departure" 0
                , Url.Builder.int "minutes_before_arrival" 0
                , Url.Builder.int "minutes_after_arrival" 0
                ]
    in
    get trainsUrl TrainsResponse (trainsDecoder targets)


getTrain : Targets -> Int -> Cmd Msg
getTrain targets trainNumber =
    let
        trainsUrl =
            Url.Builder.crossOrigin "https://rata.digitraffic.fi/api/v1/trains/latest"
                [ String.fromInt trainNumber ]
                []
    in
    get trainsUrl TrainsResponse (trainsDecoder targets)


subscriptions : Model -> Sub Msg
subscriptions _ =
    Time.every 1000 UpdateTime


get : String -> (WebData success -> msg) -> Decoder success -> Cmd msg
get =
    Http.getWithConfig Http.defaultConfig


main : Program Flags Model Msg
main =
    Browser.application
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        , onUrlRequest = LinkClicked
        , onUrlChange = UrlChange
        }
