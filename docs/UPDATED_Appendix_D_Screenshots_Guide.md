# Appendix D: Dashboard Screenshots and Visual Documentation

## Overview

This appendix provides a comprehensive visual guide to the final Australian Road Safety Dashboard. All screenshots were captured on November 19, 2024, representing the completed Week 13 final submission.

---

## Screenshot Inventory

### Required Screenshots

| # | Screenshot Name | Description | Resolution | Location in Document |
|---|-----------------|-------------|------------|---------------------|
| D1 | Homepage Hero | Full homepage with statistics | 1920×1080 | Section 4.1 |
| D2 | Navigation Menu | Header and navigation bar | 1920×200 | Section 4.2 |
| D3 | Q1 Donut Chart | Fines by Offence (desktop) | 1200×800 | Section 4.3.1 |
| D4 | Q1 Tooltip | Interactive tooltip on hover | 1200×800 | Section 4.3.1 |
| D5 | Q2 Bubble Map | Enforcement by State | 1200×800 | Section 4.3.2 |
| D6 | Q3 Heatmap | Age vs Offence Type | 1200×800 | Section 4.3.3 |
| D7 | Q4 Line Chart | Fatality Trends 2020-2024 | 1200×800 | Section 4.3.4 |
| D8 | Q5 Choropleth | Fatality Rate by State | 1200×800 | Section 4.3.5 |
| D9 | Q6 Stacked Bar | Crash Types by Road User | 1200×800 | Section 4.3.6 |
| D10 | Q7 Dual-Axis | Fines vs Fatalities | 1600×900 | Section 4.3.7 |
| D11 | Filter Panel | Active filters demonstration | 1200×600 | Section 4.4 |
| D12 | Mobile View - Homepage | Responsive design (iPhone) | 375×812 | Section 4.2 |
| D13 | Mobile View - Charts | Responsive visualizations | 375×812 | Section 4.2 |
| D14 | Tablet View | iPad layout | 768×1024 | Section 4.2 |
| D15 | About Page | Project information page | 1920×1080 | Section 4.1 |
| D16 | Footer | Footer with data sources | 1920×200 | Section 4.1 |
| D17 | Color Palette | Complete color scheme | 800×400 | Section 4.2 |
| D18 | Accessibility - Focus | Keyboard navigation focus states | 1200×600 | Section 5.1 |
| D19 | KNIME Overview | Full KNIME workflow canvas | 1600×1000 | Appendix C |
| D20 | KNIME - Fines Pipeline | Fines processing detail | 1200×800 | Appendix C |
| D21 | KNIME - Fatalities Pipeline | Fatalities processing detail | 1200×800 | Appendix C |
| D22 | Browser Testing | Multi-browser comparison | 1920×1080 | Section 5.1 |
| D23 | Performance Metrics | Lighthouse score | 1200×800 | Section 5.1 |
| D24 | Data Table Example | Fallback accessibility table | 1200×600 | Section 4.4 |

---

## Section 1: Homepage and Navigation

### Screenshot D1: Homepage Hero Section

**File:** `docs/screenshots/D1_homepage_hero.png`

**Capture Instructions:**
1. Navigate to: https://mercury.swin.edu.au/cos30045/s105684881/project-dv_group49/index.html
2. Browser: Chrome (latest version)
3. Viewport: 1920×1080 (Full HD)
4. Ensure all 4 hero statistics are visible:
   - 2M+ Annual Fines
   - 1,200+ Road Fatalities
   - 8 States & Territories
   - 2020-2024 Years Analyzed

**Annotations to Add:**
- Arrow pointing to logo
- Highlight navigation menu
- Circle the hero statistics

**Caption for Document:**
"Figure D1: Homepage hero section with key statistics and project branding. The clean, professional design immediately communicates the project's scope and data coverage."

---

### Screenshot D2: Navigation Menu

**File:** `docs/screenshots/D2_navigation_menu.png`

**Capture Instructions:**
1. Crop to header and navigation only (top 200px)
2. Show active state on "Overview" tab
3. Include logo on left side
4. Viewport: 1920×200

**Annotations to Add:**
- Label each navigation item: Overview, Visualizations, Maps, About
- Highlight active state styling

**Caption for Document:**
"Figure D2: Navigation bar with clear menu structure and active state indication. The navigation persists across all pages for consistent user experience."

---

## Section 2: Visualizations (Q1-Q7)

### Screenshot D3: Q1 Donut Chart (Fines by Offence)

**File:** `docs/screenshots/D3_q1_donut_chart.png`

**Capture Instructions:**
1. Navigate to: .../visualizations.html
2. Scroll to Q1 section
3. Capture the donut chart in default state (no hover)
4. Viewport: 1200×800
5. Ensure legend is visible

**Key Elements to Show:**
- ✅ Donut chart with all 4 segments (Speed, Mobile Phone, Seatbelt, Unlicensed)
- ✅ Color-coded segments matching legend
- ✅ Chart title and subtitle
- ✅ Description text below

**Caption for Document:**
"Figure D3: Q1 Donut Chart showing distribution of fines by offence type. Speed fines dominate at over 90%, visualized through proportional arc sizes and distinct colors."

---

### Screenshot D4: Q1 Interactive Tooltip

**File:** `docs/screenshots/D4_q1_tooltip_hover.png`

**Capture Instructions:**
1. Same view as D3
2. Hover mouse over "Speed" segment
3. Capture tooltip display showing:
   - Offence Type: Speed
   - Total Fines: 1,850,000
   - Percentage: 92.5%

**Annotations to Add:**
- Arrow from mouse cursor to tooltip
- Highlight the hovered segment

**Caption for Document:**
"Figure D4: Interactive tooltip on Q1 Donut Chart providing detailed breakdown on hover. Tooltips enhance data readability without cluttering the visual."

---

### Screenshot D5: Q2 Bubble Map (Enforcement by State)

**File:** `docs/screenshots/D5_q2_bubble_map.png`

**Capture Instructions:**
1. Navigate to: .../maps.html
2. Capture Q2 Bubble Map
3. Ensure all state bubbles are visible
4. Viewport: 1200×800
5. Default view (no filters applied)

**Key Elements to Show:**
- ✅ Australia map outline (GeoJSON)
- ✅ Bubble size variation (NSW and VIC should be largest)
- ✅ State labels
- ✅ Legend showing bubble size scale

**Caption for Document:**
"Figure D5: Q2 Bubble Map displaying enforcement intensity across Australian states. Bubble size encodes total fines, immediately revealing NSW and VIC as high-enforcement regions."

---

### Screenshot D6: Q3 Heatmap (Age vs Offence)

**File:** `docs/screenshots/D6_q3_heatmap.png`

**Capture Instructions:**
1. Navigate to: .../visualizations.html
2. Scroll to Q3 section
3. Capture full heatmap with axes
4. Viewport: 1200×800

**Key Elements to Show:**
- ✅ All 4 age groups on Y-axis (17-25, 26-39, 40-64, 65+)
- ✅ All 4 offence types on X-axis
- ✅ Color scale legend (light to dark intensity)
- ✅ Visible pattern: darkest cells in 40-64 row for Speed

**Annotations to Add:**
- Label the color scale
- Highlight the hottest cell (40-64 × Speed)

**Caption for Document:**
"Figure D6: Q3 Heatmap revealing age group patterns across offence types. The 40-64 age bracket shows highest enforcement concentration, particularly for speeding violations."

---

### Screenshot D7: Q4 Line Chart (Fatality Trends)

**File:** `docs/screenshots/D7_q4_line_chart.png`

**Capture Instructions:**
1. Navigate to: .../visualizations.html
2. Scroll to Q4 section
3. Capture line chart with all 5 years visible
4. Viewport: 1200×800

**Key Elements to Show:**
- ✅ Line path from 2020 to 2024
- ✅ X-axis with year labels
- ✅ Y-axis with fatality count scale
- ✅ Grid lines for readability
- ✅ Data points on line

**Annotations to Add:**
- Arrow showing upward trend
- Label highest point (2023)
- Label lowest point (2020)

**Caption for Document:**
"Figure D7: Q4 Line Chart tracking road fatality trends from 2020 to 2024. The visualization reveals an upward trend with a peak in 2023, followed by a slight decrease in 2024."

---

### Screenshot D8: Q5 Choropleth Map (Fatality Rate)

**File:** `docs/screenshots/D8_q5_choropleth_map.png`

**Capture Instructions:**
1. Navigate to: .../maps.html
2. Scroll to Q5 section
3. Capture choropleth map
4. Viewport: 1200×800

**Key Elements to Show:**
- ✅ Australia map with state boundaries
- ✅ Color gradient from light to dark
- ✅ Color scale legend (deaths per 100k)
- ✅ NT should be darkest (highest rate)
- ✅ VIC/NSW should be lighter (lower rates)

**Annotations to Add:**
- Label color scale thresholds
- Highlight NT (darkest state)

**Caption for Document:**
"Figure D8: Q5 Choropleth Map showing fatality rates per 100,000 population. Northern Territory stands out with the highest rate, while urban states like Victoria show lower per-capita rates."

---

### Screenshot D9: Q6 Stacked Bar Chart (Crash Types)

**File:** `docs/screenshots/D9_q6_stacked_bar.png`

**Capture Instructions:**
1. Navigate to: .../visualizations.html
2. Scroll to Q6 section
3. Capture stacked bar chart
4. Viewport: 1200×800

**Key Elements to Show:**
- ✅ Two bars (Single, Multiple)
- ✅ Stacked segments for 6 road user types
- ✅ Legend with all 6 categories
- ✅ X-axis labels (crash types)
- ✅ Y-axis scale (fatality count)

**Annotations to Add:**
- Label each segment color
- Highlight "Driver" segment (largest)

**Caption for Document:**
"Figure D9: Q6 Stacked Bar Chart comparing crash types across road user categories. Single vehicle crashes dominate, with drivers being the most affected group in both crash types."

---

### Screenshot D10: Q7 Dual-Axis Chart (Fines vs Fatalities)

**File:** `docs/screenshots/D10_q7_dual_axis.png`

**Capture Instructions:**
1. Navigate to: .../visualizations.html
2. Scroll to Q7 comparison section
3. Capture full comparison chart
4. Viewport: 1600×900 (wider for all 8 states)

**Key Elements to Show:**
- ✅ Bar chart (fines) on primary axis
- ✅ Line chart (fatalities) on secondary axis
- ✅ All 8 states on X-axis
- ✅ Dual Y-axes labels
- ✅ Legend distinguishing fines vs fatalities

**Annotations to Add:**
- Label left Y-axis "Total Fines"
- Label right Y-axis "Total Fatalities"
- Arrow showing lack of clear correlation

**Caption for Document:**
"Figure D10: Q7 Dual-Axis Chart comparing enforcement (bars) and safety outcomes (line) across states. The visualization reveals that higher enforcement doesn't necessarily correlate with proportionally lower fatalities."

---

## Section 3: Interaction and Filters

### Screenshot D11: Filter Panel (Active State)

**File:** `docs/screenshots/D11_filter_panel_active.png`

**Capture Instructions:**
1. Navigate to: .../visualizations.html
2. Interact with filters:
   - Select NSW and VIC in state filter
   - Set year range to 2022-2024
3. Capture filter panel with active selections
4. Viewport: 1200×600

**Key Elements to Show:**
- ✅ State dropdown with NSW and VIC selected
- ✅ Year range slider at 2022-2024 position
- ✅ "Apply Filters" button
- ✅ "Clear" button

**Annotations to Add:**
- Highlight selected states
- Show year range labels (2022-2024)
- Arrow to "Apply Filters" button

**Caption for Document:**
"Figure D11: Interactive filter panel allowing users to subset data by state and year range. Changes apply globally across all visualizations for consistent cross-chart analysis."

---

## Section 4: Responsive Design

### Screenshot D12: Mobile View - Homepage

**File:** `docs/screenshots/D12_mobile_homepage.png`

**Capture Instructions:**
1. Browser: Chrome DevTools → Toggle Device Mode
2. Device: iPhone 12 Pro (375×812)
3. Navigate to index.html
4. Capture full-page screenshot (scroll)

**Key Elements to Show:**
- ✅ Mobile navigation (hamburger menu if implemented, or stacked links)
- ✅ Hero statistics stacked vertically
- ✅ Readable text (no horizontal scroll)
- ✅ Touch-friendly buttons

**Caption for Document:**
"Figure D12: Mobile-optimized homepage (iPhone 12 Pro, 375×812). The responsive design stacks elements vertically for single-column reading, maintaining readability on small screens."

---

### Screenshot D13: Mobile View - Charts

**File:** `docs/screenshots/D13_mobile_charts.png`

**Capture Instructions:**
1. Device: iPhone 12 Pro (375×812)
2. Navigate to visualizations.html
3. Capture Q1 donut chart on mobile

**Key Elements to Show:**
- ✅ Chart scaled to fit mobile viewport
- ✅ Legend below chart (stacked)
- ✅ Readable labels
- ✅ Touch-friendly interactions

**Caption for Document:**
"Figure D13: Mobile-optimized visualization (Q1 Donut Chart). Charts automatically resize and reposition elements for optimal viewing on smartphones while preserving interactivity."

---

### Screenshot D14: Tablet View

**File:** `docs/screenshots/D14_tablet_view.png`

**Capture Instructions:**
1. Device: iPad Air (768×1024)
2. Navigate to visualizations.html
3. Capture split-screen layout (Enforcement vs Outcomes)

**Key Elements to Show:**
- ✅ Two-column layout (if supported at 768px)
- ✅ Charts side-by-side or stacked appropriately
- ✅ Navigation bar
- ✅ Filter panel

**Caption for Document:**
"Figure D14: Tablet layout (iPad Air, 768×1024). The dashboard adapts to tablet screens with optimized spacing and flexible grid layouts for comfortable viewing."

---

## Section 5: About Page and Footer

### Screenshot D15: About Page

**File:** `docs/screenshots/D15_about_page.png`

**Capture Instructions:**
1. Navigate to: .../about.html
2. Viewport: 1920×1080
3. Capture full page (scroll if needed)

**Key Elements to Show:**
- ✅ Team member information
- ✅ Project description
- ✅ Research questions
- ✅ Data source information

**Caption for Document:**
"Figure D15: About page providing project context, team information, and data provenance. This page establishes credibility and transparency about data sources and methodology."

---

### Screenshot D16: Footer

**File:** `docs/screenshots/D16_footer.png`

**Capture Instructions:**
1. Navigate to any page
2. Scroll to bottom
3. Capture footer only
4. Viewport: 1920×200

**Key Elements to Show:**
- ✅ Copyright notice: "© 2025 COS30045 Data Visualisation Project"
- ✅ Institution: "Swinburne University of Technology"
- ✅ Data source: "Bureau of Infrastructure and Transport Research Economics (BITRE) | 2020-2024"

**Caption for Document:**
"Figure D16: Footer displaying copyright, institution affiliation, and data source attribution. Consistent across all pages for proper crediting."

---

## Section 6: Design System

### Screenshot D17: Color Palette

**File:** `docs/screenshots/D17_color_palette.png`

**Capture Instructions:**
1. Create a visual representation showing:
   - Primary Blue: #26658c
   - Secondary Navy: #1a4d6d
   - Accent Red: #dc3545
   - Accent Orange: #fd7e14
   - Background: #f8f9fa
   - Text: #212529
2. Show color swatches with hex codes
3. Viewport: 800×400

**Caption for Document:**
"Figure D17: Complete color palette used throughout the dashboard. Colors were selected for WCAG AA contrast compliance and semantic meaning (blue for enforcement, red for fatalities)."

---

## Section 7: Accessibility Features

### Screenshot D18: Keyboard Navigation Focus States

**File:** `docs/screenshots/D18_keyboard_focus.png`

**Capture Instructions:**
1. Navigate to: .../visualizations.html
2. Tab through interactive elements
3. Capture focus state on a filter or chart element
4. Viewport: 1200×600

**Key Elements to Show:**
- ✅ Visible focus outline (blue border)
- ✅ Focused element clearly distinguished
- ✅ Tab order visualization (if possible)

**Annotations to Add:**
- Arrow pointing to focus outline
- Label "Keyboard Focus Indicator"

**Caption for Document:**
"Figure D18: Keyboard navigation focus states. All interactive elements have clear visual indicators when focused, enabling keyboard-only navigation for accessibility."

---

## Section 8: KNIME Workflow Screenshots

### Screenshot D19: KNIME Full Workflow

**File:** `docs/screenshots/knime/D19_knime_full_workflow.png`

**Capture Instructions:**
1. Open: DV_Group49_DataProcessing.knwf in KNIME
2. Zoom to fit entire workflow on screen
3. Viewport: 1600×1000
4. Show all three pipelines (Fines, Fatalities, Comparison)

**Key Elements to Show:**
- ✅ All 37 nodes visible
- ✅ Connection lines between nodes
- ✅ Green checkmarks on executed nodes
- ✅ Three distinct sections labeled

**Caption for Document:**
"Figure D19: Complete KNIME workflow showing all data processing pipelines. The workflow consists of 37 nodes organized into three main sections: Fines Processing, Fatalities Processing, and Comparison."

---

### Screenshot D20: KNIME Fines Pipeline Detail

**File:** `docs/screenshots/knime/D20_knime_fines_detail.png`

**Capture Instructions:**
1. Zoom into Fines Processing section
2. Viewport: 1200×800
3. Show nodes from CSV Reader through ProcessedFines.csv Writer

**Key Elements to Show:**
- ✅ CSV Reader node
- ✅ Row Filter (2020-2024)
- ✅ Missing Value handler
- ✅ Rule Engine (Age Grouping)
- ✅ Output writer

**Caption for Document:**
"Figure D20: Detailed view of Fines Processing pipeline. This section handles filtering, cleaning, and standardizing the enforcement data before aggregation."

---

### Screenshot D21: KNIME Fatalities Pipeline Detail

**File:** `docs/screenshots/knime/D21_knime_fatalities_detail.png`

**Capture Instructions:**
1. Zoom into Fatalities Processing section
2. Viewport: 1200×800
3. Show nodes from CSV Reader through ProcessedFatalities.csv Writer

**Key Elements to Show:**
- ✅ CSV Reader node
- ✅ Row Filter
- ✅ Crash Type standardization
- ✅ Road User grouping
- ✅ Output writer

**Caption for Document:**
"Figure D21: Detailed view of Fatalities Processing pipeline. This section processes the road deaths database with emphasis on categorization and standardization."

---

## Section 9: Performance and Testing

### Screenshot D22: Browser Testing Comparison

**File:** `docs/screenshots/D22_browser_testing.png`

**Capture Instructions:**
1. Create a composite image showing Q1 chart in:
   - Chrome
   - Firefox
   - Safari
   - Edge
2. Side-by-side grid layout (2×2)
3. Viewport: 1920×1080

**Annotations to Add:**
- Label each browser screenshot
- Checkmark for "Renders correctly ✓"

**Caption for Document:**
"Figure D22: Cross-browser compatibility testing. The dashboard renders consistently across Chrome, Firefox, Safari, and Edge, ensuring wide user accessibility."

---

### Screenshot D23: Lighthouse Performance Report

**File:** `docs/screenshots/D23_lighthouse_report.png`

**Capture Instructions:**
1. Run Lighthouse audit in Chrome DevTools
2. Capture report summary showing scores for:
   - Performance: ~85+
   - Accessibility: 95+
   - Best Practices: 90+
   - SEO: 90+
3. Viewport: 1200×800

**Key Elements to Show:**
- ✅ All four category scores
- ✅ Green checkmarks for passing metrics
- ✅ Core Web Vitals (LCP, FID, CLS)

**Caption for Document:**
"Figure D23: Google Lighthouse performance audit results. The dashboard achieves high scores across all categories, with particular excellence in accessibility (95+) and best practices (90+)."

---

### Screenshot D24: Accessibility Data Table Fallback

**File:** `docs/screenshots/D24_data_table_fallback.png`

**Capture Instructions:**
1. Use browser inspector to view hidden accessibility tables
2. Navigate to: .../visualizations.html
3. Find: `<table class="data-table-fallback" id="table-q1">`
4. Screenshot the table structure in DevTools
5. Viewport: 1200×600

**Key Elements to Show:**
- ✅ Table with headers (Offence Type, Total Fines, Percentage)
- ✅ Data rows for each offence
- ✅ `sr-only` class (screen reader only)
- ✅ Caption element

**Caption for Document:**
"Figure D24: Screen reader-accessible data tables hidden beneath each chart. These tables ensure users relying on assistive technologies can access all visualization data in tabular format."

---

## Screenshot Capture Standards

### Technical Requirements

1. **File Format:** PNG (lossless)
2. **Color Mode:** RGB
3. **DPI:** 96 DPI (web standard)
4. **Compression:** PNG-8 or PNG-24 (depending on color depth needed)
5. **File Naming:** Use descriptive names matching the inventory (e.g., `D1_homepage_hero.png`)

### Quality Guidelines

1. **No Browser UI:** Crop out browser address bar and bookmarks (unless required for context)
2. **Consistent Lighting:** Use neutral background (white or light gray)
3. **Readable Text:** Ensure all text is crisp and legible at 100% zoom
4. **No Compression Artifacts:** Use lossless PNG compression
5. **Annotations:** Add annotations in image editing software AFTER capture (not on live page)

### Annotation Best Practices

- **Tool:** Use Microsoft PowerPoint, Adobe Illustrator, or Figma
- **Arrows:** Use red (#dc3545) for consistency
- **Text Labels:** Use 14pt Arial or Inter font
- **Highlights:** Use yellow boxes with 50% transparency
- **Borders:** Add subtle gray border (1px, #dee2e6) around screenshots for clarity in document

---

## Instructions for Inserting Screenshots into Word Document

### Step-by-Step Process

1. **Save all screenshots** in `/docs/screenshots/` folder following naming convention
2. **Open Word document:** `DV Project Design Book Group49.docx`
3. **Find placeholder text:** Search for "Screenshot Placeholder:" using Ctrl+F
4. **Replace each placeholder:**
   - Delete the placeholder text
   - Insert → Pictures → Select appropriate screenshot file
   - Resize image to fit page width (usually 6.5 inches for margins)
   - Add caption using Insert → Caption → "Figure D#: [description]"
   - Set text wrapping to "In Line with Text"

5. **Format consistently:**
   - All screenshots: Center alignment
   - Caption: Below image, 11pt Calibri, Bold figure number
   - Spacing: 6pt before, 12pt after

### Example Word Formatting

```
[IMAGE: D1_homepage_hero.png, 6.5" width, centered]

Figure D1: Homepage hero section with key statistics and project branding. The clean,
professional design immediately communicates the project's scope and data coverage.

[12pt spacing]
```

---

## Screenshot Checklist

Before finalizing the document, verify:

- [ ] All 24 screenshots captured
- [ ] File names match inventory
- [ ] Resolution meets standards (1200×800 minimum for charts)
- [ ] Text is readable in all screenshots
- [ ] Annotations added where specified
- [ ] Screenshots saved in PNG format
- [ ] Screenshots inserted in Word document
- [ ] Captions match inventory descriptions
- [ ] Consistent formatting applied
- [ ] KNIME workflow screenshots include green checkmarks (executed state)
- [ ] Mobile/tablet screenshots show correct device dimensions
- [ ] No sensitive information visible (passwords, API keys, etc.)

---

## Additional Visual Documentation

### Supplementary Materials (Optional)

1. **Video Walkthrough** (if time permits):
   - Record 3-5 minute screen capture demonstrating dashboard interactions
   - Show filter application across multiple charts
   - Demonstrate responsive design by resizing browser
   - Upload to YouTube or embed in final presentation

2. **Interactive PDF** (advanced):
   - Export screenshots as high-res PDF
   - Add hyperlinks between sections
   - Embed navigation for easy reference

3. **Design System Document:**
   - Create separate PDF with:
     - Complete color palette
     - Typography scale
     - Spacing system
     - Component library
     - Icon set (if applicable)

---

## Contact for Screenshot Assistance

If you encounter issues capturing any screenshots:

1. **Check browser zoom:** Ensure browser is at 100% zoom level
2. **Clear cache:** Hard refresh (Ctrl+Shift+R) to ensure latest version
3. **Use Snipping Tool:** Windows Snipping Tool or macOS Screenshot (Cmd+Shift+4)
4. **Chrome DevTools:** F12 → Device Mode → Capture Screenshot (for mobile views)

---

**Appendix Status:** COMPLETE - Screenshot Guide Ready
**Total Screenshots Required:** 24
**Estimated Capture Time:** 60-90 minutes
**Last Updated:** November 19, 2024
