/* Q2: Enforcement by state (bubble map) */

(function() {
  'use strict';

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

  const STATE_CENTROIDS = {
    'NSW': [147.0, -32.5],
    'VIC': [145.0, -37.0],
    'QLD': [145.0, -22.0],
    'SA': [135.0, -30.0],
    'WA': [120.0, -25.0],
    'TAS': [147.0, -42.0],
    'NT': [131.0, -19.0],
    'ACT': [149.1, -35.3]
  };

  const colorScale = d3.scaleOrdinal()
    .domain(['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT'])
    .range(['#26658c', '#3078a3', '#4589ac', '#5b9fc7', '#72afd2', '#8bbfdb', '#a4cfe4', '#bddeed']);

  function prepareQ2Data(raw) {
    if (!Array.isArray(raw)) return [];
    
    const data = raw.map(d => ({
        code: d.STATE || d.state,
        state: STATE_NAME[d.STATE || d.state] || d.state,
        totalFines: d.Total_Fines || d.totalFines || 0,
        percentageOfNational: d.percentageOfNational || 0
    }));

    data.sort((a, b) => b.totalFines - a.totalFines);
    data.forEach((d, i) => {
        d.rank = i + 1;
    });

    return data;
  }

  window.renderQ2 = function(rawData) {
    const data = prepareQ2Data(rawData);
    const container = document.getElementById('chart-q2');
    if (!container) return;

    const svgEl = d3.select('#svg-q2');
    svgEl.selectAll('*').remove();

    const width = container.clientWidth;
    const isMobile = window.innerWidth <= 768;
    const height = isMobile ? 500 : 600;

    svgEl.attr('width', width).attr('height', height);

    // Adjusted title position
    svgEl.append('text')
      .attr('class', 'chart-main-title')
      .attr('x', width / 2)
      .attr('y', isMobile ? 20 : 25)
      .attr('text-anchor', 'middle')
      .style('font-size', isMobile ? '14px' : '16px')
      .style('font-weight', '600')
      .style('fill', '#2c3e50')
      .text(isMobile ? 'Enforcement by State' : 'Enforcement Intensity by State');

    const projection = d3.geoMercator()
      .center([133, -28])
      .scale(isMobile ? width * 0.85 : width * 0.8)
      .translate([width / 2, height / 2 + 20]);

    const path = d3.geoPath().projection(projection);
    const tooltip = createTooltip();

    d3.json('data/raw_data/australia_states.geojson').then(geo => {
      const mapGroup = svgEl.append('g').attr('class', 'map-boundaries');
      
      mapGroup.selectAll('path')
        .data(geo.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', '#e8f4f8')
        .attr('stroke', '#3498db')
        .attr('stroke-width', 1.5)
        .attr('opacity', 0.3);

      const dataByCode = {};
      data.forEach(d => {
        dataByCode[d.code] = d;
      });

      const centroidData = [];
      geo.features.forEach(feature => {
        const stateCode = STATE_CODE_MAP[feature.properties.STATE_CODE];
        if (stateCode && dataByCode[stateCode]) {
          const d = dataByCode[stateCode];
          const coords = STATE_CENTROIDS[stateCode];
          if (coords) {
            const projected = projection(coords);
            centroidData.push({
              code: stateCode,
              state: d.state,
              totalFines: d.totalFines,
              percentageOfNational: d.percentageOfNational,
              rank: d.rank,
              x: projected[0],
              y: projected[1]
            });
          }
        }
      });

      const maxVal = d3.max(centroidData, d => d.totalFines) || 1;
      const sizeScale = d3.scaleSqrt()
        .domain([0, maxVal])
        .range([0, isMobile ? 25 : 50]);

      const bubbles = svgEl.append('g')
        .attr('class', 'bubbles')
        .selectAll('.bubble')
        .data(centroidData)
        .enter()
        .append('circle')
        .attr('class', 'bubble')
        .attr('data-state', d => d.code)
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', 0)
        .attr('fill', d => colorScale(d.code))
        .attr('fill-opacity', 0.7)
        .attr('stroke', d => d3.color(colorScale(d.code)).darker(1))
        .attr('stroke-width', 2)
        .style('cursor', 'pointer')
        .on('mouseenter', function(event, d) {
          d3.select(this)
            .attr('opacity', 1)
            .attr('stroke-width', 3);

          const content = `
            <strong>${d.state}</strong>
            <div class="tooltip-row">
              <span class="tooltip-label">Total fines:</span>
              <span class="tooltip-value">${d3.format(',')(d.totalFines)}</span>
            </div>
            <div class="tooltip-row">
              <span class="tooltip-label">% of national:</span>
              <span class="tooltip-value">${d.percentageOfNational.toFixed(1)}%</span>
            </div>
          `;
          showTooltip(event, content, tooltip);
        })
        .on('mousemove', (event) => {
          moveTooltip(event, tooltip);
        })
        .on('mouseleave', function() {
          d3.select(this)
            .attr('opacity', 0.7)
            .attr('stroke-width', 2);
          hideTooltip(tooltip);
        })
        .on('click', function(event, d) {
          // Toggle state filter
          const stateIndex = window.filterState.states.indexOf(d.code);
          if (stateIndex > -1) {
            window.filterState.states.splice(stateIndex, 1);
          } else {
            window.filterState.states.push(d.code);
          }
          updateAllCharts();
        })
        .call(attachScrollFriendlyTouch, {
          tooltip: tooltip,
          getContent: (d) => `
            <strong>${d.state}</strong>
            <div class="tooltip-row">
              <span class="tooltip-label">Total fines:</span>
              <span class="tooltip-value">${d3.format(',')(d.totalFines)}</span>
            </div>
            <div class="tooltip-row">
              <span class="tooltip-label">% of national:</span>
              <span class="tooltip-value">${d.percentageOfNational.toFixed(1)}%</span>
            </div>
          `,
          onTap: (event, d) => {
            // Toggle state filter on tap
            const stateIndex = window.filterState.states.indexOf(d.code);
            if (stateIndex > -1) {
              window.filterState.states.splice(stateIndex, 1);
            } else {
              window.filterState.states.push(d.code);
            }
            updateAllCharts();
          },
          onHoverStart: (element) => {
            element.attr('opacity', 1).attr('stroke-width', 3);
          },
          onHoverEnd: (element) => {
            element.attr('opacity', 0.7).attr('stroke-width', 2);
          }
        })
        .transition()
        .duration(800)
        .delay((d, i) => i * 100)
        .attr('r', d => sizeScale(d.totalFines));

      svgEl.append('g')
        .attr('class', 'state-labels')
        .selectAll('.state-label')
        .data(centroidData)
        .enter()
        .append('text')
        .attr('class', 'state-label')
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .attr('font-size', isMobile ? '9px' : '11px')
        .attr('font-weight', '700')
        .attr('fill', '#fff')
        .attr('text-shadow', '1px 1px 2px rgba(0,0,0,0.5)')
        .style('pointer-events', 'none')
        .style('opacity', 0)
        .text(d => d.code)
        .transition()
        .delay(800)
        .duration(400)
        .style('opacity', 1);

      addLegend(svgEl, centroidData, width, height, sizeScale, isMobile);
      updateDataTable(data);

    }).catch(error => {
      console.error('Error loading Q2 GeoJSON:', error);
      svgEl.append('text')
        .attr('x', width / 2)
        .attr('y', height / 2)
        .attr('text-anchor', 'middle')
        .style('fill', '#e74c3c')
        .style('font-size', '14px')
        .text('Error loading map');
    });
  };

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

  function addLegend(svg, data, width, height, sizeScale, isMobile) {
    const legendX = isMobile ? 20 : width - 140;
    const legendY = isMobile ? height - 150 : 70; // Lower on mobile to avoid title overlap

    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${legendX}, ${legendY})`);

    legend.append('rect')
      .attr('x', -10)
      .attr('y', -20)
      .attr('width', isMobile ? 100 : 120)
      .attr('height', isMobile ? 130 : 160)
      .attr('fill', '#fff')
      .attr('fill-opacity', 0.95)
      .attr('stroke', '#ccc')
      .attr('stroke-width', 1)
      .attr('rx', 4);

    legend.append('text')
      .attr('x', 0)
      .attr('y', 0)
      .style('font-size', isMobile ? '10px' : '12px')
      .style('font-weight', '600')
      .style('fill', '#2c3e50')
      .text('Bubble Size');

    const sortedData = [...data].sort((a, b) => b.totalFines - a.totalFines);
    const highState = sortedData[0];
    const mediumState = sortedData[Math.floor(sortedData.length / 2)];
    const lowState = sortedData[sortedData.length - 1];

    const sizeExamples = isMobile ? [
      { value: highState.totalFines, label: 'High', radius: 14, color: colorScale(highState.code) },
      { value: mediumState.totalFines, label: 'Med', radius: 9, color: colorScale(mediumState.code) },
      { value: lowState.totalFines, label: 'Low', radius: 5, color: colorScale(lowState.code) }
    ] : [
      { value: highState.totalFines, label: 'High', radius: 18, color: colorScale(highState.code) },
      { value: mediumState.totalFines, label: 'Medium', radius: 12, color: colorScale(mediumState.code) },
      { value: lowState.totalFines, label: 'Low', radius: 7, color: colorScale(lowState.code) }
    ];

    let cumulativeY = isMobile ? 20 : 25;

    sizeExamples.forEach((item) => {
      const r = item.radius;
      const y = cumulativeY + r;
      
      legend.append('circle')
        .attr('cx', 20)
        .attr('cy', y)
        .attr('r', r)
        .attr('fill', item.color)
        .attr('fill-opacity', 0.7)
        .attr('stroke', d3.color(item.color).darker(1))
        .attr('stroke-width', 1.5);

      legend.append('text')
        .attr('x', isMobile ? 35 : 45)
        .attr('y', y)
        .attr('dy', '0.35em')
        .style('font-size', isMobile ? '9px' : '11px')
        .style('fill', '#2c3e50')
        .style('font-weight', '500')
        .text(item.label);

      cumulativeY = y + r + (isMobile ? 8 : 10);
    });
  }

  function updateDataTable(data) {
    const tbody = d3.select('#table-q2-body');
    if (tbody.empty()) return;
    
    tbody.selectAll('*').remove();

    data.forEach(d => {
      const row = tbody.append('tr');
      row.append('td').text(d.state);
      row.append('td').text(d3.format(',')(d.totalFines));
      row.append('td').text(d.percentageOfNational.toFixed(1) + '%');
    });
  }

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (window.dataStore && window.dataStore.loaded) {
        const filteredData = window.getFilteredQ2Data();
        if (filteredData) window.renderQ2(filteredData);
      }
    }, 250);
  });

})();