module Icons exposing (..)

import Html exposing (Html)
import Svg
import Svg.Attributes exposing (..)


swap : Float -> Html msg
swap floatSize =
    let
        size =
            String.fromInt (round floatSize)
    in
    Svg.svg
        [ viewBox "0 0 13 13"
        , width size
        , height size
        ]
        [ Svg.path
            [ strokeWidth "0.7"
            , strokeLinecap "round"
            , stroke "#babdb6"
            , fill "none"
            , d
                ("M4 2 v10 M2 4 L4 2 M6 4 L4 2"
                    ++ "M8 12 v-10 M6 10 L8 12 M10 10 L8 12"
                )
            ]
            []
        ]
