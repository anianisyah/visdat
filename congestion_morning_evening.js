
Highcharts.chart('container2', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Congestion Morning and Evening '
    },
    //subtitle: {
      //  text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
    //},
    xAxis: {
        categories: ['Monday', 'Tuesday', 'Wednesday', 'Thusday', 'Friday', 'Saturday', 'Sunday'],
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Congestion (%)',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: '%'
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Morning (06:00 - 10:00 AM) ',
        data: [107, 31, 35, 203, 25, 39,40]
    }, {
        name: 'Evening (04:00 - 10:00 PM) ',
        data: [133, 156, 147, 408, 6, 90,30]
    }]
});