module Routing exposing (suite)

import Expect exposing (Expectation)
import Json.Decode
import Main
import Model exposing (Route(..))
import Test exposing (..)
import Url


suite : Test
suite =
    test "Schedule page routes" <|
        \_ ->
            let
                url =
                    { protocol = Url.Https
                    , host = ""
                    , port_ = Nothing
                    , path = "/"
                    , query = Nothing
                    , fragment = Just "HKI/M%C3%84K"
                    }
            in
            Expect.equal (ScheduleRoute "HKI" "MÄK") (Main.parseUrl url)
