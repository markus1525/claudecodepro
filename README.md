# Australian Road Safety Enforcement: Interactive Data Explorer

## Team: Group 49

| Name | SUT ID | Role |
|------|--------|------|
| Min Thu Kyaw Khaung (Markus) | 105684881 | Visualizations |
| Thet Hein Aung (Damian) | 105684373 | Website |
| Sai Lyan Hein (Jack) | 105684386 | Data Processing |

## Project Overview

Interactive dashboard visualizing Australian road safety enforcement (2020-2024) with 7 D3.js visualizations. Answers questions about enforcement patterns, fatality trends, and enforcement effectiveness.

**Website:** https://mercury.swin.edu.au/cos30045/s105684881/project-dv_group49  
**GitHub:** https://github.com/COS30045-Inti-Subang/data-visualisation-project-dv_group49

---

## Folder Structure

```
data-visualisation-project-dvgroup49/
├── /data/
│   ├── /raw/ (original CSVs)
│   ├── /processed/ (cleaned data)
│   ├── /aggregated/ (Q1-Q7 visualization CSVs)
│   └── /KNIME/ (DV_Group49_DataProcessing.knwf)
├── /website/
│   ├── index.html, visualizations.html, maps.html, about.html
│   ├── /css/ (base.css, dashboard.css, visualisations.css)
│   ├── /js/ (7 chart files, data-loader.js, interactions.js)
└── /docs/ (Design Book)
```

---

## Finalized Datasets Used

**Source:** BITRE (Bureau of Infrastructure and Transport Research Economics)

| Dataset | Records | Usage |
|---------|---------|-------|
| ProcessedFines.csv | 11,960 | All enforcement visualizations |
| ProcessedFatalities.csv | 5,951 | All fatality visualizations (2020-2024) |
| Q1-Q7 aggregated CSVs | 4-140 | Individual chart data |

**Processing:** KNIME workflow → cleaned, standardized age groups, consolidated detection methods

---

## GenAI Usage Statement

### What We Did Ourselves:
- Collected & cleaned data in KNIME (removed duplicates, standardized age groups, handled missing values)
- Designed all 7 visualizations and decided chart types (donut, heatmap, maps, etc.)
- Built the website structure and layout from scratch
- Tested everything on different devices and fixed bugs

### Where We Used Claude AI:
- **D3.js & JavaScript:** We used Claude to understand how D3 works and get examples for drawing charts. We then changed the code to match our data and added our own features like tooltips and filtering.
- **Website styling (CSS):** Asked Claude how to make the website work on mobile phones and tablets. We wrote most CSS ourselves but used Claude to check responsive design patterns.
- **Data processing:** Used Claude to help write KNIME Rule Engine expressions for transforming age data, but we figured out the logic ourselves.
- **Learning help:** Asked Claude questions when we were stuck, like "how do I make a hover effect work" or "what's the best way to update charts when filters change"

### Important Note:
We didn't copy-paste code from Claude. We read the examples, understood what they do, tested them with our data, and changed things that didn't work. All the JavaScript files, KNIME workflows, and website code have been tested and modified by our team to fit our project needs.

---

## 7 Interactive Visualizations

Q1: Fines by Offence | Q2: Enforcement Map | Q3: Age vs Offence Heatmap | Q4: Fatality Trends | Q5: Fatality Rate Map | Q6: Crash Types | Q7: Fines vs Fatalities

**Features:** Interactive tooltips, state/year filtering, responsive design, accessibility (WCAG AA)

---
# claudecodepro
