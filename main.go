package main

import (
	"fmt"
	"math/rand"
	"net/http"
	"strings"
	"time"

	"github.com/labstack/echo/v4"
)

type Request struct {
	Letter string `json:"letter"`
}

type GameState struct {
	words      []string
	chosenWord string
	showWord   string
	mistakes   int
}

var gameState GameState

func newGame(c echo.Context) error {
	gameState.showWord, gameState.mistakes = "", 0
	initGame()
	return c.String(http.StatusOK, fmt.Sprintf(" word: %s", gameState.showWord))
}

func getWord(c echo.Context) error {
	return c.String(http.StatusOK, fmt.Sprintf(" word: %s", gameState.showWord))
}

func insertWord(c echo.Context) error {
	var req Request
	if err := c.Bind(&req); err != nil {
		return c.String(http.StatusBadRequest, "Bad request")
	}
	processLetter(req.Letter)
	return c.String(http.StatusOK, fmt.Sprintf(" word: %s", gameState.showWord))
}

func main() {
	initGame()
	e := echo.New()
	e.Static("/", "static")
	e.GET("/word", getWord)
	e.GET("/word/new", newGame)
	e.POST("/word", insertWord)
	e.Logger.Fatal(e.Start(":1323"))
}

func initGame() {
	gameState.words = []string{"laranja", "banana", "caju", "acerola", "manga", "uva", "melancia", "melao", "abacaxi", "goiaba", "pera", "maca", "kiwi", "morango", "pitanga", "jabuticaba", "cereja", "framboesa", "amora", "mirtilo", "manga", "uva", "melancia", "melao", "abacaxi", "goiaba", "pera", "maca", "kiwi", "morango", "pitanga", "jabuticaba", "cereja", "framboesa", "amora", "mirtilo"}
	gameState.chosenWord = gameState.words[rand.New(rand.NewSource(time.Now().UnixNano())).Intn(len(gameState.words))]
	gameState.showWord = strings.Repeat("_", len(gameState.chosenWord))
}

func processLetter(letter string) {
	letter = strings.ToLower(letter)
	if strings.Contains(gameState.chosenWord, letter) {
		for i, c := range gameState.chosenWord {
			if string(c) == letter {
				gameState.showWord = gameState.showWord[:i] + letter + gameState.showWord[i+1:]
			}
		}
	} else {
		gameState.mistakes++
	}

	switch {
	case !strings.Contains(gameState.showWord, "_"):
		gameState.showWord = "Você ganhou! A palavra era: " + gameState.chosenWord
	case gameState.mistakes >= 6:
		gameState.showWord = "Você perdeu! A palavra era: " + gameState.chosenWord
	}
}
