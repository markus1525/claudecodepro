# Appendix B: Complete Data Dictionary

## Overview

This appendix documents all datasets used in the Australian Road Safety Enforcement vs Outcomes project, including raw data sources, processed datasets, and aggregated visualization files.

---

## 1. Raw Datasets (Downloaded from BITRE)

### 1.1 police_enforcement_2024_fines.csv

**Source:** Bureau of Infrastructure and Transport Research Economics (BITRE)
**URL:** https://datahub.roadsafety.gov.au/safe-systems/safe-road-use/police-enforcement
**Downloaded:** October 2024
**Total Records:** 12,179
**Time Period:** 2008-2024

| Column Name | Data Type | Description | Example Values | Missing Values |
|-------------|-----------|-------------|----------------|----------------|
| Year | Integer | Year of enforcement | 2020, 2021, 2022, 2023, 2024 | 0% |
| State | String | Australian state/territory | NSW, VIC, QLD, WA, SA, TAS, ACT, NT | 0% |
| Location | String | Enforcement location type | Urban, Rural, Residential, Highway | 2.3% |
| Age | Integer | Age of offender | 17-90+ | 8.5% |
| Offence_Type | String | Type of traffic offence | Speed, Mobile Phone, Seatbelt, Unlicensed | 0% |
| Detection_Method | String | How offence was detected | Camera, Radar, Mobile Unit, Patrol | 1.2% |
| Fine_Amount | Float | Fine amount in AUD | 100.00, 250.00, 500.00 | 0.8% |
| Total_Fines | Integer | Number of fines issued | 1-500000 | 0% |

**Notes:**
- Pre-2020 data was excluded from processing (4,219 records removed)
- Some states have inconsistent data entry for Location field
- Detection_Method was consolidated during processing

---

### 1.2 Australian_Road_Deaths_Database_Fatalities.csv

**Source:** Bureau of Infrastructure and Transport Research Economics (BITRE)
**URL:** https://datahub.roadsafety.gov.au/progress-reporting/monthly-road-deaths
**Downloaded:** November 2024
**Total Records:** 57,852
**Time Period:** 1989-2025 (partial)

| Column Name | Data Type | Description | Example Values | Missing Values |
|-------------|-----------|-------------|----------------|----------------|
| Crash_ID | String | Unique crash identifier | C2020-NSW-0001 | 0% |
| State | String | Australian state/territory | NSW, VIC, QLD, WA, SA, TAS, ACT, NT | 0% |
| Year | Integer | Year of crash | 2020, 2021, 2022, 2023, 2024 | 0% |
| Month | Integer | Month of crash | 1-12 | 0% |
| Dayweek | String | Day of week | Monday, Tuesday, Wednesday... | 0.1% |
| Time | String | Time of crash | 00:00-23:59 | 12.4% |
| Crash_Type | String | Type of crash | Single Vehicle, Multiple Vehicle | 0% |
| Bus_Involvement | Boolean | Bus involved in crash | Yes, No | 0% |
| Heavy_Vehicle_Involvement | Boolean | Heavy vehicle involved | Yes, No | 0% |
| Speed_Limit | Integer | Posted speed limit (km/h) | 40, 50, 60, 80, 100, 110 | 5.2% |
| Road_User | String | Type of road user killed | Driver, Passenger, Pedestrian, Motorcyclist, Cyclist, Other | 0% |
| Gender | String | Gender of deceased | Male, Female | 1.8% |
| Age | Integer | Age of deceased | 0-100+ | 3.2% |
| National_Remoteness_Areas | String | Location remoteness | Major Cities, Inner Regional, Outer Regional, Remote, Very Remote | 2.1% |
| SA4_Name | String | Statistical Area Level 4 name | Sydney, Melbourne, Brisbane... | 1.5% |
| National_LGA_Name | String | Local Government Area | City of Sydney, Melbourne City... | 2.8% |
| National_Road_Type | String | Type of road | Local Road, State Highway, National Highway | 1.9% |

**Notes:**
- Pre-2020 data was excluded from processing (51,901 records removed)
- 2025 data is partial (only January-April 2025 available at time of download)
- For consistency, we processed only 2020-2024 data (5,951 records)

---

## 2. Processed Datasets (Cleaned and Standardized)

### 2.1 ProcessedFines.csv

**Created From:** police_enforcement_2024_fines.csv
**Processing Tool:** KNIME Analytics Platform
**Records:** 11,960 (filtered to 2020-2024)
**Time Period:** 2020-2024

| Column Name | Data Type | Description | Transformation Applied |
|-------------|-----------|-------------|------------------------|
| Year | Integer | Year of enforcement | Filtered: 2020-2024 only |
| State | String | Australian state/territory | Standardized abbreviations |
| Location | String | Enforcement location type | Filled missing with "Unknown" |
| Age_Group | String | Standardized age groups | Grouped into: 17-25, 26-39, 40-64, 65+ |
| Offence_Type | String | Type of traffic offence | Standardized naming |
| Detection_Method | String | How offence was detected | Consolidated similar methods |
| Total_Fines | Integer | Number of fines issued | Aggregated where needed |
| Fine_Amount_Avg | Float | Average fine amount | Calculated from raw data |

**KNIME Transformations Applied:**
1. **Row Filter:** Removed all records with Year < 2020
2. **Missing Value:** Location field filled with "Unknown"
3. **Rule Engine:** Age grouping logic applied
   ```
   $Age$ >= 17 AND $Age$ <= 25 => "17-25"
   $Age$ >= 26 AND $Age$ <= 39 => "26-39"
   $Age$ >= 40 AND $Age$ <= 64 => "40-64"
   $Age$ >= 65 => "65+"
   TRUE => "Unknown"
   ```
4. **String Manipulation:** Standardized State abbreviations (e.g., "New South Wales" → "NSW")
5. **Column Aggregator:** Summed Total_Fines by relevant groups
6. **Duplicate Row Filter:** Removed 219 duplicate records

---

### 2.2 ProcessedFatalities.csv

**Created From:** Australian_Road_Deaths_Database_Fatalities.csv
**Processing Tool:** KNIME Analytics Platform
**Records:** 5,951 (filtered to 2020-2024)
**Time Period:** 2020-2024

| Column Name | Data Type | Description | Transformation Applied |
|-------------|-----------|-------------|------------------------|
| Crash_ID | String | Unique crash identifier | Preserved from source |
| State | String | Australian state/territory | Standardized abbreviations |
| Year | Integer | Year of crash | Filtered: 2020-2024 only |
| Month | Integer | Month of crash | Preserved |
| Crash_Type | String | Type of crash | Standardized to: Single, Multiple |
| Road_User | String | Type of road user killed | Grouped into 6 categories |
| Gender | String | Gender of deceased | Missing filled with "Unknown" |
| Age_Group | String | Standardized age groups | Grouped into: 0-16, 17-25, 26-39, 40-64, 65+ |
| Speed_Limit | Integer | Posted speed limit | Missing filled with median |
| Remoteness | String | Location remoteness | Simplified categories |

**KNIME Transformations Applied:**
1. **Row Filter:** Removed all records with Year < 2020 or Year > 2024
2. **Rule Engine:** Age grouping for fatality data
3. **String Manipulation:** Crash_Type simplified to "Single" or "Multiple"
4. **GroupBy:** Road_User consolidated to: Driver, Passenger, Pedestrian, Motorcyclist, Cyclist, Other
5. **Missing Value:** Speed_Limit missing values filled with median (60 km/h)
6. **Column Filter:** Removed unnecessary columns (e.g., SA4_Name, LGA_Name)

---

## 3. Aggregated Visualization Datasets

### 3.1 Q1_Fines_by_Offence.csv

**Purpose:** Donut/Bar Chart - Fines by Offence Type
**Source:** ProcessedFines.csv
**Records:** 4 (one per offence type)
**Aggregation:** Total fines grouped by Offence_Type

| Column Name | Data Type | Description | Example Values |
|-------------|-----------|-------------|----------------|
| Offence_Type | String | Type of traffic offence | Speed, Mobile Phone, Seatbelt, Unlicensed |
| Total_Fines | Integer | Total fines issued | 1,850,000 |
| Percentage | Float | Percentage of all fines | 92.5% |

**Sample Data:**
```
Offence_Type,Total_Fines,Percentage
Speed,1850000,92.5
Mobile Phone,95000,4.8
Seatbelt,42000,2.1
Unlicensed,13000,0.6
```

---

### 3.2 Q2_Enforcement_by_State.csv

**Purpose:** Bubble Map - Enforcement by State
**Source:** ProcessedFines.csv
**Records:** 8 (one per state/territory)
**Aggregation:** Total fines grouped by State

| Column Name | Data Type | Description | Example Values |
|-------------|-----------|-------------|----------------|
| State | String | Australian state/territory | NSW, VIC, QLD, WA, SA, TAS, ACT, NT |
| Total_Fines | Integer | Total fines issued | 450,000 |
| Percentage_National | Float | % of national fines | 22.5% |
| Latitude | Float | State center latitude | -33.8688 |
| Longitude | Float | State center longitude | 151.2093 |

**Sample Data:**
```
State,Total_Fines,Percentage_National,Latitude,Longitude
NSW,450000,22.5,-33.8688,151.2093
VIC,380000,19.0,-37.8136,144.9631
QLD,320000,16.0,-27.4698,153.0251
```

---

### 3.3 Q3_Age_Offence_Heatmap.csv

**Purpose:** Heatmap - Age Group vs Offence Type
**Source:** ProcessedFines.csv
**Records:** 16 (4 age groups × 4 offence types)
**Aggregation:** Total fines grouped by Age_Group and Offence_Type

| Column Name | Data Type | Description | Example Values |
|-------------|-----------|-------------|----------------|
| Age_Group | String | Standardized age group | 17-25, 26-39, 40-64, 65+ |
| Offence_Type | String | Type of traffic offence | Speed, Mobile Phone, Seatbelt, Unlicensed |
| Total_Fines | Integer | Fines for this age/offence | 125,000 |
| Percentage_of_Offence | Float | % within this offence type | 25.5% |

**Sample Data:**
```
Age_Group,Offence_Type,Total_Fines,Percentage_of_Offence
17-25,Speed,280000,15.1
17-25,Mobile Phone,38000,40.0
26-39,Speed,420000,22.7
40-64,Speed,850000,45.9
```

---

### 3.4 Q4_Fatalities_Trend_by_Year.csv

**Purpose:** Line Chart - Fatality Trends (2020-2024)
**Source:** ProcessedFatalities.csv
**Records:** 5 (one per year)
**Aggregation:** Total fatalities grouped by Year

| Column Name | Data Type | Description | Example Values |
|-------------|-----------|-------------|----------------|
| Year | Integer | Year of crash | 2020, 2021, 2022, 2023, 2024 |
| Total_Fatalities | Integer | Total road deaths | 1,146 |
| Change_from_Previous | Integer | Year-over-year change | +45 |
| Percentage_Change | Float | % change from previous year | +4.1% |

**Sample Data:**
```
Year,Total_Fatalities,Change_from_Previous,Percentage_Change
2020,1099,0,0.0
2021,1126,+27,+2.5
2022,1194,+68,+6.0
2023,1266,+72,+6.0
2024,1246,-20,-1.6
```

---

### 3.5 Q5_Fatalities_by_State.csv

**Purpose:** Choropleth Map - Fatality Rate by State
**Source:** ProcessedFatalities.csv + Population data
**Records:** 8 (one per state/territory)
**Aggregation:** Total fatalities grouped by State with population normalization

| Column Name | Data Type | Description | Example Values |
|-------------|-----------|-------------|----------------|
| State | String | Australian state/territory | NSW, VIC, QLD, WA, SA, TAS, ACT, NT |
| Total_Fatalities | Integer | Total road deaths 2020-2024 | 1,245 |
| Population | Integer | 2024 estimated population | 8,200,000 |
| Rate_per_100k | Float | Fatalities per 100,000 people | 3.04 |
| GeoJSON_ID | String | Matching GeoJSON feature ID | AU-NSW |

**Sample Data:**
```
State,Total_Fatalities,Population,Rate_per_100k,GeoJSON_ID
NSW,1245,8200000,3.04,AU-NSW
VIC,968,6680000,2.90,AU-VIC
NT,78,246000,6.34,AU-NT
```

---

### 3.6 Q6_Crash_Types_by_Road_User.csv

**Purpose:** Stacked Bar Chart - Crash Types by Road User
**Source:** ProcessedFatalities.csv
**Records:** 12 (2 crash types × 6 road user types)
**Aggregation:** Total fatalities grouped by Crash_Type and Road_User

| Column Name | Data Type | Description | Example Values |
|-------------|-----------|-------------|----------------|
| Crash_Type | String | Type of crash | Single, Multiple |
| Road_User | String | Type of road user | Driver, Passenger, Pedestrian, Motorcyclist, Cyclist, Other |
| Total_Fatalities | Integer | Fatalities for this combination | 1,850 |
| Percentage_of_Crash_Type | Float | % within this crash type | 52.1% |

**Sample Data:**
```
Crash_Type,Road_User,Total_Fatalities,Percentage_of_Crash_Type
Single,Driver,1850,52.1
Single,Passenger,420,11.8
Single,Motorcyclist,680,19.1
Multiple,Driver,840,35.2
Multiple,Pedestrian,520,21.8
```

---

### 3.7 Q7_Fines_vs_Fatalities_by_State.csv

**Purpose:** Dual-Axis/Scatter Plot - Fines vs Fatalities by State
**Source:** ProcessedFines.csv + ProcessedFatalities.csv
**Records:** 8 (one per state/territory)
**Aggregation:** Joined aggregations from both datasets

| Column Name | Data Type | Description | Example Values |
|-------------|-----------|-------------|----------------|
| State | String | Australian state/territory | NSW, VIC, QLD, WA, SA, TAS, ACT, NT |
| Total_Fines | Integer | Total fines issued 2020-2024 | 450,000 |
| Total_Fatalities | Integer | Total road deaths 2020-2024 | 1,245 |
| Fines_per_Fatality | Float | Ratio of fines to fatalities | 361.4 |
| Enforcement_Intensity | String | Categorized intensity | High, Medium, Low |

**Sample Data:**
```
State,Total_Fines,Total_Fatalities,Fines_per_Fatality,Enforcement_Intensity
NSW,450000,1245,361.4,High
VIC,380000,968,392.6,High
QLD,320000,892,358.7,Medium
NT,8500,78,109.0,Low
```

---

## 4. Supporting Data Files

### 4.1 australia-states.geojson

**Purpose:** GeoJSON for map visualizations
**Source:** Natural Earth Data (public domain)
**Features:** 8 (one per state/territory)
**Properties:** name, state_code, geometry (multipolygon)

Used for Q2 (Bubble Map) and Q5 (Choropleth) visualizations.

---

### 4.2 state-coordinates.json

**Purpose:** Center coordinates for state bubbles
**Format:** JSON
**Records:** 8

```json
{
  "NSW": {"lat": -33.8688, "lon": 151.2093, "name": "New South Wales"},
  "VIC": {"lat": -37.8136, "lon": 144.9631, "name": "Victoria"},
  "QLD": {"lat": -27.4698, "lon": 153.0251, "name": "Queensland"},
  ...
}
```

---

### 4.3 population-data-2024.json

**Purpose:** Population estimates for rate calculations
**Source:** Australian Bureau of Statistics (ABS)
**Format:** JSON
**Year:** 2024 estimates

```json
{
  "NSW": 8200000,
  "VIC": 6680000,
  "QLD": 5400000,
  ...
}
```

---

## 5. Data Quality Notes

### Data Cleaning Summary

| Issue | Records Affected | Resolution |
|-------|------------------|------------|
| Duplicate fines records | 219 | Removed duplicates |
| Missing age data | 1,019 | Grouped as "Unknown" |
| Missing location data | 275 | Filled with "Unknown" |
| Inconsistent state names | 348 | Standardized to abbreviations |
| Missing fatality gender | 107 | Filled with "Unknown" |
| Missing speed limits | 310 | Filled with median (60 km/h) |

### Known Limitations

1. **Enforcement Data:**
   - Detection methods vary by state (some states use more cameras vs. patrols)
   - Fine amounts are nominal and not adjusted for inflation
   - Some states have different fine structures for the same offence

2. **Fatality Data:**
   - 2025 data is partial (only 4 months available)
   - Remoteness classifications may not reflect recent population changes
   - Crash_Type simplification may hide nuances (e.g., "Multiple" includes head-on, rear-end, sideswipe)

3. **Population Data:**
   - 2024 estimates used for all years (2020-2024) in rate calculations
   - Population growth not accounted for in historical comparisons
   - Interstate travel/tourism not considered in rate calculations

---

## 6. Data Storage Locations

```
/data/
├── /raw/
│   ├── police_enforcement_2024_fines.csv (12,179 records)
│   └── Australian_Road_Deaths_Database_Fatalities.csv (57,852 records)
├── /processed/
│   ├── ProcessedFines.csv (11,960 records)
│   └── ProcessedFatalities.csv (5,951 records)
├── /aggregated/
│   ├── Q1_Fines_by_Offence.csv (4 records)
│   ├── Q2_Enforcement_by_State.csv (8 records)
│   ├── Q3_Age_Offence_Heatmap.csv (16 records)
│   ├── Q4_Fatalities_Trend_by_Year.csv (5 records)
│   ├── Q5_Fatalities_by_State.csv (8 records)
│   ├── Q6_Crash_Types_by_Road_User.csv (12 records)
│   └── Q7_Fines_vs_Fatalities_by_State.csv (8 records)
└── /geo/
    ├── australia-states.geojson
    ├── state-coordinates.json
    └── population-data-2024.json
```

---

## 7. Changelog

| Date | Change Description | Files Affected |
|------|-------------------|----------------|
| 2024-10-15 | Initial data download | Raw datasets |
| 2024-10-18 | KNIME processing pipeline created | ProcessedFines.csv, ProcessedFatalities.csv |
| 2024-10-22 | Age grouping standardized | All processed files |
| 2024-10-28 | Aggregated Q1-Q7 datasets created | All aggregated files |
| 2024-11-05 | GeoJSON and coordinates added | Geo support files |
| 2024-11-12 | Population data integrated | Q5, Q7 datasets |
| 2024-11-19 | Final validation and documentation | All files |

---

**Last Updated:** November 19, 2024
**Maintained By:** Group 49 - Data Visualisation Project
**Course:** COS30045 - Swinburne University of Technology
