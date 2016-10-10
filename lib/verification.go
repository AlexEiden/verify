package lib

import (
	"crypto"
	"crypto/rand"
	"crypto/rsa"
	"crypto/sha256"
	"encoding/binary"
)

type Verification struct {
	// Composite is the Timestamp appended to the DocumentHash (<documentHash><timestamp>)
	Composite [40]byte
}

func NewVerification() Verification{
	return Verification{
		Composite: [40]byte{},
	}
}

// DocumentHash returns the document hash
func (v *Verification) DocumentHash() []byte {
	return v.Composite[0:32]
}

// SetDocumentHash copies the first 32 bytes of the passed documentHash into the Composite
func (v *Verification) SetDocumentHash(documentHash []byte) {
	copy(v.Composite[0:32], documentHash[0:32])
}

// Timestamp gets the timestamp from the Composite
func (v *Verification) Timestamp() int64 {
	binaryValue := v.Composite[32:40]
	timestampUnsigned := binary.LittleEndian.Uint64(binaryValue)
	return int64(timestampUnsigned)
}

// SetTimestamp copies the timestamp into the Composite
func (v *Verification) SetTimestamp(timestamp int64) {
	timestampUnsigned := uint64(timestamp)
	binaryValue := make([]byte, 8)
	binary.LittleEndian.PutUint64(binaryValue, timestampUnsigned)
	copy(v.Composite[32:40], binaryValue)
}

// CompositeHash returns the hash of the Composite
func (v *Verification) CompositeHash() [32]byte {
	return sha256.Sum256(v.Composite[:])
}

// Signature returns a PKCS1v15 signature of the composite.
func (v* Verification) Signature(privkey *rsa.PrivateKey) ([]byte, error) {
	compositeHash := sha256.Sum256(v.Composite[:])
	return rsa.SignPKCS1v15(rand.Reader, privkey, crypto.SHA256, compositeHash[:])
}
