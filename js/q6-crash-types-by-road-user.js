/* Q6: Crash types by road user (stacked bars) */

(function() {
    'use strict';

    // Color scale for road users (WCAG compliant, colorblind-friendly)
    const colorScale = d3.scaleOrdinal()
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
        ]);

    let width, height;
    let hiddenCategories = new Set();
    let activeCategories = new Set();

    /**
     * Render Q6 chart
     */
    window.renderQ6 = function(data) {
        if (!data || data.length === 0) {
            d3.select('#chart-q6').html('<div class="empty-state"><p>No data available</p></div>');
            return;
        }

        // Clear previous chart and legend
        d3.select('#svg-q6').selectAll('*').remove();
        d3.select('#legend-q6').remove();

        renderStackedBar(data);
        updateDataTable(data);
    };

    /**
     * Render stacked bar chart
     */
    function renderStackedBar(data) {
        const container = document.getElementById('chart-q6');
        width = container.clientWidth;
        
        // Responsive height
        const isMobile = window.innerWidth <= 768;
        height = isMobile ? 350 : 450;

        const margin = isMobile 
            ? { top: 20, right: 15, bottom: 80, left: 50 }
            : { top: 20, right: 20, bottom: 60, left: 80 };
        
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const svg = d3.select('#svg-q6')
            .attr('width', width)
            .attr('height', height);

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        // Road user categories
        const roadUsers = [
            'Driver',
            'Passenger',
            'Pedestrian',
            'Motorcycle rider',
            'Motorcycle pillion passenger',
            'Pedal cyclist',
            'Unknown'
        ];

        // Initialize active categories
        activeCategories = new Set(roadUsers);

        // Stack data
        const stack = d3.stack()
            .keys(roadUsers.filter(ru => !hiddenCategories.has(ru)))
            .order(d3.stackOrderNone)
            .offset(d3.stackOffsetNone);

        const series = stack(data);

        // Scales
        const xScale = d3.scaleBand()
            .domain(data.map(d => d.crashType))
            .range([0, innerWidth])
            .padding(isMobile ? 0.2 : 0.3);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(series, s => d3.max(s, d => d[1]))])
            .nice()
            .range([innerHeight, 0]);

        // Create tooltip
        const tooltip = createTooltip();

        // Draw stacked bars
        const groups = g.selectAll('.series')
            .data(series)
            .enter()
            .append('g')
            .attr('class', 'series')
            .attr('data-key', d => d.key)
            .attr('fill', d => colorScale(d.key));

        groups.selectAll('rect')
            .data(d => d)
            .enter()
            .append('rect')
            .attr('class', 'bar-segment')
            .attr('data-category', function() {
                return d3.select(this.parentNode).datum().key;
            })
            .attr('x', d => xScale(d.data.crashType))
            .attr('y', innerHeight)
            .attr('height', 0)
            .attr('width', xScale.bandwidth())
            .attr('rx', 2)
            .style('cursor', 'pointer')
            .on('mouseenter', function(event, d) {
                const roadUser = d3.select(this.parentNode).datum().key;
                const value = d.data[roadUser];

                d3.select(this).attr('opacity', 0.8);

                const content = `
            <strong>${d.data.crashType}</strong>
            <div class="tooltip-row">
                <span class="tooltip-label">Road user:</span>
                <span class="tooltip-value">${roadUser}</span>
            </div>
            <div class="tooltip-row">
                <span class="tooltip-label">Fatalities:</span>
                <span class="tooltip-value">${d3.format(',')(value)}</span>
            </div>
        `;
                showTooltip(event, content, tooltip);
            })
            .on('mousemove', (event) => {
                moveTooltip(event, tooltip);
            })
            .on('mouseleave', function() {
                d3.select(this).attr('opacity', 1);
                hideTooltip(tooltip);
            })
            .call(attachScrollFriendlyTouch, {
                tooltip: tooltip,
                getContent: function(d) {
                    const roadUser = d3.select(this.parentNode).datum().key;
                    const value = d.data[roadUser];
                    
                    return `
                        <strong>${d.data.crashType}</strong>
                        <div class="tooltip-row">
                            <span class="tooltip-label">Road user:</span>
                            <span class="tooltip-value">${roadUser}</span>
                        </div>
                        <div class="tooltip-row">
                            <span class="tooltip-label">Fatalities:</span>
                            <span class="tooltip-value">${d3.format(',')(value)}</span>
                        </div>
                    `;
                },
                onHoverStart: (element) => {
                    element.attr('opacity', 0.8);
                },
                onHoverEnd: (element) => {
                    element.attr('opacity', 1);
                }
            })
            .transition()
            .duration(500)
            .delay((d, i) => i * 100)
            .attr('y', d => yScale(d[1]))
            .attr('height', d => yScale(d[0]) - yScale(d[1]));

        // X axis
        const xAxis = g.append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(d3.axisBottom(xScale));

        if (isMobile) {
            xAxis.selectAll('text')
                .style('font-size', '10px')
                .attr('transform', 'rotate(-45)')
                .style('text-anchor', 'end')
                .attr('dx', '-0.8em')
                .attr('dy', '0.15em');
        } else {
            xAxis.selectAll('text')
                .style('font-size', '12px');
        }

        // Y axis
        g.append('g')
            .attr('class', 'axis')
            .call(d3.axisLeft(yScale).ticks(isMobile ? 5 : 6))
            .selectAll('text')
            .style('font-size', isMobile ? '10px' : '12px');

        // Grid lines
        g.append('g')
            .attr('class', 'grid')
            .style('stroke', '#e5e5e5')
            .style('stroke-opacity', 0.5)
            .call(d3.axisLeft(yScale)
                .ticks(isMobile ? 5 : 6)
                .tickSize(-innerWidth)
                .tickFormat('')
            );

        // Axis labels
        if (!isMobile) {
            g.append('text')
                .attr('class', 'axis-label')
                .attr('x', innerWidth / 2)
                .attr('y', innerHeight + 45)
                .attr('text-anchor', 'middle')
                .style('font-size', '12px')
                .text('Crash Type');

            g.append('text')
                .attr('class', 'axis-label')
                .attr('transform', 'rotate(-90)')
                .attr('x', -innerHeight / 2)
                .attr('y', -60)
                .attr('text-anchor', 'middle')
                .style('font-size', '12px')
                .text('Total Fatalities');
        }

        // Add legend
        createLegend(roadUsers, data);
    }

    /**
     * Create legend - NON-INTERACTIVE
     */
    function createLegend(categories, data) {
        d3.select('#legend-q6').remove();
        
        const isMobile = window.innerWidth <= 480;
        
        const legendContainer = d3.select('#chart-q6')
            .append('div')
            .attr('id', 'legend-q6')
            .style('display', 'flex')
            .style('flex-wrap', 'wrap')
            .style('justify-content', 'center')
            .style('gap', isMobile ? '0.4rem' : '1rem')
            .style('padding', isMobile ? '0.75rem 0' : '1rem 0');

        categories.forEach(category => {
            const legendItem = legendContainer.append('div')
                .attr('class', 'legend-item')
                .attr('data-category', category)
                .style('display', 'inline-flex')
                .style('align-items', 'center')
                .style('gap', '0.5rem')
                .style('cursor', 'default')
                .style('padding', isMobile ? '0.3rem 0.5rem' : '0.4rem 0.6rem')
                .style('border-radius', '4px')
                .style('transition', 'none')
                .style('opacity', '1')
                .style('border', '1px solid transparent');

            legendItem.append('div')
                .attr('class', 'legend-rect')
                .style('width', isMobile ? '12px' : '14px')
                .style('height', isMobile ? '12px' : '14px')
                .style('background-color', colorScale(category))
                .style('border-radius', '2px')
                .style('border', '1px solid rgba(0,0,0,0.1)')
                .style('flex-shrink', '0');

            legendItem.append('span')
                .attr('class', 'legend-text')
                .style('font-size', isMobile ? '10px' : '11px')
                .style('color', '#2c3e50')
                .style('font-weight', '500')
                .style('white-space', 'nowrap')
                .text(category);
        });
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
        const tbody = d3.select('#table-q6-body');
        tbody.selectAll('tr').remove();

        const roadUsers = [
            'Driver', 'Passenger', 'Pedestrian', 'Motorcycle rider',
            'Motorcycle pillion passenger', 'Pedal cyclist', 'Unknown'
        ];

        data.forEach(crashData => {
            roadUsers.forEach(user => {
                const value = crashData[user] || 0;
                if (value > 0) {
                    tbody.append('tr').html(`
                        <td>${crashData.crashType}</td>
                        <td>${user}</td>
                        <td>${d3.format(',')(value)}</td>
                    `);
                }
            });
        });
    }

    /**
     * Handle resize
     */
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (dataStore.loaded && dataStore.q6) {
                const filteredData = getFilteredQ6Data();
                window.renderQ6(filteredData);
            }
        }, 250);
    });

})();