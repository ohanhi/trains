module Main exposing (..)

import Browser
import Browser.Navigation
import Dict
import Json.Decode exposing (Decoder)
import Model exposing (..)
import RemoteData exposing (..)
import RemoteData.Http as Http
import Task
import Time
import Url exposing (Url)
import Url.Builder
import Url.Parser exposing ((</>))
import View exposing (Msg(..), view)


init : Int -> Url -> Browser.Navigation.Key -> ( Model, Cmd Msg )
init timestamp url key =
    let
        ( model, trainsCmd ) =
            urlChange
                { trains = NotAsked
                , stations = Dict.empty
                , currentTime = Time.millisToPosix timestamp
                , lastRequestTime = Time.millisToPosix 0
                , route = SelectDepRoute
                , zone = Time.utc
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
                    ( Loading, getTrains ( from, to ) )

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
            , Cmd.none
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
            ( model
            , Cmd.none
            )

        NoOp ->
            ( model, Cmd.none )


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
                ( { model | lastRequestTime = currentTime }, getTrains ( from, to ) )

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
                ]
    in
    case url.fragment of
        Nothing ->
            SelectDepRoute

        Just fragment ->
            { url | path = fragment, fragment = Nothing }
                |> Url.Parser.parse routeParser
                |> Maybe.withDefault SelectDepRoute


getStations : Cmd Msg
getStations =
    let
        stationsUrl =
            "https://rata.digitraffic.fi/api/v1/metadata/stations"
    in
    get stationsUrl StationsResponse stationsDecoder


getTrains : ( String, String ) -> Cmd Msg
getTrains ( from, to ) =
    let
        trainsUrl =
            Url.Builder.crossOrigin "https://rata.digitraffic.fi/api/v1/live-trains/station/"
                [ from ]
                [ Url.Builder.int "minutes_before_departure" 120
                , Url.Builder.int "minutes_after_departure" 120
                , Url.Builder.int "minutes_before_arrival" 0
                , Url.Builder.int "minutes_after_arrival" 0
                ]
    in
    get trainsUrl TrainsResponse (trainsDecoder ( from, to ))


subscriptions : Model -> Sub Msg
subscriptions model =
    Time.every 1000 UpdateTime


get : String -> (WebData success -> msg) -> Decoder success -> Cmd msg
get =
    Http.getWithConfig Http.defaultConfig


main : Program Int Model Msg
main =
    Browser.application
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        , onUrlRequest = \_ -> NoOp
        , onUrlChange = UrlChange
        }
