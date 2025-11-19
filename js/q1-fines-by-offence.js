/* Q1: Fines by offence type (donut on desktop, bars on mobile) */

(function() {
    'use strict';

    // Color palette - FIXED to match exactly with data
    const colorScale = d3.scaleOrdinal()
        .domain(['Speed Fines', 'Mobile Phone Use', 'Non Wearing Seatbelts', 'Unlicensed Driving'])
        .range(['#26658c', '#3d8bb5', '#5ba8c9', '#7ec4dc']);

    // Dimensions
    let width, height, radius, isMobile;

    /**
     * Determine if mobile layout
     */
    function checkMobile() {
        return window.innerWidth < 640;
    }

    /**
     * Render Q1 chart
     */
    window.renderQ1 = function(data) {
        if (!data || data.length === 0) {
            d3.select('#chart-q1').html('<div class="empty-state"><p>No data available</p></div>');
            return;
        }

        // Normalize property names
        data = data.map(d => ({
            offenseType: d.offenseType || d.offenceType || d.METRIC || '',
            totalFines: +(d.totalFines || d.Total_Fines || 0),
            percentage: +(d.percentage || d.Percentage || 0)
        }));

        // Sort data by total fines (descending) and add rank
        data = data.sort((a, b) => b.totalFines - a.totalFines);
        data.forEach((d, i) => {
            d.rank = i + 1;
        });

        // Check if mobile
        isMobile = checkMobile();

        // Clear previous chart
        d3.select('#svg-q1').selectAll('*').remove();
        d3.select('#legend-q1').remove();

        // Render appropriate chart
        if (isMobile) {
            renderBarChart(data);
        } else {
            renderDonutChart(data);
        }

        // Update data table for screen readers
        updateDataTable(data);
    };

    /**
     * Render donut chart (desktop/tablet)
     */
    function renderDonutChart(data) {
        const container = document.getElementById('chart-q1');
        width = container.clientWidth;
        height = Math.min(width, 500);
        radius = Math.min(width, height) / 2 - 60;

        const svg = d3.select('#svg-q1')
            .attr('width', width)
            .attr('height', height);

        const g = svg.append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2 + 20})`);

        // Add title at the top
        svg.append('text')
            .attr('class', 'chart-main-title')
            .attr('x', width / 2)
            .attr('y', 25)
            .attr('text-anchor', 'middle')
            .style('font-size', '16px')
            .style('font-weight', '600')
            .style('fill', '#2c3e50')
            .text('Fines Distribution by Offense Type');

        // Create pie generator
        const pie = d3.pie()
            .value(d => d.totalFines)
            .sort(null);

        // Create arc generator
        const arc = d3.arc()
            .innerRadius(radius * 0.6)
            .outerRadius(radius);

        // Create hover arc
        const arcHover = d3.arc()
            .innerRadius(radius * 0.6)
            .outerRadius(radius * 1.05);

        // Create tooltip
        const tooltip = createTooltip();

        // Draw pie slices
        const arcs = g.selectAll('.arc')
            .data(pie(data))
            .enter()
            .append('g')
            .attr('class', 'arc')
            .attr('data-offense', d => d.data.offenseType);

        arcs.append('path')
            .attr('d', arc)
            .attr('fill', d => colorScale(d.data.offenseType))
            .attr('stroke', '#fff')
            .attr('stroke-width', 2)
            .style('cursor', 'pointer')
            .transition()
            .duration(800)
            .attrTween('d', function(d) {
                const interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
                return function(t) {
                    return arc(interpolate(t));
                };
            })
            .on('end', function() {
                // Attach event handlers AFTER animation completes
                d3.select(this)
                    .on('mouseenter', function(event, d) {
                        const offenseType = d.data.offenseType;
                        
                        // Highlight slice
                        d3.select(this)
                            .transition()
                            .duration(200)
                            .attr('d', arcHover);

                        // Highlight corresponding legend item
                        d3.selectAll('#legend-q1 .legend-item')
                            .style('background-color', function() {
                                const itemText = d3.select(this).select('.legend-text').text();
                                return itemText === offenseType ? '#e8f4f8' : 'transparent';
                            })
                            .style('border-color', function() {
                                const itemText = d3.select(this).select('.legend-text').text();
                                return itemText === offenseType ? '#3498db' : 'transparent';
                            });

                        const content = `
            <strong>${offenseType}</strong>
            <div class="tooltip-row">
                <span class="tooltip-label">Total fines:</span>
                <span class="tooltip-value">${d3.format(',')(d.data.totalFines)}</span>
            </div>
            <div class="tooltip-row">
                <span class="tooltip-label">Percentage:</span>
                <span class="tooltip-value">${d.data.percentage.toFixed(1)}%</span>
            </div>
            <div class="tooltip-row">
                <span class="tooltip-label">Rank:</span>
                <span class="tooltip-value">#${d.data.rank}</span>
            </div>
        `;

                        showTooltip(event, content, tooltip);
                    })
                    .on('mousemove', (event) => {
                        moveTooltip(event, tooltip);
                    })
                    .on('mouseleave', function() {
                        d3.select(this)
                            .transition()
                            .duration(200)
                            .attr('d', arc);

                        // Reset legend items
                        d3.selectAll('#legend-q1 .legend-item')
                            .style('background-color', 'transparent')
                            .style('border-color', 'transparent');

                        hideTooltip(tooltip);
                    });
            });

        // Add percentage labels on slices
        arcs.append('text')
            .attr('transform', d => `translate(${arc.centroid(d)})`)
            .attr('text-anchor', 'middle')
            .attr('dy', '0.35em')
            .style('font-size', '13px')
            .style('font-weight', '600')
            .style('fill', '#fff')
            .style('text-shadow', '1px 1px 2px rgba(0,0,0,0.5)')
            .style('pointer-events', 'none')
            .style('opacity', 0)
            .text(d => {
                const percentage = (d.data.totalFines / d3.sum(data, d => d.totalFines) * 100).toFixed(1);
                return percentage > 5 ? `${percentage}%` : '';
            })
            .transition()
            .delay(800)
            .duration(400)
            .style('opacity', 1);

        // Add center text showing total
        const total = d3.sum(data, d => d.totalFines);
        
        g.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '-0.6em')
            .style('font-size', '13px')
            .style('fill', '#7f8c8d')
            .style('font-weight', '500')
            .text('Total Fines');

        g.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '0.8em')
            .style('font-size', '22px')
            .style('fill', '#2c3e50')
            .style('font-weight', '700')
            .transition()
            .duration(800)
            .tween('text', function() {
                const i = d3.interpolate(0, total);
                return function(t) {
                    this.textContent = d3.format(',')(Math.round(i(t)));
                };
            });

        // Add legend BELOW the donut chart
        addLegend(data);
    }

    /**
     * Render bar chart (mobile)
     */
    function renderBarChart(data) {
        const container = document.getElementById('chart-q1');
        width = container.clientWidth;
        height = 400;

        const margin = { top: 20, right: 20, bottom: 80, left: 60 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const svg = d3.select('#svg-q1')
            .attr('width', width)
            .attr('height', height);

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        // Scales
        const xScale = d3.scaleBand()
            .domain(data.map(d => d.offenseType))
            .range([0, innerWidth])
            .padding(0.2);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.totalFines)])
            .nice()
            .range([innerHeight, 0]);

        // Create tooltip
        const tooltip = createTooltip();

        // Draw bars
        g.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => xScale(d.offenseType))
            .attr('width', xScale.bandwidth())
            .attr('y', innerHeight)
            .attr('height', 0)
            .attr('fill', d => colorScale(d.offenseType))
            .attr('rx', 4)
            .style('cursor', 'pointer')
            .on('mouseenter', function(event, d) {
                d3.select(this).attr('opacity', 0.8);
                showTooltip(event, d, tooltip);
            })
            .on('mousemove', (event) => {
                moveTooltip(event, tooltip);
            })
            .on('mouseleave', function() {
                d3.select(this).attr('opacity', 1);
                hideTooltip(tooltip);
            })
            .transition()
            .duration(500)
            .attr('y', d => yScale(d.totalFines))
            .attr('height', d => innerHeight - yScale(d.totalFines));

        // X axis
        g.append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(d3.axisBottom(xScale))
            .selectAll('text')
            .attr('transform', 'rotate(-45)')
            .style('text-anchor', 'end')
            .style('font-size', '10px');

        // Y axis
        g.append('g')
            .attr('class', 'axis')
            .call(d3.axisLeft(yScale).ticks(5).tickFormat(d => d3.format('.2s')(d)));

        // Y axis label
        g.append('text')
            .attr('class', 'axis-label')
            .attr('transform', 'rotate(-90)')
            .attr('x', -innerHeight / 2)
            .attr('y', -45)
            .attr('text-anchor', 'middle')
            .text('Total Fines');

        // Add legend
        addLegend(data);
    }

    /**
     * Add legend with matching colors and interactive highlighting
     */
    function addLegend(data) {
        // Remove any existing legend
        d3.select('#legend-q1').remove();
        
        // Create legend container below the chart
        const legendContainer = d3.select('#chart-q1')
            .append('div')
            .attr('id', 'legend-q1')
            .style('display', 'flex')
            .style('flex-wrap', 'wrap')
            .style('justify-content', 'center')
            .style('align-items', 'center')
            .style('gap', '1rem')
            .style('margin-top', '1.5rem')
            .style('padding', '1rem 0.5rem')
            .style('width', '100%');

        data.forEach(d => {
            const legendItem = legendContainer.append('div')
                .attr('class', 'legend-item')
                .attr('data-offense', d.offenseType)
                .style('display', 'inline-flex')
                .style('align-items', 'center')
                .style('gap', '0.5rem')
                .style('padding', '0.5rem 0.75rem')
                .style('border-radius', '4px')
                .style('cursor', 'pointer')
                .style('transition', 'all 0.2s')
                .style('border', '1px solid transparent')
                .style('background-color', 'transparent');

            // Color box - MATCHES slice color exactly
            legendItem.append('div')
                .attr('class', 'legend-rect')
                .style('width', '16px')
                .style('height', '16px')
                .style('min-width', '16px')
                .style('min-height', '16px')
                .style('background-color', colorScale(d.offenseType))
                .style('border-radius', '3px')
                .style('border', `2px solid ${colorScale(d.offenseType)}`)
                .style('flex-shrink', '0')
                .style('display', 'block')
                .style('box-shadow', '0 1px 3px rgba(0,0,0,0.2)');

            // Label text
            legendItem.append('span')
                .attr('class', 'legend-text')
                .style('font-size', '12px')
                .style('color', '#2c3e50')
                .style('font-weight', '600')
                .style('white-space', 'nowrap')
                .style('line-height', '1.4')
                .style('display', 'inline-block')
                .style('font-family', 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif')
                .text(d.offenseType);

            // Interactive hover - highlights both legend and slice
            legendItem
                .on('mouseover', function() {
                    const offenseType = d.offenseType;
                    
                    // Highlight legend item
                    d3.select(this)
                        .style('background-color', '#e8f4f8')
                        .style('border-color', '#3498db')
                        .style('transform', 'translateY(-2px)')
                        .style('box-shadow', '0 2px 6px rgba(0,0,0,0.15)');

                    // Highlight corresponding slice
                    if (!isMobile) {
                        d3.selectAll('.arc')
                            .filter(d => d.data.offenseType === offenseType)
                            .select('path')
                            .transition()
                            .duration(200)
                            .attr('opacity', 0.8)
                            .attr('stroke-width', 3);
                    }
                })
                .on('mouseout', function() {
                    const offenseType = d.offenseType;
                    
                    // Reset legend item
                    d3.select(this)
                        .style('background-color', 'transparent')
                        .style('border-color', 'transparent')
                        .style('transform', 'translateY(0)')
                        .style('box-shadow', 'none');

                    // Reset slice
                    if (!isMobile) {
                        d3.selectAll('.arc')
                            .filter(d => d.data.offenseType === offenseType)
                            .select('path')
                            .transition()
                            .duration(200)
                            .attr('opacity', 1)
                            .attr('stroke-width', 2);
                    }
                });
        });
    }

    /**
     * Create tooltip element
     */
    function createTooltip() {
        let tooltip = d3.select('body').select('.tooltip');
        if (tooltip.empty()) {
            tooltip = d3.select('body')
                .append('div')
                .attr('class', 'tooltip')
                .style('opacity', 0)
        }
        return tooltip;
    }


    /**
     * Update data table for screen readers
     */
    function updateDataTable(data) {
        const tbody = d3.select('#table-q1-body');
        if (tbody.empty()) return;
        
        tbody.selectAll('tr').remove();

        tbody.selectAll('tr')
            .data(data)
            .enter()
            .append('tr')
            .html(d => `
                <td>${d.offenseType}</td>
                <td>${d3.format(',')(d.totalFines)}</td>
                <td>${d.percentage.toFixed(2)}%</td>
            `);
    }

    /**
     * Handle window resize
     */
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newIsMobile = checkMobile();
            if (newIsMobile !== isMobile && window.dataStore && window.dataStore.loaded) {
                const data = window.getFilteredQ1Data ? window.getFilteredQ1Data() : window.dataStore.q1Overall;
                if (data) window.renderQ1(data);
            }
        }, 250);
    });

})();