/* Shared constants for colors, labels, sizes, and formats */

// Color scale for offence types (Q1 and Q3)
const OFFENCE_COLORS = {
    scale: d3.scaleOrdinal()
        .domain(['Speed Fines', 'Mobile Phone Use', 'Non Wearing Seatbelts', 'Unlicensed Driving'])
        .range(['#26658c', '#3078a3', '#5b9fc7', '#8bbfdb']),

    palette: {
        'Speed Fines': '#26658c',
        'Mobile Phone Use': '#3078a3',
        'Non Wearing Seatbelts': '#5b9fc7',
        'Unlicensed Driving': '#8bbfdb'
    }
};

// Color scale for road users (Q6)
const ROAD_USER_COLORS = {
    scale: d3.scaleOrdinal()
        .domain([
            'Driver',
            'Passenger',
            'Pedestrian',
            'Motorcycle rider',
            'Motorcycle pillion passenger',
            'Pedal cyclist',
            'Unknown'
        ])
        .range([
            '#26658c',
            '#3078a3',
            '#5b9fc7',
            '#8bbfdb',
            '#afd4e8',
            '#d0e5f2',
            '#e5e5e5'
        ]),

    palette: {
        'Driver': '#26658c',
        'Passenger': '#3078a3',
        'Pedestrian': '#5b9fc7',
        'Motorcycle rider': '#8bbfdb',
        'Motorcycle pillion passenger': '#afd4e8',
        'Pedal cyclist': '#d0e5f2',
        'Unknown': '#e5e5e5'
    }
};

// Brand colors
const BRAND_COLORS = {
    primary: '#26658c',
    secondary: '#3078a3',
    accent: '#5b9fc7',
    light: '#8bbfdb',
    veryLight: '#afd4e8',
    paleBlue: '#d0e5f2',
    darkGray: '#2d2d2d',
    mediumGray: '#737373',
    lightGray: '#e5e5e5',
    white: '#ffffff'
};

// Australian states and territories
const STATES = {
    codes: ['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA'],

    names: {
        'ACT': 'Australian Capital Territory',
        'NSW': 'New South Wales',
        'NT': 'Northern Territory',
        'QLD': 'Queensland',
        'SA': 'South Australia',
        'TAS': 'Tasmania',
        'VIC': 'Victoria',
        'WA': 'Western Australia'
    },

    abbreviations: {
        'Australian Capital Territory': 'ACT',
        'New South Wales': 'NSW',
        'Northern Territory': 'NT',
        'Queensland': 'QLD',
        'South Australia': 'SA',
        'Tasmania': 'TAS',
        'Victoria': 'VIC',
        'Western Australia': 'WA'
    }
};

// Age group definitions
const AGE_GROUPS = {
    order: ['0-16', '17-25', '26-39', '40-64', '65+'],

    numeric: {
        '0-16': 8,
        '17-25': 21,
        '26-39': 32.5,
        '40-64': 52,
        '65+': 70
    },

    labels: {
        '0-16': '0-16 years',
        '17-25': '17-25 years',
        '26-39': '26-39 years',
        '40-64': '40-64 years',
        '65+': '65+ years'
    }
};

// Offence type definitions
const OFFENCE_TYPES = {
    all: ['Speed Fines', 'Mobile Phone Use', 'Non Wearing Seatbelts', 'Unlicensed Driving'],

    shortNames: {
        'Speed Fines': 'Speed',
        'Mobile Phone Use': 'Mobile Phone',
        'Non Wearing Seatbelts': 'Seatbelts',
        'Unlicensed Driving': 'Unlicensed'
    }
};

// Road user categories
const ROAD_USER_CATEGORIES = {
    all: [
        'Driver',
        'Passenger',
        'Pedestrian',
        'Motorcycle rider',
        'Motorcycle pillion passenger',
        'Pedal cyclist',
        'Unknown'
    ],

    shortNames: {
        'Driver': 'Driver',
        'Passenger': 'Passenger',
        'Pedestrian': 'Pedestrian',
        'Motorcycle rider': 'MC Rider',
        'Motorcycle pillion passenger': 'MC Passenger',
        'Pedal cyclist': 'Cyclist',
        'Unknown': 'Unknown'
    }
};

// Crash types
const CRASH_TYPES = {
    all: ['Single', 'Multiple'],

    labels: {
        'Single': 'Single Vehicle',
        'Multiple': 'Multiple Vehicle'
    }
};

// Chart dimensions and margins
const CHART_DIMENSIONS = {
    margin: {
        top: 20,
        right: 30,
        bottom: 60,
        left: 70
    },

    marginMobile: {
        top: 20,
        right: 20,
        bottom: 80,
        left: 60
    },

    marginLarge: {
        top: 20,
        right: 120,
        bottom: 60,
        left: 80
    },

    height: {
        standard: 450,
        medium: 400,
        small: 350,
        mobile: 400
    },

    breakpoints: {
        mobile: 640,
        tablet: 768,
        desktop: 1024
    }
};

// Animation settings
const ANIMATION = {
    duration: {
        fast: 200,
        medium: 500,
        slow: 1000
    },

    delay: {
        stagger: 20,
        staggerSlow: 100
    },

    easing: {
        default: d3.easeCubicInOut,
        linear: d3.easeLinear,
        elastic: d3.easeElastic
    }
};

// Tooltip configuration
const TOOLTIP_CONFIG = {
    offset: {
        x: 15,
        y: -28
    },

    duration: {
        show: 200,
        hide: 200
    }
};

// Number and text formatting
const FORMAT = {
    number: d3.format(','),
    numberShort: d3.format('.2s'),
    numberShortOne: d3.format('.1s'),
    decimal: d3.format('.1f'),
    decimalTwo: d3.format('.2f'),
    percentage: d3.format('.1%'),
    percentageWhole: d3.format('.0%'),

    fines: (value) => d3.format(',')(value),
    fatalities: (value) => d3.format(',')(value),
    rate: (value) => d3.format('.1f')(value),
    percent: (value) => d3.format('.1f')(value) + '%'
};

// Data year range
const YEAR_RANGE = {
    min: 2020,
    max: 2024,
    default: [2020, 2024]
};