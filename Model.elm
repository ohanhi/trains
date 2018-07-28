module Model exposing (..)

import Browser.Navigation
import DateFormat
import Dict exposing (Dict)
import Json.Decode exposing (..)
import Json.Decode.Pipeline exposing (..)
import RemoteData exposing (WebData)
import Time exposing (Posix)
import Vendor.Iso8601


type Route
    = SelectDepRoute
    | SelectDestRoute String
    | ScheduleRoute String String


type alias Model =
    { trains : WebData Trains
    , stations : Stations
    , currentTime : Posix
    , lastRequestTime : Posix
    , route : Route
    , zone : Time.Zone
    , navKey : Browser.Navigation.Key
    }


type alias Train =
    { trainNumber : Int
    , lineId : String
    , timetableRows : List TimetableRow
    , runningCurrently : Bool
    , cancelled : Bool
    , departingFromStation : Posix
    }


type alias TrainRaw =
    { trainNumber : Int
    , lineId : String
    , trainCategory : String
    , timetableRows : List TimetableRow
    , runningCurrently : Bool
    , cancelled : Bool
    }


type alias Stations =
    Dict String String


type alias Trains =
    Dict Int Train


type alias TimetableRow =
    { scheduledTime : Posix
    , trainStopping : Bool
    , stationShortCode : String
    , stationUICCode : Int
    , track : String
    , rowType : RowType
    , actualTime : Maybe Posix
    , liveEstimateTime : Maybe Posix
    , differenceInMinutes : Maybe Int
    }


type RowType
    = Departure
    | Arrival


stationsDecoder : Decoder Stations
stationsDecoder =
    Json.Decode.succeed (\a b -> ( a, b ))
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
    Json.Decode.succeed TrainRaw
        |> required "trainNumber" int
        |> required "commuterLineID" string
        |> required "trainCategory" string
        |> required "timeTableRows" timetableRowsDecoder
        |> required "runningCurrently" bool
        |> required "cancelled" bool
        |> andThen (toTrain targets)
        |> list
        |> andThen
            (List.filterMap identity
                >> List.map (\a -> ( a.trainNumber, a ))
                >> Dict.fromList
                >> succeed
            )


sortedTrainList : Trains -> List Train
sortedTrainList trains =
    trains
        |> Dict.values
        |> List.sortBy (.departingFromStation >> Time.posixToMillis)


toTrain : ( String, String ) -> TrainRaw -> Decoder (Maybe Train)
toTrain ( from, to ) { trainNumber, lineId, trainCategory, timetableRows, runningCurrently, cancelled } =
    let
        rightDirection =
            timetableRows
                |> List.filter .trainStopping
                |> (\rows ->
                        let
                            departureTime =
                                rows
                                    |> List.filterMap
                                        (\row ->
                                            if row.stationShortCode == from && row.rowType == Departure then
                                                Just (row.scheduledTime |> Time.posixToMillis)

                                            else
                                                Nothing
                                        )
                                    |> List.head

                            arrivalTimes =
                                rows
                                    |> List.filterMap
                                        (\row ->
                                            if row.stationShortCode == to && row.rowType == Arrival then
                                                Just (row.scheduledTime |> Time.posixToMillis)

                                            else
                                                Nothing
                                        )
                        in
                        departureTime
                            |> Maybe.map (\dep -> List.any (\arr -> arr > dep) arrivalTimes)
                            |> Maybe.withDefault False
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
    if trainCategory == "Commuter" && rightDirection then
        departingFromStation
            |> Maybe.map (succeed << Just << Train trainNumber lineId timetableRows runningCurrently cancelled)
            |> Maybe.withDefault (succeed Nothing)

    else
        succeed Nothing


timetableRowsDecoder : Decoder (List TimetableRow)
timetableRowsDecoder =
    Json.Decode.succeed TimetableRow
        |> required "scheduledTime" dateDecoder
        |> required "trainStopping" bool
        |> required "stationShortCode" string
        |> required "stationUICCode" int
        |> required "commercialTrack" string
        |> required "type" rowTypeDecoder
        |> optional "actualTime" (maybe dateDecoder) Nothing
        |> optional "liveEstimateTime" (maybe dateDecoder) Nothing
        |> optional "differenceInMinutes" (maybe int) Nothing
        |> list


dateDecoder : Decoder Posix
dateDecoder =
    string
        |> andThen
            (\str ->
                str
                    |> Vendor.Iso8601.toTime
                    |> Result.map succeed
                    |> Result.withDefault (fail ("Parsing date '" ++ str ++ "' failed"))
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
