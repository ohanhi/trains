module Decoders exposing (suite)

import Dict
import Expect exposing (Expectation)
import Json.Decode
import Model
import Test exposing (..)
import TestData
import TestDataAirport
import Time


suite : Test
suite =
    describe "JSON Decoders"
        [ test "Decoding succeeds" <|
            \_ -> Expect.ok decoded
        , test "Has trains" <|
            expectTrains (Dict.size >> Expect.greaterThan 1)
        , test "Trains' line ids" <|
            expectAllTrains decoded "Line ids are single letter" <|
                \{ lineId } -> String.length lineId == 1
        , test "Trains' home and end stations are correct" <|
            expectAllTrains decoded "Home is LPV, end is PSL" <|
                \{ homeStationDeparture, endStationArrival } ->
                    (homeStationDeparture.stationShortCode == "LPV")
                        && (endStationArrival.stationShortCode == "PSL")
        , test "Trains stop first at dep, then at dest" <|
            expectAllTrains decoded "Scheduled times with home < end" <|
                \{ homeStationDeparture, endStationArrival } ->
                    Time.posixToMillis homeStationDeparture.scheduledTime
                        < Time.posixToMillis endStationArrival.scheduledTime
        , test "Trains continuing to airport are not via airport" <|
            expectAllTrains decodedHKItoTKL "From HKI to TKL, only P is via airport" <|
                \{ lineId, viaAirport } -> (lineId == "P") == viaAirport
        , describe "Airport is never between HKI and PSL"
            [ test "HKI to PSL" <|
                expectAllTrains decodedHKItoPSL "HKI to PSL is one hop" <|
                    \{ stopsBetween, durationMinutes, viaAirport } ->
                        (stopsBetween == 0)
                            && (durationMinutes < 10)
                            && not viaAirport
            , test "PSL to HKI has 0 stops between" <|
                expectAllTrains decodedPSLtoHKI "PSL to HKI is 0 stops" <|
                    \row -> row.stopsBetween == 0
            , test "PSL to HKI is fast" <|
                expectAllTrains decodedPSLtoHKI "PSL to HKI is < 10 minutes" <|
                    \row -> row.durationMinutes < 10
            , test "PSL to HKI is not via airport" <|
                expectAllTrains decodedPSLtoHKI "PSL to HKI is not via airport" <|
                    \row -> not row.viaAirport
            ]
        , describe "Accuracy of data"
            [ case decoded of
                Err _ ->
                    test "Decoding has failed" (\_ -> Expect.fail "Yes")

                Ok trains ->
                    case Model.sortedTrainList trains of
                        trainU1 :: trainA1 :: trainE :: trainA2 :: trainU2 :: rest ->
                            Test.concat
                                [ test "Trains are the expected lines" <|
                                    \_ ->
                                        Expect.equalLists [ "U", "A", "E", "A", "U" ]
                                            (List.map .lineId [ trainU1, trainA1, trainE, trainA2, trainU2 ])
                                , test "First train (U) is moving" <|
                                    \_ -> Expect.true "is not moving" trainU1.runningCurrently
                                , test "First train (U) is late" <|
                                    \_ -> Expect.equal (Just 4) trainU1.homeStationDeparture.differenceInMinutes
                                , test "Second train (A) is not moving" <|
                                    \_ -> Expect.false "is moving" trainA1.runningCurrently
                                , test "Second train (A) is cancelled" <|
                                    \_ -> Expect.true "is not cancelled" trainA1.cancelled
                                , test "Third train (E) is not moving" <|
                                    \_ -> Expect.false "is moving" trainE.runningCurrently
                                , test "Third train (E) is late" <|
                                    \_ -> Expect.equal (Just 2) trainE.homeStationDeparture.differenceInMinutes
                                , test "Fifth train (U) is moving" <|
                                    \_ -> Expect.true "is not moving" trainU2.runningCurrently
                                , test "Fifth train (U) is on time" <|
                                    \_ -> Expect.equal (Just 0) trainU2.homeStationDeparture.differenceInMinutes
                                ]

                        _ ->
                            test "List doesn't have enough trains" (\_ -> Expect.fail "Yes")
            ]
        ]


expectAllTrains : Result Json.Decode.Error Model.Trains -> String -> (Model.Train -> Bool) -> () -> Expectation
expectAllTrains decodedTrains expString trainFn =
    expectResult
        decodedTrains
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


decodedHKItoTKL : Result Json.Decode.Error Model.Trains
decodedHKItoTKL =
    Json.Decode.decodeString (Model.trainsDecoder { from = "HKI", to = "TKL" }) TestDataAirport.json


decodedHKItoPSL : Result Json.Decode.Error Model.Trains
decodedHKItoPSL =
    Json.Decode.decodeString (Model.trainsDecoder { from = "HKI", to = "PSL" }) TestDataAirport.json


decodedPSLtoHKI : Result Json.Decode.Error Model.Trains
decodedPSLtoHKI =
    Json.Decode.decodeString (Model.trainsDecoder { from = "PSL", to = "HKI" }) TestDataAirport.json
