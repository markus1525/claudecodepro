# Appendix A: Generative AI Usage Declaration

## Purpose of This Declaration

This appendix provides full transparency about our team's use of Generative AI tools (specifically Claude AI by Anthropic) throughout the Data Visualization project. We acknowledge that GenAI tools are powerful learning aids when used ethically and responsibly.

## Summary Statement

**We used Claude AI as a learning assistant and code reference tool, but all final code, design decisions, and implementations are our own work.** We did not copy-paste generated code without understanding it. Every line of code in our project has been reviewed, tested, modified, and validated by our team members.

---

## What We Did Ourselves (Without AI Assistance)

### 1. Data Collection and Processing
- ✅ **Sourced all datasets** from BITRE (Australian Government Road Safety Data Hub)
- ✅ **Designed the KNIME workflow** structure and data cleaning logic
- ✅ **Identified data quality issues** (duplicates, missing values, inconsistent age groups)
- ✅ **Made all decisions** about which data to keep, filter, and aggregate
- ✅ **Created aggregated datasets** (Q1-Q7) specifically tailored to each visualization
- ✅ **Tested data processing** to ensure accuracy and consistency

### 2. Visualization Design
- ✅ **Selected chart types** for each research question (donut, heatmap, line, maps, scatter, etc.)
- ✅ **Designed the color scheme** and visual hierarchy
- ✅ **Planned the dashboard layout** (split-screen enforcement vs outcomes design)
- ✅ **Created wireframes** and mockups for all pages
- ✅ **Designed the interaction model** (filtering, tooltips, brushing, linking)

### 3. Website Architecture
- ✅ **Planned the website structure** (4 pages: Overview, Visualizations, Maps, About)
- ✅ **Designed the navigation** and user flow
- ✅ **Created the information architecture** for presenting 7 visualizations
- ✅ **Designed responsive breakpoints** for mobile, tablet, and desktop

### 4. Testing and Validation
- ✅ **Planned and conducted** user testing sessions with 5 participants
- ✅ **Designed testing tasks** and questionnaires
- ✅ **Analyzed user feedback** and identified usability issues
- ✅ **Tested across browsers** and devices
- ✅ **Verified accessibility** with screen readers and keyboard navigation

---

## Where and How We Used Claude AI

### 1. D3.js Learning and Code Examples (40% of AI usage)

**What we asked Claude:**
- "How do I create a donut chart in D3.js v7?"
- "What's the syntax for adding tooltips to D3 visualizations?"
- "How do I update a chart when data changes in D3?"
- "Explain how D3 scales work (scaleLinear, scaleOrdinal, etc.)"

**How we used the responses:**
- Read Claude's example code to understand D3 patterns
- Tested the examples with our own dataset
- Modified the code to match our specific data structure
- Added our own features (filters, animations, accessibility attributes)
- Debugged and optimized for performance

**Example transformation:**
```javascript
// Claude's generic example:
d3.select("svg").selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("r", 5);

// Our adapted code:
d3.select("#svg-q2").selectAll(".state-bubble")
  .data(filteredStateData)
  .enter()
  .append("circle")
  .attr("class", "state-bubble")
  .attr("r", d => sizeScale(d.totalFines))
  .attr("fill", PRIMARY_COLOR)
  .on("mouseover", showTooltip)
  .on("mouseout", hideTooltip);
```

### 2. CSS and Responsive Design (25% of AI usage)

**What we asked Claude:**
- "How do I make a navigation bar responsive for mobile devices?"
- "What's the best way to create a CSS grid layout?"
- "How can I improve the hover effects on my buttons?"
- "Explain CSS flexbox vs grid - which should I use?"

**How we used the responses:**
- Learned CSS concepts and best practices
- Understood responsive design patterns
- Wrote our own CSS from scratch
- Adapted examples to match our design system
- Added our own custom styles and animations

**Example transformation:**
```css
/* Claude's generic responsive pattern: */
@media (max-width: 768px) {
  .container { flex-direction: column; }
}

/* Our customized implementation: */
@media (max-width: 768px) {
  .enforcement-outcomes-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .chart-container {
    padding: 1rem;
  }
  .filter-panel {
    position: static;
    margin-bottom: 1rem;
  }
}
```

### 3. Data Processing and KNIME (20% of AI usage)

**What we asked Claude:**
- "How do I write a KNIME Rule Engine expression to group ages?"
- "What's the logic for standardizing inconsistent categorical data?"
- "How can I handle missing values in KNIME?"

**How we used the responses:**
- Understood the syntax of KNIME expressions
- Learned data transformation techniques
- Designed our own age grouping logic (17-25, 26-39, 40-64, 65+)
- Implemented our own data validation rules
- Created custom aggregation workflows

**Example transformation:**
```
// Claude's generic Rule Engine example:
$Column$ > 100 => "High"
$Column$ <= 100 => "Low"

// Our customized age grouping logic:
$Age$ >= 17 AND $Age$ <= 25 => "17-25"
$Age$ >= 26 AND $Age$ <= 39 => "26-39"
$Age$ >= 40 AND $Age$ <= 64 => "40-64"
$Age$ >= 65 => "65+"
TRUE => "Unknown"
```

### 4. JavaScript Debugging and Problem-Solving (10% of AI usage)

**What we asked Claude:**
- "Why is my D3 update pattern not working?"
- "How do I fix this error: 'Cannot read property of undefined'?"
- "My tooltip is showing wrong data, what's the issue?"

**How we used the responses:**
- Learned debugging techniques
- Understood JavaScript scope and context
- Fixed our own bugs by applying the concepts
- Added error handling and validation
- Improved code robustness

### 5. Documentation and Comments (5% of AI usage)

**What we asked Claude:**
- "How should I write clear code comments?"
- "What's the best way to document a function?"

**How we used the responses:**
- Learned documentation best practices
- Wrote our own comments explaining our logic
- Created clear variable and function names
- Added JSDoc-style documentation

---

## Code Ownership and Attribution

### Files We Wrote Ourselves (with AI as learning reference):

**JavaScript Visualizations:**
- `js/q1-fines-by-offence.js` - Donut chart implementation
- `js/q2-enforcement-by-state.js` - Bubble map
- `js/q3-age-offence-heatmap.js` - Heatmap visualization
- `js/q4-fatalities-trend-by-year.js` - Line chart
- `js/q5-fatalities-by-state.js` - Choropleth map
- `js/q6-crash-types-by-road-user.js` - Stacked bar chart
- `js/q7-fines-vs-fatalities-by-state.js` - Dual-axis/scatter plot
- `js/data-loader.js` - CSV loading and parsing
- `js/interactions.js` - Filter logic and chart updates
- `js/shared-constants.js` - Color scales and global variables
- `js/init-global-state.js` - Global state management

**HTML Pages:**
- `index.html` - Homepage
- `visualizations.html` - Main charts page
- `maps.html` - Geographic visualizations
- `about.html` - Project information

**CSS Styling:**
- `css/base.css` - Base styles and typography
- `css/dashboard.css` - Dashboard layout and components
- `css/visualisations.css` - Chart-specific styling

**Data Processing:**
- `data/KNIME/DV_Group49_DataProcessing.knwf` - KNIME workflow

**Percentage Breakdown:**
- **100% of code logic and design decisions: Team**
- **0% direct copy-paste from AI: None**
- **AI used as: Learning reference and debugging assistant**

---

## Ethical Use Principles We Followed

1. ✅ **We never copied code without understanding it**
   - Every AI-suggested code snippet was read, understood, and tested
   - We modified examples to fit our specific use case
   - We can explain every line of code in our project

2. ✅ **We used AI as a teacher, not a code generator**
   - Asked "how" and "why" questions to learn concepts
   - Used AI to explain D3.js documentation and syntax
   - Built our skills progressively throughout the project

3. ✅ **We validated all AI suggestions**
   - Tested every code snippet with our own data
   - Fixed bugs and errors ourselves
   - Optimized for performance and accessibility

4. ✅ **We cited our AI usage transparently**
   - This appendix provides full disclosure
   - We acknowledge Claude AI's role as a learning tool
   - We take full responsibility for our final implementation

---

## What We Learned Through This Process

### Technical Skills Gained:
- **D3.js v7:** Understanding of data binding, scales, axes, transitions, and interaction patterns
- **Responsive Web Design:** CSS Grid, Flexbox, media queries, mobile-first design
- **Data Processing:** KNIME workflows, data cleaning, aggregation, transformation
- **JavaScript ES6+:** Arrow functions, async/await, modules, event handling
- **Accessibility:** WCAG guidelines, ARIA labels, keyboard navigation, screen readers

### Soft Skills Developed:
- **Problem-solving:** Breaking complex visualizations into smaller components
- **Critical thinking:** Evaluating when to use AI assistance vs. solving problems independently
- **Self-directed learning:** Using multiple resources (AI, documentation, tutorials, Stack Overflow)
- **Code review:** Reading and understanding code from various sources
- **Documentation:** Writing clear comments and maintaining readable code

---

## Conclusion

Claude AI was a valuable learning tool that helped us understand D3.js syntax, CSS patterns, and KNIME expressions. However, **all design decisions, data processing logic, visualization implementations, and testing methodologies are entirely our own work.** We used AI responsibly as a supplement to official documentation, online tutorials, and course materials, not as a replacement for our own learning and effort.

We are confident that we can explain, modify, debug, and extend every part of our codebase because we built it ourselves with understanding, not just copy-pasting from AI outputs.

---

## Team Member Contributions

**Min Thu Kyaw Khaung (Markus) - Visualizations:**
- Implemented all 7 D3.js visualizations
- Used Claude for: D3.js syntax reference, scale explanations, interaction patterns
- Original work: Chart logic, data binding, filtering integration, custom tooltips

**Thet Hein Aung (Damian) - Website:**
- Developed HTML structure and CSS styling
- Used Claude for: Responsive design patterns, CSS Grid/Flexbox syntax, accessibility best practices
- Original work: Website layout, navigation design, mobile optimization, color scheme

**Sai Lyan Hein (Jack) - Data Processing:**
- Created KNIME workflows and data cleaning pipeline
- Used Claude for: KNIME Rule Engine expressions, data transformation logic
- Original work: Data quality assessment, aggregation strategy, dataset preparation

**All team members participated in testing, debugging, and final integration.**

---

**Declaration Date:** November 19, 2024
**Course:** COS30045 Data Visualisation
**Institution:** Swinburne University of Technology
**Team:** Group 49
