module Main exposing (..)

import Browser
import Browser.Navigation
import Dict
import Json.Decode exposing (Decoder)
import Model exposing (..)
import RemoteData exposing (..)
import RemoteData.Http as Http
import Time
import Url
import Url.Parser exposing ((</>), Url)
import View exposing (Msg(..), view)


init : Browser.Env Int -> ( Model, Cmd Msg )
init env =
    let
        ( model, trainsCmd ) =
            urlChange
                { trains = NotAsked
                , stations = Dict.empty
                , currentTime = Time.millisToPosix env.flags
                , lastRequestTime = Nothing
                , route = SelectDepRoute
                }
                env.url
    in
    ( model
    , Cmd.batch
        [ getStations
        , trainsCmd
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
            let
                ( lastRequestTime, cmds ) =
                    model.lastRequestTime
                        |> Maybe.map
                            (\requestTime ->
                                case model.route of
                                    ScheduleRoute from to ->
                                        if Time.posixToMillis model.currentTime - Time.posixToMillis requestTime >= 10000 then
                                            ( Just model.currentTime, [ getTrains ( from, to ) ] )

                                        else
                                            ( model.lastRequestTime, [] )

                                    _ ->
                                        ( model.lastRequestTime, [] )
                            )
                        |> Maybe.withDefault ( Just model.currentTime, [] )
            in
            ( { model
                | currentTime = time
                , lastRequestTime = lastRequestTime
              }
            , Cmd.batch cmds
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

        -- stationsUrl =
        --     "example-data/stations.json"
    in
    get stationsUrl StationsResponse stationsDecoder


getTrains : ( String, String ) -> Cmd Msg
getTrains ( from, to ) =
    let
        trainsUrl =
            Url.crossOrigin "https://rata.digitraffic.fi/api/v1/live-trains/station/"
                [ from ]
                [ Url.int "minutes_before_departure" 120
                , Url.int "minutes_after_departure" 0
                , Url.int "minutes_before_arrival" 0
                , Url.int "minutes_after_arrival" 0
                ]

        -- trainsUrl =
        --     "example-data/trains.json"
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
    Browser.fullscreen
        { init = init
        , onNavigation = Just UrlChange
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
