package main

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/contrib/gzip"
    "./api"
)

func main() {
	router := gin.Default();

    // Middleware for all requests
    router.Use(gzip.Gzip(gzip.DefaultCompression));

    router.GET("/api/time", api.Route_Time)
    router.POST("/api/sign", api.Route_Sign)

    router.Run();
}
