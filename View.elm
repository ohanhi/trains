module View exposing (view)

import Color
import Date exposing (Date)
import Date.Format
import Dict
import Element exposing (..)
import Element.Attributes exposing (..)
import Html exposing (Html)
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
    | TimetableRow
    | TimetableRowCurrent
    | Heading
    | HeadingBack
    | StationTime
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
            [ Font.size (ts 0)
            , Font.center
            , Font.weight 600
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
        , style StationName []
        , style StationDifference []
        , style StatusInfo
            [ Font.size (ts -1)
            ]
        ]


view : Model -> Html msg
view model =
    Element.viewport stylesheet <|
        column Main
            [ center
            , width (percent 100)
            , padding (rem 2)
            ]
            [ wrappedRow None
                [ spacing (rem 2)
                , width (percent 100)
                , center
                ]
              <|
                case model.trains of
                    Success trains ->
                        trainsView model trains

                    Failure err ->
                        [ el Heading [] <| text (toString err) ]

                    Loading ->
                        [ el Heading [] <| text "Loading" ]

                    _ ->
                        []
            ]


trainsView :
    { a | route : Route, stations : Stations, currentTime : Time }
    -> Trains
    -> List (Element Styles Variations msg)
trainsView ({ route, stations, currentTime } as viewModel) trains =
    let
        ( toHelsinki, fromHelsinki ) =
            trains
                |> Model.sortedTrainList
                |> List.partition (\a -> a.direction == ToHelsinki)

        isSingleDirection =
            route /= BothRoute

        trainColumn ( name, hash ) trainRows =
            column Trains
                [ spacing (rem 1)
                , width <|
                    if isSingleDirection then
                        percent 100
                    else
                        percent 50
                , minWidth (px (rem 20))
                ]
            <|
                [ row Heading
                    [ spacing (rem 1) ]
                    [ when isSingleDirection <|
                        link "#" <|
                            el HeadingBack [ width (px (rem 2)) ] (text "‹")
                    , link ("#" ++ hash) <| el Heading [] (text name)
                    ]
                ]
                    ++ List.map (trainRow viewModel) trainRows
    in
    [ when (route == BothRoute || route == ToHelsinkiRoute) <|
        trainColumn ( "To Helsinki", "to-helsinki" ) toHelsinki
    , when (route == BothRoute || route == FromHelsinkiRoute) <|
        trainColumn ( "From Helsinki", "from-helsinki" ) fromHelsinki
    ]


trainRow :
    { a | stations : Stations, currentTime : Time }
    -> Train
    -> Element Styles Variations msg
trainRow { stations, currentTime } train =
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
                |> List.filter (.stationShortCode >> (==) "KIL")
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

        currentDifference =
            homeStationDeparture
                |> Maybe.map .differenceInMinutes
                |> Maybe.andThen identity

        endStationData =
            train.timetableRows
                |> List.reverse
                |> List.head
                |> Maybe.map
                    (\station ->
                        ( station.liveEstimateTime
                            |> Maybe.withDefault station.scheduledTime
                        , stationName stations station
                        , station.differenceInMinutes
                        )
                    )

        statusInfo station =
            whenJust station.differenceInMinutes (statusInfoBadge station)

        statusInfoBadge station n =
            row StatusInfo
                [ spacing (rem 0.5) ]
                [ el StationTime
                    [ width (px (rem 4))
                    , vary OnTime (abs n <= 1)
                    , vary SlightlyOffSchedule (abs n > 1 && abs n <= 5)
                    , vary OffSchedule (abs n > 5)
                    ]
                    (text (formatDifference "On time" station.differenceInMinutes))
                , el StationName [] (text (stationName stations station))
                ]
    in
    row TrainRow
        [ paddingXY (rem 1) (rem 0.5)
        , spacing (rem 1)
        , verticalCenter
        , width (percent 100)
        ]
        [ column None
            [ width (percent 20) ]
            [ el TrainLineId [ vary Moving isMoving ] (text train.lineId)
            ]
        , column None
            [ width (percent 60) ]
            [ whenJust currentStation statusInfo
            , stationRow (prettyTime train.departingFromStation) "Kilo" currentDifference
            , el StationTime [ width (px (rem 4)) ] (text "︙")
            , whenJust endStationData <|
                \( date, name, diff ) ->
                    stationRow (prettyTime date) name diff
            ]
        , whenJust homeStationArrivingIn <|
            \time ->
                column None
                    [ width (percent 20) ]
                    [ el TrainArrivingIn [] (text "Arrives in ")
                    , el TrainLineId [] (text time)
                    ]
        ]


stationRow : String -> String -> Maybe Int -> Element Styles Variations msg
stationRow date name differenceInMinutes =
    row None
        [ spacing (rem 0.5) ]
        [ el StationTime [ width (px (rem 4)) ] (text date)
        , el StationName [] (text name)

        -- , el StationDifference [] (text <| formatDifference "" differenceInMinutes)
        ]


stationName : Stations -> TimetableRow -> String
stationName stations row =
    stations
        |> Dict.get row.stationUICCode
        |> Maybe.withDefault row.stationShortCode


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
