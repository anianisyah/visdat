$(function () {

    var chart;
    
    $(document).ready(function() {
        var jqxhr = $.getJSON("https://raw.githubusercontent.com/anianisyah/visdat/master/data/recap_most_traffic_street.json", function(data) {
            var congestion_long=0;
            for (var i = 0; i < jqxhr.responseJSON.length; i++){
                congestion_long += parseFloat(jqxhr.responseJSON[i]["length"]);
            }   
            create_chart(jqxhr);

            function create_chart(data_congestion){
                 Highcharts.chart('container5', {
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: 'Comparison: Congestion Distance vs Jakarta-Bandung Distance '
                    },
                    //subtitle: {
                      //  text: 'Source: ''
                    //},
                    xAxis: {
                        categories: ['Congestion Distance', 'Jakarta-Bandung Distance'],
                        title: {
                            text: null
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Distance in km',
                            align: 'high'
                        },
                        labels: {
                            overflow: 'justify'
                        }
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
                        name: 'Distance in km',
                        data: [congestion_long, 120.0],
                        color: '#014D65'
                    }]
                });

            }
        });
    });
})
