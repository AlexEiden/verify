package main

import (
	"fmt"
	"net/http"
    "./api"
)

func main() {
	http.HandleFunc("/api/time", api.Route_Time);



    fmt.Println("Listening on http://localhost:8080/")
	http.ListenAndServe(":8080", nil)
}
