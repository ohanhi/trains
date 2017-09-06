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


stylesheet : StyleSheet Styles variation
stylesheet =
    Style.stylesheet
        [ style None []
        , style Main
            [ Color.background Color.lightGray
            ]
        , style Trains
            [ Font.typeface [ "Monoid" ]
            , Font.lineHeight 1.5
            , Font.size (ts 1)
            ]
        , style TrainRow
            [ Color.background Color.white
            , Font.pre
            ]
        , style TrainLineId
            [ Font.weight 600
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
        ]


view : Model -> Html msg
view model =
    Element.root stylesheet <|
        column Main
            [ center
            , width (percent 100)
            , padding (rem 2)
            ]
            [ row None [ spacing (rem 2) ] <|
                case model.trains of
                    Success trains ->
                        trainsView model.stations trains

                    Failure err ->
                        [ el TrainRow [] (text (toString err)) ]

                    Loading ->
                        [ el TrainRow [] (text "Loading") ]

                    _ ->
                        []
            ]


trainsView : Stations -> Trains -> List (Element Styles variation msg)
trainsView stations trains =
    let
        ( toHelsinki, fromHelsinki ) =
            trains
                |> Model.sortedTrainList
                |> List.partition (\a -> a.direction == ToHelsinki)

        trainColumn name trainRows =
            column Trains [] <|
                [ el Heading [] (text name) ]
                    ++ trainRows
    in
    [ trainColumn "To Helsinki" (List.map (trainRow stations) toHelsinki)
    , trainColumn "From Helsinki" (List.map (trainRow stations) fromHelsinki)
    ]


trainRow : Stations -> Train -> Element Styles variation msg
trainRow stations train =
    let
        currentStation =
            train.timetableRows
                |> List.reverse
                |> List.filter (.actualTime >> (/=) Nothing)
                |> List.head

        currentDifference =
            currentStation
                |> Maybe.map .differenceInMinutes
                |> Maybe.map formatDifference
                |> Maybe.withDefault "  "
    in
    row TrainRow
        [ padding (rem 1)
        , spacing (rem 1)
        , width (percent 100)
        ]
        [ el TrainLineId [] (text train.lineId)
        , el None [] (text <| prettyTime train.departingFromStation ++ " " ++ currentDifference)
        , column None [] <| timetableRows stations currentStation train.timetableRows
        ]


timetableRows : Stations -> Maybe TimetableRow -> List TimetableRow -> List (Element Styles variation msg)
timetableRows stations currentStation rows =
    let
        prettyPrint row =
            prettyTime row.scheduledTime
                ++ " "
                ++ formatDifference row.differenceInMinutes
                ++ " "
                ++ (case Dict.get row.stationUICCode stations of
                        Just name ->
                            name

                        Nothing ->
                            row.stationShortCode
                   )

        style row =
            if Maybe.map .stationUICCode currentStation == Just row.stationUICCode then
                TimetableRowCurrent
            else
                TimetableRow
    in
    rows
        -- |> List.dropWhile (.stationShortCode >> (/=) "KIL")
        -- |> List.drop 2
        |> List.filter (\a -> a.trainStopping && (a.rowType == Arrival))
        |> List.map
            (\timetableRow ->
                el (style timetableRow) [] (text (prettyPrint timetableRow))
            )


formatDifference : Maybe Int -> String
formatDifference differenceInMinutes =
    let
        plusify n =
            if n < 0 then
                toString n
            else
                "+" ++ toString n
    in
    differenceInMinutes
        |> Maybe.map (plusify >> String.padLeft 2 ' ')
        |> Maybe.withDefault "  "


prettyTime : Date -> String
prettyTime =
    Date.Format.format "%H:%M"
