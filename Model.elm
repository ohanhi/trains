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
    = SelectRoute
    | ScheduleRoute String String


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
    = RightDirection
    | WrongDirection


type alias Stations =
    Dict String String


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
        |> required "stationShortCode" string
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


trainsDecoder : ( String, String ) -> Decoder Trains
trainsDecoder targets =
    decode TrainRaw
        |> required "trainNumber" int
        |> required "commuterLineID" string
        |> required "timeTableRows" timetableRowsDecoder
        |> required "cancelled" bool
        |> andThen (toTrain targets)
        |> list
        |> andThen (List.map (\a -> ( a.trainNumber, a )) >> Dict.fromList >> succeed)


sortedTrainList : Trains -> List Train
sortedTrainList trains =
    trains
        |> Dict.values
        |> List.sortBy (.departingFromStation >> Date.Format.formatISO8601)


toTrain : ( String, String ) -> TrainRaw -> Decoder Train
toTrain ( from, to ) { trainNumber, lineId, timetableRows, cancelled } =
    let
        direction =
            timetableRows
                |> List.filter (\row -> row.stationShortCode == to || row.stationShortCode == from)
                |> (\rows ->
                        let
                            first =
                                rows
                                    |> List.head
                                    |> Maybe.map .stationShortCode

                            last =
                                rows
                                    |> List.reverse
                                    |> List.head
                                    |> Maybe.map .stationShortCode
                        in
                        if first == Just from && last == Just to then
                            RightDirection
                        else
                            WrongDirection
                   )

        departingFromStation =
            timetableRows
                |> List.filterMap
                    (\a ->
                        if a.stationShortCode == from && a.rowType == Departure then
                            Just a.scheduledTime
                        else
                            Nothing
                    )
                |> List.head
    in
    departingFromStation
        |> Maybe.map (Train trainNumber lineId timetableRows cancelled direction)
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
