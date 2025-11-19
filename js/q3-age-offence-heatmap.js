/* Q3: Age vs offence heatmap showing fines intensity */

(function() {
    'use strict';

    // Color scale for heatmap (sequential, colorblind-friendly)
    const colorScale = d3.scaleSequential(d3.interpolateYlGnBu);

    // Age groups in order
    const ageGroupOrder = ['0-16', '17-25', '26-39', '40-64', '65 and over'];

    // Offence types
    const offenceTypes = ['Speed Fines', 'Mobile Phone Use', 'Non Wearing Seatbelts', 'Unlicensed Driving'];

    let width, height;

    /**
     * Render Q3 chart (heatmap)
     */
    window.renderQ3 = function(data) {
        if (!data || data.length === 0) {
            d3.select('#chart-q3').html('<div class="empty-state"><p>No data available</p></div>');
            return;
        }

        // Clear previous chart
        d3.select('#svg-q3').selectAll('*').remove();

        renderHeatmap(data);
        updateDataTable(data);
    };

    /**
     * Render heatmap
     */
    function renderHeatmap(data) {
        const container = document.getElementById('chart-q3');
        width = container.clientWidth;
        
        // Responsive height based on screen size
        const isMobile = window.innerWidth <= 640;
        height = isMobile ? 700 : 550; // Increased mobile height

        const margin = isMobile 
            ? { top: 40, right: 20, bottom: 150, left: 100 } // More bottom margin for rotated labels
            : { top: 60, right: 180, bottom: 130, left: 120 };
        
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const svg = d3.select('#svg-q3')
            .attr('width', width)
            .attr('height', height);

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        // Create data matrix
        const dataMap = new Map();
        data.forEach(d => {
            const key = `${d.ageGroup}-${d.offenceType}`;
            dataMap.set(key, d.fines);
        });

        // Get min/max for color scale
        const maxFines = d3.max(data, d => d.fines);
        const minFines = d3.min(data, d => d.fines);

        colorScale.domain([minFines, maxFines]);

        // Scales
        const xScale = d3.scaleBand()
            .domain(offenceTypes)
            .range([0, innerWidth])
            .padding(0.05);

        const yScale = d3.scaleBand()
            .domain(ageGroupOrder)
            .range([0, innerHeight])
            .padding(0.05);

        // Create tooltip
        const tooltip = createTooltip();

        // Draw heatmap cells
        ageGroupOrder.forEach(ageGroup => {
            offenceTypes.forEach(offenceType => {
                const key = `${ageGroup}-${offenceType}`;
                const fines = dataMap.get(key) || 0;

                g.append('rect')
                    .attr('x', xScale(offenceType))
                    .attr('y', yScale(ageGroup))
                    .attr('width', xScale.bandwidth())
                    .attr('height', yScale.bandwidth())
                    .attr('fill', fines > 0 ? colorScale(fines) : '#f0f0f0')
                    .attr('stroke', '#ffffff')
                    .attr('stroke-width', 2)
                    .attr('rx', 4)
                    .style('cursor', 'pointer')
                    .style('opacity', 0)
                    .on('mouseenter', function(event) {
                        d3.select(this)
                            .attr('stroke', '#26658c')
                            .attr('stroke-width', 3);

                        const content = `
            <strong>${ageGroup} years</strong>
            <div class="tooltip-row">
                <span class="tooltip-label">Offence:</span>
                <span class="tooltip-value">${offenceType}</span>
            </div>
            <div class="tooltip-row">
                <span class="tooltip-label">Total fines:</span>
                <span class="tooltip-value">${d3.format(',')(fines)}</span>
            </div>
        `;
                        showTooltip(event, content, tooltip);
                    })
                    .on('mousemove', (event) => {
                        moveTooltip(event, tooltip);
                    })
                    .on('mouseleave', function() {
                        d3.select(this)
                            .attr('stroke', '#ffffff')
                            .attr('stroke-width', 2);

                        hideTooltip(tooltip);
                    })
                    .transition()
                    .duration(500)
                    .delay((ageGroupOrder.indexOf(ageGroup) + offenceTypes.indexOf(offenceType)) * 20)
                    .style('opacity', 1);

                // Add text labels for high values (hide on mobile)
                if (!isMobile && fines > maxFines * 0.3) {
                    g.append('text')
                        .attr('x', xScale(offenceType) + xScale.bandwidth() / 2)
                        .attr('y', yScale(ageGroup) + yScale.bandwidth() / 2)
                        .attr('text-anchor', 'middle')
                        .attr('dy', '0.35em')
                        .attr('font-size', '11px')
                        .attr('font-weight', '600')
                        .attr('fill', fines > maxFines * 0.7 ? '#ffffff' : '#2d2d2d')
                        .style('pointer-events', 'none')
                        .text(d3.format('.2s')(fines))
                        .style('opacity', 0)
                        .transition()
                        .duration(500)
                        .delay((ageGroupOrder.indexOf(ageGroup) + offenceTypes.indexOf(offenceType)) * 20 + 500)
                        .style('opacity', 1);
                }
            });
        });

        // X axis
        const xAxis = g.append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(d3.axisBottom(xScale));

        xAxis.selectAll('text')
            .attr('transform', 'rotate(-45)')
            .style('text-anchor', 'end')
            .style('font-size', isMobile ? '10px' : '12px')
            .style('font-weight', '500')
            .attr('dx', '-0.8em')
            .attr('dy', '0.15em');

        // Y axis
        g.append('g')
            .attr('class', 'axis')
            .call(d3.axisLeft(yScale))
            .selectAll('text')
            .style('font-size', isMobile ? '10px' : '12px')
            .style('font-weight', '500');

        // Axis labels
        if (!isMobile) {
            g.append('text')
                .attr('class', 'axis-label')
                .attr('x', innerWidth / 2)
                .attr('y', innerHeight + 120)
                .attr('text-anchor', 'middle')
                .text('Offence Type');

            g.append('text')
                .attr('class', 'axis-label')
                .attr('transform', 'rotate(-90)')
                .attr('x', -innerHeight / 2)
                .attr('y', -90)
                .attr('text-anchor', 'middle')
                .text('Age Group');
        }

        // Add title
        svg.append('text')
            .attr('class', 'chart-main-title')
            .attr('x', width / 2)
            .attr('y', isMobile ? 20 : 30)
            .attr('text-anchor', 'middle')
            .style('font-size', isMobile ? '12px' : '16px')
            .style('font-weight', '600')
            .style('fill', '#2d2d2d')
            .text(isMobile ? 'Age vs Offence' : 'Fines Distribution: Age Group vs Offence Type');

        // Add color legend - position based on screen size
        addColorLegend(svg, width, height, margin, colorScale, minFines, maxFines, innerWidth, innerHeight, isMobile);
    }

    /**
     * Add color legend for heatmap - POSITIONED RESPONSIVELY
     */
    function addColorLegend(svg, width, height, margin, colorScale, minFines, maxFines, innerWidth, innerHeight, isMobile) {
        const legendWidth = isMobile ? 15 : 20;
        const legendHeight = isMobile ? 150 : 200;

        const legendX = isMobile 
            ? width - legendWidth - 15  // Right edge on mobile
            : margin.left + innerWidth + 30; // Original position
        
        const legendY = isMobile 
            ? margin.top + 40 // Below title on mobile
            : margin.top + 20; // Original position

        const legend = svg.append('g')
            .attr('class', 'legend')
            .attr('transform', `translate(${legendX}, ${legendY})`);

        legend.append('text')
            .attr('x', 0)
            .attr('y', -10)
            .style('font-size', isMobile ? '10px' : '12px')
            .style('font-weight', '600')
            .style('fill', '#2d2d2d')
            .text('Fines');

        // Create vertical gradient
        const defs = svg.select('defs').empty() ? svg.append('defs') : svg.select('defs');
        const linearGradient = defs.select('#heatmap-gradient-vertical').empty() 
            ? defs.append('linearGradient')
                .attr('id', 'heatmap-gradient-vertical')
            : defs.select('#heatmap-gradient-vertical');

        linearGradient
            .attr('x1', '0%')
            .attr('x2', '0%')
            .attr('y1', '100%')
            .attr('y2', '0%');

        linearGradient.selectAll('stop').remove();

        const numStops = 10;
        for (let i = 0; i <= numStops; i++) {
            const t = i / numStops;
            const value = minFines + (maxFines - minFines) * t;
            linearGradient.append('stop')
                .attr('offset', `${t * 100}%`)
                .attr('stop-color', colorScale(value));
        }

        legend.append('rect')
            .attr('width', legendWidth)
            .attr('height', legendHeight)
            .style('fill', 'url(#heatmap-gradient-vertical)')
            .attr('stroke', '#2d2d2d')
            .attr('stroke-width', 1);

        // Legend scale (vertical)
        const legendScale = d3.scaleLinear()
            .domain([minFines, maxFines])
            .range([legendHeight, 0]);

        const legendAxis = d3.axisRight(legendScale)
            .ticks(isMobile ? 3 : 5)
            .tickFormat(d => d3.format('.2s')(d))
            .tickSize(3);

        legend.append('g')
            .attr('transform', `translate(${legendWidth}, 0)`)
            .call(legendAxis)
            .style('font-size', isMobile ? '8px' : '10px');
    }

    /**
     * Create tooltip
     */
    function createTooltip() {
        let tooltip = d3.select('body').select('.tooltip');
        if (tooltip.empty()) {
            tooltip = d3.select('body')
                .append('div')
                .attr('class', 'tooltip')
                .style('opacity', 0);
        }
        return tooltip;
    }

    /**
     * Show tooltip
     */


    /**
     * Update data table
     */
    function updateDataTable(data) {
        const tbody = d3.select('#table-q3-body');
        tbody.selectAll('tr').remove();

        tbody.selectAll('tr')
            .data(data)
            .enter()
            .append('tr')
            .html(d => `
                <td>${d.ageGroup}</td>
                <td>${d.offenceType}</td>
                <td>${d3.format(',')(d.fines)}</td>
            `);
    }

    /**
     * Handle resize
     */
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (dataStore.loaded && dataStore.q3) {
                const filteredData = getFilteredQ3Data();
                window.renderQ3(filteredData);
            }
        }, 250);
    });

})();