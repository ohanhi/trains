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
    , runningCurrently : Bool
    , cancelled : Bool
    , currentStation : Maybe CurrentStation
    , homeStationArrival : TimetableRow
    , homeStationDeparture : TimetableRow
    , endStationArrival : TimetableRow
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


type alias CurrentStation =
    { stationShortCode : String
    , stationUICCode : Int
    , rowType : RowType
    , actualTime : Posix
    , differenceInMinutes : Int
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
        |> List.sortBy
            (\train -> Time.posixToMillis train.homeStationArrival.scheduledTime)


toTrain : ( String, String ) -> TrainRaw -> Decoder (Maybe Train)
toTrain ( from, to ) { trainNumber, lineId, trainCategory, timetableRows, runningCurrently, cancelled } =
    let
        stoppingRows =
            List.filter .trainStopping timetableRows

        homeStationDeparture =
            findTimetableRow Departure from stoppingRows
    in
    if trainCategory == "Commuter" && isRightDirection stoppingRows to homeStationDeparture then
        Maybe.map3
            (\arr dep end ->
                { trainNumber = trainNumber
                , lineId = lineId
                , runningCurrently = runningCurrently
                , cancelled = cancelled
                , currentStation = findCurrentStation timetableRows
                , homeStationArrival = arr
                , homeStationDeparture = dep
                , endStationArrival = end
                }
                    |> Just
                    |> succeed
            )
            (findTimetableRow Arrival from stoppingRows)
            homeStationDeparture
            (findTimetableRow Arrival to (List.reverse timetableRows))
            |> Maybe.withDefault (succeed Nothing)

    else
        succeed Nothing


findTimetableRow : RowType -> String -> List TimetableRow -> Maybe TimetableRow
findTimetableRow rowType shortCode rows =
    rows
        |> List.filter
            (\row -> row.stationShortCode == shortCode && row.rowType == rowType)
        |> List.head


isRightDirection : List TimetableRow -> String -> Maybe TimetableRow -> Bool
isRightDirection rows toShortCode departureRow =
    case departureRow of
        Nothing ->
            False

        Just departure ->
            rows
                |> List.filter
                    (\row -> row.stationShortCode == toShortCode && row.rowType == Arrival)
                |> List.any
                    (\arr -> Time.posixToMillis arr.scheduledTime > Time.posixToMillis departure.scheduledTime)


findCurrentStation : List TimetableRow -> Maybe CurrentStation
findCurrentStation rows =
    rows
        |> List.filter (.actualTime >> (/=) Nothing)
        |> List.reverse
        |> List.head
        |> Maybe.andThen
            (\row ->
                Maybe.map2
                    (\actualTime differenceInMinutes ->
                        { stationShortCode = row.stationShortCode
                        , stationUICCode = row.stationUICCode
                        , rowType = row.rowType
                        , actualTime = actualTime
                        , differenceInMinutes = differenceInMinutes
                        }
                    )
                    row.actualTime
                    row.differenceInMinutes
            )


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
