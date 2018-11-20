$(function () {
     var chart;

    $(document).ready(function(){

      var start_data = "https://raw.githubusercontent.com/anianisyah/visdat/master/data/recap_morning_evening_peak.json";
      
      var jqxhr = $.getJSON(start_data, function() {
          create_chart(jqxhr);

        $('#jalan').change(function(){
              
              var select_jalan; 

                if(this.value == "A"){
                    select_jalan = "https://raw.githubusercontent.com/anianisyah/visdat/master/data/recap_morning_evening_peak.json";
                }else if(this.value == "B"){
                    select_jalan = "https://raw.githubusercontent.com/anianisyah/visdat/master/data/recap_morning_evening_peak_2.json";
                }else{
                    select_jalan = "https://raw.githubusercontent.com/anianisyah/visdat/master/data/recap_morning_evening_peak.json";
                }

                var call_function = $.getJSON(select_jalan, function(){
                    create_chart(call_function);
                });
        }); 

        function create_chart(data_congestion){
             Highcharts.chart('container2', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Congestion Morning and Evening '
                },
                //subtitle: {
                  //  text: 'Source: ''
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

        }

    })
      .done(function() {
       // console.log( "second success" );
    })
      .fail(function() {
        //console.log( "error" );
    })
      .always(function() {
        //console.log( "complete" );
    });

    });
});