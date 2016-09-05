package api;

import (
    // "crypto/rsa"
	"github.com/gin-gonic/gin"
)

type signDocument struct{
    documentHash_b64 string `json:"documentHash" binding:"required"`
    documentHash []byte
    timestamp int64
    composite []byte
    signature []byte
}

func Route_Sign(c* gin.Context){
    // Stub

}