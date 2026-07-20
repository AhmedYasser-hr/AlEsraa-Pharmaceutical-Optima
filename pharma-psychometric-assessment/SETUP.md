# Setup guide

> **What's new in this version:** candidates now see a full results page right after
> submitting (overall match %, per-trait bands, strengths/development areas — styled like
> the reference screenshot you shared), the same page is available to you as a recruiter via
> a link in the notification email, and each email address can only complete the assessment
> once.


This package is a self-contained website plus a Google Apps Script backend that stores every
candidate's results in a Google Sheet and emails you a summary the moment someone finishes the
test.

Files:
- `index.html`, `styles.css`, `config.js`, `dom.js`, `data.js`, `scoring.js`, `results-view.js`, `app.js` — the candidate-facing assessment site.
- `results.html` — a recruiter-only page that shows one candidate's full results (linked from the notification email).
- `assets/logo-full.png`, `assets/logo-mark.png` — the ALESRAA logo, trimmed and made transparent from the file you provided (full lockup for the landing page, icon-only for the header bar on every screen).
- `apps-script.gs` — the backend: Google Sheet storage + email notifications + once-per-email lookups.

**Important:** when you host the site (step B), keep the `assets` folder together with the HTML/CSS/JS files — the logo won't show up if it's left behind.

Two things to do: **(A)** stand up the backend, **(B)** connect the website to it and put the
website online.

---

## A. Backend — Google Sheet + email (10 minutes)

1. Go to [sheets.google.com](https://sheets.google.com) and create a new blank spreadsheet.
   Name it something like "Pharma Assessment Responses".
2. In the Sheet, go to **Extensions → Apps Script**. A code editor opens in a new tab.
3. Delete whatever placeholder code is in `Code.gs`, and paste in the entire contents of
   `apps-script.gs` from this package.
4. Near the top, change these two lines:
   ```js
   const ADMIN_EMAIL = "you@example.com,another-admin@example.com";
   const SITE_URL = "PASTE_YOUR_SITE_URL_HERE";
   ```
   `ADMIN_EMAIL` — your real email address(es); comma-separate for more than one person.
   `SITE_URL` — the base URL where you'll host the site in step B (no trailing slash), e.g.
   `https://your-site.netlify.app`. This is only used to build the "view full results" link in
   your notification emails — if you don't know it yet, you can leave the placeholder for now
   and come back to update it once your site is live (**Deploy → Manage deployments → edit →
   New version** after changing it).
5. Optional but recommended: test it before going live. In the toolbar dropdown that lists
   functions, choose **testSetup**, then click **Run**. The first time, Google will ask you to
   authorize the script (it needs permission to edit the sheet and send email as you) — click
   through **Advanced → Go to project (unsafe)**, this warning just means it's a script you
   wrote yourself, not a public app. After it runs, check that:
   - a "Responses" tab appeared in your spreadsheet with a test row, and
   - you received a test email.
   Run **testSetup** a second time — it should NOT create a second row or send a second email,
   since `test@example.com` now already exists (this confirms the once-per-email logic works).
6. Now deploy it as a web app: **Deploy → New deployment**.
   - Click the gear icon next to "Select type" → choose **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**, authorize again if asked.
7. Copy the **Web app URL** it gives you (ends in `/exec`). You'll need it in step B.

> Every future submission just appends a new row — you don't need to redeploy or touch the
> script again unless you want to change the notification email.

---

## B. Website — connect it and put it online

1. Open `config.js` in this package and find:
   ```js
   const CONFIG = {
     SCRIPT_URL: "PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE",
     ...
   ```
   Replace the placeholder with the Web app URL you copied in step A7. (Only `config.js` needs
   this — both `index.html` and `results.html` read from it.)
2. Host **all the files in this package together**, in the same folder (don't skip
   `results.html` — that's the recruiter view). Any of these work and are free:
   - **Netlify Drop** — [app.netlify.com/drop](https://app.netlify.com/drop): drag the folder in, get a live link instantly.
   - **GitHub Pages** — push the folder to a repo, enable Pages in repo settings.
   - **Manus**, or whatever tool you used for the original link — upload/replace the files there.
3. Copy the live URL you get and paste it into `SITE_URL` back in `apps-script.gs` (step A4), then
   redeploy the script (**Deploy → Manage deployments → pencil icon → New version → Deploy**) so
   notification emails link to the right place.
4. Test it yourself end-to-end once it's live: fill it out as if you were a candidate, submit,
   confirm you land on a results page, confirm a row appears in the Sheet, and confirm the email
   you receive contains a working "view full results" link.

### Sending a specific test to a specific candidate

Every candidate sees a dropdown to pick their role. If you'd rather send someone a link that's
pre-set to their role (skipping the dropdown), add `?role=` and one of these IDs to your site's
URL:

| Role | URL parameter |
|---|---|
| Quality Control — In-Process Control (IPC) | `qc-ipc` |
| Quality Control — Stability & Methodology | `qc-stability` |
| Quality Control — Microbiology | `qc-micro` |
| Production Department | `production` |
| Process Optimization | `process-optimization` |
| Quality Assurance | `qa` |
| Research & Development (R&D) | `rnd` |

Example: `https://your-site-url.com/?role=qa`

---

## What gets stored per candidate

Each row in the "Responses" sheet has: timestamp, a unique submission ID, name, email, phone,
department, overall match % and verdict, each of the 5 trait scores (raw 4–20) with
Low/Moderate/High band, their situational-judgment answer and whether it matched the recommended
best-practice response, and a full JSON column (everything above plus every individual item
response) used to power the results pages.

## Once per email

Before a candidate starts, the site checks whether their email has already submitted. If so,
they're shown their previously recorded results immediately instead of being able to retake the
test. This check requires the backend to be configured — without it (`CONFIG.SCRIPT_URL` still a
placeholder), the site can't enforce this and will let anyone start the test.

## Results pages

- **Candidate view**: shown automatically right after submitting — overall match %, a
  recommendation, each trait's score/band on a Low–Moderate–High scale, key strengths, areas for
  development, and a note if their situational-judgment answer wasn't the recommended one.
- **Recruiter view** (`results.html?id=...`): the same page, plus the candidate's contact info at
  the top. The link is included automatically in each notification email.

The overall match % and Strong/Moderate/Below Target Fit verdict are a straightforward composite
(total points earned ÷ total points possible across the 5 traits) built on top of the battery's
own Low/Moderate/High trait bands — the source document doesn't define a composite score, so this
was added to match the layout you shared. Thresholds and wording are in `scoring.js`
(`OVERALL_BANDS`, `buildRecommendation`) if you'd like to adjust them.

## Branding

The site's colors are pulled directly from your logo: the deep maroon (`#852725`) is used for
headers, buttons, and primary accents, and the warm slate gray (`#6B6360`) for secondary text.
"Strong Fit" / high-trait indicators use a separate muted green so a positive result doesn't read
as an alert — everything else (moderate = amber, low/below target = a warmer red) stays close to
the brand red family. All of this lives in the `:root` variables at the top of `styles.css` if
you want to tweak it.

## Notes

- This uses your personal/organizational Google account's free Sheets + Apps Script + Gmail
  sending quota — there's no extra cost or third-party service involved.
- If you'd rather store results somewhere else (Airtable, a real database, Slack notification,
  etc.) instead of Google Sheets, the front-end doesn't need to change — just point
  `CONFIG.SCRIPT_URL` at a different endpoint that accepts the same JSON payload shape shown in
  `apps-script.gs`.
