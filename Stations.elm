module Stations exposing (all, findName, matching)

import Dict


(=>) : a -> b -> ( a, b )
(=>) =
    (,)


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
    [ "HKI" => "Helsinki"
    , "PSL" => "Pasila"
    ]


directionSiuntio : StationList
directionSiuntio =
    [ "ILA" => "Ilmala"
    , "HPL" => "Huopalahti"
    , "VMO" => "Valimo"
    , "PJM" => "Pitäjänmäki"
    , "MÄK" => "Mäkkylä"
    , "LPV" => "Leppävaara"
    , "KIL" => "Kilo"
    , "KEA" => "Kera"
    , "KNI" => "Kauniainen"
    , "KVH" => "Koivuhovi"
    , "TRL" => "Tuomarila"
    , "EPO" => "Espoo"
    , "KLH" => "Kauklahti"
    , "MAS" => "Masala"
    , "JRS" => "Jorvas"
    , "TOL" => "Tolsa"
    , "KKN" => "Kirkkonummi"
    , "STI" => "Siuntio"
    ]


ringTrackCW : StationList
ringTrackCW =
    [ "ILA" => "Ilmala"
    , "HPL" => "Huopalahti"
    , "POH" => "Pohjois-Haaga"
    , "KAN" => "Kannelmäki"
    , "MLO" => "Malminkartano"
    , "MYR" => "Myyrmäki"
    , "LOH" => "Louhela"
    , "MRL" => "Martinlaakso"
    , "VKS" => "Vantaankoski"
    , "VEH" => "Vehkala"
    , "KTÖ" => "Kivistö"
    , "AVP" => "Aviapolis"
    , "LEN" => "Lentoasema (Airport)"
    , "LNÄ" => "Leinelä"
    , "HKH" => "Hiekkaharju"
    , "TKL" => "Tikkurila"
    , "PLA" => "Puistola"
    , "TNA" => "Tapanila"
    , "ML" => "Malmi"
    , "PMK" => "Pukinmäki"
    , "OLK" => "Oulunkylä"
    , "KÄP" => "Käpylä"
    ]


ringTrackCCW : StationList
ringTrackCCW =
    List.reverse ringTrackCW


directionTampere : StationList
directionTampere =
    [ "KÄP" => "Käpylä"
    , "OLK" => "Oulunkylä"
    , "PMK" => "Pukinmäki"
    , "ML" => "Malmi"
    , "TNA" => "Tapanila"
    , "PLA" => "Puistola"
    , "TKL" => "Tikkurila"
    , "HKH" => "Hiekkaharju"
    , "KVY" => "Koivukylä"
    , "RKL" => "Rekola"
    , "KRS" => "Korso"
    , "SAV" => "Savio"
    , "KE" => "Kerava"
    , "AIN" => "Ainola"
    , "JP" => "Järvenpää"
    , "SAU" => "Saunakallio"
    , "JK" => "Jokela"
    , "HY" => "Hyvinkää"
    , "RI" => "Riihimäki"
    , "RY" => "Ryttylä"
    , "TU" => "Turenki"
    , "HL" => "Hämeenlinna"
    , "PRL" => "Parola"
    , "ITA" => "Iittala"
    , "TL" => "Toijala"
    , "VIA" => "Viiala"
    , "LPÄ" => "Lempäälä"
    , "TPE" => "Tampere"
    ]


directionLahti : StationList
directionLahti =
    [ "KÄP" => "Käpylä"
    , "OLK" => "Oulunkylä"
    , "PMK" => "Pukinmäki"
    , "ML" => "Malmi"
    , "TNA" => "Tapanila"
    , "PLA" => "Puistola"
    , "TKL" => "Tikkurila"
    , "HKH" => "Hiekkaharju"
    , "KVY" => "Koivukylä"
    , "RKL" => "Rekola"
    , "KRS" => "Korso"
    , "SAV" => "Savio"
    , "KE" => "Kerava"
    , "HAA" => "Haarajoki"
    , "MLÄ" => "Mäntsälä"
    , "HNN" => "Henna"
    , "LH" => "Lahti"
    ]
