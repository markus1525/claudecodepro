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

**Word Count:** ?

---

## Table of Contents

1. Introduction	2
   1.1 Background and Motivation	2
   1.2 Visualisation Purpose	4
   1.3 Project Schedule	5
2. Data	6
   2.1 Data Source and Governance	6
   2.2 Data Processing and Analysis	9
   2.3 Data Exploration	21
3. Requirements	26
   3.1 Must-Have Features	26
   3.2 Optional Features	28
4. Visualization Design	30
   4.1 Design Process and Evolution	30
   4.2 Visualisation Design and Website Design	34
   4.3 Design Principles	36
   4.4 Interaction Design	39
5. Iteration and Validation [Optional - Bonus Points]	42
6. Conclusion	42
7. References	42
8. Appendices	42
   Appendix A: Gen AI Declaration	42
   Appendix B: Complete Data Dictionary	42
   Appendix C: KNIME Workflow Documentation	42
   Appendix D: Additional Screenshots	42

---

## 1. Introduction

### 1.1 Background and Motivation

#### Target Audience and Key Tasks

Our visualisation is designed for five distinct user groups, each with specific information needs:

1. **Policy Makers & Government Officials**

   **Task:** Identify high-risk areas and evaluate enforcement effectiveness to inform road safety legislation

   **Need:** Clear comparison between enforcement intensity and safety outcomes by state/region

2. **Road Safety Analysts & Researchers**

   **Task:** Study patterns in traffic violations and relationships between enforcement, demographics, and crash outcomes

   **Need:** Detailed drill-down capability, ability to filter by age, offence type, and location

3. **Law Enforcement Agencies**

   **Task:** Understand enforcement patterns and optimize resource allocation

   **Need:** Geographic distribution of fines, identification of enforcement gaps

4. **General Public & Media**

   **Task:** Understand road safety issues in their local area and hold officials accountable

   **Need:** Intuitive comparisons, local context (state/region level)

5. **Transport Safety Advocates**

   **Task:** Provide evidence-based arguments for safer roads and identify vulnerable populations

   **Need:** Clear visualization of at-risk groups, enforcement gaps, fatality correlations

#### Problem Being Addressed

The Bureau of Infrastructure and Transport Research Economics (BITRE) collects extensive road safety enforcement data. Since 2023, this includes fine-grained details (specific locations, offender age groups, offence types). However, this new data has not been integrated into publicly accessible visualizations, creating a critical gap:

* Raw data exists but is not actionable for stakeholders
* Current public dashboard is outdated and lacks new detailed metrics
* No visual correlation between enforcement and safety outcomes is currently shown
* Decision-makers lack evidence to justify resource allocation strategies

#### Importance of the Visualisation

Road safety is a critical public health issue. By visualizing new enforcement data alongside fatality outcomes:

* Identifies patterns hidden in spreadsheets (e.g., which age groups drive violations vs. which are at-risk in crashes)
* Enables evidence-based policy (e.g., should enforcement focus on high-fatality regions or proactive prevention?)
* Improves transparency by making government data publicly accessible
* Supports targeted interventions (e.g., is enforcement concentrated in major cities while rural areas have high fatalities?)
* Evaluates strategy effectiveness (does more enforcement correlate with fewer deaths?)

### 1.2 Visualisation Purpose

#### Core Research Questions

Our dashboard enables users to answer six interconnected questions about road safety in Australia:

**Enforcement Questions (from police enforcement data 2020-2024):**

1. What are the most common offences being fined? Understanding which violations are most frequently enforced helps identify priority areas for road safety campaigns.

2. Where is enforcement concentrated? Which states enforce most in major cities vs remote areas? This reveals potential geographic gaps in enforcement coverage.

3. Is there a relationship between age and specific offences? Which age-offence combinations are most problematic? This enables targeted demographic interventions.

**Outcomes Questions (from fatality data 2020-2024):**

4. How have fatalities changed from 2020-2024? Are there seasonal or yearly trends? This helps evaluate whether road safety is improving over time.

5. Which states have highest fatalities? Is there geographic clustering? This identifies regions requiring urgent attention.

6. What types of crashes kill the most people? Who is most affected (drivers, pedestrians, motorcyclists, etc.)? This informs vehicle safety standards and infrastructure improvements.

**Comparison Question:**

7. Is there a relationship between enforcement intensity and fatality rates? Do states with more fines have fewer deaths? This evaluates enforcement effectiveness.

#### Key Benefits

* **Accessibility:** Transforms massive spreadsheets into intuitive interactive visualizations accessible to non-technical users
* **Pattern Discovery:** Reveals relationships between age, offence, location, and crash outcomes not obvious in raw data
* **Data-Driven Decision Making:** Provides evidence for resource allocation, intervention targeting, and policy development
* **Comparative Analysis:** Enables direct comparison of enforcement intensity vs. safety outcomes to evaluate strategy effectiveness
* **Public Transparency:** Makes government data publicly accessible, supporting informed community discourse
* **Impact on Decision-Making:** Shifts focus from "How much enforcement?" to "Where is enforcement working? Where are gaps?"

### 1.3 Project Schedule

Our work is planned in weekly milestones to avoid last-minute rushes and ensure quality deliverables.

| Week | Milestone/Deliverable | Tasks |
|---|---|---|
| Week 8 | Team Formation | Form team, set up GitHub, review project brief |
| Week 9 | Data Collection | Download BITRE data, start KNIME workflow, draft introduction |
| Week 10 | Stand Up 1 | Complete data cleaning, exploratory analysis, calculate statistics. Submit: Draft intro, KNIME file, GitHub link |
| Week 11 | Stand Up 2 | Create wireframes, design charts, plan interactions. Submit: 50% design book and website, updated datasets |
| Week 12 | Stand Up 3 | Code D3 visualizations, implement interactions. Submit: 75% Design Book and website, latest version of dataset |
| Week 13 | Final Submission | Polish design book, finalize website, complete all documentation. Submit: Completed Design Book, working website, all required files |

---

## 2. Data

### 2.1 Data Source and Governance

#### Data Source Identification

We are collecting our data from the Australian Government's National Road Safety Data Hub, which is managed by the Bureau of Infrastructure and Transport Research Economics (BITRE).

**Enforcement Data:**
https://datahub.roadsafety.gov.au/safe-systems/safe-road-use/police-enforcement

**Fatalities Data:**
https://datahub.roadsafety.gov.au/progress-reporting/monthly-road-deaths

**Collection Method:** We have downloaded the data as two primary tabular (CSV) files from the data hub.

**Dataset Type:** Both datasets are structured table data, with rows representing individual records and columns representing attributes.

**Core Datasets Used:**

1. Core Dataset 1 (Enforcement): `police_enforcement_2024_fines.csv` (sourced from the 'Police Enforcement' link)
2. Core Dataset 2 (Outcomes): `Australian Road Deaths Database Fatalities.csv` (sourced from the 'Monthly Road Deaths' link)

#### Data Summary Table

| Dataset | File Name | Total Records | Time Period | Update Frequency |
|---|---|---|---|---|
| Police Enforcement | police_enforcement_2024_fines.csv | 12,179 | 2008-2024 | Annual |
| Road Deaths Database | Australian_Road_Deaths_Database_Fatalities.csv | 57,852 | 1989-2025 | Monthly |
| Processed (Enforcement) | ProcessedFines.csv | 11,960 | 2020-2024 | N/A (cleaned) |
| Processed (Fatalities) | ProcessedFatalities.csv | 6,941 | 2020-2025 | N/A (cleaned) |

#### Data Governance Considerations

**Collection Process:**
* Enforcement data: Aggregated from police citations and automated detection systems across all Australian states/territories
* Fatality data: Reported by state road authorities and compiled by BITRE from police crash reports
* Both datasets undergo quality assurance checks before public release

**Data Quality Assessment:**
* Completeness: Enforcement data ~98% complete, fatality data ~99% complete (some missing demographic fields)
* Accuracy: Government-sourced and validated, no known systematic biases reported
* Timeliness: Published annually with monthly updates for fatalities
* Known Issues:
  - Some early records (pre-2020) have inconsistent age groupings
  - Fatality data may include delayed reporting (deaths recorded after crash occurred)
  - Enforcement data reflects detection capability (e.g., camera placement, enforcement resources)

**Security, Privacy, and Ethical Considerations:**
* Privacy: Data is already aggregated/anonymized (no individual identifiers), complies with privacy regulations
* Ethical Use: We use this data to improve safety, not to stigmatize any demographic group
* Bias Awareness: Enforcement patterns reflect deployment strategy, not offence rates, visualization acknowledges this limitation
* Responsible Reporting: Findings contextualized to avoid misinterpretation

#### Data-Question Alignment

Our dataset directly supports all six research questions:

| Question | Data Source | Relevant Attributes | Supports Answer? |
|---|---|---|---|
| Q1: Fines by offence type | Enforcement | OFFENCE_TYPE, FINES_COUNT | Yes |
| Q2: Geographic enforcement | Enforcement | JURISDICTION, LOCATION, FINES_COUNT | Yes |
| Q3: Age & offence relationship | Enforcement | AGE_GROUP, OFFENCE_TYPE, FINES_COUNT | Yes |
| Q4: Fatality trends | Fatalities | YEAR, MONTH, FATALITY_COUNT | Yes |
| Q5: Fatalities by state | Fatalities | STATE, FATALITY_COUNT | Yes |
| Q6: Crash types & victims | Fatalities | CRASH_TYPE, ROAD_USER_TYPE, FATALITY_COUNT | Yes |
| Q7: Fines vs Fatalities | Both | JURISDICTION/STATE, FINES, FATALITIES | Yes |

### 2.2 Data Processing and Analysis

#### Key Attributes and Data Types

**Enforcement Data (ProcessedFines.csv):**

| Attribute | Data Type | Example | Description |
|---|---|---|---|
| YEAR | Ordinal | 2024 | Calendar year |
| JURISDICTION | Categorical (Nominal) | NSW | State/territory code (8 values) |
| LOCATION | Categorical (Ordinal) | Major Cities | Remoteness classification (5 categories) |
| AGE_GROUP | Ordinal | 25-34 | Offender age bracket (7 categories) |
| METRIC | Categorical (Nominal) | Speed Fines | Traffic offence category (4 types) |
| DETECTION_METHOD | Categorical (Nominal) | Auto Detection Camera | How fine was detected (2 categories) |
| FINES | Quantitative (Ratio) | 45,230 | Total fines issued |
| CHARGES | Quantitative (Ratio) | 431 | Total charges filed |

**Fatalities Data (ProcessedFatalities.csv):**

| Attribute | Data Type | Example | Description |
|---|---|---|---|
| Crash_ID | Nominal | 120221303786 | Unique identifier for each crash |
| State | Categorical (Nominal) | NSW | State/territory code (8 values) |
| Month | Ordinal | 3 | Month number (1-12) |
| Month_Name | Ordinal | March | Month name (text) |
| Year | Ordinal | 2024 | Calendar year |
| Crash_Type | Categorical (Nominal) | Single | Type of crash (2 categories) |
| Road_User | Categorical (Nominal) | Driver | Type of road user (5 categories) |
| Gender | Categorical (Nominal) | Male | Gender of victim (Male/Female/?) |
| AgeGroup | Ordinal | 25-34 | Victim age bracket (7 categories + Unknown) |

#### Data Cleaning Process

**Step 1: Identifying Missing Values & Inconsistencies**

Enforcement Data:
* Missing age values (1.2%) - Investigated as "Unknown" or actual missing
* Malformed offence descriptions - Standardized using lookup table
* Inconsistent state abbreviations - Standardized to 2-letter codes

Fatalities Data:
* Gender marked as "Unknown" or blank - Standardized to "?"
* Truck involvement coded as "-9" for missing - Standardized to "?"
* Time values corrupted as "99:99:99" - Replaced with "00:00:01" (unknown time)

**Step 2: Normalization & Transformation**

Age Group Standardization (crucial for cross-dataset comparison):
* Raw enforcement ages grouped: 0-16, 17-25, 26-39, 40-64, 65 and over
* Raw fatality ages regrouped to match: 0-16, 17-25, 26-39, 40-64, 65 and over
* Created unified age categories across both datasets for fair comparison

Detection Method Consolidation (Enforcement):
* Original 8 detection types merged into 2 categories:
  - "Auto Detection Camera": Average speed camera, Fixed camera, Mobile camera, Red light camera, Fixed or mobile camera
  - "Manual Detection": Police issued, Not applicable

Offence Type Grouping (Enforcement):
* Standardized naming:
  - speed_fines → Speed Fines
  - mobile_phone_use → Mobile Phone Use
  - non_wearing_seatbelts → Non Wearing Seatbelts
  - unlicensed_driving → Unlicensed Driving

**Step 3: Handling Missing Data**

Enforcement Data:
* Rows with missing JURISDICTION - Dropped (0.3% of data)
* Rows with missing AGE_GROUP - Coded as "Unknown" to preserve fine counts
* Rows with missing OFFENCE_TYPE - Coded as "Other"

Fatalities Data:
* Rows with missing STATE - Dropped (0.1% of data)
* Rows with missing AGE_GROUP - Coded as "Unknown" to preserve fatality counts

**Step 4: Data Filtering**
* Filtered both datasets to years 2020 onwards (for temporal consistency)
* Rationale: New fine-grained enforcement data only reliable from 2023 onwards, restricting to 2020-2024/5 allows 4 to 5-year comparison and focuses on recent trends most relevant to current policy

**Step 5: Duplicate Removal**
* No exact duplicates found in enforcement data
* Cross-checked for logical duplicates (same state + offence + age + date) - None detected
* Fatality data: Each record represents unique crash victim (no duplicates by design)

#### KNIME Workflow Implementation - Data Cleaning (Stand Up 1 Completed)

Our data processing was completed using KNIME Analytics Platform. Below are descriptions of our workflows:

**Core Dataset 1: Enforcement Data Cleaning Workflow**

Process Flow:

1. CSV Reader → police_enforcement_2024_fines.csv
   - Input: Raw enforcement data with all columns (2008-2024)

2. Column Filter → Remove Unnecessary Columns
   - Remove: start_date, end_date, location (detailed text field - kept LOCATION for remoteness)
   - Keep: YEAR, JURISDICTION, LOCATION, AGE_GROUP, METRIC, DETECTION_METHOD, FINES, CHARGES

3. Rule Engine #1 → Convert Detection Methods
   - Rule: IF detection_method IN ("Average speed camera", "Mobile camera", "Red light camera", "Fixed camera", "Fixed or mobile camera") THEN "Auto Detection Camera"
   - Otherwise: "Manual Detection"

4. Rule Engine #2 → Convert "Not applicable" status
   - Rule: IF applicable_status = "Not applicable" AND detection = "Police issued" THEN "Manual Detection"

5. Rule Engine #3 → Rename All ages to Unknown
   - Rule: IF AGE_GROUP = " All ages " THEN "Unknown"

6. Rule Engine #4 → Standardize METRIC values
   - Rule: IF METRIC = "non_wearing_seatbelts" THEN "Non Wearing Seatbelts"
   - Rule: IF METRIC = "speed_fines" THEN "Speed Fines"
   - Rule: IF METRIC = "unlicensed_driving" THEN "Unlicensed Driving"
   - Rule: IF METRIC = "mobile_phone_use" THEN "Mobile Phone Use"

7. Row Filter → Filter Out Years Before 2020
   - Condition: YEAR >= 2020
   - Result: 11,960 records retained

8. CSV Writer → ProcessedFines.csv
   - Output: Clean enforcement data ready for aggregation

Data Quality Validation (Stand Up 1):
- Records count: 11,960 (from original ~12,179 filtered to 2020-2024)
- No duplicate records detected
- All required columns present
- Age standardization: 5 age brackets + "Unknown"
- Detection methods: 2 categories consolidated
- METRIC values: 4 standardized categories

**Core Dataset 2: Fatalities Data Cleaning Workflow**

Process Flow:

1. CSV Reader → Australian_Road_Deaths_Database_Fatalities.csv
   - Input: Raw fatality data with historical records (1989-2025)

2. Rule Engine #1 → Replace Unknown Gender
   - Rule: IF gender = "Unknown" OR gender = "" THEN "?"
   - Purpose: Standardize missing values

3. Rule Engine #2 → Replace Missing Truck Involvement
   - Rule: IF truck_involvement = "-9" THEN "?"
   - Purpose: Handle missing categorical values consistently

4. Rule Engine #3 → Replace Malformed Time Values
   - Rule: IF time = "99:99:99" OR time is invalid THEN "00:00:01"
   - Purpose: Fix corrupted datetime entries

5. String to Date&Time → Convert Time Format
   - Converts time string to proper Date&Time object
   - Enables temporal filtering and aggregation

6. Rule Engine #4 → Group Ages into Standard Brackets
   - Apply age categorization to create AgeGroup column:
     0-16, 17-25, 26-39, 40-64, 65+
   - Unmatched ages → "Unknown"

7. Rule Engine #5 → Add Month Name
   - Derives month name from month number for readability
   - IF Month = 1 THEN "January", IF Month = 2 THEN "February", etc.

8. Column Filter → Remove Unnecessary Columns
   - Keep: Crash_ID, State, Month, Month_Name, Year, Crash_Type, Road_User, Gender, AgeGroup
   - Remove: Detailed crash location, vehicle details, speed limits, etc.

9. Row Filter → Filter Out Years Before 2020
   - Condition: YEAR >= 2020
   - Result: 6,941 records retained

10. Column Resorter → Logical Column Order
    - Order: Crash_ID, State, Month, Month_Name, Year, Crash_Type, Road_User, Gender, AgeGroup

11. CSV Writer → ProcessedFatalities.csv
    - Output: Clean fatality data ready for aggregation

Data Quality Validation (Stand Up 1):
- Records count: 6,941 (from original ~57,852 filtered to 2020-2024)
- Age standardization: 7 brackets + "Unknown"
- Missing value handling: ~1% of records retained as "Unknown" vs. dropped
- Temporal data fixed: Time format validated
- No logical duplicates detected
- All required columns present

#### KNIME Aggregation Workflows for Visualizations (Stand Up 2 - In Progress)

For each of our 7 research questions, we created specific aggregated datasets optimized for D3.js visualization.

Aggregation Strategy: Each workflow follows this pattern:

**Q1: Fines by Offence Type (Donut Chart)**
* Input: ProcessedFines.csv
* Process: Column Filter → GroupBy (METRIC) → Math Formula (calculate %) → Sorter → CSV Writer
* Output: Q1_Fines_By_Offence_Overall.csv (4 rows) + Q1_Fines_By_Offence_Detailed.csv (with YEAR, STATE)
* Columns: Offence_Type, Total_Fines, Percentage

**Q2: Enforcement by State (Bubble Map)**
* Input: ProcessedFines.csv
* Process: Column Filter → GroupBy (JURISDICTION, YEAR, STATE) → Rule Engine (add lat/lon) → Sorter → CSV Writer
* Output: Q2_Enforcement_By_State.csv
* Columns: State, Year, Total_Fines, Latitude, Longitude, Color_Hex

**Q3: Age vs Offence Relationship (Heatmap)**
* Input: ProcessedFines.csv
* Process: Column Filter → GroupBy (AGE_GROUP, METRIC, YEAR, STATE) → CSV Writer
* Output: Q3_Age_Offence_Heatmap.csv
* Columns: Age_Group, Offence_Type, Year, State, Fines

**Q4: Fatality Trends by Year (Line Chart)**
* Input: ProcessedFatalities.csv
* Process: Column Filter → GroupBy (Year, State) → Column Renamer → Pivot → Math Formula → Sorter → CSV Writer
* Output: Q4_Fatalities_Trend_By_Year.csv
* Columns: ACT, NSW, NT, QLD, SA, TAS, VIC, WA, Total

**Q5: Fatalities by State (Choropleth Map)**
* Input: ProcessedFatalities.csv
* Process: Column Filter → GroupBy (State) → Column Renamer → Rule Engine (add State_Name, Lat, Lon, Population) → Math Formula (calculate rate) → Rule Engine (add Color_Hex) → Sorter → CSV Writer
* Output: Q5_Fatalities_By_State.csv
* Columns: State, Year, Total_Fatalities, State_Name, Latitude, Longitude, Population_M, Fatality_Rate_Per_100k, Color_Hex

**Q6: Crash Types by Road User (Stacked Bar Chart)**
* Input: ProcessedFatalities.csv
* Process: Column Filter → GroupBy (Crash_Type, Road_User) → Column Renamer → Pivot → Row Filter (remove Unknown) → Math Formula (sum road users) → Sorter → CSV Writer
* Output: Q6_Crash_Types_By_Road_User.csv
* Columns: Crash_Type, Driver, Motorcycle_pillion_passenger, Motorcycle_rider, Passenger, Pedal_cyclist, Pedestrian, Unknown, Total_Fatalities

**Q7: Fines vs Fatalities by State (Dual-Axis / Scatter Plot)**
* Input: ProcessedFatalities.csv
* Process:
  - Workflow 1: Fines → Column Filter → GroupBy (JURISDICTION, YEAR, STATE) → Column Renamer → Sorter → Fines_Table
  - Workflow 2: Fatalities → Column Filter → GroupBy (State) → Column Renamer → Sorter → Fatalities_Table
  - Joiner: Join on JURISDICTION = State (inner join)
  - Column Filter → Math Formula (Fines_Per_Fatality ratio) → Math Formula (Fatality_Rate per 100k) → Math Formula (Fines per Capita) → Sorter → CSV Writer
* Output: Q7_Fines_vs_Fatalities_By_State.csv
* Columns: State, Year, Total_Fines, Total_Fatalities, Fines_Per_Fatality

**Generated Datasets (Stand Up 2 - Completed):**
- Q1_Fines_By_Offence_Overall.csv
- Q1_Fines_By_Offence_Detailed.csv
- Q2_Enforcement_By_State.csv
- Q3_Age_Offence_Heatmap.csv
- Q4_Fatalities_Trend_By_Year.csv
- Q5_Fatalities_By_State.csv
- Q6_Crash_Types_By_Road_User.csv
- Q7_Fines_vs_Fatalities_By_State.csv

#### KNIME Workflow Files

Our complete data processing workflow is saved as DV_Group49_DataProcessing.knwf and includes:
* Two parallel processing streams (one for fines, one for fatalities)
* All cleanup nodes described above
* Seven aggregation workflows for visualization-specific datasets
* CSV Writer nodes to output processed files
* Documentation annotations explaining each step

Workflow Location:
* GitHub Repository: /data/KNIME/ folder
* KNIME Hub: https://hub.knime.com/s/uQpubRgqKNzYHP0q
* Workflow File: DV_Group49_DataProcessing.knwf (attached to submission)

### 2.3 Data Exploration

#### Exploratory Data Analysis

**Enforcement Data (ProcessedFines.csv) - Summary Statistics:**

* Total Fines 2020-2024: ~ 22.7 million (across all states and offence types)
* Distribution by State:
  - NSW: ~6.4 million fines (28%)
  - VIC: ~5.9 million fines (26%)
  - QLD: ~4.9 million fines (21%)
  - WA: ~3.7 million fines (16%)
  - SA, TAS, NT, ACT: ~1.8 million combined (9%)
* Distribution by Offence Type:
  - Speed Fines: ~20.75 million (91.2%)
  - Mobile Phone Use: ~1.47 million (6.5%)
  - Non Wearing Seatbelts: ~418,656 (1.8%)
  - Unlicensed Driving: ~105,974 (0.5%)
* Age Group Distribution:
  - Highest fines: 26-39 age group (~32%)
  - Second highest: 40-64 age group (~35%)
  - Third: 17-25 age group (~18%)
  - Lowest fines: 65+ age group (~6%)
  - Unknown: ~9%
* Detection Method:
  - Auto Detection Camera: ~85% (majority from speed cameras)
  - Manual Detection: ~15%

**Fatalities Data (ProcessedFatalities.csv) - Summary Statistics:**

* Total Fatalities 2020-2024: 6,941 deaths
* Annual Average: ~1,388 deaths per year
* Distribution by State:
  - NSW: ~1,777 deaths (26%)
  - VIC: ~1,481 deaths (21%)
  - QLD: ~1,653 deaths (24%)
  - WA: ~983 deaths (14%)
  - SA: ~533 deaths (8%)
  - TAS: ~248 deaths (4%)
  - NT: ~239 deaths (3%)
  - ACT: ~54 deaths (1%)
* Age Group at Risk:
  - Highest fatalities: 40-64 age group (~35%)
  - Second: 25-39 age group (~25%)
  - Third: 17-25 age group (~15%)
  - 65+: ~18%
  - 0-16: ~7%
* Crash Type Distribution:
  - Single vehicle: ~3,811 deaths (55%)
  - Multiple vehicle: ~3,121 deaths (45%)
* Road User Distribution:
  - Drivers: ~3,231 deaths (47%)
  - Passengers: ~1,122 deaths (16%)
  - Motorcycle riders: ~1,343 deaths (19%)
  - Pedestrians: ~797 deaths (11%)
  - Pedal cyclists: ~220 deaths (3%)
  - Motorcycle pillion passengers: ~197 deaths (3%)
* Gender Distribution:
  - Male: ~5,013 deaths (72%)
  - Female: ~1,815 deaths (26%)
  - Unknown: ~113 deaths (2%)

#### Initial Observations and Patterns

1. **Age Paradox:**
   * Finding: Middle-aged drivers (40-64) receive the most fines AND have disproportionately high fatality rates
   * Implication: This age group is both heavily enforced and at high risk, suggesting enforcement alone may not reduce their crash risk

2. **Offence-Outcome Relationship:**
   * Finding: Speeding accounts for 45% of fines, but we cannot directly link speeding fines to crash causes (data limitation)
   * Data gap: Crash cause data not available in fatality dataset, can only infer patterns
   * Visualization opportunity: Show enforcement priorities vs. known crash risk factors

3. **State Variation:**
   * Finding: NSW and VIC have highest absolute enforcement AND highest absolute fatalities
   * Question: More enforcement could indicate:
     - Response to high crash rates (reactive)
     - Larger populations (expected)
     - More aggressive enforcement strategy
   * Visualization needed: Normalize by population to show per-capita rates

4. **Detection Method Insights:**
   * Finding: 85% of fines from automated cameras
   * Implication: Automated enforcement enables consistent 24/7 detection, manual enforcement limited by officer availability

5. **Vulnerable Road Users:**
   * Finding: Motorcycle riders (19%) and pedestrians (11%) are overrepresented relative to their mode share
   * Implication: These groups require targeted safety interventions

6. **Gender Disparity:**
   * Finding: Males account for 72% of road fatalities
   * Implication: Gender-specific risk factors and behaviors should be studied further

#### Data Challenges Encountered

1. **Age Bracket Mismatch (Resolved):**
   * Challenge: Enforcement uses different age groupings than fatalities
   * Resolution: Standardized to consistent age bands
   * Impact: Enables direct cross-dataset comparison in Q3 visualization

2. **Missing Demographic Data:**
   * Challenge: ~1-2% of records missing age/gender information
   * Resolution: Marked as "Unknown" but preserved fine/fatality counts
   * Impact: Total counts remain accurate, demographic breakdowns note "Unknown" category

3. **Temporal Gaps and Reporting Lag:**
   * Challenge: 2024 fatality data may be incomplete
   * Resolution: Aware of potential undercount, noted in data quality discussion
   * Mitigation: Filter 2024 data for trend analysis if needed

4. **No Individual-Level Linking:**
   * Challenge: Cannot match "fined driver" to "crash victim"
   * Limitation: Analysis at aggregate level only
   * Workaround: Compare population-level patterns (e.g., "Do states with more speeding fines have fewer crashes?")

5. **Crash Cause Data Not Available:**
   * Challenge: Fatality dataset doesn't include crash cause
   * Impact: Cannot directly link enforcement targeting to crash causes
   * Workaround: Visualize enforcement priorities alongside general crash patterns

6. **Population Data Required for Normalization:**
   * Challenge: To calculate per-capita rates, need external population data
   * Resolution: Sourced 2023 Australian Bureau of Statistics (ABS) state population estimates, added to Q7 workflow
   * Data: NSW: 8.3M, VIC: 6.7M, QLD: 5.5M, WA: 2.9M, SA: 1.8M, TAS: 0.57M, NT: 0.25M, ACT: 0.46M

---

## 3. Requirements

### 3.1 Must-Have Features

These are core features without which the project would fail to meet its objectives. These features are non-negotiable and will be prioritized in our implementation.

**Feature 1: Seven Interactive Visualizations**
* Q1: Donut chart (desktop/tablet) / Bar chart (mobile) showing fines by offence type
* Q2: Bubble Map showing total enforcement (fines) by state
* Q3: Heatmap showing age group vs offence type patterns
* Q4: Line chart showing fatality trends from 2020-2024
* Q5: Choropleth map showing fatality rates per 100k by state
* Q6: Stacked bar chart showing crash types and affected road users
* Q7: Dual-axis chart (desktop) / Scatter plot (mobile) comparing fines vs.fatalities by state

Status: All 7 visualizations coded and functional

**Feature 2: State/Territory Filter (COMPLETE)**
* Users can select one or multiple states to filter all visualizations
* Default: All states visible
* Implementation: Multi-select dropdown in filter panel
* Behavior: When state selected, all charts update to show only that state's data

Status: Fully functional with data-loader.js integration

**Feature 3: Year Range Selector (COMPLETE)**
* Two input fields allow users to filter by year range (2020-2024)
* Default: All years visible
* Implementation: Two number inputs (year-from, year-to)
* Behavior: Updates all time-dependent visualizations (Q4, Q7, and aggregates Q1-Q6)

Status: Fully functional

**Feature 4: Interactive Tooltips (COMPLETE)**
* Hover over any data element shows exact values
* Tooltip content: Label, value, percentage (where applicable), additional context
* Implementation: D3.js mouseover/mouseout events with tooltip div
* Design: Dark background (rgba(44,62,80,0.95)), white text, smooth fade transitions (200ms)

Status: Implemented across all 7 charts

**Feature 5: Responsive Layout (COMPLETE)**
* Dashboard functions across desktop (1200px+), tablet (768-1199px), and mobile (<768px)
* Desktop: Side-by-side visualizations, full interactivity
* Tablet: Stacked visualizations, maintained interactivity
* Mobile: Single-column layout, simplified charts (e.g., bar instead of donut)
* Implementation: CSS media queries, flexible SVG sizing

Status: Fully responsive with breakpoints at 640px and 768px

**Feature 6: Clear Navigation and Layout (COMPLETE)**
* Header: Project title and navigation menu (Overview, Visualizations, Maps, About)
* Section headers: "Police Enforcement" and "Safety Outcomes"
* Section navigation: Quick links to jump to specific charts
* Footer: Data attribution and last updated date
* Implementation: HTML5 semantic markup, CSS Grid/Flexbox, sticky header

Status: Complete with 4-page structure

**Feature 7: Data Validation and Error Handling (COMPLETE)**
* Verify totals match source data after aggregation
* Display error messages if CSV files fail to load
* Handle edge cases (e.g., no data for selected filters)
* Implementation: JavaScript try-catch blocks, empty state displays, loading indicators

Status: Error handling implemented in data-loader.js

Delivery Confidence: HIGH - All must-have features are implemented and tested

### 3.2 Optional Features

Features that would enhance the user experience but are not critical to project success. These will be implemented if time permits after all must-have features are complete.

**Optional Feature 1: Animated Transitions (IMPLEMENTED)**
* Status: Smooth D3.js transitions when data updates (bars growing, line drawing, fade-ins)
* Duration: 500-800ms with easing functions
* Implementation: Applied to all 7 charts
* Priority: Medium
* Time Invested: ~4 hours

**Optional Feature 2: Legend Interactivity (PARTIAL)**
* Status: Legends implemented for Q1, Q6 with visual highlighting on hover
* Limitation: Not fully interactive (click to filter) due to time constraints
* Priority: Medium
* Time Invested: ~2 hours

**Optional Feature 3: Separate Maps Page (IMPLEMENTED)**
* Status: Created dedicated maps.html page for Q2 and Q5 visualizations
* Benefit: Maps get larger canvas space for better visibility
* Priority: High
* Time Invested: ~1 hours

**Optional Feature 4: Accessibility Enhancements (IMPLEMENTED)**
* Status: ARIA labels, keyboard navigation, data table fallbacks for screen readers
* Implementation: All interactive elements accessible via Tab key, screen reader-only tables
* Priority: High (ethical obligation)
* Time Invested: ~5 hours

**Optional Feature 5: Mobile-Specific Chart Variants (IMPLEMENTED)**
* Status: Q1 switches from donut to bar chart on mobile, Q7 switches to scatter plot
* Implementation: JavaScript checkMobile() function with window resize listener
* Priority: Medium
* Time Invested: ~3 hours

Delivery Strategy:
* Week 12 (Stand Up 3): Completed all must-haves + 5 optional features
* Week 13: Polish remaining optional features if time permits

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

