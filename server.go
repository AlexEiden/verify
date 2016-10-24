package main

import (
	"github.com/gin-gonic/gin"
    "github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/contrib/gzip"
    "github.com/wgoodall01/verify/api"
    "github.com/wgoodall01/verify/lib"
    "log"
)

func main() {
    privateKey, err := lib.LoadPrivateKey("./keys/key")
    if(err != nil) { log.Fatal("Error: Could not load keys") }

	router := gin.Default();

    // Middleware for all requests
    router.Use(gzip.Gzip(gzip.DefaultCompression));
    
    // Serve API
    router.GET("/api/time", api.Route_Time())
    router.POST("/api/sign", api.Route_Sign(privateKey))

    // Serve static frontend
    router.NoRoute(static.ServeRoot("/", "./build"))

    

    router.Run();
}
