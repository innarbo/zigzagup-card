# Apple Wallet pass source (unsigned)

This folder contains the prepared artwork and a valid JSON template for a **generic** Wallet pass. It is source material, not an installable `.pkpass` yet.

## Complete the pass

1. Replace `REPLACE_WITH_PASS_TYPE_IDENTIFIER` in `pass.json` with your Apple Pass Type ID.
2. Replace `REPLACE_WITH_APPLE_TEAM_IDENTIFIER` with your Apple Team ID.
3. Sign the pass with the matching Pass Type ID certificate and Apple WWDR intermediate certificate.
4. Save the signed pass as `wallet/inna-arbo.pkpass` in the website repository.

The website checks for that exact file. Once a valid signed pass exists there, the **Add to Apple Wallet** action appears automatically.

The QR barcode and all back-side links point to:

`https://innarbo.github.io/zigzagup-card/`

Never commit private keys, certificate passwords, or exported signing identities to a public GitHub repository.
