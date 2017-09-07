module Model exposing (..)

import Date exposing (Date)
import Date.Format
import Dict exposing (Dict)
import Json.Decode exposing (..)
import Json.Decode.Pipeline exposing (..)
import RemoteData exposing (WebData)
import Time exposing (Time)


(=>) : a -> b -> ( a, b )
(=>) =
    (,)


type Route
    = BothRoute
    | ToHelsinkiRoute
    | FromHelsinkiRoute


type alias Model =
    { trains : WebData Trains
    , stations : Stations
    , currentTime : Time
    , lastRequestTime : Maybe Time
    , route : Route
    }


type alias Train =
    { trainNumber : Int
    , lineId : String
    , timetableRows : List TimetableRow
    , cancelled : Bool
    , direction : Direction
    , departingFromStation : Date
    }


type alias TrainRaw =
    { trainNumber : Int
    , lineId : String
    , timetableRows : List TimetableRow
    , cancelled : Bool
    }


type Direction
    = FromHelsinki
    | ToHelsinki


type alias Stations =
    Dict Int String


type alias Trains =
    Dict Int Train


type alias TimetableRow =
    { scheduledTime : Date
    , trainStopping : Bool
    , stationShortCode : String
    , stationUICCode : Int
    , rowType : RowType
    , actualTime : Maybe Date
    , liveEstimateTime : Maybe Date
    , differenceInMinutes : Maybe Int
    }


type RowType
    = Departure
    | Arrival


stationsDecoder : Decoder Stations
stationsDecoder =
    decode (,)
        |> required "stationUICCode" int
        |> required "stationName"
            (string
                |> map
                    (\a ->
                        if String.endsWith " asema" a then
                            String.dropRight 6 a
                        else
                            a
                    )
            )
        |> list
        |> andThen (Dict.fromList >> succeed)


trainsDecoder : Decoder Trains
trainsDecoder =
    decode TrainRaw
        |> required "trainNumber" int
        |> required "commuterLineID" string
        |> required "timeTableRows" timetableRowsDecoder
        |> required "cancelled" bool
        |> andThen toTrain
        |> list
        |> andThen (List.map (\a -> ( a.trainNumber, a )) >> Dict.fromList >> succeed)


sortedTrainList : Trains -> List Train
sortedTrainList trains =
    trains
        |> Dict.values
        |> List.sortBy (.departingFromStation >> Date.Format.formatISO8601)


toTrain : TrainRaw -> Decoder Train
toTrain { trainNumber, lineId, timetableRows, cancelled } =
    let
        helsinkiFirst =
            List.head
                >> Maybe.map (.stationShortCode >> (==) "HKI")
                >> Maybe.withDefault False

        direction =
            if helsinkiFirst timetableRows then
                Just FromHelsinki
            else if helsinkiFirst (List.reverse timetableRows) then
                Just ToHelsinki
            else
                Nothing

        departingFromStation =
            timetableRows
                |> List.filterMap
                    (\a ->
                        if a.stationShortCode == "KIL" && a.rowType == Departure then
                            Just a.scheduledTime
                        else
                            Nothing
                    )
                |> List.head
    in
    Maybe.map2
        (Train trainNumber lineId timetableRows cancelled)
        direction
        departingFromStation
        |> Maybe.map succeed
        |> Maybe.withDefault (fail "Couldn't turn raw data into train")


timetableRowsDecoder : Decoder (List TimetableRow)
timetableRowsDecoder =
    decode TimetableRow
        |> required "scheduledTime" dateDecoder
        |> required "trainStopping" bool
        |> required "stationShortCode" string
        |> required "stationUICCode" int
        |> required "type" rowTypeDecoder
        |> optional "actualTime" (maybe dateDecoder) Nothing
        |> optional "liveEstimateTime" (maybe dateDecoder) Nothing
        |> optional "differenceInMinutes" (maybe int) Nothing
        |> list


dateDecoder : Decoder Date
dateDecoder =
    string
        |> andThen
            (\a ->
                case Date.fromString a of
                    Ok date ->
                        succeed date

                    Err error ->
                        fail error
            )


rowTypeDecoder : Decoder RowType
rowTypeDecoder =
    string
        |> andThen
            (\a ->
                case a of
                    "ARRIVAL" ->
                        succeed Arrival

                    "DEPARTURE" ->
                        succeed Departure

                    other ->
                        fail ("\"" ++ other ++ "\" is not a valid row type")
            )
