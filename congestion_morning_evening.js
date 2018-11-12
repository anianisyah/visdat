$(document).ready(function() {
 var data_congestion = $.getJSON('https://raw.githubusercontent.com/anianisyah/visdat/89ab30dad4a5720cb759aaef50408acd132751a1/recap_morning_evening_peak.json', function(data) {
   
    console.log(data_congestion.responseJSON.morning_peak[0]);
    // load chart 
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
            y: 10,
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
            data: [data_congestion.responseJSON.morning_peak[0], data_congestion.responseJSON.morning_peak[1], data_congestion.responseJSON.morning_peak[2], data_congestion.responseJSON.morning_peak[3], data_congestion.responseJSON.morning_peak[4], data_congestion.responseJSON.morning_peak[5], data_congestion.responseJSON.morning_peak[6]]
        }, {
            name: 'Evening (04:00 - 08:00 PM) ',
            data: [data_congestion.responseJSON.evening_peak[0], data_congestion.responseJSON.evening_peak[1], data_congestion.responseJSON.evening_peak[2], data_congestion.responseJSON.evening_peak[3], data_congestion.responseJSON.evening_peak[4], data_congestion.responseJSON.evening_peak[5], data_congestion.responseJSON.evening_peak[6]]
        }]
    });
   }) 
});