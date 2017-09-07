module Main exposing (..)

import Dict
import Json.Decode exposing (Decoder)
import Model exposing (..)
import Navigation exposing (Location)
import RemoteData exposing (..)
import RemoteData.Http as Http
import Time exposing (Time)
import UrlParser as Url exposing ((</>))
import View exposing (view)


type Msg
    = UpdateTime Time
    | TrainsResponse (WebData Trains)
    | StationsResponse (WebData Stations)
    | UrlChange Location


init : Time -> Location -> ( Model, Cmd Msg )
init time location =
    { trains = Loading
    , stations = Dict.empty
    , currentTime = time
    , lastRequestTime = Nothing
    , route = parseLocation location
    }
        ! [ getStations
          , getTrains
          ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        UrlChange location ->
            { model | route = parseLocation location } ! []

        UpdateTime time ->
            let
                ( lastRequestTime, cmds ) =
                    model.lastRequestTime
                        |> Maybe.map
                            (\time ->
                                if model.currentTime - time >= 10 * Time.second then
                                    ( Just model.currentTime, [ getTrains ] )
                                else
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
                    |> Url.map BothRoute
                , Url.s "to-helsinki"
                    |> Url.map ToHelsinkiRoute
                , Url.s "from-helsinki"
                    |> Url.map FromHelsinkiRoute
                ]
    in
    location
        |> Url.parseHash routeParser
        |> Maybe.withDefault BothRoute


getStations : Cmd Msg
getStations =
    let
        stationsUrl =
            "https://rata.digitraffic.fi/api/v1/metadata/stations"

        -- stationsUrl =
        --     "example-data/stations.json"
    in
    get stationsUrl StationsResponse stationsDecoder


getTrains : Cmd Msg
getTrains =
    let
        trainsUrl =
            Http.url "https://rata.digitraffic.fi/api/v1/live-trains/station/KIL"
                [ "minutes_before_departure" => "120"
                , "minutes_after_departure" => "0"
                , "minutes_before_arrival" => "0"
                , "minutes_after_arrival" => "0"
                ]

        -- trainsUrl =
        --     "example-data/trains.json"
    in
    get trainsUrl TrainsResponse trainsDecoder


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
