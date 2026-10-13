# Magadh Pain & Paralysis Clinic website

Static multi-page website for GitHub Pages and the custom domain `magadhphysiotherapy.in`.

## Files
- `index.html` — homepage
- `about.html` — clinic and approach
- `services.html` — detailed condition/service guide
- `contact.html` — phone, address, hours and map
- `assets/style.css` — responsive visual system
- `assets/main.js` — mobile navigation and current footer year
- `assets/favicon.svg` — simple site icon
- `robots.txt`, `sitemap.xml` — basic crawler files
- `CNAME` — GitHub Pages custom domain

## Publish to GitHub Pages
1. Download and unzip the package.
2. Open the existing repository connected to `magadhphysiotherapy.in` (the previously used GitHub account/repository was `navneetchandra34-dotcom`).
3. Back up the current files before replacing them.
4. Upload the **contents** of this folder to the repository root—not the containing folder itself. Ensure `index.html` and `CNAME` are at root level.
5. In repository **Settings → Pages**, confirm the publishing source/branch is the one you use (typically `main` / root).
6. Keep the custom domain as `magadhphysiotherapy.in`. The `CNAME` file is included.
7. After deployment, test `https://magadhphysiotherapy.in`, `https://magadhphysiotherapy.in/services.html`, and the mobile menu.
8. In Google Search Console, inspect the homepage and submit `https://magadhphysiotherapy.in/sitemap.xml`.

## Before going live: verify these details
- The clinic phone number used in the existing HTML was `+91 91997 26999`; confirm this is the correct public number.
- The email shown in the older mockup (`magadhpainclinic@gmail.com`) was not added because it was not confirmed in the existing source HTML.
- The design uses a stock healthcare image from Unsplash in the homepage hero. Replace it with a licensed, authentic clinic photograph for strongest local trust. A second decorative image URL is intentionally hidden by fallback and should be replaced with a relevant licensed photo or removed.
- Replace the Dr. Umesh Chandra portrait placeholder with an approved, authentic photo and add a verified professional biography/registration details if appropriate.
- No unverified statistics, outcome rates, credentials beyond the existing “Senior Physiotherapist · Ex-NIMHANS” wording, or patient testimonials are presented as established facts.
- Check all copy with the clinic and confirm current hours, address, phone and services before launch.

## Notes
This package is framework-free and can be hosted on GitHub Pages. Google Fonts and the homepage stock image require an internet connection. The contact CTA uses `tel:`; no appointment form/backend is included, so no personal health information is collected by the site.


## Clinic-supplied image assets

The site includes optimised local image assets under `assets/images/`:
- `clinic-logo.jpg` — clinic logo used in the site header and touch icon
- `favicon.jpg` — favicon image supplied by the clinic
- `clinic-building.jpg` — clinic exterior
- `clinic-team.jpg` — clinic/team photograph
- `dr-umesh-chandra.jpg` — clinician portrait supplied for the profile
- `patient-therapy-1.jpg`, `patient-therapy-2.jpg`, `patient-rehabilitation.jpg` — rehabilitation photographs

All image references are local, so the pages do not depend on third-party image hosting. Before publishing, confirm permission/consent for identifiable people shown in patient photographs and verify that the clinician portrait is the correct person.
