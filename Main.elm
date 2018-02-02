module Main exposing (..)

import Dict
import Json.Decode exposing (Decoder)
import Model exposing (..)
import Navigation exposing (Location)
import RemoteData exposing (..)
import RemoteData.Http as Http
import Time exposing (Time)
import UrlParser as Url exposing ((</>))
import View exposing (Msg(..), view)


init : Time -> Location -> ( Model, Cmd Msg )
init time location =
    let
        ( model, trainsCmd ) =
            { trains = NotAsked
            , stations = Dict.empty
            , currentTime = time
            , lastRequestTime = Nothing
            , route = SelectDepRoute
            }
                |> locationChange location
    in
    model
        ! [ getStations
          , trainsCmd
          ]


locationChange : Location -> Model -> ( Model, Cmd Msg )
locationChange location model =
    let
        route =
            parseLocation location

        ( trains, trainsCmd ) =
            case route of
                ScheduleRoute from to ->
                    ( Loading, getTrains ( from, to ) )

                _ ->
                    ( NotAsked, Cmd.none )
    in
    { model | route = route, trains = trains } ! [ trainsCmd ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        UrlChange location ->
            locationChange location model

        UpdateTime time ->
            let
                ( lastRequestTime, cmds ) =
                    model.lastRequestTime
                        |> Maybe.map
                            (\time ->
                                case model.route of
                                    ScheduleRoute from to ->
                                        if model.currentTime - time >= 10 * Time.second then
                                            ( Just model.currentTime, [ getTrains ( from, to ) ] )
                                        else
                                            ( model.lastRequestTime, [] )

                                    _ ->
                                        ( model.lastRequestTime, [] )
                            )
                        |> Maybe.withDefault ( Just model.currentTime, [] )
            in
            { model
                | currentTime = time
                , lastRequestTime = lastRequestTime
            }
                ! cmds

        TrainsResponse webData ->
            { model | trains = webData } ! []

        StationsResponse (Success stations) ->
            { model | stations = stations } ! []

        StationsResponse _ ->
            model ! []


parseLocation : Location -> Route
parseLocation location =
    let
        routeParser =
            Url.oneOf
                [ Url.top
                    |> Url.map SelectDepRoute
                , (Url.string)
                    |> Url.map SelectDestRoute
                , (Url.string </> Url.string)
                    |> Url.map ScheduleRoute
                ]
    in
    location
        |> Url.parseHash routeParser
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
            Http.url ("https://rata.digitraffic.fi/api/v1/live-trains/station/" ++ from)
                [ "minutes_before_departure" => "120"
                , "minutes_after_departure" => "0"
                , "minutes_before_arrival" => "0"
                , "minutes_after_arrival" => "0"
                ]

        -- trainsUrl =
        --     "example-data/trains.json"
    in
    get trainsUrl TrainsResponse (trainsDecoder ( from, to ))


subscriptions : Model -> Sub Msg
subscriptions model =
    Time.every Time.second UpdateTime


get : String -> (WebData success -> msg) -> Decoder success -> Cmd msg
get =
    Http.getWithConfig Http.defaultConfig


main : Program Float Model Msg
main =
    Navigation.programWithFlags UrlChange
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
