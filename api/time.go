package api;

import (
	"net/http"
    "time"
    "fmt"
)

func Route_Time(w http.ResponseWriter, r *http.Request) {
    timeText, err := time.Now().MarshalText();
    if err != nil { panic(err) }

    fmt.Fprintf(w, "{\"currentTime\":\"%s\"}", timeText)
};