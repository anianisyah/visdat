$(function () {
     var chart;

    $(document).ready(function(){
      var start_data = "https://raw.githubusercontent.com/anianisyah/visdat/master/data/recap_congestion_by_date.json";
      
      var jqxhr = $.getJSON(start_data, function() {
          create_chart(jqxhr, 'A');

        $('#jalan').change(function(){
              
              var select_jalan; 

                if(this.value == "A"){
                    select_jalan = "https://raw.githubusercontent.com/anianisyah/visdat/master/data/recap_congestion_by_date.json";
                }else if(this.value == "B"){
                    select_jalan = "https://raw.githubusercontent.com/anianisyah/visdat/master/data/recap_congestion_by_date_2.json";
                }else{
                    select_jalan = "https://raw.githubusercontent.com/anianisyah/visdat/master/data/recap_congestion_by_date.json";
                }

                var call_function = $.getJSON(select_jalan, function(){
                    create_chart(call_function, jalan.value);
                });
        }); 

        function create_chart(jqxhr, road_name){
                var colors = Highcharts.getOptions().colors,
                    categories = ['Monday', 'Tuesday', 'Wednesday', 'Thusday', 'Friday', 'Saturday', 'Sunday'],
                    name = 'Day',
                    data = [{
                            y: jqxhr.responseJSON[0]["congestion"], // senin 
                            color: colors[3],
                            drilldown: {
                                name: 'Time',
                                categories: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
                                data: jqxhr.responseJSON[0]["congestion_by_hour"],
                                color: colors[0]
                            }
                        }, {
                            y: jqxhr.responseJSON[1]["congestion"], // selasa
                            color: colors[3],
                            drilldown: {
                                name: 'Time',
                                 categories: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
                                 data: jqxhr.responseJSON[1]["congestion_by_hour"],
                                color: colors[1]
                            }
                        }, {
                            y: jqxhr.responseJSON[2]["congestion"],
                            color: colors[3], // rabu
                            drilldown: {
                                name: 'Time',
                                 categories: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
                                data: jqxhr.responseJSON[2]["congestion_by_hour"],
                                color: colors[2]
                            }
                        }, {
                            y: jqxhr.responseJSON[3]["congestion"],
                            color: colors[3], // kamis 
                            drilldown: {
                                name: 'Time',
                                 categories: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
                                data: jqxhr.responseJSON[3]["congestion_by_hour"],
                                color: colors[3]
                            }
                        }, {
                            y: jqxhr.responseJSON[4]["congestion"], // jumat 
                            color: colors[3],
                            drilldown: {
                                name: 'Time',
                                 categories: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
                                data: jqxhr.responseJSON[4]["congestion_by_hour"],
                                color: colors[4]
                            }, 
                        }, {
                            y: jqxhr.responseJSON[5]["congestion"], // sabtu 
                            color: colors[3],
                            drilldown: {
                                name: 'Time',
                                 categories: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
                                data: jqxhr.responseJSON[5]["congestion_by_hour"],
                                color: colors[4]
                            }
                        }, {
                            y: jqxhr.responseJSON[6]["congestion"], // minggu
                            color: colors[3],
                            drilldown: {
                                name: 'Time',
                                 categories: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
                                data: jqxhr.responseJSON[6]["congestion_by_hour"],
                                color: colors[4]
                            }
                        }];       
                function setChart(options) {
                    chart.series[0].remove(false);
                    chart.addSeries({
                        type: options.type,
                        name: options.name,
                        data: options.data,
                        color: options.color || 'white'
                    }, false);
                    chart.xAxis[0].setCategories(options.categories, false);
                    chart.redraw();
                }
        
                chart = new Highcharts.Chart({
                    chart: {
                        renderTo: 'container', 
                        style : {
                            fontFamily : 'Helvetica Neue, Helvetica, Arial, sans-serif'
                        }
                    },
                    title: {
                        text: 'Congestion Per Day'
                    },
                    subtitle: {
                        text: road_name
                    },
                    xAxis: {
                        categories: categories
                    },
                    yAxis: {
                        title: {
                            text: 'Total percent congestion'
                        }
                    },
                    plotOptions: {
                        series: {
                            cursor: 'pointer',
                            point: {
                                events: {
                                    click: function() {
                                        var drilldown = this.drilldown;
                                        var options;
                                        if (drilldown) { // drill down
                                            options = {
                                                'name': drilldown.name,
                                                'categories': drilldown.categories,
                                                'data': drilldown.data,
                                                'color': drilldown.color,
                                                'type': 'line'
                                            };
                                        } else { // restore
                                            options = {
                                                'name': name,
                                                'categories': categories,
                                                'data': data,
                                                'type': 'column'
                                            };
                                        }
                                        setChart(options);
                                    }
                                }
                            },
                            dataLabels: {
                                enabled: true,
                                color: colors[0],
                                style: {
                                    fontWeight: 'bold'
                                },
                                formatter: function() {
                                    return this.y +'%';
                                }
                            }
                        }
                    },
                    tooltip: {
                        formatter: function() {
                            var point = this.point,
                                s = this.x +':<b>'+ this.y +'% congestion</b><br/>';
                            if (point.drilldown) {
                                s += 'Click to view detail';
                            } else {
                                s += 'Click to return to congestion per day';
                            }
                            return s;
                        }
                    },
                    series: [{
                        type: 'column',
                        name: name,
                        data: data,
                        color: 'white'
                    }],
                    exporting: {
                        enabled: false
                    }
                });

        }

    })
      .done(function() {
        //console.log( "second success" );
    })
      .fail(function() {
       // console.log( "error" );
    })
      .always(function() {
        //console.log( "complete" );
    });

    });
});