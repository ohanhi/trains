module FinnishConjugation exposing (Conjugations, conjugate)


type alias Conjugations =
    { from : String
    , in_ : String
    , to : String
    }


conjugate : String -> Maybe Conjugations
conjugate name =
    keepBestMatch name ruleset
        |> Maybe.map
            (\rule ->
                let
                    base =
                        String.dropRight rule.offset name
                in
                { from = base ++ rule.from
                , in_ = base ++ rule.in_
                , to = base ++ rule.to
                }
            )


type alias Rule =
    { endings : List String
    , offset : Int
    , from : String
    , in_ : String
    , to : String
    }


{-| Rules with INCREASING priority.
This is entirely based on <https://github.com/banistr/frominto_fi>
-}
ruleset : List Rule
ruleset =
    [ -- extremely stupid initial vowels
      { endings = [ "a" ], offset = 0, from = "sta", in_ = "ssa", to = "an" }
    , { endings = [ "e" ], offset = 0, from = "stä", in_ = "ssä", to = "en" }
    , { endings = [ "i" ], offset = 0, from = "stä", in_ = "ssä", to = "in" }
    , { endings = [ "o" ], offset = 0, from = "sta", in_ = "ssa", to = "on" }
    , { endings = [ "u" ], offset = 0, from = "sta", in_ = "ssa", to = "un" }
    , { endings = [ "y" ], offset = 0, from = "stä", in_ = "ssä", to = "yn" }
    , { endings = [ "ä" ], offset = 0, from = "stä", in_ = "ssä", to = "än" }
    , { endings = [ "ö" ], offset = 0, from = "stä", in_ = "ssä", to = "ön" }
    , { endings = [ "haka" ], offset = 2, from = "sta", in_ = "ssa", to = "kaan" }
    , ---ri -erityiset: pori, meri etc. + kajaani yms
      { endings = [ "pori", "uri", "ari", "ani" ], offset = 0, from = "sta", in_ = "ssa", to = "in" }
    , { endings = [ "meri", "veri" ], offset = 1, from = "essä", in_ = "estä", to = "ereen" }
    , -- s -päätteiset (Kannus, muhos, varkaus, karkaus)
      { endings = [ "s" ], offset = 1, from = "ksesta", in_ = "ksessa", to = "kseen" }
    , { endings = [ "Muhos" ], offset = 1, from = "kselta", in_ = "ksella", to = "kselle" }
    , { endings = [ "aus" ], offset = 1, from = "desta", in_ = "dessa", to = "teen" }
    , { endings = [ "as", "es" ], offset = 1, from = "ksesta", in_ = "ksessa", to = "kseen" }
    , --xxby, like Degerby
      { endings = [ "by" ], offset = 0, from = "stä", in_ = "ssä", to = "hyn" }
    , --naantali et al
      { endings = [ "ali", "oli", "uli", "nti", "nni" ], offset = 0, from = "sta", in_ = "ssa", to = "in" }
    , ---valta etc.
      { endings = [ "lta" ], offset = 2, from = "lasta", in_ = "lassa", to = "taan" }
    , ---he, like Raahe
      { endings = [ "he" ], offset = 0, from = "sta", in_ = "ssa", to = "en" }
    , -- -kka
      { endings = [ "kka" ], offset = 2, from = "asta", in_ = "assa", to = "kaan" }
    , { endings = [ "kkä" ], offset = 2, from = "ästä", in_ = "ässä", to = "kään" }
    , ---nta, esim. maalaiskunta, lappeenranta
      { endings = [ "nta" ], offset = 2, from = "nasta", in_ = "nassa", to = "taan" }
    , -- helsinki, hanko, nta, nki etc.
      { endings = [ "nki" ], offset = 3, from = "ngistä", in_ = "ngissä", to = "nkiin" }
    , { endings = [ "nko" ], offset = 3, from = "ngosta", in_ = "ngossa", to = "nkoon" }
    , --tampere + kempele etc
      { endings = [ "pere" ], offset = 0, from = "elta", in_ = "ella", to = "elle" }
    , { endings = [ "pele" ], offset = 0, from = "eltä", in_ = "ellä", to = "elle" }
    , { endings = [ "rku", "kku" ], offset = 2, from = "usta", in_ = "ussa", to = "kuun" }
    , --ii, aa - päätteiset, kuten Ii, laukaa, vantaa, espoo
      { endings = [ "ee" ], offset = 0, from = "ltä", in_ = "llä", to = "lle" }
    , { endings = [ "ii" ], offset = 0, from = "stä", in_ = "ssä", to = "hin" }
    , { endings = [ "uu" ], offset = 0, from = "sta", in_ = "ssa", to = "hun" }
    , { endings = [ "aa", "oo" ], offset = 0, from = "sta", in_ = "ssa", to = "seen" }
    , { endings = [ "maa", "taa", "ria", "pua", "uma", "tra", "ava", "jaa", "ruu", "kia" ], offset = 0, from = "lta", in_ = "lla", to = "lle" }
    , { endings = [ "iä", "kää", "pää" ], offset = 0, from = "ltä", in_ = "llä", to = "lle" }
    , { endings = [ "vik" ], offset = 0, from = "istä", in_ = "issä", to = "iin" }
    , --mm. savio
      { endings = [ "vio" ], offset = 0, from = "lta", in_ = "lla", to = "lle" }
    , --inkeroinen, kauniainen, änkeröinen, kimpeläinen yms.
      { endings = [ "inen" ], offset = 4, from = "isista", in_ = "isissa", to = "isiin" }
    , { endings = [ "äinen", "öinen" ], offset = 4, from = "isistä", in_ = "isissä", to = "isiin" }
    , { endings = [ "Joroinen" ], offset = 4, from = "isilta", in_ = "isilla", to = "isille" }
    , --harjut + erikoisharjut
      { endings = [ "harju" ], offset = 0, from = "lta", in_ = "lla", to = "lle" }
    , { endings = [ "hiekkaharju", "uimaharju" ], offset = 0, from = "sta", in_ = "ssa", to = "un" }
    , { endings = [ "nummi" ], offset = 1, from = "elta", in_ = "ella", to = "elle" }
    , -- järvet ja vedet
      { endings = [ "järvi" ], offset = 1, from = "eltä", in_ = "ellä", to = "elle" }
    , { endings = [ "vesi" ], offset = 2, from = "deltä", in_ = "dellä", to = "delle" }
    , -- genetiivinpää
      { endings = [ "npää" ], offset = 0, from = "stä", in_ = "ssä", to = "hän" }
    , --kosket ja salmet
      { endings = [ "koski", "salmi" ], offset = 1, from = "elta", in_ = "ella", to = "elle" }
    , { endings = [ "ore" ], offset = 0, from = "elta", in_ = "ella", to = "elle" }
    , --saaret + erikoissaaret
      { endings = [ "saari" ], offset = 1, from = "esta", in_ = "essa", to = "een" }
    , --lahdet + erikoislahdet
      { endings = [ "lahti" ], offset = 2, from = "desta", in_ = "dessa", to = "teen" }
    , { endings = [ "kesälahti", "talvilahti", "lapinlahti" ], offset = 2, from = "delta", in_ = "della", to = "delle" }
    , --vuoret + erikoisvuoret
      { endings = [ "vuori" ], offset = 1, from = "elta", in_ = "ella", to = "elle" }
    , { endings = [ "laajavuori", "punavuori" ], offset = 1, from = "esta", in_ = "essa", to = "een" }
    , --joet
      { endings = [ "joki" ], offset = 4, from = "joelta", in_ = "joella", to = "joelle" }
    , --mäet
      { endings = [ "mäki" ], offset = 4, from = "mäeltä", in_ = "mäellä", to = "mäelle" }
    , { endings = [ "tunturi" ], offset = 0, from = "lta", in_ = "lla", to = "lle" }
    , --erikoismäet
      { endings = [ "kannelmäki", "pukinmäki", "myyrmäki" ], offset = 2, from = "estä", in_ = "essä", to = "keen" }
    , --asemat, hotellit ja muut
      { endings = [ "asema" ], offset = 0, from = "lta", in_ = "lla", to = "lle" }
    , { endings = [ "otelli" ], offset = 0, from = "sta", in_ = "ssa", to = "in" }
    , { endings = [ "hovi" ], offset = 0, from = "sta", in_ = "ssa", to = "in" }
    , ---selkä
      { endings = [ "selkä" ], offset = 2, from = "ältä", in_ = "ällä", to = "älle" }
    , ---etti, tough one (taavetti, retretti)
      { endings = [ "tti" ], offset = 2, from = "ista", in_ = "issa", to = "tiin" }
    , { endings = [ "kki" ], offset = 2, from = "ista", in_ = "issa", to = "kiin" }
    , { endings = [ "retti", "pirtti" ], offset = 2, from = "istä", in_ = "issä", to = "tiin" }
    , --tuntureiden nimet
      { endings = [ "Suomu", "Ruka", "Tahko", "Luosto", "Malmi" ], offset = 0, from = "lta", in_ = "lla", to = "lle" }
    , { endings = [ "Levi", "Pyhä" ], offset = 0, from = "ltä", in_ = "llä", to = "lle" }
    , -- totally weird cases & one-off hacks
      { endings = [ "Kangasala" ], offset = 3, from = "alta", in_ = "alla", to = "alle" }
    , -- Helsinki Lentoasema, Turenki Lentoasema (if such exists)
      { endings = [ "nki Lentoasema" ], offset = 14, from = "ngin Lentoasemalta", in_ = "ngin Lentoasemalla", to = "ngin Lentoasemalle" }
    , -- Turenki
      { endings = [ "Turenki" ], offset = 2, from = "gista", in_ = "gissa", to = "kiin" }
    , -- Arolampi, Lahnaslampi
      { endings = ["lampi"], offset = 2, from = "mista", in_ = "missa", to = "mille" }
    ]


keepBestMatch : String -> List Rule -> Maybe Rule
keepBestMatch name rules =
    rules
        |> List.filterMap
            (\rule ->
                rule.endings
                    |> List.filter (\ending -> String.endsWith (String.toUpper ending) (String.toUpper name))
                    |> (\remaining ->
                            if List.length remaining > 0 then
                                Just rule

                            else
                                Nothing
                       )
            )
        |> List.reverse
        |> List.head
