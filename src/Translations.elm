module Translations exposing (Language(..), T, TranslationKey(..), translate)


type Language
    = Finnish
    | English


type alias T =
    TranslationKey -> String


type TranslationKey
    = DepPageTitle
    | DepPageHeading
    | DestPageTitle
    | DestPageHeading
    | ErrorNetwork
    | ErrorTimeout
    | ErrorBadUrl
    | ErrorBadStatus
    | ErrorBadPayload
    | SchedulePageLoading
    | SchedulePageArrivesIn
    | SchedulePageDepartsIn
    | SchedulePageTimeDifference { minuteDiff : Int, stationName : String }
    | SchedulePageNotMoving


type alias TranslationSet =
    { english : String
    , finnish : String
    }


translate : Language -> T
translate language translationKey =
    let
        translationSet =
            translationSetFor translationKey
    in
    case language of
        Finnish ->
            translationSet.finnish

        English ->
            translationSet.english


translationSetFor : TranslationKey -> TranslationSet
translationSetFor translationKey =
    case translationKey of
        DepPageTitle ->
            { english = "Trains.today - Helsinki region commuter trains"
            , finnish = "Trains.today - Helsingin seudun lähijunat"
            }

        DepPageHeading ->
            { english = "Select departure station"
            , finnish = "Valitse lähtöasema"
            }

        DestPageTitle ->
            { english = "Select destination – Trains.today"
            , finnish = "Valitse pääteasema – Trains.today"
            }

        DestPageHeading ->
            { english = "Select destination station"
            , finnish = "Valitse pääteasema"
            }

        ErrorNetwork ->
            { english = "No connection, trying again soon..."
            , finnish = "Ei yhteyttä, yritetään pian uudestaan..."
            }

        ErrorTimeout ->
            { english = "Network timed out"
            , finnish = "Vastaus aikakatkaistiin"
            }

        ErrorBadUrl ->
            { english = "It's not you, it's me. I have the server address wrong."
            , finnish = "Vika on minussa. Palvelimen osoite on väärä."
            }

        ErrorBadStatus ->
            { english = "The server didn't like the request (bad status)."
            , finnish = "Palvelin ei tykännyt pyynnöstä (virheellinen status)."
            }

        ErrorBadPayload ->
            { english = "Ouch, the server responded with strange contents."
            , finnish = "Auts, palvelin vastasi oudolla sisällöllä."
            }

        SchedulePageLoading ->
            { english = "Loading"
            , finnish = "Ladataan"
            }

        SchedulePageArrivesIn ->
            { english = "Arrives in"
            , finnish = "Saapumiseen"
            }

        SchedulePageDepartsIn ->
            { english = "Departs in"
            , finnish = "Lähtöön"
            }

        SchedulePageTimeDifference facts ->
            timeDifferenceTranslationSet facts

        SchedulePageNotMoving ->
            { english = "Not moving"
            , finnish = "Ei liikenteessä"
            }


timeDifferenceTranslationSet : { minuteDiff : Int, stationName : String } -> TranslationSet
timeDifferenceTranslationSet { minuteDiff, stationName } =
    let
        absDiff =
            abs minuteDiff

        absDiffString =
            String.fromInt absDiff
    in
    if absDiff <= 1 then
        { english = "On time in " ++ stationName
        , finnish = "Ajallaan " ++ finnishInessive stationName
        }

    else if minuteDiff < 0 then
        { english = absDiffString ++ " min early in " ++ stationName
        , finnish = absDiffString ++ " min ajoissa " ++ finnishInessive stationName
        }

    else
        { english = absDiffString ++ " min late in " ++ stationName
        , finnish = absDiffString ++ " min myöhässä " ++ finnishInessive stationName
        }


finnishInessive : String -> String
finnishInessive stationName =
    -- TODO
    "- " ++ stationName
