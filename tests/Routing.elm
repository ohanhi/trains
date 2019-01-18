module Routing exposing (suite)

import Expect exposing (Expectation)
import Json.Decode
import Main
import Model exposing (Route(..))
import Test exposing (..)
import Url


suite : Test
suite =
    Test.concat
        [ test "Root route" <|
            \_ ->
                Expect.equal
                    SelectDepRoute
                    (Main.parseUrl <| urlWithFragment "/")
        , test "Destination page route" <|
            \_ ->
                Expect.equal
                    (SelectDestRoute "MÄK")
                    (Main.parseUrl <| urlWithFragment "/M%C3%84K")
        , test "Schedule page route" <|
            \_ ->
                Expect.equal
                    (ScheduleRoute "HKI" "MÄK")
                    (Main.parseUrl <| urlWithFragment "HKI/M%C3%84K")
        ]


urlWithFragment : String -> Url.Url
urlWithFragment fragment =
    { protocol = Url.Https
    , host = ""
    , port_ = Nothing
    , path = "/"
    , query = Nothing
    , fragment = Just fragment
    }
