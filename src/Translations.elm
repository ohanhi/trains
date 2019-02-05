module Translations exposing (HtmlTranslationKey(..), Language(..), T, TranslationKey(..), allLanguages, htmlTranslate, languageToString, stringToLanguage, translate)

import FinnishConjugation
import Html exposing (..)
import Html.Attributes exposing (..)


type Language
    = Finnish
    | English
    | Swedish


allLanguages : List Language
allLanguages =
    [ Finnish
    , English
    , Swedish
    ]


languageToString : Language -> String
languageToString language =
    case language of
        English ->
            "EN"

        Finnish ->
            "FI"

        Swedish ->
            "SV"


stringToLanguage : String -> Maybe Language
stringToLanguage string =
    case string of
        "EN" ->
            Just English

        "FI" ->
            Just Finnish

        "SV" ->
            Just Swedish

        _ ->
            Nothing


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
    | SchedulePageOvertakenBy { lineId : String, time : String, endStationName : String }
    | SchedulePageDepartsIn
    | SchedulePageTimeDifference { minuteDiff : Int, stationName : String }
    | SchedulePageTimeDifferenceNonStopping { minuteDiff : Int, prevStationName : String, nextStationName : String }
    | SchedulePageNotMoving
    | SchedulePageCancelled
    | SchedulePageEndOfListNote
    | SettingsPageTitle
    | SettingsPageHeading
    | SettingsPageSelectLanguage
    | SettingShowTrainsViaAirport


type alias TranslationSet =
    { english : String
    , finnish : String
    , swedish : String
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

        Swedish ->
            translationSet.swedish


translationSetFor : TranslationKey -> TranslationSet
translationSetFor translationKey =
    case translationKey of
        DepPageTitle ->
            { english = "Trains.today - Helsinki region commuter trains"
            , finnish = "Trains.today - Helsingin seudun lähijunat"
            , swedish = "Trains.today - Helsingfors regions närtåg"
            }

        DepPageHeading ->
            { english = "Select departure station"
            , finnish = "Valitse lähtöasema"
            , swedish = "Välj startstation"
            }

        DestPageTitle ->
            { english = "Select destination - Trains.today"
            , finnish = "Valitse pääteasema - Trains.today"
            , swedish = "Välj slutstation - Trains.today"
            }

        DestPageHeading ->
            { english = "Select destination station"
            , finnish = "Valitse pääteasema"
            , swedish = "Välj slutstation"
            }

        ErrorNetwork ->
            { english = "No connection, trying again soon..."
            , finnish = "Ei yhteyttä, yritetään pian uudestaan..."
            , swedish = "Ingen anslutning, försöker pånytt snart..."
            }

        ErrorTimeout ->
            { english = "Network timed out"
            , finnish = "Vastaus aikakatkaistiin"
            , swedish = "Svaret tidsavbröts"
            }

        ErrorBadUrl ->
            { english = "It's not you, it's me. I have the server address wrong."
            , finnish = "Vika on minussa. Palvelimen osoite on väärä."
            , swedish = "Det är mitt fel. Serverns adress är felaktig."
            }

        ErrorBadStatus ->
            { english = "The server didn't like the request (bad status)."
            , finnish = "Palvelin ei tykännyt pyynnöstä (virheellinen status)."
            , swedish = "Servern tyckte inte om förfrågan (bad request)."
            }

        ErrorBadPayload ->
            { english = "Ouch, the server responded with strange contents."
            , finnish = "Auts, palvelin vastasi oudolla sisällöllä."
            , swedish = "Aj, servern svarade med något konstigt."
            }

        SchedulePageLoading ->
            { english = "Loading"
            , finnish = "Ladataan"
            , swedish = "Laddar"
            }

        SchedulePageOvertakenBy { lineId, time, endStationName } ->
            { english = lineId ++ "-train (" ++ time ++ ") will reach " ++ endStationName ++ " earlier!"
            , finnish = lineId ++ "-juna (" ++ time ++ ") on aiemmin perillä " ++ finnishInessive endStationName ++ "!"
            , swedish = lineId ++ "-tåg (" ++ time ++ ") anländer tidigare i " ++ endStationName ++ "!"
            }

        SchedulePageDepartsIn ->
            { english = "Departs in"
            , finnish = "Lähtöön"
            , swedish = "Avgår om"
            }

        SchedulePageTimeDifference facts ->
            timeDifferenceTranslationSetStopping facts

        SchedulePageTimeDifferenceNonStopping facts ->
            timeDifferenceTranslationSetNonStopping facts

        SchedulePageNotMoving ->
            { english = "Not moving"
            , finnish = "Ei vielä liikkeellä"
            , swedish = "Stillastående"
            }

        SchedulePageCancelled ->
            { english = "Cancelled"
            , finnish = "Peruttu"
            , swedish = "Inhiberat"
            }

        SchedulePageEndOfListNote ->
            { english = "Only direct trains departing in 2 hours are displayed."
            , finnish = "Vain suorat 2 tunnin kuluessa lähtevät junat näytetään."
            , swedish = "Bara direkta tåg som avgår inom 2 timmar visas."
            }

        SettingsPageTitle ->
            { english = "Settings"
            , finnish = "Asetukset"
            , swedish = "Inställningar"
            }

        SettingsPageHeading ->
            { english = "Settings"
            , finnish = "Asetukset"
            , swedish = "Inställningar"
            }

        SettingsPageSelectLanguage ->
            { english = "Select language"
            , finnish = "Valitse kieli"
            , swedish = "Välj språk"
            }

        SettingShowTrainsViaAirport ->
            { english = "Show trains going via the Airport"
            , finnish = "Näytä Lentoaseman kautta kulkevat junat"
            , swedish = "Se tåg som går via Flygplatsen"
            }


type HtmlTranslationKey
    = PageFooter


type alias HtmlTranslationSet msg =
    { english : Html msg
    , finnish : Html msg
    , swedish : Html msg
    }


htmlTranslate : Language -> HtmlTranslationKey -> Html msg
htmlTranslate language key =
    let
        translationSet =
            htmlTranslationSetFor key
    in
    case language of
        Finnish ->
            translationSet.finnish

        English ->
            translationSet.english

        Swedish ->
            translationSet.swedish


htmlTranslationSetFor : HtmlTranslationKey -> HtmlTranslationSet msg
htmlTranslationSetFor key =
    case key of
        PageFooter ->
            { english =
                Html.footer []
                    [ p []
                        [ text "Made with "
                        , span [ class "pink" ] [ text "♥" ]
                        , text " by "
                        , a [ href "https://twitter.com/ohanhi" ] [ text "@ohanhi" ]
                        , text " – "
                        , text "Open Source on "
                        , a [ href "https://github.com/ohanhi/trains" ] [ text "GitHub" ]
                        ]
                    , p [ class "small" ]
                        [ text "Data provided by "
                        , a [ href "https://rata.digitraffic.fi/" ] [ text "Digitraffic" ]
                        ]
                    ]
            , finnish =
                Html.footer []
                    [ p []
                        [ text "Palvelun tehnyt "
                        , span [ class "pink" ] [ text "♥" ]
                        , text " "
                        , a [ href "https://twitter.com/ohanhi" ] [ text "@ohanhi" ]
                        , text " – "
                        , text "Avoin lähdekoodi "
                        , a [ href "https://github.com/ohanhi/trains" ] [ text "GitHubissa" ]
                        ]
                    , p [ class "small" ]
                        [ text "Tiedot tarjoaa "
                        , a [ href "https://rata.digitraffic.fi/" ] [ text "Digitraffic" ]
                        ]
                    ]
            , swedish =
                Html.footer []
                    [ p []
                        [ text "Servicen gjord med "
                        , span [ class "pink" ] [ text "♥" ]
                        , text " av "
                        , a [ href "https://twitter.com/ohanhi" ] [ text "@ohanhi" ]
                        , text " – "
                        , text "Öppen källkod på "
                        , a [ href "https://github.com/ohanhi/trains" ] [ text "GitHub" ]
                        ]
                    , p [ class "small" ]
                        [ text "Data från "
                        , a [ href "https://rata.digitraffic.fi/" ] [ text "Digitraffic" ]
                        ]
                    ]
            }


timeDifferenceTranslationSetNonStopping : { minuteDiff : Int, prevStationName : String, nextStationName : String } -> TranslationSet
timeDifferenceTranslationSetNonStopping { minuteDiff, prevStationName, nextStationName } =
    timeDifferenceTranslationSet
        { minuteDiff = minuteDiff
        , suffixes =
            { english = "between " ++ prevStationName ++ " and " ++ nextStationName
            , finnish = "välillä " ++ prevStationName ++ "–" ++ nextStationName
            , swedish = "mellan " ++ prevStationName ++ " och " ++ nextStationName
            }
        }


timeDifferenceTranslationSetStopping : { minuteDiff : Int, stationName : String } -> TranslationSet
timeDifferenceTranslationSetStopping { minuteDiff, stationName } =
    timeDifferenceTranslationSet
        { minuteDiff = minuteDiff
        , suffixes =
            { english = "in " ++ stationName
            , finnish = finnishInessive stationName
            , swedish = "i " ++ stationName
            }
        }


timeDifferenceTranslationSet : { minuteDiff : Int, suffixes : TranslationSet } -> TranslationSet
timeDifferenceTranslationSet { minuteDiff, suffixes } =
    let
        absDiff =
            abs minuteDiff

        absDiffString =
            String.fromInt absDiff
    in
    if absDiff <= 1 then
        { english = "On time " ++ suffixes.english
        , finnish = "Ajallaan " ++ suffixes.finnish
        , swedish = "Enligt tidtabell " ++ suffixes.swedish
        }

    else if minuteDiff < 0 then
        { english = absDiffString ++ " min early " ++ suffixes.english
        , finnish = absDiffString ++ " min ajoissa " ++ suffixes.finnish
        , swedish = absDiffString ++ " min i förtid " ++ suffixes.swedish
        }

    else
        { english = absDiffString ++ " min late " ++ suffixes.english
        , finnish = absDiffString ++ " min myöhässä " ++ suffixes.finnish
        , swedish = absDiffString ++ " min sen " ++ suffixes.swedish
        }


finnishInessive : String -> String
finnishInessive stationName =
    case FinnishConjugation.conjugate stationName of
        Just { in_ } ->
            in_

        Nothing ->
            "- " ++ stationName
