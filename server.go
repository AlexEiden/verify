package main

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/contrib/gzip"
    "github.com/wgoodall01/verify/api"
    "github.com/wgoodall01/verify/lib"
    "os"
)

func main() {
    privateKey, err := lib.LoadPrivateKey("./keys/key")
    if(err != nil) {os.Exit(1)}

	router := gin.Default();

    // Middleware for all requests
    router.Use(gzip.Gzip(gzip.DefaultCompression));

    router.GET("/api/time", api.Route_Time())
    router.POST("/api/sign", api.Route_Sign(privateKey))

    router.Run();
}
