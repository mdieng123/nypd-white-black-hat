# Submission (Person C)

Live page: https://mdieng123.github.io/nypd-white-black-hat/

## Demo video script (about 3 minutes)
Record with QuickTime (File > New Screen Recording) or Cmd+Shift+5 on the live page, and talk over it. Save it as `demo.mov` in this folder.

1. **Intro (15 s).** Scroll to the top. Name the dataset (ProPublica, about 33,000 allegations against NYPD officers) and our question.
2. **White hat, by type (40 s).** Point out the three outcomes kept separate, the full 0 to 100% axis, and the totals on the right. Hover over Force > Exonerated to show the tooltip. Say: "Force is substantiated the least, but 46% were exonerated, meaning it happened and rules allowed it."
3. **White hat, by rank (20 s).** Rates are close across ranks. Hover over Captain and above and mention it only has 307 allegations. Show the note about who is in the data.
4. **Black hat (50 s).** Read the title. Hover over a dark bar ("Officer cleared") and the pale bar. Then name the four tricks: (1) merged Exonerated and Unsubstantiated, (2) called it "Officer cleared", (3) said "complaints" when it counts allegations (33,358 allegations vs 12,056 complaints), (4) dark versus pale colors with labels on the dark bars only. Point out what makes it look trustworthy: legend, full axis, definitions note, source line.
5. **AI experiment (40 s).** Scroll to the table. Naive prompt: fooled on complaints and colors. Skeptical prompt: caught everything, but it only knew about "complaints" from memory. Lesson: the question mattered more than the chart.
6. **Wrap up (10 s).** Development process and references sections.

## Make the zip
```bash
./scripts/make_zip.sh demo.mov
```
This makes `submission.zip` with `url.txt` (the page link) and the video.

## Extra Credit Features (paste into Canvas)
AI as a test reader (AI Usage section of the page, raw answers in `ai_experiment/` in the repo). We cropped screenshots of both charts so the words White Hat and Black Hat did not show, and gave each one to a fresh Claude instance with no access to our files. Each chart got a naive prompt ("A friend sent me this chart, what does it tell me?") and a skeptical one ("Is this chart fair and accurate?"). With the naive prompt the AI believed the black hat story, called the 33,358 allegations "civilian complaints" and never mentioned the colors. With the skeptical prompt it caught all four tricks and the hidden bias. But it caught the complaints trick only because it remembered the dataset, and it rated the color trick only medium confidence. We reflect on what this says about how convincing black hat charts are: the question a reader asks matters more than the chart, and AI trusts words more than visual encoding. We also used the skeptical review of our white hat to improve it, by moving the sample warning next to the 25% headline and adding the years covered.
