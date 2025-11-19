/* Sets up global filter and data objects before other scripts run */

if (typeof window.filterState === 'undefined') {
    window.filterState = {
        states: [],
        yearRange: [2020, 2024],
        offenceTypes: []
    };
    console.log('filterState initialized');
}

if (typeof window.dataStore === 'undefined') {
    window.dataStore = {
        q1Detailed: null,
        q1Overall: null,
        q2: null,
        q3: null,
        q4: null,
        q5: null,
        q6: null,
        q7: null,
        loaded: false,
        error: null
    };
    console.log('dataStore initialized');
}