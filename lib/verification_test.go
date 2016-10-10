package lib;

import (
    "testing"
    "os"
    "crypto/sha256"
    "bytes"
)

var testVerification Verification;

func TestMain(m *testing.M) {
    // Initialize verification
    testVerification = Verification{}

    result := m.Run()
    os.Exit(result)
}

func TestDocumentHash(t *testing.T){
    t.Logf("Composite     : %x", testVerification.Composite[:])

    hash := sha256.Sum256([]byte("Hello World!"))
    t.Logf("Hash          : %x", hash[:])

    testVerification.SetDocumentHash(hash[:])
    t.Log("Set hash")
    t.Logf("Composite     : %x", testVerification.Composite[:])
    returnedHash := testVerification.DocumentHash()
    t.Logf("Returned hash : %x", returnedHash)

    if(!bytes.Equal(hash[:], returnedHash)){
        t.Error("Verification incorrectly stores the DocumentHash")
    }
}

func TestTimestamp(t *testing.T){
    t.Logf("Composite                 : %x", testVerification.Composite[:])

    var timestamp int64 = 9223372036854775807 // max int64
    t.Logf("Timestamp (bin/d)         : %x", timestamp)
    testVerification.SetTimestamp(timestamp)
    t.Log("Set Timestamp")
    t.Logf("Composite                 : %x", testVerification.Composite[:])
    returnedTimestamp := testVerification.Timestamp()
    t.Logf("Returned timestamp (bin/d): %x", returnedTimestamp)

    if(timestamp != returnedTimestamp){
        t.Error("Verification incorrectly stores the timestamp")
    }
}