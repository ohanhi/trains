module View exposing (Msg(..), view)

import Browser exposing (Document, UrlRequest)
import DateFormat
import Dict
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events
import Http
import Icons
import Json.Decode
import Model exposing (..)
import RemoteData exposing (RemoteData(..), WebData)
import Stations
import Time exposing (Posix)
import Translations exposing (..)
import Url exposing (Url)
import Url.Parser


type Msg
    = UpdateTime Posix
    | TimeZoneResponse Time.Zone
    | TrainsResponse (WebData Trains)
    | StationsResponse (WebData Stations)
    | TrainWagonCountsResponse (WebData TrainWagonCounts)
    | UrlChange Url
    | LinkClicked UrlRequest
    | SetLanguage Language


rem : Float -> Float
rem x =
    x * 16


ts : Int -> Float
ts scale =
    1.33 ^ toFloat scale * 16


tsPx : Int -> String
tsPx scale =
    String.fromFloat (ts scale) ++ "px"


whenJust : Maybe a -> (a -> Html msg) -> Html msg
whenJust value toHtml =
    case value of
        Just a ->
            toHtml a

        Nothing ->
            text ""


timelinessColor difference =
    if abs difference <= 1 then
        "onTime"

    else if abs difference <= 5 then
        "slightlyOffSchedule"

    else
        "offSchedule"


view : Model -> Document Msg
view model =
    let
        t =
            translate model.language
    in
    case model.route of
        SelectDepRoute ->
            selectDepPage t model

        SelectDestRoute dep ->
            selectDestPage t model dep

        ScheduleRoute from to ->
            schedulePage t model ( from, to )


container : Language -> Maybe String -> List (Html Msg) -> List (Html Msg)
container language headingText elements =
    let
        heading =
            case headingText of
                Just string ->
                    [ header [] [ h1 [] [ text string ] ] ]

                Nothing ->
                    []
    in
    [ div [ class "container" ] (languageSelect language :: (heading ++ elements))
    , htmlTranslate language PageFooter
    ]


languageSelect : Language -> Html Msg
languageSelect currentLanguage =
    let
        optionAttrs lang =
            [ value (languageToString lang)
            , Html.Events.onClick (SetLanguage lang)
            , class
                (if currentLanguage == lang then
                    "is-current"

                 else
                    ""
                )
            ]
    in
    allLanguages
        |> List.map (\lang -> button (optionAttrs lang) [ text (languageToString lang) ])
        |> div [ class "language-select" ]


selectDepPage : T -> Model -> Document Msg
selectDepPage t model =
    { title = t DepPageTitle
    , body =
        container model.language
            (Just (t DepPageHeading))
            [ ul [ class "stations" ] <|
                List.map
                    (\( abbr, name ) ->
                        li [] [ a [ href ("#/" ++ abbr) ] [ text name ] ]
                    )
                    Stations.all
            ]
    }


selectDestPage : T -> Model -> String -> Document Msg
selectDestPage t model dep =
    let
        url dest =
            "#/" ++ dep ++ "/" ++ dest

        linkText dest =
            Stations.findName dep
                |> Maybe.map (\name -> name ++ "–" ++ dest)
                |> Maybe.withDefault dest
    in
    { title = t DestPageTitle
    , body =
        container model.language
            (Just (t DestPageHeading))
            [ ul [ class "stations" ] <|
                List.map
                    (\( abbr, name ) ->
                        li [] [ a [ href (url abbr) ] [ text (linkText name) ] ]
                    )
                    (Stations.matching dep)
            ]
    }


schedulePage : T -> Model -> ( String, String ) -> Document Msg
schedulePage t model ( from, to ) =
    let
        heading =
            stationName model.stations from ++ "—" ++ stationName model.stations to

        tText =
            text << t
    in
    { title = heading ++ " – Trains.today"
    , body =
        container model.language
            Nothing
            [ case model.trains of
                Success trains ->
                    trainsView t model ( from, to ) heading trains

                Failure err ->
                    div
                        []
                        [ case err of
                            Http.NetworkError ->
                                tText ErrorNetwork

                            Http.Timeout ->
                                tText ErrorTimeout

                            Http.BadUrl url ->
                                tText ErrorBadUrl

                            Http.BadStatus status ->
                                tText ErrorBadStatus

                            Http.BadBody _ ->
                                tText ErrorBadPayload
                        ]

                Loading ->
                    header [] [ tText SchedulePageLoading ]

                _ ->
                    text ""
            ]
    }


trainsView : T -> Model -> ( String, String ) -> String -> Trains -> Html msg
trainsView t model ( from, to ) heading trains =
    let
        rightDirection =
            trains
                |> Model.sortedTrainList

        longestDuration =
            rightDirection
                |> List.map .durationMinutes
                |> List.maximum
                |> Maybe.withDefault 120
    in
    div [ class "trains" ] <|
        [ header []
            [ a
                [ class "back-link", href "#/" ]
                [ text "‹" ]
            , h1 [] [ text heading ]
            , a
                [ class "swap-link", href ("#/" ++ to ++ "/" ++ from) ]
                [ Icons.swap ]
            ]
        , main_ [] (List.map (trainRow t model ( from, to ) longestDuration) rightDirection)
        , div [ class "trains-end-of-list" ] [ text (t SchedulePageEndOfListNote) ]
        ]


type ArrivalEstimate
    = LiveEstimate String
    | ScheduleEstimate String


trainRow : T -> Model -> ( String, String ) -> Int -> Train -> Html msg
trainRow t { zone, stations, wagonCounts, currentTime } ( from, to ) longestDuration train =
    let
        tText =
            t >> text

        homeStationArrivingIn =
            train.homeStationArrival
                |> Maybe.andThen prettyBestEstimateFor

        homeStationDepartingIn =
            prettyBestEstimateFor train.homeStationDeparture

        prettyBestEstimateFor timetableRow =
            case timetableRow.liveEstimateTime of
                Just estimate ->
                    prettyDiff estimate
                        |> Maybe.map LiveEstimate

                Nothing ->
                    prettyDiff timetableRow.scheduledTime
                        |> Maybe.map ScheduleEstimate

        prettyDiff date =
            (Time.posixToMillis date - Time.posixToMillis currentTime)
                |> Basics.max 0
                |> (\millis ->
                        if millis < minutesToMillis 30 then
                            Just (prettyMinutes (Time.millisToPosix millis))

                        else
                            Nothing
                   )

        statusInfoBadge =
            case ( train.cancelled, train.currentStation ) of
                ( False, Just station ) ->
                    div
                        [ class "train-status-badge"
                        , class ("is-" ++ timelinessColor station.differenceInMinutes)
                        ]
                        [ { minuteDiff = station.differenceInMinutes
                          , stationName = stationName stations station.stationShortCode
                          }
                            |> SchedulePageTimeDifference
                            |> tText
                        , wagonCount
                        ]

                ( False, Nothing ) ->
                    div [ class "train-status-badge" ] [ tText SchedulePageNotMoving, wagonCount ]

                ( True, _ ) ->
                    div [ class "train-status-badge is-cancelled" ] [ tText SchedulePageCancelled, wagonCount ]

        wagonCount =
            Dict.get train.trainNumber wagonCounts
                |> Maybe.withDefault 0
                |> (\count ->
                        div [ class "train-wagon-count" ] (List.repeat count Icons.wagon)
                   )
    in
    div [ class "train" ]
        [ div [ class "train-content" ]
            [ div [ classList [ ( "train-name", True ), ( "is-running", train.runningCurrently ) ] ]
                [ text train.lineId ]
            , div [ class "train-stations" ]
                [ stationRow zone stations train.homeStationDeparture
                , div [ class "train-stations-row" ]
                    [ div [ class "train-stations-separator" ]
                        [ text "︙" ]
                    , div [ class "train-stations-duration" ]
                        [ tText
                            (SchedulePageJourneyDuration { durationMinutes = train.durationMinutes, stopsBetween = train.stopsBetween })
                        ]
                    ]
                , stationRow zone stations train.endStationArrival
                ]
            , div [ class "train-status" ] <|
                case ( train.cancelled, homeStationArrivingIn, homeStationDepartingIn ) of
                    ( False, Just estimate, _ ) ->
                        [ div [ class "train-status-arriving" ]
                            [ tText SchedulePageArrivesIn ]
                        , div [ class "train-status-time" ]
                            [ case estimate of
                                LiveEstimate time ->
                                    text time

                                ScheduleEstimate time ->
                                    text ("~" ++ time)
                            ]
                        ]

                    ( False, _, Just estimate ) ->
                        [ div [ class "train-status-arriving" ]
                            [ tText SchedulePageDepartsIn ]
                        , div [ class "train-status-time" ]
                            [ case estimate of
                                LiveEstimate time ->
                                    text time

                                ScheduleEstimate time ->
                                    text ("~" ++ time)
                            ]
                        ]

                    _ ->
                        []
            ]
        , statusInfoBadge
        ]


minutesToMillis : Int -> Int
minutesToMillis minutes =
    minutes * 60000


stationRow : Time.Zone -> Stations -> TimetableRow -> Html msg
stationRow zone stations station =
    let
        name =
            stationName stations station.stationShortCode
    in
    div
        [ class "train-stations-row" ]
        [ case ( station.liveEstimateTime, station.differenceInMinutes ) of
            ( Just estimate, Just n ) ->
                div
                    [ class "train-stations-estimate" ]
                    [ div
                        [ class "train-stations-estimate-time"
                        , class ("is-" ++ timelinessColor n)
                        ]
                        [ text <| prettyTime zone estimate ]
                    , if n /= 0 then
                        div [ class "train-stations-scheduled-inaccurate" ]
                            [ text <| prettyTime zone station.scheduledTime ]

                      else
                        text ""
                    ]

            _ ->
                div [ class "train-stations-estimate" ]
                    [ text <| prettyTime zone station.scheduledTime ]
        , div [ class "train-stations-name" ] [ text name ]
        , div [ class "train-stations-track" ] [ text (Maybe.withDefault "" station.track) ]
        ]


stationName : Stations -> String -> String
stationName stations shortCode =
    stations
        |> Dict.get shortCode
        |> Maybe.withDefault shortCode


prettyMinutes : Posix -> String
prettyMinutes posix =
    let
        formatted =
            DateFormat.format
                [ DateFormat.minuteNumber
                , DateFormat.text ":"
                , DateFormat.secondFixed
                ]
                Time.utc
                posix
    in
    formatted


prettyTime : Time.Zone -> Posix -> String
prettyTime =
    DateFormat.format
        [ DateFormat.hourMilitaryNumber
        , DateFormat.text "."
        , DateFormat.minuteFixed
        ]
