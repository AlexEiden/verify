package lib

import (
    "crypto/rsa"
    "encoding/pem"
    "crypto/x509"
    "io/ioutil"
    "errors"
)


// LoadPrivateKey loads a private key from a file, and returns a pointer to it.
func LoadPrivateKey(path string) (*rsa.PrivateKey, error) {
    pemBytes, err := ioutil.ReadFile(path)
    if (err != nil) { return nil, errors.New("Error reading key file") }

    block, _ := pem.Decode(pemBytes)
	if block == nil {
		return nil, errors.New("Error in PEM format")
	}

	var key *rsa.PrivateKey
	switch block.Type {
	case "RSA PRIVATE KEY":
		parsedKey, err := x509.ParsePKCS1PrivateKey(block.Bytes)
		if err != nil { return nil, errors.New("Can't parse private key") }
        key = parsedKey
	default:
		return nil, errors.New("Unsupported PEM key type")
	}

	return key, nil
}