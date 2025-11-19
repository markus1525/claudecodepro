/* Loads CSV data and updates charts based on filters */

async function loadAllData() {
    try {
        const [
            q1DetailedRaw,
            q1OverallRaw,
            q2Raw,
            q3Raw,
            q4Raw,
            q5Raw,
            q6Raw,
            q7Raw
        ] = await Promise.all([
            d3.csv('data/Q1_Fines_By_Offence_Detailed.csv'),
            d3.csv('data/Q1_Fines_By_Offence_Overall.csv'),
            d3.csv('data/Q2_Enforcement_By_State.csv'),
            d3.csv('data/Q3_Age_Offence_Heatmap.csv'),
            d3.csv('data/Q4_Fatalities_Trend_By_Year.csv'),
            d3.csv('data/Q5_Fatalities_By_State.csv'),
            d3.csv('data/Q6_Crash_Types_By_Road_User.csv'),
            d3.csv('data/Q7_Fines_vs_Fatalities_By_State.csv')
        ]);

        window.dataStore.q1Detailed = processQ1Detailed(q1DetailedRaw);
        window.dataStore.q1Overall = processQ1Overall(q1OverallRaw);
        window.dataStore.q2 = processQ2Data(q2Raw);
        window.dataStore.q3 = processQ3Data(q3Raw);
        window.dataStore.q4 = processQ4Data(q4Raw);
        window.dataStore.q5 = processQ5Data(q5Raw);
        window.dataStore.q6 = processQ6Data(q6Raw);
        window.dataStore.q7 = processQ7Data(q7Raw);

        window.dataStore.loaded = true;
        return true;
    } catch (error) {
        console.error('Error loading data:', error);
        window.dataStore.error = error;
        showErrorMessage(error);
        return false;
    }
}

// Process data functions
function processQ1Detailed(data) {
    return data.map(d => ({
        year: +d.YEAR,
        offenceType: d.METRIC,
        state: d.STATE,
        totalFines: +d.Total_Fines,
        percentage: +d.Percentage
    }));
}

function processQ1Overall(data) {
    return data.map(d => ({
        offenceType: d.METRIC,
        totalFines: +d.Total_Fines,
        percentage: +d.Percentage
    }));
}

function processQ2Data(data) {
    return data.map(d => ({
        year: +d.YEAR,
        state: d.STATE,
        totalFines: +d.Total_Fines,
        latitude: +d.Latitude,
        longitude: +d.Longitude,
        colorHex: d.Color_Hex
    }));
}

function processQ3Data(data) {
    return data.map(d => ({
        year: +d.YEAR,
        ageGroup: d.AGE_GROUP,
        offenceType: d.METRIC,
        fines: +d.FINES,
        state: d.STATE
    }));
}

function processQ4Data(data) {
    return data.map(d => ({
        year: +d.Year,
        ACT: +d.ACT || 0,
        NSW: +d.NSW || 0,
        NT: +d.NT || 0,
        QLD: +d.QLD || 0,
        SA: +d.SA || 0,
        TAS: +d.TAS || 0,
        VIC: +d.VIC || 0,
        WA: +d.WA || 0,
        total: +d.Total || 0
    }));
}

function processQ5Data(data) {
    return data.map(d => ({
        state: d.State,
        year: +d.Year,
        totalFatalities: +d.Total_Fatalities,
        stateName: d.State_Name,
        latitude: +d.Latitude,
        longitude: +d.Longitude,
        populationM: +d.Population_M,
        fatalityRatePer100k: +d.Fatality_Rate_Per_100k,
        colorHex: d.Color_Hex
    }));
}

function processQ6Data(data) {
    const roadUsers = ['Driver', 'Motorcycle pillion passenger', 'Motorcycle rider',
                       'Passenger', 'Pedal cyclist', 'Pedestrian', 'Unknown'];

    return data.map(d => {
        const crashType = d['Crash Type'];
        const roadUserData = {};
        roadUsers.forEach(user => {
            roadUserData[user] = +(d[user] || 0);
        });

        return {
            crashType: crashType,
            ...roadUserData,
            totalFatalities: +d.Total_Fatalities
        };
    });
}

function processQ7Data(data) {
    return data.map(d => ({
        year: +d.YEAR,
        state: d.STATE,
        totalFines: +d.Total_Fines,
        totalFatalities: +d.Total_Fatalities,
        finesPerFatality: +d.Fines_Per_Fatality
    }));
}

// Check if filter is active
function isFilterActive() {
    const hasStateFilter = window.filterState.states.length > 0;
    const hasYearFilter = window.filterState.yearRange[0] !== 2020 || 
                         window.filterState.yearRange[1] !== 2024;
    return hasStateFilter || hasYearFilter;
}

// Update clear button visibility based on filter state
function updateClearButtonVisibility() {
    const clearBtn = document.getElementById('clear-filters');
    if (!clearBtn) return;

    const hasFilter = isFilterActive();

    if (hasFilter) {
        clearBtn.classList.add('visible');
        clearBtn.style.display = 'inline-block';
    } else {
        clearBtn.classList.remove('visible');
        clearBtn.style.display = 'none';
    }
}

// Filter functions for each question
function getFilteredQ1Data() {
    const { states, yearRange } = window.filterState;

    let filtered = window.dataStore.q1Detailed.filter(d => {
        const yearMatch = d.year >= yearRange[0] && d.year <= yearRange[1];
        const stateMatch = states.length === 0 || states.includes(d.state);
        return yearMatch && stateMatch;
    });

    const aggregated = d3.rollup(
        filtered,
        v => d3.sum(v, d => d.totalFines),
        d => d.offenceType
    );

    const total = d3.sum([...aggregated.values()]);
    if (total === 0) return [];

    const result = Array.from(aggregated, ([offenceType, totalFines]) => ({
        offenceType,
        totalFines,
        percentage: (totalFines / total) * 100
    }));

    return result.sort((a, b) => b.totalFines - a.totalFines);
}

function getFilteredQ2Data() {
    const { states, yearRange } = window.filterState;

    let filtered = window.dataStore.q2.filter(d => {
        const yearMatch = d.year >= yearRange[0] && d.year <= yearRange[1];
        const stateMatch = states.length === 0 || states.includes(d.state);
        return yearMatch && stateMatch;
    });

    const aggregated = d3.rollup(
        filtered,
        v => ({
            totalFines: d3.sum(v, d => d.totalFines),
            latitude: v[0].latitude,
            longitude: v[0].longitude,
            colorHex: v[0].colorHex
        }),
        d => d.state
    );

    const totalNational = d3.sum([...aggregated.values()], d => d.totalFines);

    const result = Array.from(aggregated, ([state, data]) => ({
        state: state,
        totalFines: data.totalFines,
        latitude: data.latitude,
        longitude: data.longitude,
        colorHex: data.colorHex,
        percentageOfNational: totalNational > 0 ? (data.totalFines / totalNational) * 100 : 0
    }));

    return result;
}

function getFilteredQ3Data() {
    const { states, yearRange } = window.filterState;

    let filtered = window.dataStore.q3.filter(d => {
        const yearMatch = d.year >= yearRange[0] && d.year <= yearRange[1];
        const stateMatch = states.length === 0 || states.includes(d.state);
        return yearMatch && stateMatch;
    });

    const aggregated = d3.rollup(
        filtered,
        v => d3.sum(v, d => d.fines),
        d => d.ageGroup,
        d => d.offenceType
    );

    const result = [];
    aggregated.forEach((offences, ageGroup) => {
        offences.forEach((fines, offenceType) => {
            result.push({ ageGroup, offenceType, fines });
        });
    });

    return result;
}

function getFilteredQ4Data() {
    const [yearFrom, yearTo] = window.filterState.yearRange;
    const { states } = window.filterState;

    const filtered = window.dataStore.q4.filter(d => d.year >= yearFrom && d.year <= yearTo);

    if (states.length > 0) {
        return filtered.map(d => {
            let total = 0;
            states.forEach(state => {
                total += d[state] || 0;
            });
            return { year: d.year, total };
        });
    }

    return filtered;
}

function getFilteredQ5Data() {
    const { states, yearRange } = window.filterState;

    let filtered = window.dataStore.q5.filter(d => {
        const yearMatch = d.year >= yearRange[0] && d.year <= yearRange[1];
        const stateMatch = states.length === 0 || states.includes(d.state);
        return yearMatch && stateMatch;
    });

    const aggregated = d3.rollup(
        filtered,
        v => ({
            totalFatalities: d3.sum(v, d => d.totalFatalities),
            yearCount: new Set(v.map(d => d.year)).size,
            stateName: v[0].stateName,
            latitude: v[0].latitude,
            longitude: v[0].longitude,
            populationM: v[0].populationM,
            colorHex: v[0].colorHex
        }),
        d => d.state
    );

    const result = Array.from(aggregated, ([state, data]) => {
        const avgAnnualFatalities = data.totalFatalities / data.yearCount;
        const fatalityRatePer100k = data.populationM > 0
            ? (avgAnnualFatalities / data.populationM) / 10
            : 0;

        return {
            state: state,
            stateName: data.stateName,
            totalFatalities: data.totalFatalities,
            latitude: data.latitude,
            longitude: data.longitude,
            populationM: data.populationM,
            fatalityRatePer100k: fatalityRatePer100k,
            colorHex: data.colorHex
        };
    });

    return result;
}

function getFilteredQ6Data() {
    return window.dataStore.q6;
}

function getFilteredQ7Data() {
    const { states, yearRange } = window.filterState;

    let filtered = window.dataStore.q7.filter(d => {
        const yearMatch = d.year >= yearRange[0] && d.year <= yearRange[1];
        const stateMatch = states.length === 0 || states.includes(d.state);
        return yearMatch && stateMatch;
    });

    const aggregated = d3.rollup(
        filtered,
        v => ({
            totalFines: d3.sum(v, d => d.totalFines),
            totalFatalities: d3.sum(v, d => d.totalFatalities)
        }),
        d => d.state
    );

    const result = Array.from(aggregated, ([state, data]) => {
        const finesPerFatality = data.totalFatalities > 0
            ? data.totalFines / data.totalFatalities
            : 0;

        return {
            state,
            totalFines: data.totalFines,
            totalFatalities: data.totalFatalities,
            finesPerFatality
        };
    });

    return result.filter(d => d.totalFines > 0 || d.totalFatalities > 0);
}

// Update all charts when filters change
function updateAllCharts() {
    if (!window.dataStore.loaded) return;

    updateClearButtonVisibility();

    const filteredData = {
        q1: getFilteredQ1Data(),
        q2: getFilteredQ2Data(),
        q3: getFilteredQ3Data(),
        q4: getFilteredQ4Data(),
        q5: getFilteredQ5Data(),
        q6: getFilteredQ6Data(),
        q7: getFilteredQ7Data()
    };

    const hasData = Object.values(filteredData).some(data =>
        data && data.length > 0
    );

    if (!hasData) {
        showEmptyState();
        return;
    } else {
        hideEmptyState();
    }

    try {
        if (window.renderQ1) window.renderQ1(filteredData.q1);
        if (window.renderQ2) window.renderQ2(filteredData.q2);
        if (window.renderQ3) window.renderQ3(filteredData.q3);
        if (window.renderQ4) window.renderQ4(filteredData.q4);
        if (window.renderQ5) window.renderQ5(filteredData.q5);
        if (window.renderQ6) window.renderQ6(filteredData.q6);
        if (window.renderQ7) window.renderQ7(filteredData.q7);
    } catch (error) {
        console.error('Error updating charts:', error);
        showErrorMessage(error);
    }
}

function showErrorMessage(error) {
    const main = document.querySelector('main');
    const existingError = main.querySelector('.error-state');
    if (existingError) existingError.remove();

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-state';
    
    let helpText = 'Check that all CSV files are available in the data/ directory.';
    let troubleshooting = '';
    
    if (error.message.includes('404') || error.message.includes('Not Found')) {
        helpText = 'CSV files not found.';
        troubleshooting = `
            <ul style="text-align: left; margin-top: 10px;">
                <li>Ensure data/ folder exists in project root</li>
                <li>Verify all 8 CSV files are present</li>
                <li>Check file names match exactly</li>
            </ul>
        `;
    }
    
    errorDiv.innerHTML = `
        <h3>Error Loading Data</h3>
        <p>${helpText}</p>
        ${troubleshooting}
        <button onclick="location.reload()" style="margin-top: 15px; padding: 10px 20px; background: #26658c; color: white; border: none; border-radius: 6px; cursor: pointer;">
            Retry Loading
        </button>
    `;
    main.insertBefore(errorDiv, main.firstChild);
}

function showEmptyState() {
    const containers = document.querySelectorAll('.chart-content');
    containers.forEach(container => {
        if (!container.querySelector('.empty-state')) {
            const emptyDiv = document.createElement('div');
            emptyDiv.className = 'empty-state';
            emptyDiv.innerHTML = `
                <h3>No data for selected filters</h3>
                <p>Try widening the year range or clearing state filters.</p>
            `;
            container.innerHTML = '';
            container.appendChild(emptyDiv);
        }
    });
}

function hideEmptyState() {
    const emptyStates = document.querySelectorAll('.empty-state');
    emptyStates.forEach(el => el.remove());
}

function initializeFilters() {
    const stateFilter = document.getElementById('state-filter');
    const yearFrom = document.getElementById('year-from');
    const yearTo = document.getElementById('year-to');
    const applyBtn = document.getElementById('apply-filters');
    const clearBtn = document.getElementById('clear-filters');

    if (!stateFilter || !yearFrom || !yearTo || !applyBtn || !clearBtn) return;

    updateClearButtonVisibility();

    // Range slider initialization
    const sliderRange = document.getElementById('slider-range');
    const yearLabelFrom = document.getElementById('year-label-from');
    const yearLabelTo = document.getElementById('year-label-to');

    // Function to update the visual range bar
    function updateSliderRange() {
        if (!sliderRange) return;

        const min = parseInt(yearFrom.min);
        const max = parseInt(yearFrom.max);
        const fromValue = parseInt(yearFrom.value);
        const toValue = parseInt(yearTo.value);

        const fromPercent = ((fromValue - min) / (max - min)) * 100;
        const toPercent = ((toValue - min) / (max - min)) * 100;

        sliderRange.style.left = fromPercent + '%';
        sliderRange.style.width = (toPercent - fromPercent) + '%';
    }

    // Function to update year labels
    function updateYearLabels() {
        if (yearLabelFrom) yearLabelFrom.textContent = yearFrom.value;
        if (yearLabelTo) yearLabelTo.textContent = yearTo.value;
    }

    // Initialize slider appearance
    updateSliderRange();
    updateYearLabels();

    // Handle year-from slider changes
    yearFrom.addEventListener('input', function() {
        const fromValue = parseInt(this.value);
        const toValue = parseInt(yearTo.value);

        // Prevent handles from crossing
        if (fromValue > toValue) {
            this.value = toValue;
        }

        updateSliderRange();
        updateYearLabels();
    });

    // Handle year-to slider changes
    yearTo.addEventListener('input', function() {
        const fromValue = parseInt(yearFrom.value);
        const toValue = parseInt(this.value);

        // Prevent handles from crossing
        if (toValue < fromValue) {
            this.value = fromValue;
        }

        updateSliderRange();
        updateYearLabels();
    });

    applyBtn.addEventListener('click', () => {
        const selectedStates = Array.from(stateFilter.selectedOptions).map(opt => opt.value);
        window.filterState.states = selectedStates;

        const fromYear = parseInt(yearFrom.value);
        const toYear = parseInt(yearTo.value);

        if (isNaN(fromYear) || isNaN(toYear)) {
            alert('Please enter valid years');
            return;
        }

        if (fromYear < 2020 || toYear > 2024) {
            alert('Year range must be between 2020 and 2024');
            return;
        }

        if (fromYear > toYear) {
            alert('Start year must be before or equal to end year');
            return;
        }

        window.filterState.yearRange = [fromYear, toYear];

        updateAllCharts();
    });

    clearBtn.addEventListener('click', () => {
        stateFilter.selectedIndex = -1;
        yearFrom.value = 2020;
        yearTo.value = 2024;

        window.filterState.states = [];
        window.filterState.yearRange = [2020, 2024];
        window.filterState.offenceTypes = [];

        // Update slider visual state
        updateSliderRange();
        updateYearLabels();

        // Must call updateClearButtonVisibility before updateAllCharts
        updateClearButtonVisibility();
        updateAllCharts();
    });

    [stateFilter, yearFrom, yearTo].forEach(element => {
        element.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                applyBtn.click();
            }
        });
    });
}

async function initializeDashboard() {
    const main = document.querySelector('main');
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading-state';
    loadingDiv.id = 'loading-indicator';
    loadingDiv.innerHTML = `
        <div class="loading-spinner"></div>
        <p>Loading visualization data...</p>
    `;
    main.insertBefore(loadingDiv, main.firstChild);

    const success = await loadAllData();

    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.remove();
    }

    if (success) {
        initializeFilters();
        updateAllCharts();
    } else {
        console.error('Dashboard initialization failed');
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDashboard);
} else {
    initializeDashboard();
}