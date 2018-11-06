$(function () {
    var chart;
    $(document).ready(function() {
    
        var colors = Highcharts.getOptions().colors,
            categories = ['Monday', 'Tuesday', 'Wednesday', 'Thusday', 'Friday', 'Saturday', 'Sunday'],
            name = 'Day',
            data = [{
                    y: 0, // senin 
                    color: colors[0],
                    drilldown: {
                        name: 'Time',
                        categories: ['6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00'],
                        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        color: colors[0]
                    }
                }, {
                    y: 0, // selasa
                    color: colors[1],
                    drilldown: {
                        name: 'Time',
                         categories: ['6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00'],
                         data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        color: colors[1]
                    }
                }, {
                    y: 0.47,
                    color: colors[2], // rabu
                    drilldown: {
                        name: 'Time',
                         categories: ['6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00'],
                        data: [0,0,0,0,0,0,0.74,0.40,0.35,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        color: colors[2]
                    }
                }, {
                    y: 2.25,
                    color: colors[3], // kamis 
                    drilldown: {
                        name: 'Time',
                         categories: ['6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00'],
                        data: [0, 0, 2.50, 2.11, 1.65, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                        color: colors[3]
                    }
                }, {
                    y: 0, // jumat 
                    color: colors[4],
                    drilldown: {
                        name: 'Time',
                         categories: ['6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00'],
                        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        color: colors[4]
                    }, 
                }, {
                    y: 0, // sabtu 
                    color: colors[4],
                    drilldown: {
                        name: 'Time',
                         categories: ['6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00'],
                        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        color: colors[4]
                    }
                }, {
                    y: 0, // minggu
                    color: colors[4],
                    drilldown: {
                        name: 'Time',
                         categories: ['6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00'],
                        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
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
                renderTo: 'container'
            },
            title: {
                text: 'Congestion Per Day'
            },
            subtitle: {
                text: 'Click the columns to view detail'
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
                        s += 'Click to view '+ point.category +' detail';
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
    });
    
});