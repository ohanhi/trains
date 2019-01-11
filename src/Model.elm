module Model exposing (CurrentStation, Model, Route(..), RowType(..), Stations, Targets, TimetableRow, Train, Trains, sortedTrainList, stationsDecoder, trainsDecoder)

import Browser.Navigation
import DateFormat
import Dict exposing (Dict)
import Iso8601
import Json.Decode exposing (..)
import Json.Decode.Pipeline exposing (..)
import RemoteData exposing (WebData)
import Time exposing (Posix)


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
    , homeStationArrival : Maybe TimetableRow
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
    , track : Maybe String
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


type alias Targets =
    { from : String
    , to : String
    }


stationsDecoder : Decoder Stations
stationsDecoder =
    Json.Decode.succeed (\a b -> ( a, b ))
        |> required "stationShortCode" string
        |> required "stationName"
            (string |> map (String.replace " asema" ""))
        |> list
        |> andThen (Dict.fromList >> succeed)


trainsDecoder : Targets -> Decoder Trains
trainsDecoder targets =
    Json.Decode.succeed TrainRaw
        |> required "trainNumber" int
        |> required "commuterLineID" string
        |> required "trainCategory" string
        |> required "timeTableRows" timetableRowsDecoder
        |> required "runningCurrently" bool
        |> required "cancelled" bool
        |> andThen (\raw -> succeed (toTrain targets raw))
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
            (\train -> Time.posixToMillis train.homeStationDeparture.scheduledTime)


toTrain : Targets -> TrainRaw -> Maybe Train
toTrain { from, to } trainRaw =
    let
        stoppingRows =
            List.filter .trainStopping trainRaw.timetableRows

        homeStationDeparture =
            findTimetableRow Departure from stoppingRows

        endStationArrival =
            findTimetableRow Arrival to (List.reverse trainRaw.timetableRows)

        isValid =
            trainRaw.trainCategory == "Commuter" && isRightDirection stoppingRows to homeStationDeparture
    in
    case ( isValid, homeStationDeparture, endStationArrival ) of
        ( True, Just dep, Just end ) ->
            Just
                { trainNumber = trainRaw.trainNumber
                , lineId = trainRaw.lineId
                , runningCurrently = trainRaw.runningCurrently
                , cancelled = trainRaw.cancelled
                , currentStation = findCurrentStation trainRaw.timetableRows
                , homeStationArrival = findTimetableRow Arrival from stoppingRows
                , homeStationDeparture = dep
                , endStationArrival = end
                }

        _ ->
            Nothing


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
        |> optional "commercialTrack" (maybe string) Nothing
        |> required "type" rowTypeDecoder
        |> optional "actualTime" (maybe dateDecoder) Nothing
        |> optional "liveEstimateTime" (maybe dateDecoder) Nothing
        |> optional "differenceInMinutes" (maybe int) Nothing
        |> list


dateDecoder : Decoder Posix
dateDecoder =
    Iso8601.decoder


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
