package main

import (
	"github.com/gin-gonic/gin"
    "./api"
)

func main() {
	router := gin.Default();

    router.GET("/api/time", api.Route_Time)

    router.Run();
}
