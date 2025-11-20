/* Q5: Fatality rate by state (choropleth) */

(function() {
    'use strict';

    const STATE_CODE_MAP = {
        '1': 'NSW',
        '2': 'VIC',
        '3': 'QLD',
        '4': 'SA',
        '5': 'WA',
        '6': 'TAS',
        '7': 'NT',
        '8': 'ACT'
    };

    const STATE_NAME = {
        'ACT': 'Australian Capital Territory',
        'NSW': 'New South Wales',
        'NT': 'Northern Territory',
        'QLD': 'Queensland',
        'SA': 'South Australia',
        'TAS': 'Tasmania',
        'VIC': 'Victoria',
        'WA': 'Western Australia'
    };

    let width, height, isMobile;
    let projection, path;

    function checkMobile() {
        return window.innerWidth < 640;
    }

    function prepareQ5Data(raw) {
        if (!Array.isArray(raw)) return [];

        const data = raw.map(d => ({
            code: d.STATE || d.state,
            state: d.STATE || d.state,
            stateName: d.State_Name || d.stateName || STATE_NAME[d.state] || d.state,
            totalFatalities: d.Total_Fatalities || d.totalFatalities || 0,
            populationM: d.Population_M || d.populationM || 0,
            fatalityRatePer100k: d.Fatality_Rate_Per_100k || d.fatalityRatePer100k || 0
        }));

        data.sort((a, b) => b.fatalityRatePer100k - a.fatalityRatePer100k);
        data.forEach((d, i) => {
            d.rank = i + 1;
        });

        return data;
    }

    window.renderQ5 = function(rawData) {
        const data = prepareQ5Data(rawData);
        
        if (!data || data.length === 0) {
            d3.select('#chart-q5').html('<div class="empty-state"><p>No data</p></div>');
            return;
        }

        isMobile = checkMobile();
        d3.select('#svg-q5').selectAll('*').remove();

        renderChoroplethMap(data);
        updateDataTable(data);
    };

    function renderChoroplethMap(data) {
        const container = document.getElementById('chart-q5');
        width = container.clientWidth;
        height = isMobile ? 500 : 600;

        const svg = d3.select('#svg-q5')
            .attr('width', width)
            .attr('height', height);

        // Adjusted title position for mobile
        svg.append('text')
            .attr('class', 'chart-main-title')
            .attr('x', width / 2)
            .attr('y', isMobile ? 20 : 25)
            .attr('text-anchor', 'middle')
            .style('font-size', isMobile ? '13px' : '16px')
            .style('font-weight', '600')
            .style('fill', '#2c3e50')
            .text(isMobile ? 'Fatality Rate by State' : 'Fatality Rate by State (per 100,000 population)');

        projection = d3.geoMercator()
            .center([133, -28])
            .scale(isMobile ? width * 0.85 : width * 0.8)
            .translate([width / 2, height / 2 + 20]);

        path = d3.geoPath().projection(projection);

        const colorScale = d3.scaleThreshold()
            .domain([3, 4, 5, 6, 8])
            .range(['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c']);

        const tooltip = createTooltip();

        const dataByCode = {};
        data.forEach(d => {
            dataByCode[d.code] = d;
        });

        // Store initial scale for zoom constraint
        const initialScale = isMobile ? width * 0.85 : width * 0.8;

        // Configure zoom with scale extent - only allow zoom in, not out
        const zoom = d3.zoom()
            .scaleExtent([1, 4]) // Min scale 1 (default), max scale 4 (4x zoom in)
            .on('zoom', (event) => {
                mapGroup.attr('transform', event.transform);
            });

        if (!isMobile) {
            svg.call(zoom);
        }

        const mapGroup = svg.append('g')
            .attr('class', 'map-group');

        d3.json('data/raw_data/australia_states.geojson').then(geo => {
            const states = mapGroup.selectAll('path')
                .data(geo.features)
                .enter()
                .append('path')
                .attr('d', path)
                .attr('class', 'state-path')
                .attr('data-state-code', d => STATE_CODE_MAP[d.properties.STATE_CODE])
                .attr('fill', feature => {
                    const stateCode = STATE_CODE_MAP[feature.properties.STATE_CODE];
                    const stateData = dataByCode[stateCode];
                    return stateData ? colorScale(stateData.fatalityRatePer100k) : '#e0e0e0';
                })
                .attr('stroke', '#2c3e50')
                .attr('stroke-width', 1.5)
                .style('cursor', 'pointer')
                .style('opacity', 0)
                .on('mouseenter', function(event, d) {
                    const stateCode = STATE_CODE_MAP[d.properties.STATE_CODE];
                    const stateData = dataByCode[stateCode];

                    if (stateData) {
                        d3.select(this)
                            .attr('stroke-width', 3)
                            .attr('stroke', '#2d2d2d');

                        const content = `
                            <strong>${stateData.stateName}</strong>
                            <div class="tooltip-row">
                                <span class="tooltip-label">Total fatalities:</span>
                                <span class="tooltip-value">${d3.format(',')(stateData.totalFatalities)}</span>
                            </div>
                            <div class="tooltip-row">
                                <span class="tooltip-label">Rate per 100k:</span>
                                <span class="tooltip-value">${stateData.fatalityRatePer100k.toFixed(2)}</span>
                            </div>
                            <div class="tooltip-row">
                                <span class="tooltip-label">Rank:</span>
                                <span class="tooltip-value">#${stateData.rank}</span>
                            </div>
                        `;
                        showTooltip(event, content, tooltip);
                    }
                })
                .on('mousemove', (event) => {
                    moveTooltip(event, tooltip);
                })
                .on('mouseleave', function() {
                    d3.select(this)
                        .attr('stroke-width', 1)
                        .attr('stroke', '#ffffff');
                    hideTooltip(tooltip);
                })
                .on('click', function(event, d) {
                    const stateCode = STATE_CODE_MAP[d.properties.STATE_CODE];
                    if (stateCode) {
                        // Toggle state filter
                        const stateIndex = window.filterState.states.indexOf(stateCode);
                        if (stateIndex > -1) {
                            window.filterState.states.splice(stateIndex, 1);
                        } else {
                            window.filterState.states.push(stateCode);
                        }
                        updateAllCharts();
                    }
                })
                .call(attachScrollFriendlyTouch, {
                    tooltip: tooltip,
                    getContent: (d) => {
                        const stateCode = STATE_CODE_MAP[d.properties.STATE_CODE];
                        const stateData = dataByCode[stateCode];
                        if (!stateData) return '';

                        return `
                            <strong>${stateData.stateName}</strong>
                            <div class="tooltip-row">
                                <span class="tooltip-label">Total fatalities:</span>
                                <span class="tooltip-value">${d3.format(',')(stateData.totalFatalities)}</span>
                            </div>
                            <div class="tooltip-row">
                                <span class="tooltip-label">Rate per 100k:</span>
                                <span class="tooltip-value">${stateData.fatalityRatePer100k.toFixed(2)}</span>
                            </div>
                            <div class="tooltip-row">
                                <span class="tooltip-label">Rank:</span>
                                <span class="tooltip-value">#${stateData.rank}</span>
                            </div>
                        `;
                    },
                    onTap: (event, d) => {
                        const stateCode = STATE_CODE_MAP[d.properties.STATE_CODE];
                        if (stateCode) {
                            // Toggle state filter on tap
                            const stateIndex = window.filterState.states.indexOf(stateCode);
                            if (stateIndex > -1) {
                                window.filterState.states.splice(stateIndex, 1);
                            } else {
                                window.filterState.states.push(stateCode);
                            }
                            updateAllCharts();
                        }
                    },
                    onHoverStart: (element) => {
                        element.attr('stroke-width', 3).attr('stroke', '#2d2d2d');
                    },
                    onHoverEnd: (element) => {
                        element.attr('stroke-width', 1).attr('stroke', '#ffffff');
                    }
                })
                .transition()
                .duration(500)
                .delay((d, i) => i * 100)
                .style('opacity', 0.9);

            const centroids = {};
            geo.features.forEach(feature => {
                const stateCode = STATE_CODE_MAP[feature.properties.STATE_CODE];
                if (stateCode && dataByCode[stateCode]) {
                    const centroid = path.centroid(feature);
                    centroids[stateCode] = centroid;
                }
            });

            mapGroup.append('g')
                .attr('class', 'state-labels')
                .selectAll('.state-label')
                .data(data.filter(d => centroids[d.code]))
                .enter()
                .append('text')
                .attr('class', 'state-label')
                .attr('x', d => centroids[d.code][0])
                .attr('y', d => centroids[d.code][1])
                .attr('text-anchor', 'middle')
                .attr('dy', '-0.5em')
                .style('font-size', isMobile ? '9px' : '12px')
                .style('font-weight', '700')
                .style('fill', '#fff')
                .style('text-shadow', '1px 1px 3px rgba(0,0,0,0.8)')
                .style('pointer-events', 'none')
                .style('opacity', 0)
                .text(d => d.code)
                .transition()
                .delay(600)
                .duration(400)
                .style('opacity', 1);

            mapGroup.append('g')
                .attr('class', 'state-values')
                .selectAll('.state-value')
                .data(data.filter(d => centroids[d.code]))
                .enter()
                .append('text')
                .attr('class', 'state-value')
                .attr('x', d => centroids[d.code][0])
                .attr('y', d => centroids[d.code][1])
                .attr('text-anchor', 'middle')
                .attr('dy', '1em')
                .style('font-size', isMobile ? '8px' : '10px')
                .style('font-weight', '600')
                .style('fill', '#fff')
                .style('text-shadow', '1px 1px 3px rgba(0,0,0,0.8)')
                .style('pointer-events', 'none')
                .style('opacity', 0)
                .text(d => d.fatalityRatePer100k.toFixed(1))
                .transition()
                .delay(700)
                .duration(400)
                .style('opacity', 1);

            addColorLegend(svg, colorScale, width, height);

            if (!isMobile) {
                svg.append('text')
                    .attr('x', width / 2)
                    .attr('y', height - 10)
                    .attr('text-anchor', 'middle')
                    .style('font-size', '11px')
                    .style('fill', '#95a5a6')
                    .style('font-style', 'italic')
                    .text('Click to filter | Scroll to zoom in | Drag to pan');
            }

            // Add reset zoom button (only visible when zoomed)
            const resetButton = svg.append('g')
                .attr('class', 'reset-zoom-button')
                .attr('transform', isMobile ? `translate(${width - 90}, ${height - 80})` : `translate(20, ${height - 70})`)
                .style('cursor', 'pointer')
                .style('opacity', 0)
                .style('pointer-events', 'none')
                .on('click', function() {
                    svg.transition()
                        .duration(750)
                        .ease(d3.easeCubicOut)
                        .call(zoom.transform, d3.zoomIdentity);
                    
                    d3.select(this)
                        .transition()
                        .duration(300)
                        .style('opacity', 0)
                        .on('end', function() {
                            d3.select(this).style('pointer-events', 'none');
                        });
                });
                // Removed hover transform animations that caused shaking

            // Background rect for button
            resetButton.append('rect')
                .attr('width', 85)
                .attr('height', 36)
                .attr('rx', 6)
                .attr('ry', 6)
                .attr('fill', '#26658c')
                .attr('stroke', '#1a4563')
                .attr('stroke-width', 2)
                .style('filter', 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))');

            // Icon - refresh/reset symbol
            const iconGroup = resetButton.append('g')
                .attr('transform', 'translate(12, 18)');

            iconGroup.append('path')
                .attr('d', 'M0,-6 A6,6 0 1,1 0,6')
                .attr('stroke', '#fff')
                .attr('stroke-width', 2)
                .attr('fill', 'none')
                .attr('stroke-linecap', 'round');

            iconGroup.append('path')
                .attr('d', 'M-3,-6 L0,-6 L0,-3')
                .attr('stroke', '#fff')
                .attr('stroke-width', 2)
                .attr('fill', 'none')
                .attr('stroke-linejoin', 'round');

            // Button text
            resetButton.append('text')
                .attr('x', 30)
                .attr('y', 22)
                .attr('text-anchor', 'start')
                .style('fill', '#fff')
                .style('font-size', '13px')
                .style('font-weight', '600')
                .style('pointer-events', 'none')
                .style('user-select', 'none')
                .text('Reset');

            // Show/hide reset button based on zoom level with smooth transition
            zoom.on('zoom.button', function(event) {
                if (event.transform.k > 1.01) {
                    resetButton
                        .transition()
                        .duration(300)
                        .style('opacity', 1)
                        .on('end', function() {
                            d3.select(this).style('pointer-events', 'all');
                        });
                } else {
                    resetButton
                        .transition()
                        .duration(300)
                        .style('opacity', 0)
                        .on('end', function() {
                            d3.select(this).style('pointer-events', 'none');
                        });
                }
            });

        }).catch(error => {
            console.error('Error loading Q5 GeoJSON:', error);
            svg.append('text')
                .attr('x', width / 2)
                .attr('y', height / 2)
                .attr('text-anchor', 'middle')
                .style('fill', '#e74c3c')
                .style('font-size', '14px')
                .text('Error loading map');
        });
    }

    function addColorLegend(svg, colorScale, width, height) {
        const legendWidth = isMobile ? 140 : 200;
        const legendHeight = isMobile ? 12 : 15;
        const legendX = isMobile ? (width - legendWidth) / 2 : width - legendWidth - 20;
        const legendY = isMobile ? height - 50 : height - 60; // Higher on mobile to avoid overlap

        const legend = svg.append('g')
            .attr('class', 'legend')
            .attr('transform', `translate(${legendX}, ${legendY})`);

        legend.append('text')
            .attr('x', 0)
            .attr('y', -10)
            .style('font-size', isMobile ? '10px' : '11px')
            .style('font-weight', '600')
            .style('fill', '#2c3e50')
            .text('Rate per 100k');

        const thresholds = [0, 3, 4, 5, 6, 8, 12];
        const boxWidth = legendWidth / (thresholds.length - 1);

        legend.selectAll('.legend-box')
            .data(thresholds.slice(0, -1))
            .enter()
            .append('rect')
            .attr('class', 'legend-box')
            .attr('x', (d, i) => i * boxWidth)
            .attr('width', boxWidth)
            .attr('height', legendHeight)
            .attr('fill', d => colorScale(d + 0.1))
            .attr('stroke', '#999')
            .attr('stroke-width', 0.5);

        const legendScale = d3.scaleLinear()
            .domain([thresholds[0], thresholds[thresholds.length - 1]])
            .range([0, legendWidth]);

        const legendAxis = d3.axisBottom(legendScale)
            .tickValues(thresholds)
            .tickSize(4)
            .tickFormat(d => d);

        legend.append('g')
            .attr('class', 'legend-axis')
            .attr('transform', `translate(0, ${legendHeight})`)
            .call(legendAxis)
            .style('font-size', isMobile ? '8px' : '9px')
            .selectAll('text')
            .style('fill', '#2c3e50');
    }

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

    // update data table
    function updateDataTable(data) {
        const tbody = d3.select('#table-q5-body');
        tbody.selectAll('tr').remove();

        tbody.selectAll('tr')
            .data(data)
            .enter()
            .append('tr')
            .html(d => `
                <td>${d.stateName}</td>
                <td>${d3.format(',')(d.totalFatalities)}</td>
                <td>${d.fatalityRatePer100k.toFixed(2)}</td>
            `);
    }

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newIsMobile = checkMobile();
            if (newIsMobile !== isMobile && window.dataStore && window.dataStore.loaded) {
                const filteredData = window.getFilteredQ5Data();
                if (filteredData) window.renderQ5(filteredData);
            }
        }, 250);
    });

})();