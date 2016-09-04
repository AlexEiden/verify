<h1 align="center">verify</h1>
<p align="center">Simple trusted-time crypto timestamping</p>

## Goals
 - Very simple UI - drag&drop a file to timestamp it, drag&drop a timestamp to verify it.
 - When a timestamp is created, a file is returned to the user containing the original document, the time, and the signature. It should be entirely self-contained, and nothing more (other than the public keys) should be needed to verify the timestamp. This inclusion of the original document should be optional but recommended.
 - Documents should never leave the client - only their hashes should be timestamped.
 - Verification of timestamps should be done entirely client-side with the public key and timestamp file.