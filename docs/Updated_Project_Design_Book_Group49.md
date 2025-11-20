# Australian Road Safety Enforcement: Interactive Data Explorer

## Data Visualisation Project Design Book

**Team:** DV_Group49

**Mercury Website Link:**
https://mercury.swin.edu.au/cos30045/s105684881/project-dv_group49

**GitHub Repository:**
https://github.com/COS30045-Inti-Subang/data-visualisation-project-dvgroup49

**Team Members:**

| Student Name | GitHub | SUT ID | INTI ID |
|---|---|---|---|
| Min Thu Kyaw Khaung (Markus) | markus1525 | 105684881 | J23040027 |
| Thet Hein Aung (Damian) | sinister-damian | 105684373 | J23040150 |
| Sai Lyan Hein (Jack) | sailyanhein | 105684386 | J23040369 |

**Section:** C2

**Year and Semester:** 2025, Semester 4

---

## Table of Contents

1. [Introduction](#1-introduction)
   - 1.1 Background and Motivation
   - 1.2 Visualisation Purpose
   - 1.3 Project Schedule

2. [Data](#2-data)
   - 2.1 Data Source and Governance
   - 2.2 Data Processing and Analysis
   - 2.3 Data Exploration

3. [Requirements](#3-requirements)
   - 3.1 Must-Have Features
   - 3.2 Optional Features

4. [Visualization Design](#4-visualization-design)
   - 4.1 Design Process and Evolution
   - 4.2 Visualisation Design and Website Design
   - 4.3 Design Principles
   - 4.4 Interaction Design

5. [Iteration and Validation](#5-iteration-and-validation)

6. [Conclusion](#6-conclusion)

7. [References](#7-references)

8. [Appendices](#8-appendices)

---

## 1. Introduction

### 1.1 Background and Motivation

#### Target Audience and Key Tasks

Our visualization dashboard is built for five different groups of users. Each group has specific needs and questions they want to answer using road safety data.

**1. Policy Makers and Government Officials**

These are people who work in government and make decisions about road safety laws and policies.

**What they need to do:** They need to find which areas have the most road safety problems. They also need to check if enforcement activities are actually working. This information helps them create better road safety laws.

**What they need from our dashboard:** They need clear comparisons between how much enforcement is happening in each state and what the safety results are. They want to see this information by state and region so they can make targeted decisions.

**2. Road Safety Analysts and Researchers**

These are researchers and analysts who study traffic violations and crash patterns. They want to understand the deeper relationships in the data.

**What they need to do:** They study patterns in traffic violations. They want to understand how enforcement, demographics, and crash outcomes are related to each other.

**What they need from our dashboard:** They need detailed information that they can drill down into. They want to be able to filter data by age group, offence type, and location. This helps them find specific patterns and relationships.

**3. Law Enforcement Agencies**

These are police departments and traffic enforcement teams who are responsible for road safety enforcement.

**What they need to do:** They need to understand current enforcement patterns. They want to optimize how they use their resources and where they place enforcement efforts.

**What they need from our dashboard:** They need to see the geographic distribution of fines across Australia. They want to identify gaps in enforcement coverage so they can deploy resources more effectively.

**4. General Public and Media**

These are regular citizens and journalists who want to understand road safety in their local area. They want to hold officials accountable.

**What they need to do:** They want to understand road safety issues in their own state or region. They want to compare their area to other areas. They may want to use this information to advocate for better road safety.

**What they need from our dashboard:** They need intuitive and easy-to-understand comparisons. They want local context at the state and region level. The visualizations need to be simple enough for non-experts to understand.

**5. Transport Safety Advocates**

These are community organizations and advocacy groups who campaign for safer roads. They need evidence to support their arguments.

**What they need to do:** They need evidence-based arguments to push for safer roads. They want to identify vulnerable populations who are at higher risk. They want to find gaps in enforcement.

**What they need from our dashboard:** They need clear visualizations showing which groups are at risk. They want to see enforcement gaps clearly. They need to understand correlations between enforcement and fatalities.

#### Problem Being Addressed

Road safety is a major problem in Australia. Every year, hundreds of people die and thousands more are injured in road crashes. These crashes cause huge amounts of pain and suffering for families and communities. They also cost the economy billions of dollars through medical care, lost productivity, and property damage.

The government collects massive amounts of data about road safety. This includes information about traffic fines, crashes, fatalities, and enforcement activities. However, this data is often difficult to understand and use. The data sits in spreadsheets and databases where most people cannot access it or make sense of it.

There are several specific problems with how road safety data is currently presented:

**Data is scattered and disconnected.** Information about fines is separate from crash data. Enforcement statistics are kept apart from fatality records. This makes it very hard to see connections between different aspects of road safety. For example, you cannot easily see if areas with more enforcement have fewer crashes.

**Data is not visual.** Most road safety data is presented in tables and reports with lots of numbers. This makes it very hard for most people to understand patterns and trends. Tables of numbers do not show you the big picture or help you spot important relationships.

**Geographic patterns are hidden.** Road safety problems vary a lot across different states and regions in Australia. However, current data presentations make it difficult to see these geographic differences. You cannot easily compare one state to another or see which regions have the biggest problems.

**Temporal trends are unclear.** Road safety changes over time as laws change, enforcement increases, and vehicle technology improves. However, it is difficult to see these trends over time in traditional data presentations. You cannot easily track whether things are getting better or worse.

**Data is not accessible.** Most road safety data is locked away in government reports and academic papers. Regular citizens, journalists, and community groups cannot easily access this information. This makes it hard for people to understand road safety in their own area or to advocate for improvements.

Our project addresses these problems by creating an interactive visualization dashboard. This dashboard brings together data from multiple sources. It presents the data visually using charts and maps that anyone can understand. It allows users to explore the data by state, region, offence type, age group, and time period. This makes patterns and relationships visible that were hidden before.

#### Importance of the Visualisation

This visualization project is important for several key reasons.

**It makes data accessible to everyone.** By putting road safety data online in an easy-to-use format, we make this information available to all Australians. Policy makers, researchers, journalists, and regular citizens can all access the same information. This helps create informed public discussion about road safety issues.

**It reveals hidden patterns.** When data is presented visually, patterns become obvious that were hidden in tables of numbers. You can quickly see which states have the highest fine rates, which age groups are most at risk, and how enforcement has changed over time. These visual patterns help people understand the data much faster than reading reports.

**It supports better decision making.** Policy makers and law enforcement agencies can use the dashboard to identify problem areas and allocate resources more effectively. Instead of guessing where to focus enforcement efforts, they can use data to make evidence-based decisions. This leads to better outcomes and more efficient use of public resources.

**It enables comparison and benchmarking.** The dashboard makes it easy to compare different states and regions. This allows everyone to see how their area compares to others. States can learn from regions that are doing well. Areas with high crash rates can be identified for targeted intervention.

**It tracks progress over time.** By showing trends over multiple years, the dashboard helps everyone see whether road safety is improving or getting worse. This accountability is important for measuring the success of road safety programs and policies.

**It empowers advocacy and public engagement.** Community groups and safety advocates can use the visualizations to support their campaigns for safer roads. When people can see clear visual evidence of problems, they are more motivated to push for change. This bottom-up pressure complements top-down policy making.

**It demonstrates effective data visualization principles.** As a university project, this dashboard also serves an educational purpose. It shows how effective visualization design can make complex data understandable and useful. It demonstrates best practices in interactive data presentation, responsive design, and user-centered design.

### 1.2 Visualisation Purpose

The main purpose of our visualization dashboard is to make Australian road safety data understandable and actionable for everyone who needs it.

We want to answer several key questions through our visualizations:

**Where are the road safety problems?** Our geographic visualizations show which states and regions have the highest rates of traffic violations and fatalities. Users can quickly identify hotspots that need attention.

**Who is most at risk?** Our demographic breakdowns show which age groups receive the most fines and are involved in the most fatal crashes. This helps identify vulnerable populations that need targeted interventions.

**What types of violations are most common?** Our offence-type visualizations show the breakdown of different traffic violations. This helps enforcement agencies understand what behaviors they need to target.

**How has enforcement changed over time?** Our temporal visualizations show trends in fine issuance and crash rates over the years from 2020 to 2024. This helps evaluate whether enforcement efforts are increasing or decreasing.

**Is enforcement effective?** By showing both enforcement data and crash outcomes together, we help users explore potential relationships between enforcement activities and road safety results.

**How do different areas compare?** Our comparative visualizations allow users to benchmark different states and regions against each other. This promotes learning from high-performing areas.

The dashboard is designed to be flexible and interactive. Different users can explore the data in different ways based on their specific needs. A researcher might drill down into detailed patterns for a specific age group and offence type. A policy maker might compare overall trends across states. A journalist might look at data for their local region to write a story.

By making this data visual and interactive, we transform raw numbers into insights that can drive action. We turn spreadsheets into stories that people can understand and use.

### 1.3 Project Schedule

Our project followed a structured timeline across the semester. This schedule helped us stay organized and make steady progress toward our final deliverable.

#### Week 7: Project Kickoff and Planning
- Formed our team of three members
- Selected our topic: Australian Road Safety Enforcement
- Identified potential data sources from BITRE and other government sources
- Created initial project proposal
- Set up GitHub repository for version control
- Distributed initial roles and responsibilities

#### Week 8: Data Collection and Requirements
- Downloaded raw data files from BITRE and other sources
- Analyzed data structure and contents
- Identified data quality issues and gaps
- Created requirements document defining must-have and optional features
- Sketched initial visualization ideas
- Set up KNIME workspace for data processing

#### Week 9: Data Processing and Initial Prototyping
- Cleaned and processed raw data files using KNIME
- Merged data from multiple sources
- Created filtered datasets for different visualizations
- Built first simple prototype visualizations
- Tested basic D3.js implementations
- Created initial website structure with HTML/CSS

#### Week 10: Core Visualization Development
- Implemented donut chart for offence type distribution
- Developed bubble map for geographic fine distribution
- Created heatmap for age group and offence type analysis
- Built line chart for temporal trends
- Established consistent color scheme and styling
- Implemented basic interactivity for each chart

#### Week 11: Advanced Features and Integration
- Added choropleth map for state-level comparisons
- Implemented stacked bar chart for state comparisons
- Created dual-axis chart combining fines and fatalities
- Integrated all visualizations into cohesive dashboard
- Added cross-filtering and linked interactions
- Implemented responsive design for different screen sizes

#### Week 12: Refinement and Testing
- Conducted user testing with classmates and instructors
- Gathered feedback on usability and clarity
- Fixed bugs and improved performance
- Enhanced accessibility features
- Optimized for mobile devices
- Added documentation and help text

#### Week 13: Final Polish and Deployment
- Completed final round of testing
- Made final design refinements based on feedback
- Finalized all documentation
- Deployed to Mercury web server
- Prepared final presentation
- Submitted complete project design book

Throughout this schedule, we held regular team meetings twice per week. We used GitHub for version control and collaboration. We maintained consistent communication through our team chat group. This structured approach helped us deliver a high-quality final product on time.

---

## 2. Data

### 2.1 Data Source and Governance

Our project uses data from several official Australian government sources. All of our data comes from reliable, authoritative sources that regularly publish road safety statistics.

#### Primary Data Sources

**BITRE (Bureau of Infrastructure and Transport Research Economics)**

BITRE is our main data source. BITRE is part of the Australian Government Department of Infrastructure and Regional Development. They collect and publish comprehensive road safety statistics for all of Australia.

We use the following datasets from BITRE:

- **Road Deaths Database**: This dataset contains information about every fatal road crash in Australia. It includes details about when and where crashes occurred, the types of vehicles involved, and characteristics of the people who died. This data is updated monthly and goes back many years.

- **Serious Injury Database**: This dataset tracks road crashes that result in hospitalization. It provides context about the severity of road safety problems beyond just fatalities.

- **State and Territory Reports**: BITRE publishes detailed breakdowns of road safety statistics for each Australian state and territory. These reports include crash rates, fatality rates, and enforcement statistics.

**State and Territory Government Data Portals**

We also collected data from individual state government sources to supplement the BITRE data:

- **Victoria**: VicRoads and the Department of Justice publish detailed fine and enforcement data
- **New South Wales**: Transport for NSW and Revenue NSW publish traffic violation statistics
- **Queensland**: Queensland Police Service publishes enforcement activity reports
- **Other states**: We collected similar data from South Australia, Western Australia, Tasmania, Northern Territory, and ACT

This state-level data gives us more detailed information about specific types of traffic violations and enforcement activities that is not available in the national BITRE datasets.

#### Data Collection Period

Our data covers the period from 2020 to 2024. This five-year window gives us enough historical data to identify trends while keeping the dataset manageable and focused on recent patterns. The year 2020 is particularly interesting as a starting point because it allows us to see how the COVID-19 pandemic affected road usage and safety.

#### Data Governance and Ethics

We carefully considered ethical and legal aspects of using this data:

**Public Data Only**: All of our data comes from publicly available sources. We did not request or use any confidential or restricted data.

**No Personal Information**: The datasets we use contain only aggregate statistics. There is no personally identifiable information about individuals who received fines or were involved in crashes. This protects privacy while still allowing meaningful analysis.

**Accurate Representation**: We are careful to represent the data accurately without exaggeration or distortion. Our visualizations show the data as it is, without manipulating it to support a particular agenda.

**Proper Attribution**: We clearly cite all of our data sources and provide links to the original data. This allows users to verify our work and access the source data themselves.

**Responsible Interpretation**: We are careful not to make causal claims that the data does not support. For example, we show correlations between enforcement and crashes, but we do not claim that enforcement directly causes changes in crash rates without additional evidence.

### 2.2 Data Processing and Analysis

The raw data we collected required significant processing before it could be used in our visualizations. We used KNIME Analytics Platform to perform this data processing. KNIME is a powerful data analysis tool that allows us to build processing workflows visually.

#### Data Cleaning Process

**Handling Missing Values**

The raw datasets had many missing values. We handled these in different ways depending on the context:

- For missing state or region information, we excluded those records because geographic location is essential for our visualizations
- For missing age group information, we created an "Unknown" category rather than excluding the data
- For missing offence type details, we categorized them as "Other Offences"
- We documented all our decisions about missing data handling

**Standardizing Formats**

Different data sources used different formats for the same information:

- State names were sometimes abbreviated (NSW, VIC) and sometimes spelled out (New South Wales, Victoria). We standardized everything to full state names for consistency
- Dates came in different formats (DD/MM/YYYY, YYYY-MM-DD, etc.). We converted everything to YYYY-MM-DD format
- Age groups were defined differently across sources. We standardized to consistent age ranges: 17-25, 26-39, 40-64, 65+
- Offence types had different names across states. We mapped them to consistent categories

**Removing Duplicates**

We found some duplicate records where the same incident appeared multiple times in the data. We removed these duplicates while being careful not to remove legitimate records that just looked similar.

**Validating Data Quality**

We performed several validation checks:

- Checked that all dates fell within our expected range (2020-2024)
- Verified that all state names matched known Australian states and territories
- Confirmed that numeric values (fine amounts, counts) were reasonable and non-negative
- Looked for outliers that might indicate data errors

#### Data Transformation Process

After cleaning, we transformed the data into formats suitable for our different visualizations.

**Aggregation and Summarization**

Most of our visualizations show aggregate statistics rather than individual records:

- We calculated total fine counts by state, year, age group, and offence type
- We computed fatality counts and rates for different demographic groups
- We calculated average fine amounts for different violation types
- We created time series data by aggregating counts by year and month

**Creating Derived Variables**

We created new variables that did not exist in the raw data:

- **Fine Rate per Population**: We combined fine count data with population statistics to calculate fines per 100,000 population. This allows fair comparison between states of different sizes
- **Fatality Rate**: We calculated fatalities per 100,000 population for each state
- **Enforcement Intensity**: We created a metric combining the number of fines issued with the number of enforcement officers and enforcement hours
- **Severity Index**: We created a score indicating the overall severity of road safety problems in each region based on multiple factors

**Filtering and Subsetting**

We created different filtered datasets for different visualizations:

- A state-level summary dataset for the choropleth map
- A time series dataset for the line chart showing trends
- A detailed demographic dataset for the heatmap
- A geographic point dataset for the bubble map
- An offence-type summary for the donut chart

#### KNIME Workflow

Our KNIME workflow consisted of several connected nodes:

1. **File Reader Nodes**: Read CSV files from different data sources
2. **Column Filter Nodes**: Select only the columns we need
3. **Row Filter Nodes**: Remove records with critical missing data
4. **Missing Value Nodes**: Handle missing data appropriately
5. **String Manipulation Nodes**: Standardize text fields
6. **GroupBy Nodes**: Aggregate data to appropriate levels
7. **Joiner Nodes**: Combine data from multiple sources
8. **Math Formula Nodes**: Calculate derived variables
9. **CSV Writer Nodes**: Export processed data for use in visualizations

This workflow is saved in our GitHub repository so it can be rerun if we need to process updated data in the future.

#### Output Data Files

The final output of our data processing was a set of clean CSV files:

- `state_summary.csv`: State-level aggregate statistics
- `time_series.csv`: Monthly time series data
- `age_offence_matrix.csv`: Cross-tabulation of age groups and offence types
- `geographic_fines.csv`: Geographic coordinates and fine counts for mapping
- `offence_distribution.csv`: Distribution of fine counts by offence type
- `combined_metrics.csv`: State-level data combining fines and fatalities

These files are much smaller and cleaner than the raw data. They load quickly and are in exactly the format our D3.js visualizations need.

### 2.3 Data Exploration

Before creating our final visualizations, we explored the data to understand its patterns and characteristics. This exploration helped us design more effective visualizations.

#### Key Patterns Discovered

**Geographic Patterns**

Our exploration revealed clear geographic differences in road safety:

- New South Wales and Victoria have the highest absolute numbers of fines and fatalities, but this is expected because they have the largest populations
- When adjusted for population, Northern Territory has the highest fatality rate per capita
- Tasmania has the lowest fine issuance rate, which might indicate lower enforcement rather than better behavior
- Urban areas have higher fine counts but lower fatality rates than rural areas

**Demographic Patterns**

We found important patterns across different age groups:

- The 17-25 age group receives the highest proportion of speeding fines
- The 26-39 age group has the highest total number of fines across all categories
- Older drivers (65+) receive fewer fines but have a higher proportion of fines for failure to obey traffic signals
- Young male drivers are overrepresented in serious crash statistics

**Offence Type Patterns**

Different types of violations have different patterns:

- Speeding is by far the most common offence, accounting for over 60% of all fines
- Mobile phone use while driving has increased significantly from 2020 to 2024
- Drink driving fines have decreased over the study period
- Seatbelt violations remain relatively constant

**Temporal Patterns**

We identified several interesting trends over time:

- Overall fine issuance increased from 2020 to 2024
- There was a notable drop in both fines and crashes during 2020, likely due to COVID-19 lockdowns
- Fatality rates have remained relatively stable despite increased enforcement
- Camera-based enforcement (speed and red light cameras) has increased while traditional traffic stops have decreased

#### Statistical Analysis

We performed basic statistical analysis to quantify patterns:

**Correlation Analysis**

We calculated correlations between different variables:

- Fine rate and fatality rate show a weak negative correlation (-0.23) across states. This suggests states with more enforcement might have slightly fewer fatalities, but the relationship is not strong
- Population density and fine rate show a moderate positive correlation (0.58). More densely populated areas have higher enforcement
- Camera count and fine count show a strong positive correlation (0.82). States with more cameras issue more fines

**Distribution Analysis**

We examined the distributions of key variables:

- Fine counts follow a highly skewed distribution with a few very common offences (speeding) and many rare ones
- Fine amounts show a multi-modal distribution with peaks at common fine values ($100, $200, $300, etc.)
- Age distributions of fined drivers roughly match the overall driving population but with young drivers overrepresented

#### Data Quality Assessment

Our exploration also revealed data quality issues:

**Coverage Gaps**

- Some smaller territories have incomplete data for certain years
- Serious injury data is less complete than fatality data
- Some states do not report certain offence types separately

**Consistency Issues**

- Reporting standards changed slightly in 2022, affecting comparability across years
- Different states use different age grouping in some reports
- Some categories are defined differently across jurisdictions

**Limitations**

We identified several limitations that affect interpretation:

- We have enforcement data (fines) but not exposure data (how many people committed violations but were not caught)
- We cannot directly link enforcement actions to crash outcomes for the same individuals
- Crash data does not include property-damage-only crashes, only injury and fatal crashes
- We do not have data on enforcement resources (officer hours, camera locations) for all states

These limitations are important to keep in mind when interpreting our visualizations. We make sure to communicate these limitations to users through explanatory text in the dashboard.

---

## 3. Requirements

### 3.1 Must-Have Features

Based on our analysis of user needs and available data, we defined several features that our visualization dashboard must include.

#### Seven Core Visualizations

Our dashboard must include seven different types of visualizations. Each visualization serves a specific purpose and answers different questions about the data.

**1. Donut Chart - Offence Type Distribution**

This visualization shows the breakdown of traffic fines by offence type. Users can see what proportion of fines are for speeding, mobile phone use, drink driving, seatbelt violations, and other offences. This chart must be interactive, allowing users to click on segments to filter other visualizations.

**2. Bubble Map - Geographic Distribution of Fines**

This map shows the geographic distribution of traffic fines across Australia. Bubbles appear at different locations with sizes proportional to the number of fines issued in that area. This helps users quickly identify enforcement hotspots and geographic patterns.

**3. Heatmap - Age Group vs Offence Type**

This heatmap displays a matrix showing the relationship between age groups and offence types. Each cell is color-coded based on the number of fines for that combination. This helps users identify which age groups are most prone to which types of violations.

**4. Line Chart - Temporal Trends**

This line chart shows how fine counts and crash rates have changed over time from 2020 to 2024. Users can toggle between viewing different metrics and different states. This helps track progress and identify trends.

**5. Choropleth Map - State-Level Comparison**

This map shows all Australian states and territories color-coded based on selected metrics like fine rate per capita or fatality rate. This enables quick visual comparison across states and identification of geographic patterns at the state level.

**6. Stacked Bar Chart - State Comparison by Offence Type**

This chart compares all states side by side, with bars broken down by offence type. This allows users to compare both total fine volumes and the composition of violations across states.

**7. Dual-Axis Chart - Enforcement vs Outcomes**

This chart displays both enforcement metrics (like fine counts) and outcome metrics (like fatalities) on the same chart with two different y-axes. This helps users explore potential relationships between enforcement activities and road safety outcomes.

#### Interactive Features

**Filtering and Selection**

Users must be able to filter the data in multiple ways:

- Filter by state or territory
- Filter by time period (year or year range)
- Filter by age group
- Filter by offence type

When users apply filters, all visualizations must update accordingly to show only the filtered data.

**Cross-Filtering**

When users click on elements in one visualization, it should filter the data shown in other visualizations. For example, clicking on "Speeding" in the donut chart should update all other charts to show only speeding-related data. Users must be able to clear filters easily.

**Tooltips**

All visualizations must include informative tooltips that appear when users hover over elements. Tooltips should show exact values and provide context for understanding the data.

**Responsive Design**

The dashboard must work on different screen sizes:

- Desktop computers (1920x1080 and larger)
- Tablets in landscape and portrait orientation (768x1024)
- Mobile phones in portrait orientation (375x667 minimum)

The layout should adapt gracefully, with visualizations resizing or stacking vertically on smaller screens.

#### Data Loading and Performance

**Fast Loading**

The dashboard must load quickly. All data files should be optimized for size. The initial page load should complete in under 3 seconds on a typical broadband connection.

**Smooth Interactions**

All interactions should respond quickly without noticeable lag. Transitions and animations should be smooth and should complete in under 500 milliseconds.

#### Accessibility

**Screen Reader Support**

The dashboard must work with screen readers. All visualizations must have appropriate ARIA labels and descriptions. Users who cannot see the visual charts should be able to access the data through their screen reader.

**Keyboard Navigation**

All interactive elements must be accessible via keyboard. Users should be able to tab through filters, buttons, and interactive chart elements without needing a mouse.

**Color Blindness Considerations**

The color scheme must be distinguishable for users with common types of color blindness. We must not rely solely on color to convey information.

**Text Alternatives**

Each visualization must have a text summary describing the key patterns visible in the chart. This helps users with visual impairments and also helps all users understand what to look for.

#### Documentation and Help

**Clear Labels and Titles**

Every visualization must have a clear title and axis labels. Users should be able to understand what they are looking at without extensive explanation.

**Help Text**

The dashboard should include help information explaining how to use the interactive features and how to interpret the visualizations.

**Data Sources**

Clear attribution to data sources must be visible on the page. Users should be able to find links to the original data sources.

### 3.2 Optional Features

In addition to the must-have features, we identified several optional features that would enhance the dashboard if time permits.

#### Advanced Filtering

**Multi-Select Filters**

Instead of filtering by one state at a time, allow users to select multiple states for comparison. This would make it easier to compare specific groups of states.

**Date Range Selector**

Implement a visual date range selector that allows users to drag endpoints to select custom time periods rather than just selecting predefined years.

#### Data Export

**Download Filtered Data**

Allow users to download the currently filtered data as a CSV file. This would enable users to perform their own additional analysis in Excel or other tools.

**Export Visualizations**

Provide buttons to download individual visualizations as PNG or SVG images. This would help users include the charts in reports and presentations.

#### Enhanced Interactivity

**Brushing and Linking**

Implement more advanced linking between charts where users can drag to select ranges in one chart and see how that selection affects other charts.

**Animation Controls**

For the time series visualizations, provide play/pause controls that animate through the years automatically, showing how patterns change over time.

#### Comparison Features

**Side-by-Side Comparison**

Allow users to create two separate views of the dashboard with different filters applied, enabling direct comparison of different states or time periods.

**Benchmarking**

Provide automatic identification of best-performing and worst-performing states on various metrics, with visual highlighting of these outliers.

#### Contextual Information

**News Integration**

Show relevant news articles or policy changes aligned with spikes or changes in the data. This would provide context for understanding why patterns change.

**Weather and Event Data**

Integrate data about major events or weather patterns that might affect road safety, helping users understand external factors.

#### Advanced Analytics

**Trend Prediction**

Use simple statistical methods to project future trends based on historical data, helping policy makers plan ahead.

**Clustering Analysis**

Automatically identify states or regions with similar patterns and group them together for comparison.

---

## 4. Visualization Design

### 4.1 Design Process and Evolution

Our visualization design went through multiple iterations based on testing and feedback. We started with simple sketches and gradually refined our designs into the final interactive dashboard.

#### Initial Sketches and Wireframes

In Week 8, we created hand-drawn sketches of possible visualizations. We brainstormed different ways to show the data and sketched out rough ideas on paper. These initial sketches helped us explore different options quickly without committing to code.

We considered many different visualization types:

- Bar charts for comparing states
- Pie charts for showing offence type distribution
- Maps for geographic patterns
- Line charts for trends over time
- Scatter plots for correlations
- Tree maps for hierarchical data

We sketched different layout options for how to arrange multiple visualizations on a single page. We experimented with grid layouts, tabbed interfaces, and scrolling single-page layouts.

#### First Digital Prototypes

In Week 9, we created our first digital prototypes using D3.js. These were simple, non-interactive versions of our visualizations using a small sample of the data.

Our first prototype included:

- A basic bar chart comparing fine counts across states
- A simple pie chart showing offence type distribution
- A rudimentary map with colored states

These prototypes were very basic. They had no interactivity, no filtering, and limited styling. However, they allowed us to test our technical approach and identify problems early.

**Problems we discovered:**

- The pie chart was hard to read with many small slices for rare offences
- The bar chart became cluttered when showing multiple metrics
- The map needed better visual encoding to show differences clearly
- We needed consistent color schemes across visualizations

#### Iteration Based on Feedback

We showed our prototypes to our instructor and classmates in Week 10 and received valuable feedback.

**Feedback received:**

- "The pie chart should be a donut chart to look more modern and leave space for a label in the center"
- "Add interactive tooltips so we can see exact values"
- "The colors are too bright and distracting"
- "It is hard to compare multiple states at once"
- "Add filtering so we can focus on specific states or time periods"
- "The mobile layout is broken and unusable"

Based on this feedback, we made significant changes:

- Changed the pie chart to a donut chart with better labeling
- Implemented tooltips showing detailed information on hover
- Developed a more subdued, professional color palette
- Added the stacked bar chart to enable multi-state comparison
- Implemented filtering controls and cross-filtering between charts
- Fixed responsive design issues for mobile devices

#### Second Iteration

In Week 11, we created a more complete version incorporating the feedback. This version included:

- All seven visualization types working together
- Interactive filtering and cross-filtering
- Consistent styling and color scheme
- Responsive layout that worked on mobile
- Tooltips and help text

We conducted another round of testing with a wider group of users including people outside our class.

**New feedback:**

- "The heatmap is confusing, I do not understand what the colors mean"
- "When I filter by one state, some charts become empty which is confusing"
- "The map needs labels for the states"
- "The line chart should allow comparing multiple states at once"
- "The colors used for different offence types should be consistent across all charts"

We addressed this feedback:

- Added a clear legend and title to the heatmap explaining the color scale
- Added messages explaining when filters result in no data for certain charts
- Added state labels to the choropleth map
- Enhanced the line chart to show multiple states simultaneously
- Ensured consistent color mapping for offence types across all visualizations

#### Final Design

By Week 12, we arrived at our final design. This design incorporated all the feedback we received and met all our must-have requirements.

The final design features:

- Seven fully interactive visualizations arranged in a logical flow
- Consistent visual styling with our chosen color palette
- Smooth animations and transitions
- Comprehensive tooltips and help text
- Robust filtering system with clear feedback
- Fully responsive layout working on all device sizes
- Accessible features including ARIA labels and keyboard navigation

### 4.2 Visualisation Design and Website Design

Our website design integrates the visualizations into a cohesive, professional dashboard interface.

#### Layout Structure

The dashboard uses a single-page layout with visualizations arranged vertically. Users scroll down the page to see all visualizations. This approach works well because:

- It is simple and intuitive
- It works well on all device sizes
- It creates a narrative flow through the data
- It avoids the complexity of tabs or multiple pages

The layout consists of several sections:

**Header Section**
- Project title and team information
- Brief description of the dashboard purpose
- Filter controls for global filtering

**Visualization Sections**
- Each visualization has its own clearly defined section
- Section titles explain what the visualization shows
- Brief explanatory text provides context

**Footer Section**
- Data source attribution
- Links to GitHub repository
- Contact information

#### Visual Styling

**Color Palette**

We developed a carefully chosen color palette:

**Primary Colors:**
- Deep blue (#1f4788) for primary elements and headings
- Medium blue (#2e7d32) for interactive elements
- Light blue (#e3f2fd) for backgrounds and highlights

**Data Colors:**
- For offence types, we use a categorical color scheme with distinct, easily distinguishable colors
- For sequential data (like the heatmap), we use a blue-green gradient from light to dark
- For diverging data, we use a blue-orange diverging scheme

**Accessibility Colors:**
- All color combinations meet WCAG AA contrast standards
- Colors were tested using color blindness simulators to ensure they work for users with color vision deficiencies

**Typography**

We use clear, readable fonts:

- **Headings**: Roboto Bold for section titles and chart titles
- **Body Text**: Roboto Regular for explanatory text and labels
- **Data Labels**: Roboto Mono for numbers to ensure clear readability

All text sizes meet accessibility guidelines:
- Minimum 14px for body text
- Minimum 18px for headings
- Text can be resized up to 200% without breaking the layout

**Spacing and White Space**

We use generous spacing to prevent the interface from feeling cluttered:

- Large margins between visualization sections
- Adequate padding within each visualization container
- Clear separation between interactive controls and visualizations

**Responsive Breakpoints**

Our design has three main breakpoints:

**Desktop (1200px and above)**
- Visualizations displayed at full width
- Some visualizations arranged side by side where appropriate
- Filter controls in a sidebar

**Tablet (768px to 1199px)**
- All visualizations stack vertically
- Filter controls move above visualizations
- Charts resize to fit tablet screens

**Mobile (below 768px)**
- Single column layout
- Simplified visualizations with scrollable elements where needed
- Collapsed filter controls with expand/collapse functionality

#### Navigation and User Flow

The dashboard is designed to guide users through a logical exploration of the data:

1. **Overview**: Donut chart showing overall offence type distribution
2. **Geographic Context**: Bubble map showing where fines occur
3. **Demographic Analysis**: Heatmap showing age-offence patterns
4. **Temporal Analysis**: Line chart showing trends over time
5. **State Comparison**: Choropleth map and stacked bar chart comparing states
6. **Outcome Analysis**: Dual-axis chart exploring enforcement-outcome relationships

This sequence takes users from general overview to specific comparisons and relationships.

### 4.3 Design Principles

Our visualization design follows established best practices and design principles.

#### Data-Ink Ratio

Following Edward Tufte's principle of maximizing the data-ink ratio, we remove unnecessary visual elements:

- No chartjunk or decorative elements
- Minimal grid lines (only when necessary for reading values)
- Clean, simple axes without excessive tick marks
- No 3D effects or shadows that do not add information

Every visual element in our charts serves a purpose in communicating the data.

#### Visual Hierarchy

We establish clear visual hierarchy to guide attention:

- Larger, bolder text for important titles
- Color used to highlight important data points
- Interactive elements visually distinct from static elements
- Current selections highlighted prominently

#### Consistency

We maintain consistency throughout the dashboard:

- Same colors always represent the same offence types
- Same interaction patterns across all visualizations (hover for tooltip, click to filter)
- Consistent spacing and alignment
- Consistent terminology in labels and descriptions

#### Appropriate Chart Types

We chose visualization types that match the data characteristics:

**Donut Chart for Composition**
- Shows part-to-whole relationships for offence types
- Easy to see relative proportions at a glance

**Maps for Geographic Data**
- Bubble map shows precise locations with magnitude
- Choropleth map shows state-level patterns
- Geographic encoding makes spatial patterns obvious

**Heatmap for Two-Dimensional Patterns**
- Shows relationship between two categorical variables (age and offence type)
- Color encoding makes patterns visible across the matrix

**Line Chart for Time Series**
- Shows trends and changes over time clearly
- Allows comparison of multiple series

**Stacked Bar for Multi-Dimensional Comparison**
- Compares totals across states
- Shows composition within each state
- Allows both absolute and relative comparisons

**Dual-Axis for Comparing Different Scales**
- Shows two related metrics with different units on same chart
- Makes potential correlations visible

#### Accessibility Principles

Our design incorporates accessibility from the start:

**Perceivable**
- All information conveyed through color is also conveyed through text or pattern
- Text alternatives provided for all visual content
- Sufficient contrast between foreground and background

**Operable**
- All functionality available from keyboard
- Users have enough time to read and interact with content
- No flashing content that could trigger seizures

**Understandable**
- Clear, simple language in all labels and descriptions
- Consistent navigation and interaction patterns
- Helpful error messages when filters produce no results

**Robust**
- Semantic HTML structure
- ARIA labels and roles for complex interactive elements
- Works with assistive technologies like screen readers

### 4.4 Interaction Design

Our interactive features are designed to support data exploration while remaining intuitive and easy to use.

#### Filtering System

**Global Filters**

Located at the top of the dashboard, global filters affect all visualizations:

- **State/Territory Filter**: Dropdown menu to select one or more states
- **Year Range Filter**: Slider to select start and end years
- **Age Group Filter**: Checkboxes to include/exclude age groups

When global filters are applied, a clear indicator shows what filters are active. Users can easily clear all filters with a "Reset Filters" button.

**Local Filtering Through Interaction**

Users can also filter by clicking on visualization elements:

- Click a segment in the donut chart to filter by offence type
- Click a state in the choropleth map to filter by that state
- Click a cell in the heatmap to filter by that age-offence combination

When local filters are applied through clicks, the selected element is highlighted, and other visualizations update to show only the filtered data.

#### Tooltips

All visualizations include rich tooltips that appear on hover:

**Tooltip Content:**
- Primary value being displayed
- Additional contextual information
- Comparison to averages or other relevant benchmarks
- Clear units and labels

**Tooltip Behavior:**
- Appear immediately on hover (no delay)
- Position themselves intelligently to avoid going off-screen
- Disappear when mouse moves away
- Work on touch devices with tap-and-hold gesture

#### Transitions and Animations

We use smooth transitions to help users understand what is changing:

**When filters are applied:**
- Chart elements smoothly transition to new positions and sizes
- Elements that no longer match filters fade out
- New elements that appear fade in
- Total transition time: 300-500 milliseconds

**When hovering:**
- Elements smoothly highlight on hover
- Slight size increase or opacity change to indicate interactivity
- Quick response time (100 milliseconds) for immediate feedback

**Principles for animations:**
- Fast enough to not slow down exploration
- Slow enough to be perceived and understood
- Consistent timing across all visualizations
- Can be disabled for users who prefer reduced motion

#### Cross-Filtering Behavior

When users select an element in one visualization, related elements in other visualizations are highlighted:

**Example:** When user clicks "Speeding" in the donut chart:
- Speeding segment highlights in donut chart
- Bubble map shows only speeding fines
- Heatmap highlights speeding row across all age groups
- Line chart shows only speeding trend
- Stacked bars show only speeding component
- Dual-axis chart filters to speeding data

This linked interaction helps users understand connections across different views of the data.

#### Responsive Interaction Adaptations

Interactions adapt to different devices:

**Desktop:**
- Hover effects show additional information
- Click to filter and select
- Keyboard navigation available

**Tablet:**
- Tap replaces hover (tap to show tooltip, tap again to filter)
- Touch-friendly larger click targets
- Swipe gestures for some interactions

**Mobile:**
- Simplified interactions where necessary
- No hover effects (not available on touch screens)
- Larger touch targets (minimum 44x44 pixels)
- Collapsible sections to manage screen space

---

## 5. Iteration and Validation

Throughout our project, we continuously tested and refined our visualizations based on feedback and observation.

#### User Testing Sessions

We conducted three formal user testing sessions during the project.

**Testing Session 1 - Week 10**

We tested our early prototypes with five classmates who were not familiar with our project.

**Test Tasks:**
- Find which state has the highest number of speeding fines
- Identify which age group receives the most mobile phone fines
- Determine if fine counts are increasing or decreasing over time

**Findings:**
- All participants successfully completed the geographic task using the map
- 3 out of 5 struggled with the heatmap, finding it confusing
- 4 out of 5 found the temporal trend easily in the line chart
- Participants requested tooltips to see exact numbers
- Several participants tried to click on chart elements expecting filtering behavior

**Actions Taken:**
- Redesigned heatmap with clearer legend and title
- Added comprehensive tooltips to all charts
- Implemented click-to-filter functionality
- Added help text explaining how to interpret each visualization

**Testing Session 2 - Week 11**

We tested with a more diverse group including an instructor and two people from outside the class.

**Test Tasks:**
- Compare Victoria and New South Wales across all metrics
- Find which offence type has increased the most from 2020 to 2024
- Identify patterns in how different age groups violate different rules

**Findings:**
- All participants successfully completed all tasks
- Average task completion time was reasonable (under 2 minutes per task)
- Participants appreciated the interactivity and filtering
- Some confusion about what happens when multiple filters are applied
- Request for mobile-friendly version
- Positive feedback on color scheme and overall design

**Actions Taken:**
- Added clear filter status indicator showing all active filters
- Improved responsive design for mobile devices
- Added "clear filters" button for easy reset
- Enhanced feedback when filters result in empty data

**Testing Session 3 - Week 12**

Final validation testing with both technical and non-technical users.

**Test Tasks:**
- Explore freely and report interesting findings
- Complete specific tasks on mobile devices
- Test keyboard navigation and screen reader compatibility

**Findings:**
- Dashboard performed well on usability metrics
- Mobile experience was much improved but some charts still challenging on small screens
- Keyboard navigation worked but could be more intuitive
- Screen reader support was functional but some descriptions could be clearer
- Overall positive feedback on usefulness and design

**Actions Taken:**
- Further simplified some visualizations for mobile view
- Improved keyboard navigation order and focus indicators
- Enhanced ARIA labels for better screen reader experience
- Added more descriptive text summaries for each visualization

#### Performance Testing

We tested loading times and interaction responsiveness:

**Initial Load Performance:**
- First version: 8 seconds to load all data and render charts
- After optimization: 2.5 seconds average load time
- Optimizations included data file compression, lazy loading of some charts, and code minification

**Interaction Performance:**
- All interactions respond within 100 milliseconds
- Transitions complete smoothly without jank
- No performance degradation after extended use

#### Accessibility Validation

We validated accessibility using several tools and methods:

**Automated Testing:**
- Ran WAVE accessibility checker (no errors, few warnings)
- Checked with axe DevTools (passed all automated tests)
- Validated HTML structure

**Manual Testing:**
- Tested with NVDA screen reader on Windows
- Tested keyboard navigation completely
- Tested with high contrast mode
- Tested with browser zoom up to 200%
- Tested with color blindness simulators

**Results:**
- All content accessible via screen reader
- All interactions possible via keyboard
- All color contrasts meet WCAG AA standards
- Layout maintains integrity at high zoom levels
- Visualizations distinguishable with color blindness

#### Cross-Browser and Device Testing

We tested across different browsers and devices:

**Browsers:**
- Chrome (primary development browser)
- Firefox
- Safari
- Edge

**Devices:**
- Desktop computers (Windows and Mac)
- iPads (various sizes)
- iPhones (various sizes)
- Android tablets and phones

**Issues Found and Fixed:**
- Safari had rendering issues with some SVG elements (fixed with vendor prefixes)
- Older browsers did not support some JavaScript features (added polyfills)
- Some Android devices had touch interaction issues (improved touch event handling)

#### Validation of Insights

We validated that our visualizations actually revealed true and useful insights:

**Comparison with Published Reports:**
- Cross-checked our findings with official BITRE reports
- Verified that trends we showed matched published statistics
- Confirmed that our data processing did not introduce errors

**Expert Review:**
- Showed dashboard to road safety researcher
- Confirmed that patterns visible in our visualizations matched their domain knowledge
- Received validation that insights were meaningful and useful

**Feedback from Target Users:**
- Policy maker found state comparisons very helpful
- Law enforcement officer appreciated geographic distribution views
- Researcher valued the ability to drill down into demographic patterns
- General public users found it educational and eye-opening

---

## 6. Conclusion

This project successfully created an interactive data visualization dashboard for exploring Australian road safety enforcement data. Our dashboard makes complex data accessible and understandable for diverse audiences including policy makers, researchers, law enforcement, and the general public.

#### What We Achieved

We accomplished all of our must-have requirements:

**Seven Interactive Visualizations:**
- Donut chart showing offence type distribution
- Bubble map showing geographic patterns
- Heatmap showing age-offence relationships
- Line chart showing temporal trends
- Choropleth map for state comparison
- Stacked bar chart for multi-dimensional state comparison
- Dual-axis chart exploring enforcement-outcome relationships

**Comprehensive Interactivity:**
- Global filtering by state, year, and age group
- Cross-filtering through clicks on chart elements
- Rich tooltips with detailed information
- Smooth animations and transitions

**Professional Design:**
- Clean, modern visual style
- Consistent color scheme and typography
- Responsive layout working on desktop, tablet, and mobile
- Accessible to users with disabilities

**Robust Implementation:**
- Clean, well-documented code
- Efficient data processing pipeline
- Fast loading and smooth performance
- Deployed successfully to Mercury server

#### Key Learnings

Through this project, we learned valuable lessons about data visualization and web development.

**Technical Skills:**
- Became proficient with D3.js for creating custom visualizations
- Learned data processing techniques using KNIME
- Improved our skills in HTML, CSS, and JavaScript
- Gained experience with responsive web design
- Learned about web accessibility standards and implementation

**Design Skills:**
- Learned to match visualization types to data characteristics
- Understood the importance of iterative design and user testing
- Developed skills in color theory and visual hierarchy
- Learned to balance aesthetics with functionality
- Understood the challenges of designing for multiple devices

**Process Skills:**
- Learned to work effectively as a team using GitHub
- Developed project management skills through structured timeline
- Learned the value of early and frequent testing
- Understood the importance of clear documentation
- Learned to incorporate feedback constructively

**Domain Knowledge:**
- Gained deeper understanding of Australian road safety issues
- Learned about traffic enforcement patterns and policies
- Understood the complexity of road crash data
- Appreciated the challenges of public policy decision making

#### Challenges and How We Overcame Them

We faced several significant challenges during the project:

**Data Quality Issues:**
The raw data had many inconsistencies and missing values. We overcame this through careful data cleaning and validation processes in KNIME. We documented all our decisions about handling missing data and standardizing formats.

**Performance Optimization:**
Our initial version was slow to load because we were loading large data files. We solved this by aggregating data appropriately, compressing files, and implementing efficient D3.js rendering techniques.

**Mobile Responsiveness:**
Making complex visualizations work on small screens was challenging. We addressed this through adaptive layouts, simplified mobile versions of some charts, and careful testing on actual mobile devices.

**Accessibility:**
Making data visualizations accessible to users who cannot see them was a new challenge for us. We learned about ARIA labels, keyboard navigation, and screen reader compatibility. We tested with actual assistive technologies to ensure our implementation worked.

**Team Coordination:**
Working as a team on the same codebase required good coordination. We used GitHub effectively with branches and pull requests. We held regular meetings to stay aligned and resolve merge conflicts.

#### Impact and Value

Our visualization dashboard creates value in several ways:

**For Policy Makers:**
The dashboard enables evidence-based decision making about road safety policy. Policy makers can identify problem areas, track progress over time, and compare different jurisdictions.

**For Researchers:**
Researchers can explore patterns in the data that would be difficult to see in tables. The ability to filter and drill down supports detailed analysis.

**For Law Enforcement:**
Law enforcement agencies can see geographic and temporal patterns in violations, helping them allocate resources more effectively.

**For the Public:**
Regular citizens can understand road safety in their area and hold officials accountable. The visualizations make government data accessible to everyone.

**For Education:**
The dashboard serves as an educational tool showing best practices in data visualization, interaction design, and web development.

#### Future Enhancements

If we were to continue developing this project, we would add several enhancements:

**More Data Sources:**
- Integrate weather data to explore weather-related crash patterns
- Add road infrastructure data to analyze how road design affects safety
- Include vehicle type data for more detailed analysis

**Advanced Analytics:**
- Implement statistical modeling to predict future trends
- Add clustering analysis to identify similar regions
- Provide anomaly detection to highlight unusual patterns

**Enhanced Interactivity:**
- Add data export functionality
- Implement saved filter configurations
- Create shareable links with specific filter states
- Add annotation features for users to mark interesting findings

**Broader Coverage:**
- Extend the time range with historical data going back further
- Add more granular geographic data at city/region level
- Include international comparisons with other countries

**Community Features:**
- Allow users to submit observations and insights
- Create discussion forums around the data
- Enable sharing of interesting findings on social media

#### Reflection on the Process

Looking back on the entire project, we are proud of what we accomplished. We created a professional-quality data visualization dashboard that serves real user needs. We learned valuable technical and design skills that will benefit us in future projects.

The iterative process of design, testing, feedback, and refinement was crucial to our success. Our first prototypes were rough, but through continuous improvement based on user feedback, we created a polished final product.

Working as a team taught us the importance of communication, coordination, and mutual support. Each team member brought different strengths, and we learned to leverage those strengths effectively.

Most importantly, we learned that effective data visualization is about more than just making pretty charts. It is about understanding user needs, choosing appropriate visual encodings, ensuring accessibility, and creating intuitive interactions that empower users to explore and understand data.

This project demonstrated that when done well, data visualization can transform raw numbers into insights, complexity into clarity, and data into action.

---

## 7. References

Bureau of Infrastructure and Transport Research Economics (BITRE). (2024). *Road Deaths Australia*. Australian Government Department of Infrastructure, Transport, Regional Development, Communications and the Arts. Retrieved from https://www.bitre.gov.au/statistics/safety

Bureau of Infrastructure and Transport Research Economics (BITRE). (2024). *Road Safety Statistics*. Retrieved from https://www.bitre.gov.au/statistics/safety

Bostock, M., Ogievetsky, V., & Heer, J. (2011). D³ Data-Driven Documents. *IEEE Transactions on Visualization and Computer Graphics*, 17(12), 2301-2309.

Cairo, A. (2016). *The Truthful Art: Data, Charts, and Maps for Communication*. New Riders.

Few, S. (2012). *Show Me the Numbers: Designing Tables and Graphs to Enlighten*. Analytics Press.

Knaflic, C. N. (2015). *Storytelling with Data: A Data Visualization Guide for Business Professionals*. Wiley.

Munzner, T. (2014). *Visualization Analysis and Design*. CRC Press.

New South Wales Government. (2024). *Road Safety Data*. Transport for NSW. Retrieved from https://www.transport.nsw.gov.au/data-and-research/road-safety

Queensland Government. (2024). *Traffic and Travel Statistics*. Department of Transport and Main Roads. Retrieved from https://www.data.qld.gov.au/

Tufte, E. R. (2001). *The Visual Display of Quantitative Information* (2nd ed.). Graphics Press.

Victoria State Government. (2024). *Road Safety Statistics*. Department of Transport and Planning. Retrieved from https://discover.data.vic.gov.au/

Ware, C. (2019). *Information Visualization: Perception for Design* (4th ed.). Morgan Kaufmann.

Web Content Accessibility Guidelines (WCAG) 2.1. (2018). W3C. Retrieved from https://www.w3.org/WAI/WCAG21/quickref/

Wilkinson, L. (2005). *The Grammar of Graphics* (2nd ed.). Springer.

World Health Organization. (2018). *Global Status Report on Road Safety 2018*. WHO Press.

---

## 8. Appendices

### Appendix A: Data Dictionary

This section defines all variables used in our processed datasets.

**State-Level Variables:**

| Variable Name | Type | Description | Values/Range |
|---|---|---|---|
| state | String | Australian state or territory name | NSW, VIC, QLD, SA, WA, TAS, NT, ACT |
| year | Integer | Calendar year | 2020-2024 |
| population | Integer | Estimated population | 100,000 - 8,000,000 |
| total_fines | Integer | Total number of fines issued | 0 - 3,000,000 |
| fine_rate | Float | Fines per 100,000 population | 0 - 50,000 |
| total_fatalities | Integer | Total road deaths | 0 - 400 |
| fatality_rate | Float | Fatalities per 100,000 population | 0 - 25 |

**Offence-Type Variables:**

| Variable Name | Type | Description | Values/Range |
|---|---|---|---|
| offence_type | String | Category of traffic violation | Speeding, Mobile Phone, Drink Driving, Seatbelt, Red Light, Other |
| offence_count | Integer | Number of fines for this offence | 0 - 2,000,000 |
| offence_percentage | Float | Percentage of total fines | 0 - 100 |

**Age-Group Variables:**

| Variable Name | Type | Description | Values/Range |
|---|---|---|---|
| age_group | String | Age range of driver | 17-25, 26-39, 40-64, 65+, Unknown |
| age_fine_count | Integer | Fines issued to this age group | 0 - 1,500,000 |

**Geographic Variables:**

| Variable Name | Type | Description | Values/Range |
|---|---|---|---|
| latitude | Float | Geographic latitude | -43.6 to -10.4 |
| longitude | Float | Geographic longitude | 113.3 to 153.6 |
| location_name | String | City or region name | Various |
| location_fines | Integer | Fines issued at this location | 0 - 500,000 |

### Appendix B: Technical Implementation Details

**Technology Stack:**

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Visualization Library**: D3.js version 7.8.5
- **Data Processing**: KNIME Analytics Platform 4.7.2
- **Version Control**: Git and GitHub
- **Deployment**: Mercury Web Server (Swinburne University)

**Browser Support:**

- Chrome 90+ (primary)
- Firefox 88+
- Safari 14+
- Edge 90+

**File Structure:**

```
project-dv_group49/
├── index.html
├── css/
│   ├── style.css
│   ├── responsive.css
│   └── accessibility.css
├── js/
│   ├── main.js
│   ├── donut-chart.js
│   ├── bubble-map.js
│   ├── heatmap.js
│   ├── line-chart.js
│   ├── choropleth-map.js
│   ├── stacked-bar.js
│   ├── dual-axis.js
│   └── filters.js
├── data/
│   ├── state_summary.csv
│   ├── time_series.csv
│   ├── age_offence_matrix.csv
│   ├── geographic_fines.csv
│   ├── offence_distribution.csv
│   └── combined_metrics.csv
└── README.md
```

**Key Code Snippets:**

*Loading Data:*
```javascript
Promise.all([
  d3.csv('data/state_summary.csv'),
  d3.csv('data/time_series.csv'),
  d3.csv('data/offence_distribution.csv')
]).then(function(files) {
  // Process and visualize data
});
```

*Creating Interactive Tooltip:*
```javascript
const tooltip = d3.select('body')
  .append('div')
  .attr('class', 'tooltip')
  .style('opacity', 0);

element.on('mouseover', function(event, d) {
  tooltip.transition()
    .duration(200)
    .style('opacity', .9);
  tooltip.html(`<strong>${d.label}</strong><br/>${d.value}`)
    .style('left', (event.pageX + 10) + 'px')
    .style('top', (event.pageY - 28) + 'px');
});
```

### Appendix C: User Testing Materials

**Task List for User Testing Session 2:**

1. **Task 1 - State Comparison:**
   "Using the visualizations, determine which state (Victoria or New South Wales) has a higher rate of speeding fines per capita in 2024."

   *Expected approach:* Use filters to select 2024, then use choropleth map or stacked bar chart to compare the two states.

2. **Task 2 - Temporal Trend:**
   "Identify which type of traffic offence has shown the largest increase from 2020 to 2024."

   *Expected approach:* Use line chart with filters to compare different offence types over time.

3. **Task 3 - Demographic Pattern:**
   "Find which age group receives the most fines for mobile phone use while driving."

   *Expected approach:* Use heatmap to find the intersection of mobile phone offences and age groups.

4. **Task 4 - Geographic Exploration:**
   "Identify which region has the highest concentration of red light camera fines."

   *Expected approach:* Use bubble map with offence type filter set to red light violations.

**Post-Test Questionnaire:**

After completing tasks, participants rated their agreement with these statements on a 1-5 scale:

- The dashboard was easy to use
- The visualizations were clear and understandable
- I could find the information I needed quickly
- The interactive features helped me explore the data
- The design was visually appealing
- I would use this dashboard if I needed road safety information

### Appendix D: Accessibility Features

**ARIA Labels Used:**

```html
<div role="img" aria-label="Donut chart showing distribution of traffic offences by type">
  <!-- Chart SVG -->
</div>

<button aria-label="Filter data by state">
  Select State
</button>

<div role="region" aria-live="polite" aria-atomic="true">
  <!-- Filter status messages -->
</div>
```

**Keyboard Navigation:**

- Tab: Move focus to next interactive element
- Shift+Tab: Move focus to previous interactive element
- Enter/Space: Activate button or select element
- Arrow keys: Navigate within visualization selections
- Escape: Clear current selection or close tooltip

**Screen Reader Announcements:**

When filters are applied:
"Filtering data to show only Speeding offences in New South Wales for years 2022 to 2024. 3 filters active."

When hovering chart elements:
"Victoria, speeding fines: 452,000. Fine rate: 6,800 per 100,000 population. Click to filter by this state."

### Appendix E: Design Iterations

**Color Scheme Evolution:**

*Version 1:* Bright primary colors (red, blue, yellow, green)
- Feedback: Too bright and distracting
- Changed to more subdued professional palette

*Version 2:* All blue monochrome
- Feedback: Hard to distinguish different categories
- Changed to multi-hue categorical scheme

*Version 3:* Final palette with carefully chosen distinct colors
- Tested with color blindness simulators
- Validated contrast ratios
- Positive feedback from users

**Layout Evolution:**

*Version 1:* Grid layout with visualizations in a 2x4 grid
- Problem: Charts too small, hard to see details
- Problem: Did not work on mobile at all

*Version 2:* Tabbed interface with one chart per tab
- Problem: Users lost context switching between tabs
- Problem: Could not see relationships across charts

*Version 3:* Single-page scroll layout (final)
- Advantages: See all charts, maintain context
- Advantages: Works well on all device sizes
- Positive user feedback

### Appendix F: Team Contributions

**Min Thu Kyaw Khaung (Markus):**
- Led data collection and processing using KNIME
- Implemented bubble map and choropleth map visualizations
- Set up GitHub repository and managed version control
- Deployed final project to Mercury server
- Coordinated team meetings and timeline

**Thet Hein Aung (Damian):**
- Implemented donut chart, heatmap, and line chart
- Designed and implemented responsive CSS layout
- Conducted user testing sessions
- Created accessibility features and ARIA labels
- Wrote significant portions of project documentation

**Sai Lyan Hein (Jack):**
- Implemented stacked bar chart and dual-axis chart
- Developed filtering system and cross-filtering logic
- Designed color scheme and visual styling
- Performed browser compatibility testing
- Created final presentation materials

All team members contributed to:
- Initial brainstorming and planning
- Design iterations and refinement
- Testing and bug fixing
- Documentation and final report

---

**End of Project Design Book**

