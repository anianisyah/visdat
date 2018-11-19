$(function () {

    var chart;
    
    $(document).ready(function() {
        var jqxhr = $.getJSON("data/recap_most_traffic_street.json", function(data) {
            var congestion_long=0;
            for (var i = 0; i < jqxhr.responseJSON.length; i++){
                console.log(jqxhr.responseJSON[i]["length"]);
                congestion_long += parseFloat(jqxhr.responseJSON[i]["length"]);
            }   
            console.log(congestion_long);
            create_chart(jqxhr);

            function create_chart(data_congestion){
                 Highcharts.chart('container5', {
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: 'Comparison: Congestion Long vs Jakarta-Bandung Distance '
                    },
                    //subtitle: {
                      //  text: 'Source: ''
                    //},
                    xAxis: {
                        categories: ['Congestion Long', 'Jakarta-Bandung Distance'],
                        title: {
                            text: null
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Long/Distance',
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
                        name: 'Long/Distance',
                        data: [congestion_long, 120.0],
                        color: '#014D65'
                    }]
                });

            }
        });
    });
})