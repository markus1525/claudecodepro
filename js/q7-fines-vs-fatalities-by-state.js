/* Q7: Fines vs fatalities by state (bars + line) */

(function() {
    'use strict';

    let width, height, isMobile;

    /**
     * Check if mobile
     */
    function checkMobile() {
        return window.innerWidth < 640;
    }

    /**
     * Render Q7 chart
     */
    window.renderQ7 = function(data) {
        if (!data || data.length === 0) {
            d3.select('#chart-q7').html('<div class="empty-state"><p>No data available</p></div>');
            return;
        }

        isMobile = checkMobile();

        // Clear previous chart
        d3.select('#svg-q7').selectAll('*').remove();

        // Sort by state name
        data = data.sort((a, b) => a.state.localeCompare(b.state));

        if (isMobile) {
            renderMobileView(data);
        } else {
            renderDualAxisChart(data);
        }

        updateDataTable(data);
    };

    /**
     * Render dual-axis chart (desktop)
     */
    function renderDualAxisChart(data) {
        const container = document.getElementById('chart-q7');
        width = container.clientWidth;
        height = 450;

        const margin = { top: 30, right: 80, bottom: 60, left: 80 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const svg = d3.select('#svg-q7')
            .attr('width', width)
            .attr('height', height);

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        // Scales
        const xScale = d3.scaleBand()
            .domain(data.map(d => d.state))
            .range([0, innerWidth])
            .padding(0.3);

        const yScaleFines = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.totalFines)])
            .nice()
            .range([innerHeight, 0]);

        const yScaleFatalities = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.totalFatalities)])
            .nice()
            .range([innerHeight, 0]);

        // Create tooltip
        const tooltip = createTooltip();

        // Draw bars for fines
        g.selectAll('.bar-fines')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar-fines')
            .attr('x', d => xScale(d.state))
            .attr('width', xScale.bandwidth())
            .attr('y', innerHeight)
            .attr('height', 0)
            .attr('fill', '#26658c')
            .attr('fill-opacity', 0.7)
            .attr('rx', 4)
            .style('cursor', 'pointer')
            .on('mouseenter', function(event, d) {
                d3.select(this).attr('fill-opacity', 1);

                const content = `
            <strong>${d.state}</strong>
            <div class="tooltip-row">
                <span class="tooltip-label">Total fines:</span>
                <span class="tooltip-value">${d3.format(',')(d.totalFines)}</span>
            </div>
            <div class="tooltip-row">
                <span class="tooltip-label">Fines per fatality:</span>
                <span class="tooltip-value">${d3.format(',')(d.finesPerFatality.toFixed(0))}</span>
            </div>
        `;
                showTooltip(event, content, tooltip);
            })
            .on('mousemove', (event) => {
                moveTooltip(event, tooltip);
            })
            .on('mouseleave', function() {
                d3.select(this).attr('fill-opacity', 0.7);
                hideTooltip(tooltip);
            })
            .on('click', function(event, d) {
                filterState.states = [d.state];
                updateAllCharts();
            })
            .transition()
            .duration(500)
            .delay((d, i) => i * 50)
            .attr('y', d => yScaleFines(d.totalFines))
            .attr('height', d => innerHeight - yScaleFines(d.totalFines));

        // Draw line for fatalities
        const line = d3.line()
            .x(d => xScale(d.state) + xScale.bandwidth() / 2)
            .y(d => yScaleFatalities(d.totalFatalities))
            .curve(d3.curveMonotoneX);

        const path = g.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', '#d32f2f')
            .attr('stroke-width', 3)
            .attr('d', line);

        // Animate line
        const totalLength = path.node().getTotalLength();
        path
            .attr('stroke-dasharray', totalLength + ' ' + totalLength)
            .attr('stroke-dashoffset', totalLength)
            .transition()
            .duration(1000)
            .delay(500)
            .ease(d3.easeLinear)
            .attr('stroke-dashoffset', 0);

        // Draw points on line
        g.selectAll('.point-fatalities')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'point-fatalities')
            .attr('cx', d => xScale(d.state) + xScale.bandwidth() / 2)
            .attr('cy', d => yScaleFatalities(d.totalFatalities))
            .attr('r', 0)
            .attr('fill', '#d32f2f')
            .attr('stroke', '#ffffff')
            .attr('stroke-width', 2)
            .style('cursor', 'pointer')
            .on('mouseenter', function(event, d) {
                d3.select(this).attr('r', 8);

                const content = `
            <strong>${d.state}</strong>
            <div class="tooltip-row">
                <span class="tooltip-label">Total fatalities:</span>
                <span class="tooltip-value">${d3.format(',')(d.totalFatalities)}</span>
            </div>
            <div class="tooltip-row">
                <span class="tooltip-label">Total fines:</span>
                <span class="tooltip-value">${d3.format(',')(d.totalFines)}</span>
            </div>
        `;
                showTooltip(event, content, tooltip);
            })
            .on('mousemove', (event) => {
                moveTooltip(event, tooltip);
            })
            .on('mouseleave', function() {
                d3.select(this).attr('r', 6);
                hideTooltip(tooltip);
            })
            .transition()
            .duration(300)
            .delay((d, i) => 1000 + i * 50)
            .attr('r', 6);

        // X axis
        g.append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(d3.axisBottom(xScale))
            .selectAll('text')
            .style('font-size', '12px');

        // Left Y axis (Fines)
        g.append('g')
            .attr('class', 'axis')
            .call(d3.axisLeft(yScaleFines).ticks(6).tickFormat(d => d3.format('.2s')(d)))
            .selectAll('text')
            .style('fill', '#26658c');

        // Right Y axis (Fatalities)
        g.append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(${innerWidth}, 0)`)
            .call(d3.axisRight(yScaleFatalities).ticks(6))
            .selectAll('text')
            .style('fill', '#d32f2f');

        // Axis labels
        g.append('text')
            .attr('class', 'axis-label')
            .attr('transform', 'rotate(-90)')
            .attr('x', -innerHeight / 2)
            .attr('y', -60)
            .attr('text-anchor', 'middle')
            .style('fill', '#26658c')
            .style('font-weight', '600')
            .text('Total Fines');

        g.append('text')
            .attr('class', 'axis-label')
            .attr('transform', 'rotate(-90)')
            .attr('x', -innerHeight / 2)
            .attr('y', innerWidth + 75)
            .attr('text-anchor', 'middle')
            .style('fill', '#d32f2f')
            .style('font-weight', '600')
            .text('Total Fatalities');

        // Add legend
        addLegend(svg, margin, width);
    }

    /**
     * Render mobile view (simplified scatter plot)
     */
    function renderMobileView(data) {
        const container = document.getElementById('chart-q7');
        width = container.clientWidth;
        height = 400;

        const margin = { top: 20, right: 20, bottom: 80, left: 60 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const svg = d3.select('#svg-q7')
            .attr('width', width)
            .attr('height', height);

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        // Scales for scatter
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.totalFines)])
            .nice()
            .range([0, innerWidth]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.totalFatalities)])
            .nice()
            .range([innerHeight, 0]);

        const tooltip = createTooltip();

        // Draw points
        g.selectAll('.scatter-point')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'scatter-point')
            .attr('cx', innerWidth / 2)
            .attr('cy', innerHeight / 2)
            .attr('r', 0)
            .attr('fill', '#26658c')
            .attr('fill-opacity', 0.7)
            .attr('stroke', '#1d4f6d')
            .attr('stroke-width', 2)
            .style('cursor', 'pointer')
            .on('mouseenter', function(event, d) {
                d3.select(this)
                    .attr('fill-opacity', 1)
                    .attr('r', 10);

                const content = `
            <strong>${d.state}</strong>
            <div class="tooltip-row">
                <span class="tooltip-label">Total fines:</span>
                <span class="tooltip-value">${d3.format(',')(d.totalFines)}</span>
            </div>
            <div class="tooltip-row">
                <span class="tooltip-label">Total fatalities:</span>
                <span class="tooltip-value">${d3.format(',')(d.totalFatalities)}</span>
            </div>
            <div class="tooltip-row">
                <span class="tooltip-label">Ratio:</span>
                <span class="tooltip-value">${d3.format(',')(d.finesPerFatality.toFixed(0))} fines/fatality</span>
            </div>
        `;
                showTooltip(event, content, tooltip);
            })
            .on('mousemove', (event) => {
                moveTooltip(event, tooltip);
            })
            .on('mouseleave', function() {
                d3.select(this)
                    .attr('fill-opacity', 0.7)
                    .attr('r', 8);
                hideTooltip(tooltip);
            })
            .transition()
            .duration(500)
            .delay((d, i) => i * 50)
            .attr('cx', d => xScale(d.totalFines))
            .attr('cy', d => yScale(d.totalFatalities))
            .attr('r', 8);

        // Add state labels
        g.selectAll('.state-label')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'state-label')
            .attr('x', d => xScale(d.totalFines))
            .attr('y', d => yScale(d.totalFatalities) - 12)
            .attr('text-anchor', 'middle')
            .style('font-size', '9px')
            .style('font-weight', '600')
            .style('fill', '#2d2d2d')
            .style('pointer-events', 'none')
            .text(d => d.state)
            .style('opacity', 0)
            .transition()
            .duration(500)
            .delay((d, i) => i * 50 + 500)
            .style('opacity', 1);

        // X axis
        g.append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(d3.axisBottom(xScale).ticks(5).tickFormat(d => d3.format('.1s')(d)));

        // Y axis
        g.append('g')
            .attr('class', 'axis')
            .call(d3.axisLeft(yScale).ticks(5));

        // Axis labels
        g.append('text')
            .attr('class', 'axis-label')
            .attr('x', innerWidth / 2)
            .attr('y', innerHeight + 50)
            .attr('text-anchor', 'middle')
            .text('Total Fines');

        g.append('text')
            .attr('class', 'axis-label')
            .attr('transform', 'rotate(-90)')
            .attr('x', -innerHeight / 2)
            .attr('y', -45)
            .attr('text-anchor', 'middle')
            .text('Total Fatalities');
    }

    /**
     * Add legend
     */
    function addLegend(svg, margin, width) {
        const legend = svg.append('g')
            .attr('class', 'legend')
            .attr('transform', `translate(${margin.left}, 10)`);

        const legendData = [
            { label: 'Total Fines (bars)', color: '#26658c' },
            { label: 'Total Fatalities (line)', color: '#d32f2f' }
        ];

        const legendItems = legend.selectAll('.legend-item')
            .data(legendData)
            .enter()
            .append('g')
            .attr('class', 'legend-item')
            .attr('transform', (d, i) => `translate(${i * 200}, 0)`);

        legendItems.append('rect')
            .attr('width', 16)
            .attr('height', 16)
            .attr('fill', d => d.color)
            .attr('rx', 3);

        legendItems.append('text')
            .attr('x', 22)
            .attr('y', 13)
            .style('font-size', '12px')
            .style('font-weight', '600')
            .style('fill', '#2d2d2d')
            .text(d => d.label);
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
        const tbody = d3.select('#table-q7-body');
        tbody.selectAll('tr').remove();

        tbody.selectAll('tr')
            .data(data)
            .enter()
            .append('tr')
            .html(d => `
                <td>${d.state}</td>
                <td>${d3.format(',')(d.totalFines)}</td>
                <td>${d3.format(',')(d.totalFatalities)}</td>
                <td>${d3.format(',.0f')(d.finesPerFatality)}</td>
            `);
    }

    /**
     * Handle resize
     */
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newIsMobile = checkMobile();
            if (newIsMobile !== isMobile && dataStore.loaded && dataStore.q7) {
                const filteredData = getFilteredQ7Data();
                window.renderQ7(filteredData);
            }
        }, 250);
    });

})();