var url = 'data/congestion_level.csv'

d3.csv(url, function(error, data){
    data.forEach(function (d) {
      d.level = +d.level;
    });
    var margin = {top: 65, bottom: 50, left: 50, right: 30}, axisPadding = 10;
    var Width = 500, Height = 300;
    var svgWidth = Width + margin.left + margin.right,
        svgHeight = Height + margin.top + margin.bottom;
    var maxlevel = d3.max(data, function(d){ return d.level; });
    
    
    // define scales and axises
    var xScale = d3.scale.ordinal()
        .domain(data.map(function(d){ return d.day; }))
        .rangeBands([0, Width], 0.1);
    var yScale = d3.scale.linear()
        .domain([0, maxlevel])
        .range([0, Height]);
    var color = d3.scale.category10();
    
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .tickSize(0,0)
        .orient('bottom');
    var yAxis = d3.svg.axis()
        .scale(yScale.copy().domain([maxlevel, 0]))
        .tickSize(6,0)
        .ticks(5)
        .orient('left');
        
    
    // create a svg canvas
    var svg = d3.select('.bar-chart')
        .append('svg')
        .attr({width: svgWidth, height: svgHeight})

    
    // Drawing for axises
    var xGroup = svg.append('g')
        .attr('class', 'xGroup')
        .style('font-size', '12px')
        .attr('transform', 'translate(' + [margin.left, margin.top + Height + axisPadding] + ')');
    xGroup.call(xAxis);
    styleAxis(xGroup);
    var yGroup = svg.append('g')
        .attr('class', 'yGroup')
        .style('font-size', '12px')
        .attr('transform', 'translate(' + [margin.left - axisPadding, margin.top] + ')');
    yGroup.call(yAxis);
    styleAxis(yGroup);


    // Label layer
    var label = svg.append('g')
        .attr('transform', 'translate(' + [margin.left - axisPadding, margin.top] + ')');
    label.append('text')
        .attr('transform', 'rotate(-90)')
        .attr({
            'text-anchor': 'start',
            x: -75,
            y: 20,
        })
    /* title bar */
    label.append('text')
        .text('Congestion Level Per Day')
        .style('text-transform', 'uppercase')
        .attr('transform', 'translate(' + [Width / 2, - margin.top / 2] + ')')
        .attr({
            'text-anchor': 'middle',
            'font-size': '1em',
            'font-weight' : 'bold',
            fill: 'black',
        });


    // Drawing for graph body
    var graph = svg.append('g')
        .attr('class', 'graph')
        .attr('transform', 'translate(' + [margin.left, margin.top + Height] + ')');
    var bars = graph.selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr('transform', function(d,i){ return 'translate(' + [xScale(d.day), -1 * yScale(d.level)] + ')'; });
    bars.append('rect')
        .attr("class","bar")
        .each(function(d,i){
            d3.select(this).attr({
                //fill: color.range()[i],
                width: xScale.rangeBand(),
                height: yScale(d.level),
            })
        })
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseout', mouseout);
    
    /* angka diatas bar */ 
    bars.append('text')
    .text(function(d){ return d.level; })
    .each(function(d,i){
        d3.select(this).attr({
            fill: color.range()[i],
            stroke: 'none',
            x: xScale.rangeBand() / 2,
            y: -5,
            'text-anchor': 'middle',
            'font-size' : '12px'
        });
    })
    
    
    
    // tooltips
    var div = d3.select('.bar-chart').append('div')
        .attr('class', 'tooltip')
        .append('span')
        .attr('class','tooltiptext')
    function mouseover(){
        div.style('display', 'inline');
    }
    function mousemove(){
        var d = d3.select(this).data()[0]
        div
            .html(d.day + '<hr/>' + d.level)
            .style('left', (d3.event.pageX - 34) + 'px')
            .style('top', (d3.event.pageY - 12) + 'px');
    }
    function mouseout(){
        div.style('display', 'none');
    }
})


function styleAxis(axis){
    // style path
    axis.select('.domain').attr({
        fill: 'none',
        stroke: '#888',
        'stroke-width': 1,
    });
    // style tick
    axis.selectAll('.tick line').attr({
        stroke: '#000',
        'stroke-width': 1,
    })
}
