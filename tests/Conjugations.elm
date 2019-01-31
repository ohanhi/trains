module Conjugations exposing (suite)

import Expect exposing (Expectation)
import FinnishConjugation
import Test exposing (..)


suite : Test
suite =
    describe "Test cases"
        (List.map toTest testCases)


toTest : TestCase -> Test
toTest testCase =
    case testCase of
        Positive name from in_ to ->
            toPositiveTest name from in_ to

        Negative name ->
            test name <|
                \_ ->
                    FinnishConjugation.conjugate name
                        |> Expect.equal Nothing


toPositiveTest name from in_ to =
    let
        correct =
            { from = from, in_ = in_, to = to }

        expectation _ =
            name
                |> FinnishConjugation.conjugate
                |> Expect.equal (Just correct)
    in
    test name expectation


type TestCase
    = Positive String String String String
    | Negative String


testCases =
    [ Positive "Tampere" "Tampereelta" "Tampereella" "Tampereelle"
    , Positive "Kauniainen" "Kauniaisista" "Kauniaisissa" "Kauniaisiin"
    , Positive "Asikainen" "Asikaisista" "Asikaisissa" "Asikaisiin"
    , Positive "Inkeroinen" "Inkeroisista" "Inkeroisissa" "Inkeroisiin"
    , Positive "Jyväskylä" "Jyväskylästä" "Jyväskylässä" "Jyväskylään"
    , Positive "Asema" "Asemalta" "Asemalla" "Asemalle"
    , Positive "Leppävaara" "Leppävaarasta" "Leppävaarassa" "Leppävaaraan"
    , Positive "Maalaiskunta" "Maalaiskunnasta" "Maalaiskunnassa" "Maalaiskuntaan"
    , Positive "Mäntyharju" "Mäntyharjulta" "Mäntyharjulla" "Mäntyharjulle"
    , Positive "Hiekkaharju" "Hiekkaharjusta" "Hiekkaharjussa" "Hiekkaharjuun"
    , Positive "Ii" "Iistä" "Iissä" "Iihin"
    , Positive "Kera" "Kerasta" "Kerassa" "Keraan"
    , Positive "Kilo" "Kilosta" "Kilossa" "Kiloon"
    , Positive "Oulu" "Oulusta" "Oulussa" "Ouluun"
    , Positive "Degerby" "Degerbystä" "Degerbyssä" "Degerbyhyn"
    , Positive "Hanko" "Hangosta" "Hangossa" "Hankoon"
    , Positive "Kuhmo" "Kuhmosta" "Kuhmossa" "Kuhmoon"
    , Positive "Tammisaari" "Tammisaaresta" "Tammisaaressa" "Tammisaareen"
    , Positive "Seinäjoki" "Seinäjoelta" "Seinäjoella" "Seinäjoelle"
    , Positive "Kerimäki" "Kerimäeltä" "Kerimäellä" "Kerimäelle"
    , Positive "Retretti" "Retretistä" "Retretissä" "Retrettiin"
    , Positive "Taavetti" "Taavetista" "Taavetissa" "Taavettiin"
    , Positive "Naantali" "Naantalista" "Naantalissa" "Naantaliin"
    , Positive "Laukaa" "Laukaasta" "Laukaassa" "Laukaaseen"
    , Positive "Turku" "Turusta" "Turussa" "Turkuun"
    , Positive "Pertunmaa" "Pertunmaalta" "Pertunmaalla" "Pertunmaalle"
    , Positive "Espoo" "Espoosta" "Espoossa" "Espooseen"
    , Positive "Vantaa" "Vantaalta" "Vantaalla" "Vantaalle"
    , Positive "Kuopio" "Kuopiosta" "Kuopiossa" "Kuopioon"
    , Positive "Kouvola" "Kouvolasta" "Kouvolassa" "Kouvolaan"
    , Positive "Pori" "Porista" "Porissa" "Poriin"
    , Positive "Joensuu" "Joensuusta" "Joensuussa" "Joensuuhun"
    , Positive "Lappeenranta" "Lappeenrannasta" "Lappeenrannassa" "Lappeenrantaan"
    , Positive "Hämeenlinna" "Hämeenlinnasta" "Hämeenlinnassa" "Hämeenlinnaan"
    , Positive "Vaasa" "Vaasasta" "Vaasassa" "Vaasaan"
    , Positive "Jaala" "Jaalasta" "Jaalassa" "Jaalaan"
    , Positive "Laajavuori" "Laajavuoresta" "Laajavuoressa" "Laajavuoreen"
    , Positive "Palokka" "Palokasta" "Palokassa" "Palokkaan"
    , Positive "Ristonmaa" "Ristonmaalta" "Ristonmaalla" "Ristonmaalle"
    , Positive "Niipperi" "Niipperistä" "Niipperissä" "Niipperiin"
    , Positive "Lepsämä" "Lepsämästä" "Lepsämässä" "Lepsämään"
    , Positive "Toivakka" "Toivakasta" "Toivakassa" "Toivakkaan"
    , Positive "Lahti" "Lahdesta" "Lahdessa" "Lahteen"
    , Positive "Kitee" "Kiteeltä" "Kiteellä" "Kiteelle"
    , Positive "Joroinen" "Joroisilta" "Joroisilla" "Joroisille"
    , Positive "Vuontispirtti" "Vuontispirtistä" "Vuontispirtissä" "Vuontispirttiin"
    , Positive "Jorvas" "Jorvaksesta" "Jorvaksessa" "Jorvakseen"
    , Positive "Nurmes" "Nurmeksesta" "Nurmeksessa" "Nurmekseen"
    , Positive "Myllykoski" "Myllykoskelta" "Myllykoskella" "Myllykoskelle"
    , Positive "Tuuri" "Tuurista" "Tuurissa" "Tuuriin"
    , Positive "Hankasalmi" "Hankasalmelta" "Hankasalmella" "Hankasalmelle"
    , Positive "Kolari" "Kolarista" "Kolarissa" "Kolariin"
    , Positive "Lievestuore" "Lievestuoreelta" "Lievestuoreella" "Lievestuoreelle"
    , Positive "Hikiä" "Hikiältä" "Hikiällä" "Hikiälle"
    , Positive "Kirkkonummi" "Kirkkonummelta" "Kirkkonummella" "Kirkkonummelle"
    , Positive "Kilpisjärvi" "Kilpisjärveltä" "Kilpisjärvellä" "Kilpisjärvelle"
    , Positive "Koria" "Korialta" "Korialla" "Korialle"
    , Positive "Inari" "Inarista" "Inarissa" "Inariin"
    , Positive "Ruukki" "Ruukista" "Ruukissa" "Ruukkiin"
    , Positive "Rauma" "Raumalta" "Raumalla" "Raumalle"
    , Positive "Lapua" "Lapualta" "Lapualla" "Lapualle"
    , Positive "Kajaani" "Kajaanista" "Kajaanissa" "Kajaaniin"
    , Positive "Kannelmäki" "Kannelmäestä" "Kannelmäessä" "Kannelmäkeen"
    , Positive "Kangasala" "Kangasalta" "Kangasalla" "Kangasalle"
    , Positive "Punavuori" "Punavuoresta" "Punavuoressa" "Punavuoreen"
    , Positive "Imatra" "Imatralta" "Imatralla" "Imatralle"
    , Positive "Sumatra" "Sumatralta" "Sumatralla" "Sumatralle"
    , Positive "Raahe" "Raahesta" "Raahessa" "Raaheen"
    , -- src: http://www.uimaharju.fi/
      Positive "Uimaharju" "Uimaharjusta" "Uimaharjussa" "Uimaharjuun"
    , Positive "Hyvinkää" "Hyvinkäältä" "Hyvinkäällä" "Hyvinkäälle"
    , -- luosto.fi
      Positive "Luosto" "Luostolta" "Luostolla" "Luostolle"
    , Positive "Ruka" "Rukalta" "Rukalla" "Rukalle"
    , Positive "Pyhä" "Pyhältä" "Pyhällä" "Pyhälle"
    , Positive "Kiuruvesi" "Kiuruvedeltä" "Kiuruvedellä" "Kiuruvedelle"
    , -- www.raasepori.fi
      Positive "Karjaa" "Karjaalta" "Karjaalla" "Karjaalle"
    , -- www.raasepori.fi
      Positive "Pukinmäki" "Pukinmäestä" "Pukinmäessä" "Pukinmäkeen"
    , -- https://fi.wikipedia.org/wiki/Uudenmaan_prikaati
      Positive "Dragsvik" "Dragsvikistä" "Dragsvikissä" "Dragsvikiin"
    , Positive "Runni" "Runnista" "Runnissa" "Runniin"
    , Positive "Keuruu" "Keuruulta" "Keuruulla" "Keuruulle"
    , Positive "Pihlajavesi" "Pihlajavedeltä" "Pihlajavedellä" "Pihlajavedelle"
    , Positive "Saariselkä" "Saariselältä" "Saariselällä" "Saariselälle"
    , Positive "Harjavalta" "Harjavallasta" "Harjavallassa" "Harjavaltaan"
    , Positive "Kiilopää" "Kiilopäältä" "Kiilopäällä" "Kiilopäälle"
    , Positive "Tahko" "Tahkolta" "Tahkolla" "Tahkolle"
    , Positive "Suomu" "Suomulta" "Suomulla" "Suomulle"
    , Positive "Malmi" "Malmilta" "Malmilla" "Malmille"
    , Positive "Lapinlahti" "Lapinlahdelta" "Lapinlahdella" "Lapinlahdelle"
    , Positive "Kauhava" "Kauhavalta" "Kauhavalla" "Kauhavalle"
    , Positive "Kerava" "Keravalta" "Keravalla" "Keravalle"
    , Positive "Orivesi" "Orivedeltä" "Orivedellä" "Orivedelle"
    , Positive "Muhos" "Muhokselta" "Muhoksella" "Muhokselle"
    , Positive "Kannus" "Kannuksesta" "Kannuksessa" "Kannukseen"
    , Positive "Varkaus" "Varkaudesta" "Varkaudessa" "Varkauteen"
    , Positive "Koivuhovi" "Koivuhovista" "Koivuhovissa" "Koivuhoviin"
    , Positive "Nokia" "Nokialta" "Nokialla" "Nokialle"
    , Positive "Vihanti" "Vihantista" "Vihantissa" "Vihantiin"
    , Positive "Järvenpää" "Järvenpäästä" "Järvenpäässä" "Järvenpäähän"
    , Positive "Savio" "Saviolta" "Saviolla" "Saviolle"
    , Positive "Myyrmäki" "Myyrmäestä" "Myyrmäessä" "Myyrmäkeen"
    , Positive "Lentoasema" "Lentoasemalta" "Lentoasemalla" "Lentoasemalle"
    , Positive "Koivuhaka" "Koivuhaasta" "Koivuhaassa" "Koivuhakaan"
    , Positive "XY-Tunturi" "XY-Tunturilta" "XY-Tunturilla" "XY-Tunturille"
    , Positive "XY Motelli" "XY Motellista" "XY Motellissa" "XY Motelliin"
    , Positive "Turenki" "Turengista" "Turengissa" "Turenkiin"
    , Positive "Arolampi" "Arolammista" "Arolammissa" "Arolammille"
    , Positive "Leteensuo" "Leteensuolta" "Leteensuolla" "Leteensuolle"
    , Negative "XYZ"
    , Negative "Plop"
    ]
