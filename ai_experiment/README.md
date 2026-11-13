# AI experiment: can an AI spot our black hat tricks? (Person C, extra credit)

Run on 2026-11-13. The write up is in the AI Usage section of `index.html`. This file keeps the raw evidence.

## Method
- Took headless Chrome screenshots of the page and cropped each chart so the words "White Hat" and "Black Hat" do not show.
  - `chart_a_black_hat.png` was shown to the AI as `chart_a.png`
  - `chart_b_white_hat.png` was shown as `chart_b.png` (this was before we added "In this data" and the years to the white hat text)
- Each image went to a fresh Claude instance (a Claude Code subagent started with no project context). Each instance was told to open only that one image file and answer as it would in a normal chat.
- Two prompts per chart, four runs in total:
  - **Naive:** "A friend sent me this chart. What does it tell me? Give me the main takeaway in 2 to 3 sentences, then the key facts I should remember."
  - **Skeptical:** "Is this chart fair and accurate? Point out anything in it that could mislead a reader, and say how confident you are about each point."
- Limits: one run per prompt, Claude only, and the image path included the project folder name.

## Scorecard (black hat)
| Trick | Naive | Skeptical |
|---|---|---|
| 1. Merge Exonerated + Unsubstantiated | Partly | Caught |
| 2. Label it "Officer cleared" | Partly (caution added, headline repeated) | Caught, high confidence |
| 3. Allegations called "complaints" | Fooled ("33,358 civilian complaints") | Caught, "as I recall" (from memory of the dataset) |
| 4. Dark cleared / pale substantiated | Fooled (not mentioned) | Caught, medium confidence ("subjective") |
| Hidden selection bias | Not mentioned | Caught, medium confidence |

---

## Run 1: black hat, naive prompt
> **Main takeaway:** Of 33,358 civilian complaints against NYPD officers, about 3 in 4 ended without the review board finding that the officer broke the rules. That pattern holds for every complaint type. The most serious-sounding category, Force, has the highest clearance rate at 87%.
>
> **Key facts to remember:**
> - **Overall:** 75% of complaints ended with the officer "cleared." Only about 25% were substantiated, meaning the board found a rule violation.
> - **By type (cleared rate / number of complaints):** Force 87% (7,636), Offensive Language 83% (753), Discourtesy 78% (4,677), Abuse of Authority 70% (20,292)
> - **Abuse of Authority dominates.** It makes up about 61% of all complaints, and it is also the type most likely to be substantiated (about 30%).
> - **Force complaints are the least likely to be upheld.** Only about 13% were substantiated.
> - **Source:** ProPublica's database of NYC Civilian Complaint Review Board records.
>
> **One caution before you repeat the headline:** "Cleared" here just means "not substantiated." That bucket usually lumps together several different outcomes: the officer was shown not to have done it, the conduct happened but was within the rules, there wasn't enough evidence to decide either way. So "almost always cleared" is accurate as a count, but it doesn't mean the officers were found innocent. A large share of these cases may simply have lacked enough evidence. The chart also doesn't show what discipline, if any, followed the substantiated cases.

Our notes: it accepted "complaints" and the headline ("accurate as a count"). It never mentioned the colors. Its caution lists "shown not to have done it" (unfounded), which is not in this dataset.

## Run 2: black hat, skeptical prompt
> **Short answer:** The numbers in this chart agree with each other, and the layout is honest. The problems are in the wording: the title, the label "Officer cleared," and the word "complaints" all push the reader toward a stronger conclusion than the data supports.
>
> **What's fine:** The four category counts add up to the stated total (33,358). The 75% headline matches the four bars once you weight each bar by its count (about 75.3%). The axis runs from 0 to 100% and every bar is a full 100% bar, so nothing is visually exaggerated.
>
> **Things that could mislead:**
> 1. **"Officer cleared" isn't what most of those outcomes mean.** Confidence: high. It merges Exonerated (conduct happened but lawful), Unsubstantiated (couldn't tell) and possibly Unfounded. For Force, much of the 87% is probably "exonerated."
> 2. **The title overstates the data.** Confidence: high. "Almost always cleared" doesn't fit 75%, and fits Abuse of Authority (70%) even less.
> 3. **These are probably allegations, not complaints.** Confidence: fairly high. As I recall, the ProPublica CCRB dataset has one row per allegation, and 33,358 matches its allegation count. The number of actual complaints is much lower (I believe roughly 12,000).
> 4. **The data covers only some officers, and the chart doesn't say so.** Confidence: medium. As I recall, ProPublica's release included only officers still on the force with at least one substantiated allegation. The chart also doesn't state the years covered.
> 5. **One category drives the overall figure.** Confidence: high. Abuse of Authority is about 61% of the records.
> 6. **The design downplays the substantiated share.** Confidence: medium. The design is subjective, but "cleared" is a heavy dark color with a label, and "substantiated" is a pale gray, nearly the background color, with no percentage on it.
> 7. **A small inconsistency.** "Hover over a bar to see exact numbers" doesn't work in a static image.
>
> **Bottom line:** The arithmetic is sound. A reader would come away with an exaggerated sense that officers are found innocent. Renaming the category to "Not substantiated," toning down the title, and stating the unit and dataset scope would make it fair.

## Run 3: white hat, naive prompt
> **Main takeaway:** About 1 in 4 allegations (25%) were substantiated. Force allegations were the least likely to be substantiated, at 13%, but 46% of force allegations were "exonerated," meaning the force did happen and NYPD rules allowed it. The officer's rank makes little difference to the outcome.
>
> **Key facts:** It restated the three outcome definitions, the rates for every type (Abuse of Authority 30/29/41, Force 13/46/41, Discourtesy 22/about 5/73, Offensive Language 17/almost none/83), and the rank range (19% to 26%). It noted that higher ranks are exonerated more often and that Captain and above has only 307 allegations. It repeated the data limits: allegations, not complaints, only officers still on the force in June 2020 with at least one substantiated allegation, unfounded allegations left out, "Don't read the 25% as the overall rate for all complaints."

## Run 4: white hat, skeptical prompt
> **Short answer:** The chart is mostly fair and accurate. Its numbers are consistent with each other and it uses honest 0 to 100% scales.
>
> **What holds up:** Rows add to about 100%. Both panels add up to 33,358 allegations. The weighted substantiated rate is about 24.7%, so "about 1 in 4" is correct for this dataset. Full 0 to 100% range, sensible sorting, terms defined.
>
> **Things that could mislead:**
> 1. **The "1 in 4 substantiated" headline is not a general rate.** High confidence. The sample limits are only in the small footnote, far from the headline.
> 2. **The sample could distort the comparison between ranks.** Medium confidence.
> 3. **"Close across ranks" plays down the gap** (19% vs 26% is about 37% more in relative terms). Medium confidence.
> 4. **The small-sample warning is uneven** (Captain and above gets one, Offensive Language and Lieutenant don't).
> 5. **Allegations are not independent.** Medium confidence.
> 6. **No time period is shown.** Medium confidence.
> 7. **Small labelling gaps** (Discourtesy's 5% exonerated slice is unlabeled, Offensive Language's exonerated share is invisible).
> 8. **How "exonerated" is explained.** Low confidence this is a problem.
>
> **Bottom line:** I found no wrong numbers or visual tricks. To make it clearly fair, move the sample limits up next to the 25% headline, give the time period, and soften "close."

Our response: we fixed points 1 and 6 on the page.
