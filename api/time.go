package api;

import (
	"github.com/gin-gonic/gin"
    "time"
	"net/http"
)

// Route_Time returns a route which sends the current time
func Route_Time() func(c* gin.Context){
    return func(c* gin.Context) {
        c.JSON(http.StatusOK, gin.H{
            "currentTime": time.Now().Unix(),
        })
    };
}
