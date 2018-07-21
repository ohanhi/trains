module View exposing (Msg(..), view)

import Browser exposing (Document, UrlRequest)
import DateFormat
import Dict
import Element exposing (..)
import Element.Background as Background
import Element.Border
import Element.Font as Font
import Html exposing (Html)
import Http
import Icons
import Model exposing (..)
import RemoteData exposing (RemoteData(..), WebData)
import Stations
import Time exposing (Posix)
import Url exposing (Url)
import Url.Parser


type Msg
    = UpdateTime Posix
    | TimeZoneResponse Time.Zone
    | TrainsResponse (WebData Trains)
    | StationsResponse (WebData Stations)
    | UrlChange Url
    | LinkClicked UrlRequest


rem : Float -> Int
rem x =
    round (x * 16)


ts : Int -> Int
ts scale =
    round (1.33 ^ toFloat scale * 16)


whenJust : Maybe a -> (a -> Element msg) -> Element msg
whenJust value toElement =
    case value of
        Just a ->
            toElement a

        Nothing ->
            text ""


colors =
    { onTime = rgb 0.306 0.604 0.017
    , slightlyOffSchedule = rgb 0.96 0.474 0
    , offSchedule = rgb 0.643 0 0
    , white = rgb 1 1 1
    , lightGray = rgb 0.93 0.93 0.93 --238 238 236
    , gray = rgb 0.726 0.726 0.726
    , black = rgb 0.039 0.039 0.039
    , purple = rgb 0.29 0.078 0.549
    }


timelinessColor difference =
    if abs difference <= 1 then
        colors.onTime

    else if abs difference <= 5 then
        colors.slightlyOffSchedule

    else
        colors.offSchedule


shadow =
    Element.Border.shadow { offset = ( 1, 5 ), blur = 10, color = rgba 0 0 0 0.1, size = 0 }


headingStyles =
    [ Font.size (ts 2)
    , Element.spacing 2
    , Font.color colors.black
    ]


depDestLink =
    link [ Font.color colors.purple ]


view : Model -> Document msg
view model =
    case model.route of
        SelectDepRoute ->
            selectDepPage model

        SelectDestRoute dep ->
            selectDestPage model dep

        ScheduleRoute from to ->
            schedulePage model ( from, to )


container : List (Element msg) -> List (Html msg)
container elements =
    [ Element.layout
        [ Background.color colors.lightGray
        , Font.family [ Font.typeface "Roboto", Font.sansSerif ]
        , Font.size (ts 0)
        ]
        (column
            [ centerX
            , spacing (rem 2)
            , padding (rem 2)
            , width
                (px (rem 1000)
                    |> maximum (rem 30)
                )
            ]
            elements
        )
    ]


selectDepPage : Model -> Document msg
selectDepPage model =
    { title = "Schedules! Helsinki region commuter trains"
    , body =
        container
            [ column
                [ centerX
                , spacing (rem 1)
                ]
                [ el headingStyles (text "Select departure")
                , column
                    [ spacing (rem 0.5) ]
                    (Stations.all
                        |> List.map
                            (\( abbr, name ) -> depDestLink { url = "#/" ++ abbr, label = text name })
                    )
                ]
            ]
    }


selectDestPage : Model -> String -> Document msg
selectDestPage model dep =
    let
        url dest =
            "#/" ++ dep ++ "/" ++ dest

        linkText dest =
            Stations.findName dep
                |> Maybe.map (\name -> name ++ "–" ++ dest)
                |> Maybe.withDefault dest
    in
    { title = "Select destination – Schedules!"
    , body =
        container
            [ column
                [ centerX
                , spacing (rem 1)
                ]
                [ el headingStyles (text "Select destination")
                , column
                    [ spacing (rem 1) ]
                    (Stations.matching dep
                        |> List.map
                            (\( abbr, name ) -> depDestLink { url = url abbr, label = text (linkText name) })
                    )
                ]
            ]
    }


schedulePage : Model -> ( String, String ) -> Document msg
schedulePage model ( from, to ) =
    let
        heading =
            stationName model.stations from ++ "—" ++ stationName model.stations to
    in
    { title = heading ++ " – Schedules!"
    , body =
        container
            [ case model.trains of
                Success trains ->
                    trainsView model ( from, to ) heading trains

                Failure err ->
                    column
                        [ spacing (rem 1) ]
                        [ el headingStyles <| text "Oh noes, an error!"
                        , case err of
                            Http.NetworkError ->
                                text "It's the network."

                            Http.Timeout ->
                                text "Helloooo? (There was no response.)"

                            Http.BadUrl _ ->
                                text "It's not you, it's me. I have the server address wrong."

                            Http.BadStatus _ ->
                                text "Whoops, looks like the server didn't like the request."

                            Http.BadPayload _ _ ->
                                text "Ouch, the server responded with strange contents."
                        ]

                Loading ->
                    el headingStyles <| text "Loading"

                _ ->
                    text ""
            ]
    }


trainsView : Model -> ( String, String ) -> String -> Trains -> Element msg
trainsView model ( from, to ) heading trains =
    let
        rightDirection =
            trains
                |> Model.sortedTrainList
    in
    column
        [ spacing (rem 1)
        , width
            (fill
                |> minimum (rem 20)
            )
        ]
    <|
        [ row
            (headingStyles ++ [ spacing (rem 1) ])
            [ link
                [ Font.color colors.black
                , Font.center
                , width (px (rem 2))
                ]
                { url = "#/", label = text "‹" }
            , el headingStyles (text heading)
            , link
                [ Font.color colors.gray
                , Font.center
                , width (px (rem 2))
                , centerX
                ]
                { url = "#/" ++ to ++ "/" ++ from, label = html <| Icons.swap (ts 2) }
            ]
        ]
            ++ List.map (trainRow model ( from, to )) rightDirection


trainRow :
    { a | zone : Time.Zone, stations : Stations, currentTime : Posix }
    -> ( String, String )
    -> Train
    -> Element msg
trainRow { zone, stations, currentTime } ( from, to ) train =
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
                |> Maybe.map (\date -> Time.posixToMillis date - Time.posixToMillis currentTime)
                |> Maybe.andThen
                    (\timeDiff ->
                        if timeDiff > 0 then
                            Just (prettyMinutes timeDiff)

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
            row
                [ Font.size (ts -1)
                , Font.center
                , centerX
                ]
                [ el
                    [ Font.center
                    , Font.bold
                    , Font.color (timelinessColor n)
                    ]
                    (text (formatDifference "On time" station.differenceInMinutes))
                ]
    in
    row
        [ Background.color colors.white
        , shadow
        , paddingXY (rem 1) (rem 0.5)
        , spacing (rem 1)
        , centerY
        , width fill
        ]
        [ column
            [ width (px (rem 2)) ]
            [ paragraph
                ([ Font.size (ts 3)
                 , Font.bold
                 , Font.center
                 , Element.spacing 1
                 , Font.color colors.gray
                 ]
                    ++ (if isMoving then
                            [ Font.color colors.black ]

                        else
                            []
                       )
                )
                [ text train.lineId ]
            ]
        , column
            [ width fill ]
            [ whenJust homeStationDeparture (stationRow zone stations)
            , el [ width (px timeWidth) ] (text "︙")
            , whenJust endStation (stationRow zone stations)
            ]
        , column
            []
            [ whenJust homeStationArrivingIn <|
                \time ->
                    el
                        [ Font.size (ts -1)
                        , Font.center
                        , Font.bold
                        , Font.color colors.gray
                        ]
                        (text "Arrives in")
            , whenJust homeStationArrivingIn <|
                \time ->
                    paragraph
                        [ Font.size (ts 2)
                        , Font.center
                        , Element.spacing 1
                        , Font.color colors.gray
                        ]
                        [ text time ]
            , whenJust currentStation statusInfo
            ]
        ]


stationRow : Time.Zone -> Stations -> TimetableRow -> Element msg
stationRow zone stations station =
    let
        name =
            stationName stations station.stationShortCode
    in
    row
        [ spacing (rem 0.5) ]
        [ case ( station.liveEstimateTime, station.differenceInMinutes ) of
            ( Just estimate, Just n ) ->
                column
                    [ width (px timeWidth)
                    , Font.color (timelinessColor n)
                    ]
                    [ text <| prettyTime zone estimate
                    , if n /= 0 then
                        el
                            [ Font.color colors.gray
                            , Font.strike
                            , Font.size (ts -1)
                            ]
                            (text <| prettyTime zone station.scheduledTime)

                      else
                        text ""
                    ]

            _ ->
                el [ width (px timeWidth) ] (text <| prettyTime zone station.scheduledTime)
        , el [] (text name)
        ]


timeWidth : Int
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
                Just (String.fromInt (abs n) ++ " min early")

            else
                Just (String.fromInt n ++ " min late")
    in
    differenceInMinutes
        |> Maybe.andThen stringify
        |> Maybe.withDefault default


prettyMinutes : Int -> String
prettyMinutes timeDiff =
    let
        rawSecs =
            timeDiff // 1000

        minutes =
            rawSecs // 60 |> modBy 60

        seconds =
            rawSecs |> modBy 60
    in
    String.fromInt minutes ++ ":" ++ String.fromInt seconds


prettyTime : Time.Zone -> Posix -> String
prettyTime =
    DateFormat.format
        [ DateFormat.hourMilitaryNumber
        , DateFormat.text ":"
        , DateFormat.minuteFixed
        ]
