/* Q4: Fatalities trend (2020–2024) */

(function() {
    'use strict';

    let width, height, isMobile;

    /**
     * Check if mobile
     */
    function checkMobile() {
        return window.innerWidth <= 640;
    }

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

        // Responsive height and margins
        isMobile = checkMobile();
        height = isMobile ? 350 : 400;

        const margin = isMobile
            ? { top: 20, right: 20, bottom: 70, left: 50 }
            : { top: 20, right: 30, bottom: 60, left: 70 };

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
        path
            .attr('stroke-dasharray', totalLength + ' ' + totalLength)
            .attr('stroke-dashoffset', totalLength)
            .transition()
            .duration(1000)
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
        const points = g.selectAll('.data-point')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'data-point')
            .attr('cx', d => xScale(d.year))
            .attr('cy', d => yScale(d.total))
            .attr('r', 0)
            .attr('fill', '#26658c')
            .attr('stroke', '#ffffff')
            .attr('stroke-width', 2)
            .style('cursor', 'pointer');

        // Mouse events
        points.on('mouseenter', function(event, d) {
                d3.select(this)
                    .attr('r', 8)
                    .attr('fill', '#3078a3');

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
                d3.select(this)
                    .attr('r', isMobile ? 7 : 6)
                    .attr('fill', '#26658c');

                hideTooltip(tooltip);
            });

        // Touch events for mobile
        points.on('touchstart', function(event, d) {
                event.preventDefault();
                d3.select(this)
                    .attr('r', 8)
                    .attr('fill', '#3078a3');

                const content = `
            <strong>Year ${d.year}</strong>
            <div class="tooltip-row">
                <span class="tooltip-label">Total fatalities:</span>
                <span class="tooltip-value">${d3.format(',')(d.total)}</span>
            </div>
        `;
                const touch = event.touches[0];
                showTooltip(touch, content, tooltip);
            })
            .on('touchend', function() {
                d3.select(this)
                    .attr('r', isMobile ? 7 : 6)
                    .attr('fill', '#26658c');

                setTimeout(() => hideTooltip(tooltip), 1500);
            });

        points.transition()
            .duration(500)
            .delay((d, i) => i * 100 + 1000)
            .attr('r', isMobile ? 7 : 6);

        // X axis
        const xAxis = g.append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(d3.axisBottom(xScale).tickFormat(d3.format('d')).ticks(data.length));

        xAxis.selectAll('text')
            .style('font-size', isMobile ? '10px' : '12px');

        // Y axis
        const yAxis = g.append('g')
            .attr('class', 'axis')
            .call(d3.axisLeft(yScale).ticks(isMobile ? 5 : 6));

        yAxis.selectAll('text')
            .style('font-size', isMobile ? '10px' : '12px');

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

        // Axis labels (hide on very small screens)
        if (!isMobile) {
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
        }

        // Add trend annotation - responsive positioning
        if (data.length >= 2) {
            const firstYear = data[0];
            const lastYear = data[data.length - 1];
            const change = lastYear.total - firstYear.total;
            const percentChange = (change / firstYear.total) * 100;

            const annotationWidth = isMobile ? 100 : 140;
            const annotationHeight = isMobile ? 45 : 50;
            const annotationX = isMobile
                ? Math.max(10, innerWidth - annotationWidth - 10)
                : innerWidth - 150;

            const annotation = g.append('g')
                .attr('class', 'annotation')
                .attr('transform', `translate(${annotationX}, ${isMobile ? 10 : 30})`);

            annotation.append('rect')
                .attr('width', annotationWidth)
                .attr('height', annotationHeight)
                .attr('fill', '#f5f5f5')
                .attr('rx', 4)
                .attr('stroke', '#d4d4d4')
                .attr('stroke-width', 1);

            annotation.append('text')
                .attr('x', annotationWidth / 2)
                .attr('y', isMobile ? 15 : 20)
                .attr('text-anchor', 'middle')
                .style('font-size', isMobile ? '9px' : '11px')
                .style('font-weight', '600')
                .style('fill', '#2d2d2d')
                .text(`${firstYear.year} to ${lastYear.year}`);

            annotation.append('text')
                .attr('x', annotationWidth / 2)
                .attr('y', isMobile ? 32 : 38)
                .attr('text-anchor', 'middle')
                .style('font-size', isMobile ? '11px' : '13px')
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
            const newIsMobile = checkMobile();
            // Re-render if mobile state changed or if already rendered
            if ((newIsMobile !== isMobile || dataStore.loaded) && dataStore.q4) {
                const filteredData = getFilteredQ4Data();
                window.renderQ4(filteredData);
            }
        }, 250);
    });

})();