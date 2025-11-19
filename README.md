# Australian Road Safety: Enforcement vs Outcomes Explorer

An interactive web-based data visualization dashboard analyzing the relationship between police road safety enforcement (fines) and actual road safety outcomes (fatalities) across Australia from 2020-2024.

## Project Information

- **Course:** COS30045 Data Visualisation
- **Institution:** Swinburne University of Technology
- **Academic Year:** 2024-2025
- **Data Source:** Bureau of Infrastructure and Transport Research Economics (BITRE)

## Overview

This project explores whether increased traffic enforcement correlates with improved road safety outcomes across Australian states and territories. The dashboard features 7 interactive visualizations that allow users to filter and analyze data by state, year range, and offense type.

## Features

### Interactive Visualizations

1. **Fines Distribution by Offense Type** - Donut chart (desktop) / Bar chart (mobile)
2. **Enforcement by State** - Interactive bubble map
3. **Age Group vs Offense Type** - Heatmap
4. **Fatality Trends Over Time** - Multi-line chart
5. **Fatalities by State** - Choropleth map with population-adjusted rates
6. **Crash Types by Road User** - Stacked bar chart
7. **Fines vs Fatalities Comparison** - Dual-axis scatter plot

### Key Capabilities

- **Dynamic Filtering:** Filter data by Australian states/territories and year range (2020-2024)
- **Responsive Design:** Optimized layouts for desktop, tablet, and mobile devices
- **Interactive Elements:** Hover tooltips, clickable map regions, and animated transitions
- **Accessibility:** ARIA labels, keyboard navigation, and screen reader support

## Project Structure

```
claudecodepro/
├── index.html                      # Landing page
├── visualizations.html             # Main dashboard with 5 charts
├── maps.html                       # Geographic visualizations
├── about.html                      # Project documentation
├── README.md                       # This file
│
├── css/
│   ├── base.css                    # Typography, colors, layout
│   ├── dashboard.css               # Filter panels and grids
│   └── visualisations.css          # Chart-specific styles
│
├── js/
│   ├── init-global-state.js        # Global state initialization
│   ├── shared-constants.js         # Colors, labels, configurations
│   ├── interactions.js             # Tooltip and interaction helpers
│   ├── data-loader.js              # CSV loading and filtering
│   ├── q1-fines-by-offence.js      # Visualization 1
│   ├── q2-enforcement-by-state.js  # Visualization 2
│   ├── q3-age-offence-heatmap.js   # Visualization 3
│   ├── q4-fatalities-trend-by-year.js # Visualization 4
│   ├── q5-fatalities-by-state.js   # Visualization 5
│   ├── q6-crash-types-by-road-user.js # Visualization 6
│   └── q7-fines-vs-fatalities-by-state.js # Visualization 7
│
├── data/
│   ├── Q1_Fines_By_Offence_Detailed.csv
│   ├── Q1_Fines_By_Offence_Overall.csv
│   ├── Q2_Enforcement_By_State.csv
│   ├── Q3_Age_Offence_Heatmap.csv
│   ├── Q4_Fatalities_Trend_By_Year.csv
│   ├── Q5_Fatalities_By_State.csv
│   ├── Q6_Crash_Types_By_Road_User.csv
│   ├── Q7_Fines_vs_Fatalities_By_State.csv
│   ├── raw_data/
│   │   ├── Australian Road Deaths Database Fatalities.csv
│   │   ├── police_enforcement_2024_fines.csv
│   │   ├── australia_states.geojson
│   │   └── Population.csv
│   └── KNIME/
│       └── DV_Group49_DataProcessing.knwf
│
├── assets/
│   ├── logo.png
│   └── logo2.png
│
└── docs/
    ├── Data Visualization Stand-up 3 Presentation.pptx
    └── Stand Up 3 Draft of Project Design Book Group49.pdf
```

## Technology Stack

### Core Technologies
- **HTML5** - Semantic markup and accessibility features
- **CSS3** - Responsive layouts and animations
- **JavaScript (ES6+)** - Interactive visualizations and data processing

### External Libraries
- **D3.js v7** - Data-driven document manipulation and SVG generation
- **Plotly.js v3.2.0** - Additional charting capabilities (maps page)

### Data Processing
- **KNIME Analytics Platform** - ETL workflows for data transformation

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A local web server (optional but recommended for development)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd claudecodepro
   ```

2. **Run with a local server:**

   **Option A: Using Python 3**
   ```bash
   python -m http.server 8000
   ```

   **Option B: Using Node.js (http-server)**
   ```bash
   npx http-server -p 8000
   ```

   **Option C: Using VS Code Live Server**
   - Install the "Live Server" extension
   - Right-click `index.html` and select "Open with Live Server"

3. **Open in browser:**
   Navigate to `http://localhost:8000` (or your configured port)

### File Access

The project uses relative file paths and requires a web server due to CORS restrictions when loading CSV and GeoJSON files. Opening `index.html` directly in a browser (file://) will not work properly.

## Usage

### Navigation
- **Overview** - Project introduction and key findings
- **Visualizations** - Interactive charts with filtering capabilities
- **Maps** - Geographic visualizations of enforcement and fatalities
- **About** - Detailed project documentation and methodology

### Filtering Data

1. **Select States:** Use Ctrl/Cmd+Click in the state dropdown to select multiple states
2. **Set Year Range:** Enter start and end years (2020-2024)
3. **Apply Filters:** Click "Apply Filters" or press Enter
4. **Clear Filters:** Click "Clear All Filters" to reset to default view

### Interactive Features

- **Hover tooltips:** See detailed data for each visualization element
- **Map interactions:** Click on map regions to filter by state
- **Responsive charts:** Charts adapt to screen size and orientation

## Data Sources

### Primary Datasets

1. **Australian Road Deaths Database**
   - Source: Bureau of Infrastructure and Transport Research Economics (BITRE)
   - Period: 2020-2024
   - Records: 6,942 fatality records

2. **Police Enforcement Data**
   - Source: State/Territory traffic enforcement authorities
   - Period: 2020-2024
   - Records: 11,961 fine records
   - Categories: Speed, Mobile Phone, Seatbelts, Unlicensed Driving

### Data Processing

All raw data was processed using KNIME Analytics Platform:
- Data cleaning and validation
- Aggregation by state, year, and offense type
- Calculation of derived metrics (rates per capita, percentages)
- Export to question-specific CSV files for visualization

## Browser Compatibility

- **Chrome/Edge:** Full support (recommended)
- **Firefox:** Full support
- **Safari:** Full support
- **Mobile browsers:** Responsive layouts supported

## Performance Notes

- Initial load time: ~2-3 seconds (loading 8 CSV files)
- Chart render time: <500ms per visualization
- Filter update time: <200ms
- Total dataset size: ~2.5MB (processed CSVs)

## Development

### Code Organization

- **Modular structure:** Each visualization is self-contained in its own file
- **Shared utilities:** Constants, interactions, and data loading are centralized
- **Consistent naming:** Kebab-case for files, camelCase for JavaScript variables
- **Separation of concerns:** Data loading, filtering, and rendering are separate

### Key Functions

```javascript
// Global state
window.filterState = { states: [], yearRange: [2020, 2024] }
window.dataStore = { q1Detailed, q1Overall, q2, ... }

// Data loading
loadAllData()           // Loads all CSV files
getFilteredQ1Data()     // Filters data for Q1
updateAllCharts()       // Refreshes all visualizations

// Interactions
createTooltip()         // Creates tooltip element
showTooltip(event, content) // Displays tooltip
createLegend(svg, items, colorScale) // Generates legend
```

### Adding New Visualizations

1. Create new file: `js/q8-new-visualization.js`
2. Define `window.renderQ8 = function(data) { ... }`
3. Add data processing: `getFilteredQ8Data()` in `data-loader.js`
4. Include script in HTML: `<script src="js/q8-new-visualization.js"></script>`
5. Update filter logic to call `renderQ8()`

## Known Issues

- Some visualizations may not display correctly if CSV files are missing
- Large datasets may cause slower rendering on older devices
- Plotly.js is only loaded on maps.html (not available on visualizations.html)

## Future Enhancements

- [ ] Export visualizations as images (PNG/SVG)
- [ ] Download filtered data as CSV
- [ ] Add year-over-year comparison mode
- [ ] Implement predictive analytics
- [ ] Add more granular temporal filtering (quarters, months)
- [ ] Include weather and road condition data

## Contributing

This is an academic project. For questions or feedback, please contact the project team through Swinburne University.

## License

This project is submitted as part of academic coursework at Swinburne University of Technology. All data sources are publicly available and properly attributed.

## Acknowledgments

- Bureau of Infrastructure and Transport Research Economics (BITRE) for data
- Australian state and territory traffic enforcement authorities
- D3.js community for visualization examples and documentation
- Course instructors and tutors for guidance

## Contact

For questions about this project, please contact the development team through the Swinburne University course portal.

---

**Project Status:** Active Development
**Last Updated:** November 2024
**Version:** 1.0.0
