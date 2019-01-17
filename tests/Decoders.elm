module Decoders exposing (suite)

import Dict
import Expect exposing (Expectation)
import Fuzz exposing (Fuzzer, int, list, string)
import Json.Decode
import Model
import Test exposing (..)
import TestData
import Time


timestamp =
    Time.millisToPosix 1547708964003


suite : Test
suite =
    describe "JSON Decoders"
        [ test "Decoding succeeds" <|
            \_ -> Expect.ok decoded
        , test "Has trains" <|
            expectTrains (Dict.size >> Expect.greaterThan 1)
        , test "Trains' line ids" <|
            expectAllTrains "Line ids are single letter" <|
                \{ lineId } -> String.length lineId == 1
        , test "Trains' home and end stations are correct" <|
            expectAllTrains "Home is LPV, end is PSL" <|
                \{ homeStationDeparture, endStationArrival } ->
                    (homeStationDeparture.stationShortCode == "LPV")
                        && (endStationArrival.stationShortCode == "PSL")
        , test "Trains stop first at dep, then at dest" <|
            expectAllTrains "Scheduled times with home < end" <|
                \{ homeStationDeparture, endStationArrival } ->
                    Time.posixToMillis homeStationDeparture.scheduledTime
                        < Time.posixToMillis endStationArrival.scheduledTime
        , describe "Accuracy of data"
            [ case decoded of
                Err _ ->
                    test "Decoding has failed" (\_ -> Expect.fail "Yes")

                Ok trains ->
                    case Model.sortedTrainList trains of
                        first :: second :: third :: rest ->
                            Test.concat
                                [ test "First train is moving" <|
                                    \_ -> Expect.true "Is moving" first.runningCurrently
                                , test "First train is late" <|
                                    \_ -> Expect.equal (Just 4) first.homeStationDeparture.differenceInMinutes
                                , test "Second train is not moving" <|
                                    \_ -> Expect.false "Is not moving" second.runningCurrently
                                , test "Second train is on time" <|
                                    \_ -> Expect.equal Nothing second.homeStationDeparture.differenceInMinutes
                                , test "Third train is not moving" <|
                                    \_ -> Expect.false "Is not moving" third.runningCurrently
                                , test "Third train is late" <|
                                    \_ -> Expect.equal (Just 2) third.homeStationDeparture.differenceInMinutes
                                ]

                        _ ->
                            test "List doesn't have 3 trains" (\_ -> Expect.fail "Yes")
            ]
        ]


expectAllTrains : String -> (Model.Train -> Bool) -> () -> Expectation
expectAllTrains expString trainFn =
    expectTrains
        (\trains ->
            trains
                |> Dict.values
                |> List.all trainFn
                |> Expect.true ("All trains: " ++ expString)
        )


expectTrains : (Model.Trains -> Expectation) -> () -> Expectation
expectTrains =
    expectResult decoded


expectResult : Result e a -> (a -> Expectation) -> () -> Expectation
expectResult result exp _ =
    case result of
        Err err ->
            Expect.fail "Not an Ok result"

        Ok value ->
            exp value


decoded : Result Json.Decode.Error Model.Trains
decoded =
    Json.Decode.decodeString (Model.trainsDecoder { from = "LPV", to = "PSL" }) TestData.json
