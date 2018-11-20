$(function () {
     var chart;

    $(document).ready(function(){
    
      var start_data = "https://raw.githubusercontent.com/anianisyah/visdat/master/data/street_morning_evening/jalan_jend_sudirman_morning_evening_peak.json";
      
      var jqxhr = $.getJSON(start_data, function() {
           create_chart(jqxhr, 'Jalan Jend Sudirman');

        $('#jalan').change(function(){
              
              var select_jalan = this.value; 
              select_jalan = select_jalan.replace('by_date','morning_evening_peak');

              var nama_jalan = rename_jalan(this.value);

                var call_function = $.getJSON('https://raw.githubusercontent.com/anianisyah/visdat/master/data/street_morning_evening/'+select_jalan+'.json', function(){
                    create_chart(call_function, nama_jalan);
                });
        }); 

        function rename_jalan(nama){
            var delete_by_peak = nama.replace("by_date", "");
            var new_name = delete_by_peak.replace(/_/g," ");
            return new_name;
        }

        function create_chart(data_congestion, road_name){
             Highcharts.chart('container2', {
                chart: {
                    type: 'bar',
                    style : {
                        fontFamily : "Helvetica Neue, Helvetica, Arial, sans-serif"
                    }
                },
                title: {
                    text: 'Congestion Morning and Evening '
                },
                subtitle: {
                    text: road_name,
                    style : {
                        textTransform : 'capitalize'
                    }
                },
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
                    align: 'left',
                    verticalAlign: 'bottom',
                    x: 120,
                    y: 20,
                    floating: true,
                    //borderWidth: 1,
                    //backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                    //shadow: true
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