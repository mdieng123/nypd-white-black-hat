# PROJECT.md: NYPD White Hat / Black Hat (CMSC471 Assignment 2)

> **For AI assistants:** This file is the team plan. Follow it. Only edit the files your person owns (see "Who owns what"). Write code like our labs and Assignment 1: plain `<script>` files with global functions, `d3.csv().then()`, `.on('mouseover')` tooltips, simple loops and comments. No modules, classes, build tools or fancy syntax. Keep the page plain (Arial, black text, little bold). **Write all page text in plain, simple sentences with no dashes (no "—" or "–").**

## Assignment
Two charts from the same data: a **white hat** (clear and honest) and a **black hat** (misleading on purpose, but subtle and trustworthy looking). Each needs a 200 to 500 word write up on the page. The page also needs references, a development process section and an AI usage section. Submit a zip with the page URL and a demo video.

Grading: the black hat gets "Excellent" if it misleads in **at least 2 of 3 categories** (marks/encodings, data transformation, titles/labels), the tricks are **subtle**, and it still **looks trustworthy** (title, legend, labels all present).

## Question
**How often are complaints against NYPD officers substantiated, and does it depend on the type of allegation or the officer's rank?**

## Data
ProPublica, *Civilian Complaints Against New York City Police Officers* (from the NYC Civilian Complaint Review Board, CCRB).
- 33,358 allegations from 12,056 complaints against 3,996 officers, cases closed September 1985 to January 2020.
- **One row = one allegation.** One complaint can have several allegations.
- **Bias:** only officers still on the force in June 2020 with at least one substantiated allegation, and allegations ruled "unfounded" were removed. This makes substantiation rates look higher than for all CCRB complaints.
- Outcomes: **Substantiated** (broke NYPD rules), **Exonerated** (happened, but rules allowed it), **Unsubstantiated** (couldn't confirm what happened).

`scripts/prepare_data.py` turns the raw file into **`data/allegations_summary.csv`**, which both charts load:
```
allegation_type,rank,outcome,count
Force,Police Officer,Substantiated,795
```
- `allegation_type`: Abuse of Authority, Discourtesy, Force, Offensive Language
- `rank` (at the time of the incident): Police Officer, Sergeant, Detective, Lieutenant, Captain and above
- `outcome`: Substantiated, Exonerated, Unsubstantiated
- `count`: number of allegations

Key numbers (all allegations): Substantiated 8,301 (24.9%), Exonerated 9,609 (28.8%), Unsubstantiated 15,448 (46.3%).

The raw CSV is not in the repo. Get it from the ProPublica link in the README if you need to rerun the script.

## Who owns what
```
index.html            A sets it up. Each person writes their own sections in it.
css/style.css         shared (ask before big changes)
js/main.js            A  loads the data, calls drawWhiteHat(data) and drawBlackHat(data)
js/tooltip.js         shared  showTooltip(event, html), hideTooltip()
js/whiteHat.js        A  DONE
js/blackHat.js        B  placeholder now, B replaces it (keep the function name drawBlackHat)
scripts/prepare_data.py, data/   A  DONE
LOG.md                everyone
```

## White hat (A, done)
Two 100% stacked horizontal bar charts (by allegation type, and by rank) showing all three outcomes separately, 0% to 100% axis, neutral blue and gray colors, legend, percent labels, total allegations per bar, tooltips with exact counts, a note defining each outcome and explaining the bias. Write up is on the page.

## Black hat (B)
**Story: "NYPD officers are almost always cleared."**

Chart: horizontal bars, one per allegation type, showing the percent of allegations where the officer was "cleared". Use these four tricks:
1. **Data transformation:** merge Exonerated and Unsubstantiated into one group. Shares this gives: Force 87%, Offensive Language 83%, Discourtesy 78%, Abuse of Authority 70%, all allegations 75%.
2. **Labels:** call that merged group **"Officer cleared"** (unsubstantiated really means not enough evidence, not cleared).
3. **Data + labels:** the data counts allegations, but call them **"complaints"** in the title, subtitle, axis and tooltip, so totals sound bigger and more official (33,358 "complaints" instead of 12,056 real complaints).
4. **Encodings:** make the "Officer cleared" bars a strong, dark color that dominates, and the substantiated part a pale, thin sliver that's easy to skip.

Everything else must look official and trustworthy: a clean title, legend, axis labels, a tooltip, and a source line citing ProPublica (that doesn't mention the bias). **Do not** use a truncated axis, 3D or pie charts (too obvious).

Keep a list of every trick as you build it. The black hat write up (200 to 500 words) explains each trick and how it changes what the reader believes.

## C's part
- Make both charts look equally polished (the black hat must look trustworthy) and check that the white hat reads easily.
- Write the **Development Process** section (who did what, people hours, what took longest) from `LOG.md`.
- Fill in the B and C parts of the **AI Usage** section.
- **AI extra credit (up to 6 points):** it only counts if AI is used in a "novel, reflective" way, not just to write code. Idea: show the black hat chart to an AI chatbot without telling it it's misleading, ask what it concludes, and record whether it catches the four tricks. Then do the same with the white hat. Write up what happened and what it says about how convincing black hat charts are. Put it in the AI Usage section and in an "Extra Credit Features" section of the Canvas submission.
- Record the demo video (a few minutes, show both charts and the tooltips) and make the zip (page URL + video).

## Team rules
1. Pull before you start, and commit small changes often.
2. Test in the browser before pushing (`python3 -m http.server`, open `localhost:8000`) and check the console for errors.
3. Add a line to `LOG.md` every time you work: date, person, hours, files, what you did and how you used AI.
