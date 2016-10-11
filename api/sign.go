package api;

import (
	"github.com/gin-gonic/gin"
    "crypto/rsa"
    "encoding/hex"
    "github.com/wgoodall01/verify/lib"
    "time"
)

type VerificationRequest struct{
    DocumentHash string `json:"documentHash" binding:"required"`
}

type VerificationResponse struct{
    Timestamp int64 `json:"timestamp" binding:"required"`
    Composite string `json:"composite" binding:"required"`
    Signature string `json:"signature" binding:"required"`
}

// Route_Sign returns the main route
func Route_Sign(privkey *rsa.PrivateKey) (func(c* gin.Context)) {
    return func(c* gin.Context){
        req := VerificationRequest{}
        c.Bind(&req)

        documentHash, err := hex.DecodeString(req.DocumentHash)
        if(err != nil) { c.AbortWithStatus(400); return } // Bad hex encoding
        if(len(documentHash) != 32) { c.AbortWithStatus(400); return } // Hash is wrong length


        // Set up verification
        timestamp := time.Now().Unix()
        v := lib.NewVerification()
        v.SetDocumentHash(documentHash)
        v.SetTimestamp(timestamp)

        // Get signature
        signature, err := v.Signature(privkey)
        if(err != nil) { c.AbortWithStatus(500) }

        res := VerificationResponse{
            Timestamp: timestamp,
            Composite: hex.EncodeToString(v.Composite[:]),
            Signature: hex.EncodeToString(signature),
        }

        c.JSON(200, res)
    }
}