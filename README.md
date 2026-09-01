# ZigZagUp digital business card — GitHub Pages package

Permanent address: `https://innarbo.github.io/zigzagup-card/`

## Publish

1. Extract `zigzagup-card-github-pages.zip`.
2. Upload **all extracted files and folders** to the root of the GitHub repository `innarbo/zigzagup-card`. `index.html` must be at the repository root.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/(root)`, then save.
6. Open `https://innarbo.github.io/zigzagup-card/` after GitHub finishes publishing.

This is a fully static package; there is no build step and no external JavaScript or font dependency.

## Contact details included

- Name: Inna Arbo
- Company: ZigZagUp
- Title: Founder & CEO
- Business email only: zigzagup.app@gmail.com
- LinkedIn: `https://www.linkedin.com/in/inna-arbo-76a28a27`
- One-Pager: `https://drive.google.com/file/d/1pliJ7bCmSib27scnjvC_MaVXi2N2fPJU/view?usp=sharing`
- No phone number or personal email is included.

The vCard uses the shorter card-hosted routes `/linkedin/` and `/one-pager/`, which redirect to the full external links.

## Apple Wallet

`assets/wallet-pass-source/` contains an unsigned generic-pass source package, including the prepared icon, logo, thumbnail, pass fields, QR barcode, and permanent links. A real `.pkpass` must be signed with an Apple Pass Type ID certificate.

After signing, place the file at:

`wallet/inna-arbo.pkpass`

The website automatically detects that file and reveals the **Add to Apple Wallet** button. Never upload Apple private keys, signing identities, or certificate passwords to GitHub.

Until a signed Wallet pass is added, the site is also installable from Safari with **Share → Add to Home Screen** and uses the U-with-triangle icon.

## Important files

- `index.html` — responsive digital business card
- `wallet.html` — full-screen QR presentation view
- `inna-arbo.vcf` — downloadable contact card
- `assets/brand/` — exact supplied wordmark and icon assets
- `assets/qr/` — verified SVG and high-resolution PNG QR codes
- `assets/social/` — social preview and Wallet/QR artwork
- `assets/previews/` — desktop and mobile screenshots of the finished card
- `assets/wallet-pass-source/` — unsigned Apple Wallet pass source
- `manifest.webmanifest` and `service-worker.js` — installable app experience
- `.nojekyll` — prevents Jekyll processing

## Updating the card later

Edit the constants in the HTML/vCard files and regenerate the QR if the permanent URL changes. Because the current permanent URL is already final, the QR code should not need to change when content is updated.


## Version 2 updates

- Renamed the secondary QR action to **Scan to Connect**.
- Adjusted the dark QR panel to a richer navy-blue gradient closer to the approved brand palette.
- Updated the vCard display name to **Inna Arbo | ZigZagUp** to reduce accidental merging with a personal contact card on Apple devices.

- Version 3: updated the QR-side background to a smoother navy-blue gradient with subtle geometric zigzag patterning and no stars.

- Version 4: fixed stale-browser behavior by removing the old service-worker cache and forcing previously cached versions to clear.

- Version 5: restructured the top of the light profile panel with a smaller logo, smaller name, clearer separators, and improved visual hierarchy for a more premium look.

- Version 6: updated the headline to a clean two-line structure and highlighted **judgment** and **answers** in cyan for stronger brand emphasis.

- Version 7: kept “Understand how you think. Build how you reason.” on a single line, including on mobile layouts.

- Version 8: locks the headline to exactly two lines on mobile and desktop; the period after **answers.** is now cyan with the highlighted word.
