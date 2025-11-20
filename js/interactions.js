/* helper functions for tooltips, legends, and responsive stuff */

// grab the tooltip or make a new one if it doesn't exist
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

// show tooltip and make sure it doesn't go off screen
function showTooltip(event, content, tooltip = null) {
    if (!tooltip) {
        tooltip = createTooltip();
    }

    tooltip.html(content);

    const tooltipNode = tooltip.node();
    const tooltipRect = tooltipNode.getBoundingClientRect();
    const tooltipWidth = tooltipRect.width;
    const tooltipHeight = tooltipRect.height;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    let left = event.pageX + TOOLTIP_CONFIG.offset.x;
    let top = event.pageY + TOOLTIP_CONFIG.offset.y;

    // Flip to left if going beyond right edge
    if (left + tooltipWidth > scrollX + viewportWidth) {
        left = event.pageX - tooltipWidth - Math.abs(TOOLTIP_CONFIG.offset.x);
    }

    // Keep within left edge
    if (left < scrollX) {
        left = scrollX + 10;
    }

    // Flip to top if going beyond bottom edge
    if (top + tooltipHeight > scrollY + viewportHeight) {
        top = event.pageY - tooltipHeight - Math.abs(TOOLTIP_CONFIG.offset.y);
    }

    // Keep within top edge
    if (top < scrollY) {
        top = scrollY + 10;
    }

    tooltip
        .style('left', left + 'px')
        .style('top', top + 'px')
        .transition()
        .duration(TOOLTIP_CONFIG.duration.show)
        .style('opacity', 1);
}

// move tooltip to follow the mouse
function moveTooltip(event, tooltip) {
    const tooltipNode = tooltip.node();
    const tooltipRect = tooltipNode.getBoundingClientRect();
    const tooltipWidth = tooltipRect.width;
    const tooltipHeight = tooltipRect.height;

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

// hide the tooltip
function hideTooltip(tooltip) {
    tooltip
        .transition()
        .duration(TOOLTIP_CONFIG.duration.hide)
        .style('opacity', 0);
}

// format tooltip content with title and rows
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

// tooltip for offense/offence type data
function tooltipOffenceContent(d) {
    return formatTooltipContent({
        title: d.offenceType,
        rows: [
            { label: 'Total fines', value: FORMAT.fines(d.totalFines) },
            { label: 'Percentage', value: FORMAT.percent(d.percentage) }
        ]
    });
}

// tooltip for state data
function tooltipStateContent(d) {
    return formatTooltipContent({
        title: STATES.names[d.state] || d.state,
        rows: [
            { label: 'Total fines', value: FORMAT.fines(d.totalFines) },
            { label: '% of national', value: FORMAT.percent(d.percentageOfNational) }
        ]
    });
}

// tooltip for fatality data
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

// tooltip for age group and offence type data
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

// tooltip for crash type data
function tooltipCrashTypeContent(d) {
    return formatTooltipContent({
        title: d.crashType,
        rows: [
            { label: 'Road user', value: d.roadUser },
            { label: 'Fatalities', value: FORMAT.fatalities(d.fatalities) }
        ]
    });
}

// legend helper functions

// make a legend with boxes and labels
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

// compact legend for smaller screens
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

// legend for desktop (positioned on right side)
function createDesktopLegend(svg, items, colorScale, width, margin) {
    return createLegend(svg, items, colorScale, {
        x: width - margin.right + 10,
        y: 20,
        itemHeight: 25,
        itemWidth: 110,
        columns: 1
    });
}

// legend that can be clicked to hide/show categories
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

// resize handling

// prevent resize from firing too often
function createResizeHandler(callback, delay = 250) {
    let resizeTimeout;

    return function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(callback, delay);
    };
}

// check if we're on a mobile screen
function isMobile() {
    return window.innerWidth < CHART_DIMENSIONS.breakpoints.mobile;
}

// check if we're on a tablet screen
function isTablet() {
    const width = window.innerWidth;
    return width >= CHART_DIMENSIONS.breakpoints.mobile &&
           width < CHART_DIMENSIONS.breakpoints.desktop;
}

// check if we're on a desktop screen
function isDesktop() {
    return window.innerWidth >= CHART_DIMENSIONS.breakpoints.desktop;
}

// empty state handling

// show a message when there's no data
function showEmptyState(selector, message = 'No data available') {
    d3.select(selector)
        .html(`<div class="empty-state"><p>${message}</p></div>`);
}

// show a loading spinner
function showLoadingState(selector) {
    d3.select(selector)
        .html(`
            <div class="loading-state">
                <div class="loading-spinner"></div>
                <p>Loading data...</p>
            </div>
        `);
}

// axis formatting

// format numbers on axis (like 1k, 1M)
function formatAxisTick(value) {
    return d3.format('.2s')(value);
}

// format axis tick as percentage
function formatAxisTickPercent(value) {
    return d3.format('.0%')(value);
}

// add horizontal grid lines to chart
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

// accessibility - data tables for screen readers

// update the data table
function updateDataTable(tableId, data, rowFormatter) {
    const tbody = d3.select(`#${tableId}`);
    tbody.selectAll('tr').remove();

    tbody.selectAll('tr')
        .data(data)
        .enter()
        .append('tr')
        .html(rowFormatter);
}

// animation helpers

// animate a line being drawn
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

// animate bars growing up from the bottom
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

// touch handling for mobile devices

// add touch events that work with scrolling
function attachScrollFriendlyTouch(selection, config = {}) {
    const {
        onTap = null,
        onHoverStart = null,
        onHoverEnd = null,
        tooltip = createTooltip(),
        getContent = () => '',
        tapThreshold = 10, // pixels of movement allowed before considering it a scroll
        tapTimeThreshold = 500 // ms - max time for a tap
    } = config;

    selection.each(function() {
        const element = d3.select(this);
        let touchStartY = null;
        let touchStartX = null;
        let touchStartTime = null;
        let isScrolling = false;

        // Touch start
        element.on('touchstart', function(event, d) {
            const touch = event.touches[0];
            touchStartY = touch.pageY;
            touchStartX = touch.pageX;
            touchStartTime = Date.now();
            isScrolling = false;

            // Don't prevent default or stop propagation - allow normal behavior
        });

        // Touch move - detect if scrolling
        element.on('touchmove', function(event, d) {
            if (!touchStartY || !touchStartX) return;

            const touch = event.touches[0];
            const moveY = Math.abs(touch.pageY - touchStartY);
            const moveX = Math.abs(touch.pageX - touchStartX);

            // If significant vertical movement, user is scrolling
            if (moveY > tapThreshold || moveX > tapThreshold) {
                isScrolling = true;
                
                // Clean up any active tooltip or hover state
                hideTooltip(tooltip);
                if (onHoverEnd) {
                    onHoverEnd(element);
                }
            } else {
                // Small movement - show tooltip
                if (event.cancelable) {
                    event.preventDefault(); // Prevent scroll only if we can
                }

                if (onHoverStart) {
                    onHoverStart(element, event, d);
                }

                const content = getContent(d);
                if (content) {
                    showTooltip({ pageX: touch.pageX, pageY: touch.pageY }, content, tooltip);
                }
            }
        });

        // Touch end
        element.on('touchend', function(event, d) {
            const touchDuration = Date.now() - touchStartTime;

            // If not scrolling and touch was quick, it's a tap
            if (!isScrolling && touchDuration < tapTimeThreshold) {
                if (onTap) {
                    onTap(event, d);
                }
                
                // Show tooltip briefly on tap
                const content = getContent(d);
                if (content) {
                    if (onHoverStart) {
                        onHoverStart(element, event, d);
                    }
                    
                    const touch = event.changedTouches[0];
                    showTooltip({ pageX: touch.pageX, pageY: touch.pageY }, content, tooltip);

                    // Auto-hide after 2 seconds
                    setTimeout(() => {
                        hideTooltip(tooltip);
                        if (onHoverEnd) {
                            onHoverEnd(element);
                        }
                    }, 2000);
                }
            } else {
                // Was scrolling - just clean up
                hideTooltip(tooltip);
                if (onHoverEnd) {
                    onHoverEnd(element);
                }
            }

            // Reset tracking variables
            touchStartY = null;
            touchStartX = null;
            touchStartTime = null;
            isScrolling = false;
        });

        // Touch cancel (e.g., phone call)
        element.on('touchcancel', function() {
            hideTooltip(tooltip);
            if (onHoverEnd) {
                onHoverEnd(element);
            }
            touchStartY = null;
            touchStartX = null;
            touchStartTime = null;
            isScrolling = false;
        });
    });

    return selection;
}

// close tooltip when tapping outside chart areas
document.addEventListener('touchstart', function(event) {
    const chartElement = event.target.closest('.bar, .arc, .bubble, .state-path, .bar-segment, .data-point, .scatter-point, circle[class*="point"], rect[class*="bar"], .scatter-point, .point-fatalities');
    
    if (!chartElement) {
        const tooltip = d3.select('body').select('.tooltip');
        if (!tooltip.empty() && tooltip.style('opacity') !== '0') {
            hideTooltip(tooltip);
        }
    }
}, { passive: true });

// close tooltip when user scrolls
let scrollTimeout;
window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const tooltip = d3.select('body').select('.tooltip');
        if (!tooltip.empty()) {
            hideTooltip(tooltip);
        }
    }, 100);
}, { passive: true });