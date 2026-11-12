# NYPD Complaint Outcomes: White Hat and Black Hat

CMSC471 Assignment 2. Two charts from the same NYPD complaint data, one honest and one misleading on purpose.

Live site: https://mdieng123.github.io/nypd-white-black-hat/

## Status: where to pick up
**Person A is done:** data cleaning, repo and page setup, the white hat charts (`js/whiteHat.js`), the white hat write up, and references.

**Person B, next:**
1. Replace the placeholder in `js/blackHat.js` with the black hat chart. The plan and the four tricks are in `PROJECT.md`.
2. Write the Black Hat Write Up section in `index.html`.

**Person C, next:**
1. Polish both charts so they look equally trustworthy.
2. Write the Development Process section and the B and C parts of AI Usage in `index.html`.
3. Do the AI extra credit experiment (see `PROJECT.md`), record the demo video and make the zip.

**For everyone's AI assistant:** read `PROJECT.md` first, and copy the style of `js/whiteHat.js` and our lab code. Keep page text plain with no dashes. Add a line to `LOG.md` every time you work.

## Run locally
```bash
python3 -m http.server
```
Then open http://localhost:8000.

## Data
`data/allegations_summary.csv` is already in the repo, so you don't need the raw file. To rebuild it, download the zip from [ProPublica](https://www.propublica.org/datastore/dataset/civilian-complaints-against-new-york-city-police-officers), put `allegations_202007271729.csv` in `data/raw/`, then run:

```bash
python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
.venv/bin/python scripts/prepare_data.py
```
