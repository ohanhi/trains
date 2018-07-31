module Stations exposing (all, findName, matching)

import Dict
import Tuple exposing (pair)


type alias StationList =
    List ( String, String )


all : StationList
all =
    commuterStations
        |> List.concat
        |> Dict.fromList
        |> Dict.toList


findName : String -> Maybe String
findName abbreviation =
    commuterStations
        |> List.concat
        |> Dict.fromList
        |> Dict.get abbreviation


matching : String -> StationList
matching abbreviation =
    commuterStations
        |> List.filter
            (\track ->
                track
                    |> List.filter (\( abbr, name ) -> abbreviation == abbr)
                    |> List.head
                    |> Maybe.map (\_ -> True)
                    |> Maybe.withDefault False
            )
        |> List.concat
        |> Dict.fromList
        |> Dict.remove abbreviation
        |> Dict.toList


commuterStations : List StationList
commuterStations =
    [ common ++ directionSiuntio
    , common ++ ringTrackCW
    , common ++ directionTampere
    , common ++ directionLahti
    ]


common : StationList
common =
    [ pair "HKI" "Helsinki"
    , pair "PSL" "Pasila"
    ]


directionSiuntio : StationList
directionSiuntio =
    [ pair "ILA" "Ilmala"
    , pair "HPL" "Huopalahti"
    , pair "VMO" "Valimo"
    , pair "PJM" "Pitäjänmäki"
    , pair "MÄK" "Mäkkylä"
    , pair "LPV" "Leppävaara"
    , pair "KIL" "Kilo"
    , pair "KEA" "Kera"
    , pair "KNI" "Kauniainen"
    , pair "KVH" "Koivuhovi"
    , pair "TRL" "Tuomarila"
    , pair "EPO" "Espoo"
    , pair "KLH" "Kauklahti"
    , pair "MAS" "Masala"
    , pair "JRS" "Jorvas"
    , pair "TOL" "Tolsa"
    , pair "KKN" "Kirkkonummi"
    , pair "STI" "Siuntio"
    ]


ringTrackCW : StationList
ringTrackCW =
    [ pair "ILA" "Ilmala"
    , pair "HPL" "Huopalahti"
    , pair "POH" "Pohjois-Haaga"
    , pair "KAN" "Kannelmäki"
    , pair "MLO" "Malminkartano"
    , pair "MYR" "Myyrmäki"
    , pair "LOH" "Louhela"
    , pair "MRL" "Martinlaakso"
    , pair "VKS" "Vantaankoski"
    , pair "VEH" "Vehkala"
    , pair "KTÖ" "Kivistö"
    , pair "AVP" "Aviapolis"
    , pair "LEN" "Lentoasema (Airport)"
    , pair "LNÄ" "Leinelä"
    , pair "HKH" "Hiekkaharju"
    , pair "TKL" "Tikkurila"
    , pair "PLA" "Puistola"
    , pair "TNA" "Tapanila"
    , pair "ML" "Malmi"
    , pair "PMK" "Pukinmäki"
    , pair "OLK" "Oulunkylä"
    , pair "KÄP" "Käpylä"
    ]


ringTrackCCW : StationList
ringTrackCCW =
    List.reverse ringTrackCW


directionTampere : StationList
directionTampere =
    [ pair "KÄP" "Käpylä"
    , pair "OLK" "Oulunkylä"
    , pair "PMK" "Pukinmäki"
    , pair "ML" "Malmi"
    , pair "TNA" "Tapanila"
    , pair "PLA" "Puistola"
    , pair "TKL" "Tikkurila"
    , pair "HKH" "Hiekkaharju"
    , pair "KVY" "Koivukylä"
    , pair "RKL" "Rekola"
    , pair "KRS" "Korso"
    , pair "SAV" "Savio"
    , pair "KE" "Kerava"
    , pair "AIN" "Ainola"
    , pair "JP" "Järvenpää"
    , pair "SAU" "Saunakallio"
    , pair "JK" "Jokela"
    , pair "HY" "Hyvinkää"
    , pair "RI" "Riihimäki"
    , pair "RY" "Ryttylä"
    , pair "TU" "Turenki"
    , pair "HL" "Hämeenlinna"
    , pair "PRL" "Parola"
    , pair "ITA" "Iittala"
    , pair "TL" "Toijala"
    , pair "VIA" "Viiala"
    , pair "LPÄ" "Lempäälä"
    , pair "TPE" "Tampere"
    ]


directionLahti : StationList
directionLahti =
    [ pair "KÄP" "Käpylä"
    , pair "OLK" "Oulunkylä"
    , pair "PMK" "Pukinmäki"
    , pair "ML" "Malmi"
    , pair "TNA" "Tapanila"
    , pair "PLA" "Puistola"
    , pair "TKL" "Tikkurila"
    , pair "HKH" "Hiekkaharju"
    , pair "KVY" "Koivukylä"
    , pair "RKL" "Rekola"
    , pair "KRS" "Korso"
    , pair "SAV" "Savio"
    , pair "KE" "Kerava"
    , pair "HAA" "Haarajoki"
    , pair "MLÄ" "Mäntsälä"
    , pair "HNN" "Henna"
    , pair "LH" "Lahti"
    ]
