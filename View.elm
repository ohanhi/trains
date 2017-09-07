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
    | TimetableRow
    | TimetableRowCurrent
    | Heading
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
            , Style.shadows
                [ Shadow.box
                    { offset = ( 1, 5 ), blur = 10, color = Color.rgba 0 0 0 0.1, size = 0 }
                ]
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
                        trainsView model.stations trains

                    Failure err ->
                        [ el Heading [] <| text (toString err) ]

                    Loading ->
                        [ el Heading [] <| text "Loading" ]

                    _ ->
                        []
            ]


trainsView : Stations -> Trains -> List (Element Styles Variations msg)
trainsView stations trains =
    let
        ( toHelsinki, fromHelsinki ) =
            trains
                |> Model.sortedTrainList
                |> List.partition (\a -> a.direction == ToHelsinki)

        trainColumn name trainRows =
            column Trains
                [ spacing (rem 1)
                , width (percent 50)
                , minWidth (px (rem 20))
                ]
            <|
                [ el Heading [] (text name) ]
                    ++ trainRows
    in
    [ trainColumn "To Helsinki" (List.map (trainRow stations) toHelsinki)
    , trainColumn "From Helsinki" (List.map (trainRow stations) fromHelsinki)
    ]


trainRow : Stations -> Train -> Element Styles Variations msg
trainRow stations train =
    let
        currentStation =
            train.timetableRows
                |> List.filter (.actualTime >> (/=) Nothing)
                |> List.reverse
                |> List.head

        isMoving =
            currentStation /= Nothing

        homeStation =
            train.timetableRows
                |> List.filter (.stationShortCode >> (==) "KIL")
                |> List.head

        currentDifference =
            homeStation
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
        [ el TrainLineId
            [ width (percent 20)
            , vary Moving isMoving
            ]
            (text train.lineId)
        , column None
            [ width (percent 80) ]
            [ whenJust currentStation statusInfo
            , stationRow (prettyTime train.departingFromStation) "Kilo" currentDifference
            , el StationTime [ width (px (rem 4)) ] (text "︙")
            , whenJust endStationData <|
                \( date, name, diff ) ->
                    stationRow (prettyTime date) name diff
            ]
        ]


stationRow : String -> String -> Maybe Int -> Element Styles Variations msg
stationRow date name differenceInMinutes =
    row None
        [ spacing (rem 0.5) ]
        [ el StationTime [ width (px (rem 4)) ] (text date)
        , el StationName [] (text name)
        , el StationDifference [] (text <| formatDifference "" differenceInMinutes)
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
    Date.Format.format "%H:%M"
