# Work log

One line per work session. This feeds the Development Process and AI Usage sections.

Format: `date | person | hours | files | what you did and how you used AI`

| Date | Person | Hours | Files | Notes / AI usage |
|---|---|---|---|---|
| 2026-11-12 | A | 0.5h | planning | Picked the dataset, question, black hat story and tricks with the group from options Claude laid out; downloaded the ProPublica data |
| 2026-11-12 | A | 0.5h | scripts/prepare_data.py, data/, js/whiteHat.js, index.html, PROJECT.md | Handed the data cleaning, page setup, white hat charts and white hat write up draft to Claude, which also checked the numbers and tested the page in the browser |
| 2026-11-12 | B | 1 hr | js/blackHat.js | Had ChatGPT read the project files and write the black hat chart using the four tricks the group agreed on. It also checked the CSV totals and JavaScript syntax. |
| 2026-11-12 | B | 1 hr | index.html, LOG.md | Had ChatGPT draft the black hat write up explaining each trick, then copied it into the page. ChatGPT reviewed the HTML placement and helped write the log entries. Browser testing remains to be completed locally. |
| 2026-11-13 | C | 2 hr | js/blackHat.js, index.html, LOG.md | Used Claude Code to compare both charts in a headless browser and polish them (matching ticks, a definitions note on the black hat, a source line on the white hat, hover hints), and to draft the Development Process and AI Usage sections from this log. For the extra credit, cropped each chart so the words White Hat and Black Hat were hidden and showed them to four fresh Claude instances with no project context (naive and skeptical prompt for each chart), then compared the answers against our list of tricks. |
| 2026-11-13 | C | 1 hr | index.html, demo video | Edited the AI Usage section by hand. Recorded and narrated the demo video of both charts, the tooltips and the AI experiment. Used Claude Code to put everyone's names on the page, fix the LOG.md table and check the page was ready to submit. |
