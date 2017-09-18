module View exposing (view)

import Color
import Date exposing (Date)
import Date.Format
import Dict
import Element exposing (..)
import Element.Attributes exposing (..)
import Html exposing (Html)
import Http
import Icons
import Model exposing (..)
import RemoteData exposing (RemoteData(..))
import Style exposing (..)
import Style.Color as Color
import Style.Font as Font
import Style.Shadow as Shadow
import Time exposing (Time)
import Time.Format


rem : Float -> Float
rem x =
    x * 16


ts : Int -> Float
ts scale =
    1.33 ^ toFloat scale * rem 1


type Styles
    = None
    | Main
    | Trains
    | TrainRow
    | TrainLineId
    | TrainArrivingIn
    | TrainArrivingTime
    | TimetableRow
    | TimetableRowCurrent
    | Heading
    | HeadingBack
    | HeadingSwap
    | StationTime
    | StationTimeShouldBe
    | StationName
    | StationDifference
    | StatusInfo


type Variations
    = OnTime
    | SlightlyOffSchedule
    | OffSchedule
    | Moving


stylesheet : StyleSheet Styles Variations
stylesheet =
    let
        colors =
            { online = Color.rgb 0 205 0
            , onTime = Color.darkGreen
            , slightlyOffSchedule = Color.orange
            , offSchedule = Color.darkRed
            }

        shadow =
            Style.shadows
                [ Shadow.box
                    { offset = ( 1, 5 ), blur = 10, color = Color.rgba 0 0 0 0.1, size = 0 }
                ]
    in
    Style.stylesheet
        [ style None []
        , style Main
            [ Color.background Color.lightGray
            , Font.typeface [ "Roboto", "sans-serif" ]
            , Font.lineHeight 1.5
            , Font.size (ts 0)
            ]
        , style Trains []
        , style TrainRow
            [ Color.background Color.white
            , Font.pre
            , shadow
            ]
        , style TrainLineId
            [ Font.size (ts 3)
            , Font.weight 600
            , Font.center
            , Font.lineHeight 1
            , Color.text Color.darkGray
            , variation Moving
                [ Color.text Color.black ]
            ]
        , style TrainArrivingIn
            [ Font.size (ts -1)
            , Font.center
            , Font.weight 600
            , Color.text Color.darkGray
            ]
        , style TrainArrivingTime
            [ Font.size (ts 2)
            , Font.center
            , Font.lineHeight 1
            , Color.text Color.darkGray
            ]
        , style TimetableRow
            [ Font.pre
            , Color.text Color.gray
            ]
        , style TimetableRowCurrent
            [ Font.pre
            , Color.text Color.black
            ]
        , style Heading
            [ Font.size (ts 2)
            , Font.lineHeight 2
            , Color.text Color.black
            ]
        , style HeadingBack
            [ Color.text Color.black
            , Font.center
            ]
        , style HeadingSwap
            [ Color.text Color.darkGray
            , Font.center
            ]
        , style StationTime
            [ Font.center
            , Font.weight 600
            , variation OnTime
                [ Color.text colors.onTime ]
            , variation SlightlyOffSchedule
                [ Color.text colors.slightlyOffSchedule ]
            , variation OffSchedule
                [ Color.text colors.offSchedule ]
            ]
        , style StationTimeShouldBe
            [ Color.text Color.darkGray
            , Font.strike
            , Font.size (ts -1)
            ]
        , style StationName []
        , style StationDifference []
        , style StatusInfo
            [ Font.size (ts -1)
            , Font.center
            ]
        ]


view : Model -> Html Msg
view model =
    Element.viewport stylesheet <|
        column Main
            [ center
            , width (percent 100)
            , padding (rem 2)
            ]
            [ el None
                [ spacing (rem 2)
                , width (percent 100)
                , maxWidth (px (rem 30))
                , center
                ]
              <|
                case model.route of
                    SelectRoute ->
                        selectStationsView model

                    ScheduleRoute from to ->
                        scheduleView model ( from, to )
            ]


selectStationsView : Model -> Element Styles Variations Msg
selectStationsView model =
    column None
        [ spacing (rem 1) ]
        [ el Heading [] (text "Select stations")
        , link "#KIL/HKI" <| el None [] (text "Kilo—Helsinki")
        , link "#HKI/KIL" <| el None [] (text "Helsinki—Kilo")
        ]


scheduleView : Model -> ( String, String ) -> Element Styles Variations msg
scheduleView model targets =
    case model.trains of
        Success trains ->
            trainsView model targets trains

        Failure err ->
            column None
                [ spacing (rem 1) ]
                [ el Heading [] <| text "Oh noes, an error!"
                , case err of
                    Http.NetworkError ->
                        text "It's the network."

                    Http.Timeout ->
                        text "Helloooo?"
                            |> below [ text "There was no response." ]

                    Http.BadUrl _ ->
                        text "It's not you, it's me. I have the server address wrong."

                    Http.BadStatus _ ->
                        text "Whoops, looks like the server didn't like the request."

                    Http.BadPayload _ _ ->
                        text "Ouch, the server responded with strange contents."
                ]

        Loading ->
            el Heading [] <| text "Loading"

        _ ->
            empty


trainsView : Model -> ( String, String ) -> Trains -> Element Styles Variations msg
trainsView model ( from, to ) trains =
    let
        rightDirection =
            trains
                |> Model.sortedTrainList

        heading =
            stationName model.stations from ++ "—" ++ stationName model.stations to
    in
    column Trains
        [ spacing (rem 1)
        , width (percent 100)
        , minWidth (px (rem 20))
        ]
    <|
        [ row Heading
            [ spacing (rem 1) ]
            [ link "#" <|
                el HeadingBack [ width (px (rem 2)) ] (text "‹")
            , el Heading [] (text heading)
            , link ("#" ++ to ++ "/" ++ from) <|
                el HeadingSwap
                    [ width (px (rem 2)), center ]
                    (html <| Icons.swap (ts 2))
            ]
        ]
            ++ List.map (trainRow model ( from, to )) rightDirection


trainRow :
    { a | stations : Stations, currentTime : Time }
    -> ( String, String )
    -> Train
    -> Element Styles Variations msg
trainRow { stations, currentTime } ( from, to ) train =
    let
        currentStation =
            train.timetableRows
                |> List.filter (.actualTime >> (/=) Nothing)
                |> List.reverse
                |> List.head

        isMoving =
            currentStation /= Nothing

        ( homeStationArrival, homeStationDeparture ) =
            train.timetableRows
                |> List.filter (.stationShortCode >> (==) from)
                |> (\homeStationRows ->
                        ( homeStationRows |> List.filter (.rowType >> (==) Arrival) |> List.head
                        , homeStationRows |> List.filter (.rowType >> (==) Departure) |> List.head
                        )
                   )

        homeStationArrivingIn =
            homeStationArrival
                |> Maybe.map .liveEstimateTime
                |> Maybe.withDefault (Maybe.map .scheduledTime homeStationArrival)
                |> Maybe.map (\date -> Date.toTime date - currentTime)
                |> Maybe.andThen
                    (\timeDiff ->
                        if timeDiff > 0 then
                            Just (Time.Format.format "%M:%S" timeDiff)
                        else
                            Nothing
                    )

        homeStationLiveEstimate =
            homeStationDeparture
                |> Maybe.map .liveEstimateTime
                |> Maybe.andThen identity

        endStation =
            train.timetableRows
                |> List.filter
                    (\row -> row.rowType == Arrival && row.stationShortCode == to)
                |> List.head

        statusInfo station =
            whenJust station.differenceInMinutes (statusInfoBadge station)

        statusInfoBadge station n =
            wrappedRow StatusInfo
                [ center ]
                [ el StationTime
                    [ vary OnTime (abs n <= 1)
                    , vary SlightlyOffSchedule (abs n > 1 && abs n <= 5)
                    , vary OffSchedule (abs n > 5)
                    ]
                    (text (formatDifference "On time" station.differenceInMinutes))
                ]
    in
    row TrainRow
        [ paddingXY (rem 1) (rem 0.5)
        , spacing (rem 1)
        , verticalCenter
        , width (percent 100)
        ]
        [ column None
            [ width (px (rem 2)) ]
            [ el TrainLineId [ vary Moving isMoving ] (text train.lineId)
            ]
        , column None
            [ width (fill 1) ]
            [ whenJust homeStationDeparture (stationRow stations)
            , el StationTime [ width (px timeWidth) ] (text "︙")
            , whenJust endStation (stationRow stations)
            ]
        , column None
            []
            [ whenJust homeStationArrivingIn <|
                \time -> el TrainArrivingIn [] (text "Arrives in")
            , whenJust homeStationArrivingIn <|
                \time -> el TrainArrivingTime [] (text time)
            , whenJust currentStation statusInfo
            ]
        ]


stationRow : Stations -> TimetableRow -> Element Styles Variations msg
stationRow stations station =
    let
        name =
            stationName stations station.stationShortCode
    in
    row None
        [ spacing (rem 0.5) ]
        [ case ( station.liveEstimateTime, station.differenceInMinutes ) of
            ( Just estimate, Just n ) ->
                column StationTime
                    [ width (px timeWidth)
                    , vary OnTime (abs n <= 1)
                    , vary SlightlyOffSchedule (abs n > 1 && abs n <= 5)
                    , vary OffSchedule (abs n > 5)
                    ]
                    [ text <| prettyTime estimate
                    , when (n /= 0) <|
                        el StationTimeShouldBe [] (text <| prettyTime station.scheduledTime)
                    ]

            _ ->
                el StationTime [ width (px timeWidth) ] (text <| prettyTime station.scheduledTime)
        , el StationName [] (text name)
        ]


timeWidth : Float
timeWidth =
    rem 3


stationName : Stations -> String -> String
stationName stations shortCode =
    stations
        |> Dict.get shortCode
        |> Maybe.withDefault shortCode


formatDifference : String -> Maybe Int -> String
formatDifference default differenceInMinutes =
    let
        stringify n =
            if n == 0 then
                Nothing
            else if n < 0 then
                Just (toString (abs n) ++ " min early")
            else
                Just (toString n ++ " min late")
    in
    differenceInMinutes
        |> Maybe.andThen stringify
        |> Maybe.withDefault default


prettyTime : Date -> String
prettyTime =
    Date.Format.format "%H.%M"
