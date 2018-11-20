$(function () {

    var chart;
    
    $(document).ready(function() {
        var jqxhr = $.getJSON("https://raw.githubusercontent.com/anianisyah/visdat/master/data/recap_most_traffic_street.json", function(data) {
            var congestion_long=0;
            for (var i = 0; i < jqxhr.responseJSON.length; i++){
                console.log(jqxhr.responseJSON[i]["length"]);
                congestion_long += parseFloat(jqxhr.responseJSON[i]["length"]);
            }   
            console.log(congestion_long);

            chart = new Highcharts.chart('container5', {
                title: {
                    text: 'Comparison: Congestion long vs Distance Jakarta-Bandung'
                },
                xAxis: {
                    categories: ['Congestion Long', 'Jakarta-Bandung']
                },
                yAxis: {
                    title: {
                        text: 'High/Distance'
                    }
                },
                tooltip: {
                    formatter: function() {
                        var point = this.point,
                            s = this.x +'<br><b> High/Distance: '+ this.y +'</b><br/>';
                        return s;
                    }
                },
                series: [{
                    type: 'column',
                    name: 'Congestion long vs Distance Jakarta-Bandung',
                    data: [congestion_long, 120],
                    color: 'black'
                }],
                exporting: {
                    enabled: false
                }
            });  
        });
    });
})