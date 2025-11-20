/* Q4: Fatalities trend (2020–2024) */

(function() {
    'use strict';

    let width, height;

    /**
     * Render Q4 chart
     */
    window.renderQ4 = function(data) {
        if (!data || data.length === 0) {
            d3.select('#chart-q4').html('<div class="empty-state"><p>No data available</p></div>');
            return;
        }

        // Clear previous chart
        d3.select('#svg-q4').selectAll('*').remove();

        // Sort data by year
        data = data.sort((a, b) => a.year - b.year);

        renderLineChart(data);
        updateDataTable(data);
    };

    /**
     * Render line chart
     */
    function renderLineChart(data) {
        const container = document.getElementById('chart-q4');
        width = container.clientWidth;
        height = 400;

        const margin = { top: 20, right: 30, bottom: 60, left: 70 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const svg = d3.select('#svg-q4')
            .attr('width', width)
            .attr('height', height);

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        // Scales
        const xScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.year))
            .range([0, innerWidth]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.total) * 1.1])
            .nice()
            .range([innerHeight, 0]);

        // Line generator
        const line = d3.line()
            .x(d => xScale(d.year))
            .y(d => yScale(d.total))
            .curve(d3.curveMonotoneX);

        // Create tooltip
        const tooltip = createTooltip();

        // Draw line
        const path = g.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', '#26658c')
            .attr('stroke-width', 3)
            .attr('d', line);

        // Animate line
        const totalLength = path.node().getTotalLength();
        const pathDuration = 1000; // Define pathDuration
        path
            .attr('stroke-dasharray', totalLength + ' ' + totalLength)
            .attr('stroke-dashoffset', totalLength)
            .transition()
            .duration(pathDuration) // Use the variable here
            .ease(d3.easeLinear)
            .attr('stroke-dashoffset', 0);

        // Draw area under line (optional)
        const area = d3.area()
            .x(d => xScale(d.year))
            .y0(innerHeight)
            .y1(d => yScale(d.total))
            .curve(d3.curveMonotoneX);

        g.append('path')
            .datum(data)
            .attr('fill', '#26658c')
            .attr('fill-opacity', 0.1)
            .attr('d', area);

        // Draw points
        g.selectAll('.data-point')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'data-point')
            .attr('cx', d => xScale(d.year))
            .attr('cy', innerHeight)
            .attr('r', 5)
            .attr('fill', '#d32f2f')
            .attr('stroke', '#ffffff')
            .attr('stroke-width', 2)
            .style('cursor', 'pointer')
            .on('mouseenter', function(event, d) {
                d3.select(this).attr('r', 8);

                const content = `
            <strong>Year ${d.year}</strong>
            <div class="tooltip-row">
                <span class="tooltip-label">Total fatalities:</span>
                <span class="tooltip-value">${d3.format(',')(d.total)}</span>
            </div>
        `;
                showTooltip(event, content, tooltip);
            })
            .on('mousemove', (event) => {
                moveTooltip(event, tooltip);
            })
            .on('mouseleave', function() {
                d3.select(this).attr('r', 5);
                hideTooltip(tooltip);
            })
            .call(attachScrollFriendlyTouch, {
                tooltip: tooltip,
                getContent: (d) => `
            <strong>Year ${d.year}</strong>
            <div class="tooltip-row">
                <span class="tooltip-label">Total fatalities:</span>
                <span class="tooltip-value">${d3.format(',')(d.total)}</span>
            </div>
        `,
                onHoverStart: (element) => {
                    element.attr('r', 8);
                },
                onHoverEnd: (element) => {
                    element.attr('r', 5);
                }
            })
            .transition()
            .duration(800)
            .delay((d, i) => pathDuration + (i * 100)) // Now this works
            .attr('cy', d => yScale(d.total));

        // X axis
        g.append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(d3.axisBottom(xScale).tickFormat(d3.format('d')).ticks(data.length));

        // Y axis
        g.append('g')
            .attr('class', 'axis')
            .call(d3.axisLeft(yScale).ticks(6));

        // Grid lines (horizontal)
        g.append('g')
            .attr('class', 'grid')
            .style('stroke', '#e5e5e5')
            .style('stroke-opacity', 0.5)
            .call(d3.axisLeft(yScale)
                .ticks(6)
                .tickSize(-innerWidth)
                .tickFormat('')
            );

        // Axis labels
        g.append('text')
            .attr('class', 'axis-label')
            .attr('x', innerWidth / 2)
            .attr('y', innerHeight + 45)
            .attr('text-anchor', 'middle')
            .text('Year');

        g.append('text')
            .attr('class', 'axis-label')
            .attr('transform', 'rotate(-90)')
            .attr('x', -innerHeight / 2)
            .attr('y', -50)
            .attr('text-anchor', 'middle')
            .text('Total Fatalities (count)');

        // Add trend annotation
        if (data.length >= 2) {
            const firstYear = data[0];
            const lastYear = data[data.length - 1];
            const change = lastYear.total - firstYear.total;
            const percentChange = (change / firstYear.total) * 100;

            const annotation = g.append('g')
                .attr('class', 'annotation')
                .attr('transform', `translate(${innerWidth - 150}, 30)`);

            annotation.append('rect')
                .attr('width', 140)
                .attr('height', 50)
                .attr('fill', '#f5f5f5')
                .attr('rx', 6)
                .attr('stroke', '#d4d4d4')
                .attr('stroke-width', 1);

            annotation.append('text')
                .attr('x', 70)
                .attr('y', 20)
                .attr('text-anchor', 'middle')
                .style('font-size', '11px')
                .style('font-weight', '600')
                .style('fill', '#2d2d2d')
                .text(`${firstYear.year} to ${lastYear.year}`);

            annotation.append('text')
                .attr('x', 70)
                .attr('y', 38)
                .attr('text-anchor', 'middle')
                .style('font-size', '13px')
                .style('font-weight', '700')
                .style('fill', change > 0 ? '#d32f2f' : '#388e3c')
                .text(`${change > 0 ? '+' : ''}${change} (${percentChange > 0 ? '+' : ''}${percentChange.toFixed(1)}%)`);
        }
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
        const tbody = d3.select('#table-q4-body');
        tbody.selectAll('tr').remove();

        tbody.selectAll('tr')
            .data(data)
            .enter()
            .append('tr')
            .html(d => `
                <td>${d.year}</td>
                <td>${d3.format(',')(d.total)}</td>
            `);
    }

    /**
     * Handle resize
     */
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (dataStore.loaded && dataStore.q4) {
                const filteredData = getFilteredQ4Data();
                window.renderQ4(filteredData);
            }
        }, 250);
    });

})();