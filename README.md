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
- One-Pager: `https://innarbo.github.io/zigzagup-card/one-pager/`
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

- Version 9: adjusted the headline line break to match the approved two-line layout: “Build judgment in” / “the age of answers.” while preserving the cyan highlights.

- Version 10: changed the supporting sentence to a centered two-line layout: “Understand how you think.” / “Build how you reason.” while preserving the approved headline layout.

- Version 11: fixed the supporting-text CSS so it is actually rendered as two centered lines: “Understand how you think.” / “Build how you reason.” The approved two-line headline and cyan highlights remain unchanged.

- Version 12: Home Screen web-app edition. Added standalone-app metadata, polished ZigZagUp launch screens for major iPhone sizes, app-mode refinements, updated manifest shortcuts, and an iPhone installation guide without changing the visible business-card design.

## Version 13 — Home Screen owner mode

- Home Screen launches now open the dark QR presentation card first.
- Direct public/QR visits continue to open the white contact card for recipients.
- Added a **View Contact Card** button and owner-mode view switching.
- Enlarged the cyan U-with-triangle Home Screen icon substantially.
- Changed LinkedIn and One-Pager buttons to open their external destinations directly.
- Added return/resume handling so the app does not remain on a blank external/intermediate page.
- Replaced startup screens with a dark branded launch treatment.
- Existing Home Screen installations must be removed and added again to receive the new icon.

- Version 14: slightly reduced the Home Screen icon mark size to create cleaner top/bottom padding, and embedded a professional contact photo in `inna-arbo.vcf` so the image appears when the contact is saved.


## Version 16 - original one-pager preserved

- Built from Version 14; the redesigned Version 15 one-pager is not included.
- Includes the user's original `ZigZagUp_OnePager.pdf` byte-for-byte, without redesign, reformatting, cropping, or content changes.
- The card's One-Pager button opens the hosted original PDF directly.
- The stable `/one-pager/` URL stored in the vCard redirects to the same original PDF.


## Version 17 - refined mobile one-pager

- Restores the responsive Version 15 one-pager direction while removing decorative triangles and the hero illustration.
- Replaces the hero copy with: “ZigZagUp makes reasoning visible—turning hidden thinking patterns into targeted repair, measurable growth, and stronger judgment.”
- Keeps the period after **answers.** cyan.
- Centers “Let's make judgment measurable.”
- The **Original PDF** button opens a closable in-page preview of the exact user-supplied PDF. The optional **Open / Save** action opens the original file separately, so the Home Screen web app is not trapped on a raw PDF screen.
