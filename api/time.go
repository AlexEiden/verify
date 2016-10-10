package api;

import (
	"github.com/gin-gonic/gin"
    "time"
	"net/http"
)

func Route_Time(c* gin.Context) {
    c.JSON(http.StatusOK, gin.H{
        "currentTime": time.Now().Unix(),
    })
};