port module Main exposing (Model, Msg(..), init, main, update, view)

import Browser
import Html exposing (Html, div, h1, img, text)
import Html.Events exposing (onClick)
import Json.Encode as E



---- MODEL ----


port send : E.Value -> Cmd msg

port received : (E.Value -> msg) -> Sub msg

type alias Model =
    { name : String }


init : ( Model, Cmd Msg )
init =
    ( { name = "Michel" }
    , Cmd.none
    )



---- UPDATE ----


type Msg
    = Noop
    | Send Model
    | Received E.Value


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Noop ->
            ( model, Cmd.none )

        Send m ->
            ( model, send (E.string model.name) )

        Received value ->
            ( model, Cmd.none )



---- VIEW ----


view : Model -> Html Msg
view model =
    div [ onClick (Send model) ]
        [ text "hello there" ]


---- SUBSCRIPTIONS ----
subscriptions : Model -> Sub Msg
subscriptions _ =
   Sub.batch
        [ received Received
        ]



---- PROGRAM ----


main : Program () Model Msg
main =
    Browser.element
        { view = view
        , init = \_ -> init
        , update = update
        , subscriptions = subscriptions
        }
