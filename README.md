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
**KNIME Hub:** https://hub.knime.com/s/uQpubRgqKNzYHP0q

---

## Folder Structure

```
project-dv_group49/
├── /assets/
│   ├── logo.png
│   └── logo2.png
│   ├── markus.png
│   ├── damian.png
│   └── jack.png
├── /css/
│   ├── base.css
│   ├── dashboard.css
│   └── visualisations.css
├── /data/
│   ├── ProcessedFines.csv
│   ├── ProcessedFatalities.csv
│   ├── Q1_Fines_By_Offence_Overall.csv
│   ├── Q1_Fines_By_Offence_Detailed.csv
│   ├── Q2_Enforcement_By_State.csv
│   ├── Q3_Age_Offence_Heatmap.csv
│   ├── Q4_Fatalities_Trend_By_Year.csv
│   ├── Q5_Fatalities_By_State.csv
│   ├── Q6_Crash_Types_By_Road_User.csv
│   ├── Q7_Fines_vs_Fatalities_By_State.csv
│   ├── /KNIME/
│   │   └── DV_Group49_DataProcessing.knwf
│   └── /raw_data/
│       └── australia_states.geojson
├── /docs/
│   └── Project Design Book Group49.docx
├── /js/
│   ├── data-loader.js
│   ├── init-global-state.js
│   ├── interactions.js
│   ├── shared-constants.js
│   ├── q1-fines-by-offence.js
│   ├── q2-enforcement-by-state.js
│   ├── q3-age-offence-heatmap.js
│   ├── q4-fatalities-trend-by-year.js
│   ├── q5-fatalities-by-state.js
│   ├── q6-crash-types-by-road-user.js
│   └── q7-fines-vs-fatalities-by-state.js
├── index.html
├── visualizations.html
├── maps.html
├── about.html
├── .gitignore
└── README.md
```

**Key Files:**
- **HTML Pages:** 4 pages (index, visualizations, maps, about)
- **CSS:** 3 stylesheets (base, dashboard, visualisations)
- **JavaScript:** 11 files (4 utilities + 7 chart files)
- **Data:** 2 processed datasets + 8 aggregated CSVs + 1 GeoJSON
- **Assets:** 2 logo files
- **Docs:** Design book (Word document)

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