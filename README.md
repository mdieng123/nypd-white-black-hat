# NYPD Complaint Outcomes: White Hat and Black Hat

CMSC471 Assignment 2. Two charts from the same NYPD complaint data, one honest and one misleading on purpose.

Live site: https://mdieng123.github.io/nypd-white-black-hat/

## Status
All three parts are done: data and white hat (Mouhamadou Dieng), black hat (Meksud Buser), and polish, development process, AI usage, the AI experiment and the demo video (Buruk Ayalew). See `SUBMISSION.md` for the video script, the zip script and the Extra Credit text for Canvas. The raw AI experiment answers are in `ai_experiment/`.

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
