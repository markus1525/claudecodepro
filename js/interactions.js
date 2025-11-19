/* Shared interaction helpers for tooltips, legends, and resize */

// ============================================================================
// TOOLTIP FUNCTIONS
// ============================================================================

/**
 * Create or get existing tooltip element
 * @returns {d3.Selection} Tooltip selection
 */
function createTooltip() {
    let tooltip = d3.select('body').select('.tooltip');
    if (tooltip.empty()) {
        tooltip = d3.select('body')
            .append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0)
            .style('position', 'absolute')
            .style('pointer-events', 'none');
    }
    return tooltip;
}

/**
 * Show tooltip with content and smart positioning
 * @param {Event} event - Mouse event
 * @param {string} content - HTML content to display
 * @param {d3.Selection} tooltip - Tooltip selection (optional, will create if not provided)
 */
function showTooltip(event, content, tooltip = null) {
    if (!tooltip) {
        tooltip = createTooltip();
    }

    // Set content first to calculate dimensions
    tooltip.html(content);

    // Get tooltip dimensions
    const tooltipNode = tooltip.node();
    const tooltipRect = tooltipNode.getBoundingClientRect();
    const tooltipWidth = tooltipRect.width;
    const tooltipHeight = tooltipRect.height;

    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Calculate initial position
    let left = event.pageX + TOOLTIP_CONFIG.offset.x;
    let top = event.pageY + TOOLTIP_CONFIG.offset.y;

    // Check if tooltip goes beyond right edge
    if (left + tooltipWidth > scrollX + viewportWidth) {
        // Flip to left side of cursor
        left = event.pageX - tooltipWidth - Math.abs(TOOLTIP_CONFIG.offset.x);
    }

    // Check if tooltip goes beyond left edge
    if (left < scrollX) {
        left = scrollX + 10; // 10px padding from edge
    }

    // Check if tooltip goes beyond bottom edge
    if (top + tooltipHeight > scrollY + viewportHeight) {
        // Flip to top of cursor
        top = event.pageY - tooltipHeight - Math.abs(TOOLTIP_CONFIG.offset.y);
    }

    // Check if tooltip goes beyond top edge
    if (top < scrollY) {
        top = scrollY + 10; // 10px padding from edge
    }

    // Apply position and show tooltip
    tooltip
        .style('left', left + 'px')
        .style('top', top + 'px')
        .transition()
        .duration(TOOLTIP_CONFIG.duration.show)
        .style('opacity', 1);
}

/**
 * Move tooltip with cursor and smart positioning
 * @param {Event} event - Mouse event
 * @param {d3.Selection} tooltip - Tooltip selection
 */
function moveTooltip(event, tooltip) {
    // Get tooltip dimensions
    const tooltipNode = tooltip.node();
    const tooltipRect = tooltipNode.getBoundingClientRect();
    const tooltipWidth = tooltipRect.width;
    const tooltipHeight = tooltipRect.height;

    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Calculate initial position
    let left = event.pageX + TOOLTIP_CONFIG.offset.x;
    let top = event.pageY + TOOLTIP_CONFIG.offset.y;

    // Check if tooltip goes beyond right edge
    if (left + tooltipWidth > scrollX + viewportWidth) {
        left = event.pageX - tooltipWidth - Math.abs(TOOLTIP_CONFIG.offset.x);
    }

    // Check if tooltip goes beyond left edge
    if (left < scrollX) {
        left = scrollX + 10;
    }

    // Check if tooltip goes beyond bottom edge
    if (top + tooltipHeight > scrollY + viewportHeight) {
        top = event.pageY - tooltipHeight - Math.abs(TOOLTIP_CONFIG.offset.y);
    }

    // Check if tooltip goes beyond top edge
    if (top < scrollY) {
        top = scrollY + 10;
    }

    // Apply position
    tooltip
        .style('left', left + 'px')
        .style('top', top + 'px');
}

/**
 * Hide tooltip
 * @param {d3.Selection} tooltip - Tooltip selection
 */
function hideTooltip(tooltip) {
    tooltip
        .transition()
        .duration(TOOLTIP_CONFIG.duration.hide)
        .style('opacity', 0);
}

/**
 * Format tooltip content for fines data
 * @param {Object} data - Data object
 * @param {string} data.title - Tooltip title
 * @param {Array} data.rows - Array of {label, value} objects
 * @returns {string} HTML string
 */
function formatTooltipContent(data) {
    const rows = data.rows.map(row => `
        <div class="tooltip-row">
            <span class="tooltip-label">${row.label}:</span>
            <span class="tooltip-value">${row.value}</span>
        </div>
    `).join('');

    return `
        <strong>${data.title}</strong>
        ${rows}
    `;
}

/**
 * Format tooltip for offence data
 * @param {Object} d - Data point
 * @returns {string} HTML string
 */
function tooltipOffenceContent(d) {
    return formatTooltipContent({
        title: d.offenceType,
        rows: [
            { label: 'Total fines', value: FORMAT.fines(d.totalFines) },
            { label: 'Percentage', value: FORMAT.percent(d.percentage) }
        ]
    });
}

/**
 * Format tooltip for state data
 * @param {Object} d - Data point
 * @returns {string} HTML string
 */
function tooltipStateContent(d) {
    return formatTooltipContent({
        title: STATES.names[d.state] || d.state,
        rows: [
            { label: 'Total fines', value: FORMAT.fines(d.totalFines) },
            { label: '% of national', value: FORMAT.percent(d.percentageOfNational) }
        ]
    });
}

/**
 * Format tooltip for fatality data
 * @param {Object} d - Data point
 * @returns {string} HTML string
 */
function tooltipFatalityContent(d) {
    const rows = [
        { label: 'Total fatalities', value: FORMAT.fatalities(d.totalFatalities) }
    ];

    if (d.fatalityRatePer100k !== undefined) {
        rows.push({ label: 'Rate per 100k', value: FORMAT.rate(d.fatalityRatePer100k) });
    }

    return formatTooltipContent({
        title: STATES.names[d.state] || d.state,
        rows: rows
    });
}

/**
 * Format tooltip for age-offence scatter data
 * @param {Object} d - Data point
 * @returns {string} HTML string
 */
function tooltipAgeOffenceContent(d) {
    const rows = [
        { label: 'Offence', value: d.offenceType },
        { label: 'Total fines', value: FORMAT.fines(d.totalFines) }
    ];

    if (d.percentageOfAgeGroup !== undefined) {
        rows.push({ label: '% of age group', value: FORMAT.percent(d.percentageOfAgeGroup) });
    }

    return formatTooltipContent({
        title: d.ageGroup + ' years',
        rows: rows
    });
}

/**
 * Format tooltip for crash type data
 * @param {Object} d - Data point
 * @returns {string} HTML string
 */
function tooltipCrashTypeContent(d) {
    return formatTooltipContent({
        title: d.crashType,
        rows: [
            { label: 'Road user', value: d.roadUser },
            { label: 'Fatalities', value: FORMAT.fatalities(d.fatalities) }
        ]
    });
}

// ============================================================================
// LEGEND FUNCTIONS
// ============================================================================

/**
 * Create a standard legend
 * @param {d3.Selection} svg - SVG selection to append legend to
 * @param {Array} items - Array of legend items
 * @param {Function} colorScale - D3 color scale
 * @param {Object} options - Configuration options
 * @returns {d3.Selection} Legend group selection
 */
function createLegend(svg, items, colorScale, options = {}) {
    const defaults = {
        x: 20,
        y: 20,
        itemHeight: 25,
        itemWidth: 150,
        columns: 1,
        interactive: false,
        onClick: null,
        formatter: (d) => d
    };

    const config = { ...defaults, ...options };

    const legend = svg.append('g')
        .attr('class', 'legend')
        .attr('transform', `translate(${config.x}, ${config.y})`);

    const legendItems = legend.selectAll('.legend-item')
        .data(items)
        .enter()
        .append('g')
        .attr('class', 'legend-item')
        .attr('transform', (d, i) => {
            const col = i % config.columns;
            const row = Math.floor(i / config.columns);
            return `translate(${col * config.itemWidth}, ${row * config.itemHeight})`;
        });

    // Add interactive cursor if applicable
    if (config.interactive) {
        legendItems.style('cursor', 'pointer');
    }

    // Add color rectangles
    legendItems.append('rect')
        .attr('width', 16)
        .attr('height', 16)
        .attr('fill', d => colorScale(d))
        .attr('rx', 3);

    // Add text labels
    legendItems.append('text')
        .attr('x', 22)
        .attr('y', 13)
        .style('font-size', '12px')
        .style('fill', BRAND_COLORS.darkGray)
        .text(d => config.formatter(d));

    // Add click handler if interactive
    if (config.interactive && config.onClick) {
        legendItems.on('click', config.onClick);
    }

    return legend;
}

/**
 * Create a mobile-friendly legend (compact layout)
 * @param {d3.Selection} svg - SVG selection
 * @param {Array} items - Legend items
 * @param {Function} colorScale - Color scale
 * @param {number} width - Container width
 * @param {number} height - Container height
 * @returns {d3.Selection} Legend group
 */
function createMobileLegend(svg, items, colorScale, width, height) {
    return createLegend(svg, items, colorScale, {
        x: 20,
        y: height - 80,
        itemHeight: 25,
        itemWidth: Math.min(width / 2.5, 150),
        columns: 2,
        formatter: (d) => {
            // Shorten text for mobile
            const short = d.replace('Fines', '').replace('Use', '').replace('Wearing', '').trim();
            return short.length > 12 ? short.substring(0, 12) + '...' : short;
        }
    });
}

/**
 * Create a desktop legend (positioned on the right)
 * @param {d3.Selection} svg - SVG selection
 * @param {Array} items - Legend items
 * @param {Function} colorScale - Color scale
 * @param {number} width - Container width
 * @param {Object} margin - Margins object
 * @returns {d3.Selection} Legend group
 */
function createDesktopLegend(svg, items, colorScale, width, margin) {
    return createLegend(svg, items, colorScale, {
        x: width - margin.right + 10,
        y: 20,
        itemHeight: 25,
        itemWidth: 110,
        columns: 1
    });
}

/**
 * Create an interactive legend (toggleable categories)
 * @param {d3.Selection} svg - SVG selection
 * @param {Array} items - Legend items
 * @param {Function} colorScale - Color scale
 * @param {Set} hiddenCategories - Set of hidden category names
 * @param {Function} onToggle - Callback when category toggled
 * @param {Object} options - Additional options
 * @returns {d3.Selection} Legend group
 */
function createInteractiveLegend(svg, items, colorScale, hiddenCategories, onToggle, options = {}) {
    const legend = createLegend(svg, items, colorScale, {
        ...options,
        interactive: true,
        onClick: function(event, d) {
            // Toggle category
            if (hiddenCategories.has(d)) {
                hiddenCategories.delete(d);
            } else {
                hiddenCategories.add(d);
            }

            // Update visual state
            const item = d3.select(this);
            item.select('rect').attr('opacity', hiddenCategories.has(d) ? 0.3 : 1);
            item.select('text').attr('opacity', hiddenCategories.has(d) ? 0.5 : 1);

            // Call callback
            if (onToggle) {
                onToggle(d, hiddenCategories);
            }
        }
    });

    // Set initial opacity for hidden items
    legend.selectAll('.legend-item')
        .each(function(d) {
            if (hiddenCategories.has(d)) {
                d3.select(this).select('rect').attr('opacity', 0.3);
                d3.select(this).select('text').attr('opacity', 0.5);
            }
        });

    return legend;
}

// ============================================================================
// RESIZE HANDLER
// ============================================================================

/**
 * Create a debounced resize handler
 * @param {Function} callback - Function to call on resize
 * @param {number} delay - Debounce delay in ms (default: 250)
 * @returns {Function} Event handler function
 */
function createResizeHandler(callback, delay = 250) {
    let resizeTimeout;

    return function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(callback, delay);
    };
}

/**
 * Check if current viewport is mobile
 * @returns {boolean} True if mobile
 */
function isMobile() {
    return window.innerWidth < CHART_DIMENSIONS.breakpoints.mobile;
}

/**
 * Check if current viewport is tablet
 * @returns {boolean} True if tablet
 */
function isTablet() {
    const width = window.innerWidth;
    return width >= CHART_DIMENSIONS.breakpoints.mobile &&
           width < CHART_DIMENSIONS.breakpoints.desktop;
}

/**
 * Check if current viewport is desktop
 * @returns {boolean} True if desktop
 */
function isDesktop() {
    return window.innerWidth >= CHART_DIMENSIONS.breakpoints.desktop;
}

// ============================================================================
// EMPTY STATE HELPERS
// ============================================================================

/**
 * Show empty state message in a chart container
 * @param {string} selector - Container selector
 * @param {string} message - Message to display
 */
function showEmptyState(selector, message = 'No data available') {
    d3.select(selector)
        .html(`<div class="empty-state"><p>${message}</p></div>`);
}

/**
 * Show loading state in a chart container
 * @param {string} selector - Container selector
 */
function showLoadingState(selector) {
    d3.select(selector)
        .html(`
            <div class="loading-state">
                <div class="loading-spinner"></div>
                <p>Loading data...</p>
            </div>
        `);
}

// ============================================================================
// AXIS HELPERS
// ============================================================================

/**
 * Format axis tick with SI prefix
 * @param {number} value - Value to format
 * @returns {string} Formatted string
 */
function formatAxisTick(value) {
    return d3.format('.2s')(value);
}

/**
 * Format axis tick as percentage
 * @param {number} value - Value to format
 * @returns {string} Formatted percentage
 */
function formatAxisTickPercent(value) {
    return d3.format('.0%')(value);
}

/**
 * Add grid lines to a chart
 * @param {d3.Selection} g - Chart group selection
 * @param {d3.Scale} scale - Y scale
 * @param {number} width - Inner width
 * @param {number} ticks - Number of ticks
 */
function addGridLines(g, scale, width, ticks = 6) {
    g.append('g')
        .attr('class', 'grid')
        .style('stroke', BRAND_COLORS.lightGray)
        .style('stroke-opacity', 0.5)
        .call(d3.axisLeft(scale)
            .ticks(ticks)
            .tickSize(-width)
            .tickFormat('')
        );
}

// ============================================================================
// ACCESSIBILITY HELPERS
// ============================================================================

/**
 * Update data table for screen readers
 * @param {string} tableId - Table body ID
 * @param {Array} data - Data array
 * @param {Function} rowFormatter - Function to format each row
 */
function updateDataTable(tableId, data, rowFormatter) {
    const tbody = d3.select(`#${tableId}`);
    tbody.selectAll('tr').remove();

    tbody.selectAll('tr')
        .data(data)
        .enter()
        .append('tr')
        .html(rowFormatter);
}

// ============================================================================
// ANIMATION HELPERS
// ============================================================================

/**
 * Animate line drawing
 * @param {d3.Selection} path - Path selection
 * @param {number} duration - Animation duration
 */
function animateLineDraw(path, duration = ANIMATION.duration.slow) {
    const totalLength = path.node().getTotalLength();

    path
        .attr('stroke-dasharray', totalLength + ' ' + totalLength)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .duration(duration)
        .ease(ANIMATION.easing.linear)
        .attr('stroke-dashoffset', 0);
}

/**
 * Animate bars growing from bottom
 * @param {d3.Selection} bars - Bar selection
 * @param {Function} yScale - Y scale
 * @param {Function} heightFn - Function to get bar height
 * @param {number} innerHeight - Chart inner height
 */
function animateBars(bars, yScale, heightFn, innerHeight) {
    bars
        .attr('y', innerHeight)
        .attr('height', 0)
        .transition()
        .duration(ANIMATION.duration.medium)
        .delay((d, i) => i * ANIMATION.delay.stagger)
        .attr('y', d => yScale(heightFn(d)))
        .attr('height', d => innerHeight - yScale(heightFn(d)));
}