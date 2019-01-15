module Example exposing (suite)

import Expect exposing (Expectation)
import Fuzz exposing (Fuzzer, int, list, string)
import Model exposing (..)
import Test exposing (..)
import Time exposing (millisToPosix)


suite : Test
suite =
    describe "TrainRaw -> Train transformation"
        [ describe "Home station departure"
            [ test "I train " <|
                \_ ->
                    Expect.equal (Just (millisToPosix 1547499810000))
                        (trainI |> Maybe.map (.homeStationDeparture >> .scheduledTime))
            , test "N train " <|
                \_ ->
                    Expect.equal (Just (millisToPosix 1547498460000))
                        (trainN |> Maybe.map (.homeStationDeparture >> .scheduledTime))
            ]
        , describe "Current station"
            [ test "I train is at HVK" <|
                \_ ->
                    Expect.equal (Just "HVK")
                        (trainI
                            |> Maybe.map .currentStation
                            |> Maybe.andThen identity
                            |> Maybe.map .stationShortCode
                        )
            , test "N train is at TKL" <|
                \_ ->
                    Expect.equal (Just "TKL")
                        (trainN
                            |> Maybe.map .currentStation
                            |> Maybe.andThen identity
                            |> Maybe.map .stationShortCode
                        )
            ]
        ]


trainI =
    toTrain { from = "PSL", to = "HKI" } trainRawI


trainN =
    toTrain { from = "PSL", to = "HKI" } trainRawN


currentTime =
    millisToPosix 1547497685894


trainRawI =
    { cancelled = False
    , lineId = "I"
    , runningCurrently = True
    , timetableRows =
        [ { actualTime = Just (millisToPosix 1547496368000), differenceInMinutes = Just 0, liveEstimateTime = Nothing, rowType = Departure, scheduledTime = millisToPosix 1547496360000, stationShortCode = "HKI", stationUICCode = 1, track = Just "1", trainStopping = True }
        , { actualTime = Just (millisToPosix 1547496566000), differenceInMinutes = Just 0, liveEstimateTime = Nothing, rowType = Arrival, scheduledTime = millisToPosix 1547496564000, stationShortCode = "PSL", stationUICCode = 10, track = Just "2", trainStopping = True }
        , { actualTime = Just (millisToPosix 1547496597000), differenceInMinutes = Just 0, liveEstimateTime = Nothing, rowType = Departure, scheduledTime = millisToPosix 1547496612000, stationShortCode = "PSL", stationUICCode = 10, track = Just "2", trainStopping = True }
        , { actualTime = Just (millisToPosix 1547496757000), differenceInMinutes = Just 0, liveEstimateTime = Nothing, rowType = Arrival, scheduledTime = millisToPosix 1547496762000, stationShortCode = "KÄP", stationUICCode = 977, track = Just "3", trainStopping = True }
        , { actualTime = Just (millisToPosix 1547496784000), differenceInMinutes = Just 0, liveEstimateTime = Nothing, rowType = Departure, scheduledTime = millisToPosix 1547496780000, stationShortCode = "KÄP", stationUICCode = 977, track = Just "3", trainStopping = True }
        , { actualTime = Just (millisToPosix 1547496877000), differenceInMinutes = Just 0, liveEstimateTime = Nothing, rowType = Arrival, scheduledTime = millisToPosix 1547496876000, stationShortCode = "OLK", stationUICCode = 15, track = Just "3", trainStopping = True }
        , { actualTime = Just (millisToPosix 1547496903000), differenceInMinutes = Just 0, liveEstimateTime = Nothing, rowType = Departure, scheduledTime = millisToPosix 1547496900000, stationShortCode = "OLK", stationUICCode = 15, track = Just "3", trainStopping = True }
        , { actualTime = Just (millisToPosix 1547497017000), differenceInMinutes = Just 0, liveEstimateTime = Nothing, rowType = Arrival, scheduledTime = millisToPosix 1547497008000, stationShortCode = "PMK", stationUICCode = 551, track = Just "3", trainStopping = True }
        , { actualTime = Just (millisToPosix 1547497031000), differenceInMinutes = Just 0, liveEstimateTime = Nothing, rowType = Departure, scheduledTime = millisToPosix 1547497032000, stationShortCode = "PMK", stationUICCode = 551, track = Just "3", trainStopping = True }
        , { actualTime = Just (millisToPosix 1547497122000), differenceInMinutes = Just 0, liveEstimateTime = Nothing, rowType = Arrival, scheduledTime = millisToPosix 1547497116000, stationShortCode = "ML", stationUICCode = 17, track = Just "3", trainStopping = True }
        , { actualTime = Just (millisToPosix 1547497142000), differenceInMinutes = Just 0, liveEstimateTime = Nothing, rowType = Departure, scheduledTime = millisToPosix 1547497146000, stationShortCode = "ML", stationUICCode = 17, track = Just "3", trainStopping = True }
        , { actualTime = Just (millisToPosix 1547497229000), differenceInMinutes = Just 0, liveEstimateTime = Nothing, rowType = Arrival, scheduledTime = millisToPosix 1547497248000, stationShortCode = "TNA", stationUICCode = 552, track = Just "3", trainStopping = True }
        , { actualTime = Just (millisToPosix 1547497270000), differenceInMinutes = Just 0, liveEstimateTime = Nothing, rowType = Departure, scheduledTime = millisToPosix 1547497266000, stationShortCode = "TNA", stationUICCode = 552, track = Just "3", trainStopping = True }
        , { actualTime = Just (millisToPosix 1547497368000), differenceInMinutes = Just 0, liveEstimateTime = Nothing, rowType = Arrival, scheduledTime = millisToPosix 1547497362000, stationShortCode = "PLA", stationUICCode = 553, track = Just "3", trainStopping = True }
        , { actualTime = Just (millisToPosix 1547497385000), differenceInMinutes = Just 0, liveEstimateTime = Nothing, rowType = Departure, scheduledTime = millisToPosix 1547497392000, stationShortCode = "PLA", stationUICCode = 553, track = Just "3", trainStopping = True }
        , { actualTime = Just (millisToPosix 1547497515000), differenceInMinutes = Just 1, liveEstimateTime = Nothing, rowType = Arrival, scheduledTime = millisToPosix 1547497470000, stationShortCode = "TKL", stationUICCode = 18, track = Just "4", trainStopping = True }
        , { actualTime = Just (millisToPosix 1547497515000), differenceInMinutes = Just 0, liveEstimateTime = Nothing, rowType = Departure, scheduledTime = millisToPosix 1547497500000, stationShortCode = "TKL", stationUICCode = 18, track = Just "4", trainStopping = True }
        , { actualTime = Just (millisToPosix 1547497605000), differenceInMinutes = Just 0, liveEstimateTime = Nothing, rowType = Arrival, scheduledTime = millisToPosix 1547497584000, stationShortCode = "HKH", stationUICCode = 556, track = Just "3", trainStopping = True }
        , { actualTime = Just (millisToPosix 1547497615000), differenceInMinutes = Just 0, liveEstimateTime = Nothing, rowType = Departure, scheduledTime = millisToPosix 1547497620000, stationShortCode = "HKH", stationUICCode = 556, track = Just "3", trainStopping = True }
        , { actualTime = Just (millisToPosix 1547497696000), differenceInMinutes = Just 1, liveEstimateTime = Nothing, rowType = Arrival, scheduledTime = millisToPosix 1547497650000, stationShortCode = "HVK", stationUICCode = 1334, track = Just "", trainStopping = False }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547497646000), rowType = Departure, scheduledTime = millisToPosix 1547497650000, stationShortCode = "HVK", stationUICCode = 1334, track = Just "", trainStopping = False }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547497740000), rowType = Arrival, scheduledTime = millisToPosix 1547497740000, stationShortCode = "ASO", stationUICCode = 1340, track = Just "", trainStopping = False }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547497740000), rowType = Departure, scheduledTime = millisToPosix 1547497740000, stationShortCode = "ASO", stationUICCode = 1340, track = Just "", trainStopping = False }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547497776000), rowType = Arrival, scheduledTime = millisToPosix 1547497776000, stationShortCode = "LNÄ", stationUICCode = 1333, track = Just "2", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547497800000), rowType = Departure, scheduledTime = millisToPosix 1547497800000, stationShortCode = "LNÄ", stationUICCode = 1333, track = Just "2", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547497980000), rowType = Arrival, scheduledTime = millisToPosix 1547497980000, stationShortCode = "LEN", stationUICCode = 1332, track = Just "2", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547498040000), rowType = Departure, scheduledTime = millisToPosix 1547498040000, stationShortCode = "LEN", stationUICCode = 1332, track = Just "2", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547498070000), rowType = Arrival, scheduledTime = millisToPosix 1547498070000, stationShortCode = "VMS", stationUICCode = 1339, track = Just "", trainStopping = False }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547498070000), rowType = Departure, scheduledTime = millisToPosix 1547498070000, stationShortCode = "VMS", stationUICCode = 1339, track = Just "", trainStopping = False }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547498118000), rowType = Arrival, scheduledTime = millisToPosix 1547498118000, stationShortCode = "AVP", stationUICCode = 1331, track = Just "2", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547498160000), rowType = Departure, scheduledTime = millisToPosix 1547498160000, stationShortCode = "AVP", stationUICCode = 1331, track = Just "2", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547498340000), rowType = Arrival, scheduledTime = millisToPosix 1547498340000, stationShortCode = "RSM", stationUICCode = 1338, track = Just "", trainStopping = False }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547498340000), rowType = Departure, scheduledTime = millisToPosix 1547498340000, stationShortCode = "RSM", stationUICCode = 1338, track = Just "", trainStopping = False }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547498418000), rowType = Arrival, scheduledTime = millisToPosix 1547498418000, stationShortCode = "KTÖ", stationUICCode = 1330, track = Just "2", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547498460000), rowType = Departure, scheduledTime = millisToPosix 1547498460000, stationShortCode = "KTÖ", stationUICCode = 1330, track = Just "2", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547498574000), rowType = Arrival, scheduledTime = millisToPosix 1547498574000, stationShortCode = "VEH", stationUICCode = 1337, track = Just "2", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547498592000), rowType = Departure, scheduledTime = millisToPosix 1547498592000, stationShortCode = "VEH", stationUICCode = 1337, track = Just "2", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547498664000), rowType = Arrival, scheduledTime = millisToPosix 1547498664000, stationShortCode = "VKS", stationUICCode = 839, track = Just "2", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547498700000), rowType = Departure, scheduledTime = millisToPosix 1547498700000, stationShortCode = "VKS", stationUICCode = 839, track = Just "2", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547498727000), rowType = Arrival, scheduledTime = millisToPosix 1547498727000, stationShortCode = "LAV", stationUICCode = 1341, track = Just "", trainStopping = False }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547498727000), rowType = Departure, scheduledTime = millisToPosix 1547498727000, stationShortCode = "LAV", stationUICCode = 1341, track = Just "", trainStopping = False }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547498760000), rowType = Arrival, scheduledTime = millisToPosix 1547498760000, stationShortCode = "MRL", stationUICCode = 662, track = Just "2", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547498784000), rowType = Departure, scheduledTime = millisToPosix 1547498784000, stationShortCode = "MRL", stationUICCode = 662, track = Just "2", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547498844000), rowType = Arrival, scheduledTime = millisToPosix 1547498844000, stationShortCode = "LOH", stationUICCode = 661, track = Just "2", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547498880000), rowType = Departure, scheduledTime = millisToPosix 1547498880000, stationShortCode = "LOH", stationUICCode = 661, track = Just "2", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547498952000), rowType = Arrival, scheduledTime = millisToPosix 1547498952000, stationShortCode = "MYR", stationUICCode = 660, track = Just "2", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547499000000), rowType = Departure, scheduledTime = millisToPosix 1547499000000, stationShortCode = "MYR", stationUICCode = 660, track = Just "2", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547499084000), rowType = Arrival, scheduledTime = millisToPosix 1547499084000, stationShortCode = "MLO", stationUICCode = 659, track = Just "2", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547499120000), rowType = Departure, scheduledTime = millisToPosix 1547499120000, stationShortCode = "MLO", stationUICCode = 659, track = Just "2", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547499210000), rowType = Arrival, scheduledTime = millisToPosix 1547499210000, stationShortCode = "KAN", stationUICCode = 658, track = Just "2", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547499240000), rowType = Departure, scheduledTime = millisToPosix 1547499240000, stationShortCode = "KAN", stationUICCode = 658, track = Just "2", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547499336000), rowType = Arrival, scheduledTime = millisToPosix 1547499336000, stationShortCode = "POH", stationUICCode = 657, track = Just "2", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547499360000), rowType = Departure, scheduledTime = millisToPosix 1547499360000, stationShortCode = "POH", stationUICCode = 657, track = Just "2", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547499462000), rowType = Arrival, scheduledTime = millisToPosix 1547499462000, stationShortCode = "HPL", stationUICCode = 72, track = Just "3", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547499540000), rowType = Departure, scheduledTime = millisToPosix 1547499540000, stationShortCode = "HPL", stationUICCode = 72, track = Just "3", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547499630000), rowType = Arrival, scheduledTime = millisToPosix 1547499630000, stationShortCode = "KHK", stationUICCode = 1028, track = Just "", trainStopping = False }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547499630000), rowType = Departure, scheduledTime = millisToPosix 1547499630000, stationShortCode = "KHK", stationUICCode = 1028, track = Just "", trainStopping = False }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547499660000), rowType = Arrival, scheduledTime = millisToPosix 1547499660000, stationShortCode = "ILA", stationUICCode = 9, track = Just "3", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547499678000), rowType = Departure, scheduledTime = millisToPosix 1547499678000, stationShortCode = "ILA", stationUICCode = 9, track = Just "3", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547499774000), rowType = Arrival, scheduledTime = millisToPosix 1547499774000, stationShortCode = "PSL", stationUICCode = 10, track = Just "8", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547499810000), rowType = Departure, scheduledTime = millisToPosix 1547499810000, stationShortCode = "PSL", stationUICCode = 10, track = Just "8", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547500080000), rowType = Arrival, scheduledTime = millisToPosix 1547500080000, stationShortCode = "HKI", stationUICCode = 1, track = Just "17", trainStopping = True }
        ]
    , trainCategory = "Commuter"
    , trainNumber = 9121
    }


trainRawN =
    { cancelled = False
    , lineId = "N"
    , runningCurrently = True
    , timetableRows =
        [ { actualTime = Just (millisToPosix 1547496735000), differenceInMinutes = Just 0, liveEstimateTime = Nothing, rowType = Departure, scheduledTime = millisToPosix 1547496720000, stationShortCode = "KE", stationUICCode = 20, track = Just "5", trainStopping = True }
        , { actualTime = Just (millisToPosix 1547496904000), differenceInMinutes = Just 0, liveEstimateTime = Nothing, rowType = Arrival, scheduledTime = millisToPosix 1547496882000, stationShortCode = "SAV", stationUICCode = 555, track = Just "4", trainStopping = True }
        , { actualTime = Just (millisToPosix 1547496924000), differenceInMinutes = Just 0, liveEstimateTime = Nothing, rowType = Departure, scheduledTime = millisToPosix 1547496900000, stationShortCode = "SAV", stationUICCode = 555, track = Just "4", trainStopping = True }
        , { actualTime = Just (millisToPosix 1547497078000), differenceInMinutes = Just 0, liveEstimateTime = Nothing, rowType = Arrival, scheduledTime = millisToPosix 1547497050000, stationShortCode = "KRS", stationUICCode = 19, track = Just "4", trainStopping = True }
        , { actualTime = Just (millisToPosix 1547497108000), differenceInMinutes = Just 0, liveEstimateTime = Nothing, rowType = Departure, scheduledTime = millisToPosix 1547497080000, stationShortCode = "KRS", stationUICCode = 19, track = Just "4", trainStopping = True }
        , { actualTime = Just (millisToPosix 1547497167000), differenceInMinutes = Just 0, liveEstimateTime = Nothing, rowType = Arrival, scheduledTime = millisToPosix 1547497146000, stationShortCode = "HNA", stationUICCode = 1018, track = Just "", trainStopping = False }
        , { actualTime = Just (millisToPosix 1547497167000), differenceInMinutes = Just 0, liveEstimateTime = Nothing, rowType = Departure, scheduledTime = millisToPosix 1547497146000, stationShortCode = "HNA", stationUICCode = 1018, track = Just "", trainStopping = False }
        , { actualTime = Just (millisToPosix 1547497226000), differenceInMinutes = Just 1, liveEstimateTime = Nothing, rowType = Arrival, scheduledTime = millisToPosix 1547497182000, stationShortCode = "RKL", stationUICCode = 554, track = Just "4", trainStopping = True }
        , { actualTime = Just (millisToPosix 1547497251000), differenceInMinutes = Just 1, liveEstimateTime = Nothing, rowType = Departure, scheduledTime = millisToPosix 1547497200000, stationShortCode = "RKL", stationUICCode = 554, track = Just "4", trainStopping = True }
        , { actualTime = Just (millisToPosix 1547497334000), differenceInMinutes = Just 2, liveEstimateTime = Nothing, rowType = Arrival, scheduledTime = millisToPosix 1547497236000, stationShortCode = "KVY", stationUICCode = 559, track = Just "4", trainStopping = True }
        , { actualTime = Just (millisToPosix 1547497357000), differenceInMinutes = Just 2, liveEstimateTime = Nothing, rowType = Departure, scheduledTime = millisToPosix 1547497260000, stationShortCode = "KVY", stationUICCode = 559, track = Just "4", trainStopping = True }
        , { actualTime = Just (millisToPosix 1547497434000), differenceInMinutes = Just 1, liveEstimateTime = Nothing, rowType = Arrival, scheduledTime = millisToPosix 1547497368000, stationShortCode = "HVK", stationUICCode = 1334, track = Just "", trainStopping = False }
        , { actualTime = Nothing, differenceInMinutes = Just 1, liveEstimateTime = Just (millisToPosix 1547497434000), rowType = Departure, scheduledTime = millisToPosix 1547497368000, stationShortCode = "HVK", stationUICCode = 1334, track = Just "", trainStopping = False }
        , { actualTime = Just (millisToPosix 1547497498000), differenceInMinutes = Just 1, liveEstimateTime = Nothing, rowType = Arrival, scheduledTime = millisToPosix 1547497422000, stationShortCode = "HKH", stationUICCode = 556, track = Just "4", trainStopping = True }
        , { actualTime = Just (millisToPosix 1547497510000), differenceInMinutes = Just 1, liveEstimateTime = Nothing, rowType = Departure, scheduledTime = millisToPosix 1547497440000, stationShortCode = "HKH", stationUICCode = 556, track = Just "4", trainStopping = True }
        , { actualTime = Just (millisToPosix 1547497620000), differenceInMinutes = Just 2, liveEstimateTime = Nothing, rowType = Arrival, scheduledTime = millisToPosix 1547497530000, stationShortCode = "TKL", stationUICCode = 18, track = Just "6", trainStopping = True }
        , { actualTime = Just (millisToPosix 1547497632000), differenceInMinutes = Just 1, liveEstimateTime = Nothing, rowType = Departure, scheduledTime = millisToPosix 1547497560000, stationShortCode = "TKL", stationUICCode = 18, track = Just "6", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 1, liveEstimateTime = Just (millisToPosix 1547497749000), rowType = Arrival, scheduledTime = millisToPosix 1547497650000, stationShortCode = "PLA", stationUICCode = 553, track = Just "4", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 1, liveEstimateTime = Just (millisToPosix 1547497779000), rowType = Departure, scheduledTime = millisToPosix 1547497680000, stationShortCode = "PLA", stationUICCode = 553, track = Just "4", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 1, liveEstimateTime = Just (millisToPosix 1547497870000), rowType = Arrival, scheduledTime = millisToPosix 1547497782000, stationShortCode = "TNA", stationUICCode = 552, track = Just "4", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 1, liveEstimateTime = Just (millisToPosix 1547497888000), rowType = Departure, scheduledTime = millisToPosix 1547497800000, stationShortCode = "TNA", stationUICCode = 552, track = Just "4", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 1, liveEstimateTime = Just (millisToPosix 1547497985000), rowType = Arrival, scheduledTime = millisToPosix 1547497890000, stationShortCode = "ML", stationUICCode = 17, track = Just "4", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 1, liveEstimateTime = Just (millisToPosix 1547498015000), rowType = Departure, scheduledTime = millisToPosix 1547497920000, stationShortCode = "ML", stationUICCode = 17, track = Just "4", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 1, liveEstimateTime = Just (millisToPosix 1547498096000), rowType = Arrival, scheduledTime = millisToPosix 1547498016000, stationShortCode = "PMK", stationUICCode = 551, track = Just "4", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 1, liveEstimateTime = Just (millisToPosix 1547498120000), rowType = Departure, scheduledTime = millisToPosix 1547498040000, stationShortCode = "PMK", stationUICCode = 551, track = Just "4", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 1, liveEstimateTime = Just (millisToPosix 1547498232000), rowType = Arrival, scheduledTime = millisToPosix 1547498136000, stationShortCode = "OLK", stationUICCode = 15, track = Just "4", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 1, liveEstimateTime = Just (millisToPosix 1547498256000), rowType = Departure, scheduledTime = millisToPosix 1547498160000, stationShortCode = "OLK", stationUICCode = 15, track = Just "4", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 1, liveEstimateTime = Just (millisToPosix 1547498340000), rowType = Arrival, scheduledTime = millisToPosix 1547498262000, stationShortCode = "KÄP", stationUICCode = 977, track = Just "4", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 1, liveEstimateTime = Just (millisToPosix 1547498358000), rowType = Departure, scheduledTime = millisToPosix 1547498280000, stationShortCode = "KÄP", stationUICCode = 977, track = Just "4", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 1, liveEstimateTime = Just (millisToPosix 1547498491000), rowType = Arrival, scheduledTime = millisToPosix 1547498412000, stationShortCode = "PSL", stationUICCode = 10, track = Just "1", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 1, liveEstimateTime = Just (millisToPosix 1547498539000), rowType = Departure, scheduledTime = millisToPosix 1547498460000, stationShortCode = "PSL", stationUICCode = 10, track = Just "1", trainStopping = True }
        , { actualTime = Nothing, differenceInMinutes = Just 0, liveEstimateTime = Just (millisToPosix 1547498767000), rowType = Arrival, scheduledTime = millisToPosix 1547498760000, stationShortCode = "HKI", stationUICCode = 1, track = Just "4", trainStopping = True }
        ]
    , trainCategory = "Commuter"
    , trainNumber = 9598
    }
