$(function () {
    var chart;
    $(document).ready(function() {
    
        var colors = Highcharts.getOptions().colors,
            categories = ['Monday', 'Tuesday', 'Wednesday', 'Thusday', 'Friday', 'Saturday', 'Sunday'],
            name = 'Day',
            data = [{
                    y: 23.91, // senin 
                    color: colors[0],
                    drilldown: {
                        name: 'Time',
                        categories: ['6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00'],
                        data: [12.6,20.45,21.11,24.5,26.93,28.25,29.11,27.37,27.16,30.16,31.39,32.07,35.13,37,35.3,32.26,26.13,20.74,11.8,9.63,8.73,8.74,9.17,8.12],
                        color: colors[0]
                    }
                }, {
                    y: 22.18, // selasa
                    color: colors[1],
                    drilldown: {
                        name: 'Time',
                         categories: ['6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00'],
                         data: [11.65,18.9,23.84,25.25,25.65,24.22,25.33,25.46,28.91,29.87,30.72,32.35,34.31,35.7,34.38,30.55,26.18,19.86,11.9,10.07,9.71,9.05,8.84,8.9],
                        color: colors[1]
                    }
                }, {
                    y: 22.47,
                    color: colors[2], // rabu
                    drilldown: {
                        name: 'Time',
                         categories: ['6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00'],
                        data: [0,0,0,0,0,0,0.74,0.40,0.35,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        color: colors[2]
                    }
                }, {
                    y: 22.42,
                    color: colors[3], // kamis 
                    drilldown: {
                        name: 'Time',
                         categories: ['6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00'],
                        data: [11.65, 20.01, 23.84, 25.65, 27.22, 28.33, 28.46, 28.91, 29.89, 30.72, 32.35, 34.41, 35.7, 34.38, 30.55, 26.18, 20.86, 14.87, 10.07, 8.84, 9.05, 8.74, 8.9, 8.8 ],
                        color: colors[3]
                    }
                }, {
                    y: 22.8, // jumat 
                    color: colors[4],
                    drilldown: {
                        name: 'Time',
                         categories: ['6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00'],
                        data: [11.6,19.53,23.23,25.95,27.35,29.11,27.37,27.16,30.61,31.45,32.07,34.13,36.58,35.3,32.26,28.39,23.73,17.75,11.9,9.04,8.61,8.69,8.45],
                        color: colors[4]
                    }, 
                }, {
                    y: 22.6, // sabtu 
                    color: colors[4],
                    drilldown: {
                        name: 'Time',
                         categories: ['6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00'],
                        data: [9.2,13.07,18.17,23.21,27.05,30.11,31.44,31.86,32.78,32.85,32.66,33.32,33.52,33.15,31.51,27.93,23.95,18.43,12.37,9.27,8.86,10.22,9.17,8.81],
                        color: colors[4]
                    }
                }, {
                    y: 21.4, // minggu
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