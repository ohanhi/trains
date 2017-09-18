module Stations exposing (commuterStations)


(=>) : a -> b -> ( a, b )
(=>) =
    (,)


type alias StationList =
    List ( String, String )


commuterStations :
    { westTrack : StationList
    , ringTrackCW : StationList
    , eastTrack : StationList
    }
commuterStations =
    { westTrack = common ++ westTrack
    , ringTrackCW = common ++ ringTrackCW
    , eastTrack = common ++ eastTrack
    }


common : StationList
common =
    [ "HKI" => "Helsinki"
    , "PSL" => "Pasila"
    ]


westTrack : StationList
westTrack =
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


eastTrack : StationList
eastTrack =
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
    ]
