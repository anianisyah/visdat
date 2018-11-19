$(function () {

    var chart;
	
    $(document).ready(function() {
       	var jqxhr = $.getJSON("data/recap_most_traffic_street.json", function(data) {
            var places = [];
            var jamFactors = [];
            var colors = Highcharts.getOptions().colors;
            for (var i = 0; i < jqxhr.responseJSON.length; i++){
            	if(jqxhr.responseJSON[i]["jam_factor"] > 1){
            		places.push(jqxhr.responseJSON[i]["street_name"]);
            		jamFactors.push(jqxhr.responseJSON[i]["jam_factor"]);
            		color: colors[i];
            	}
            }   

            chart = new Highcharts.chart('container3', {
                title: {
                    text: 'Most Traffic Streets'
                },
                xAxis: {
                    categories: places
                },
                yAxis: {
                    title: {
                        text: 'Jam Factors'
                    }
                },
                tooltip: {
                    formatter: function() {
                        var point = this.point,
                            s = this.x +'<br><b> Jam Factor: '+ this.y +'</b><br/>';
                        return s;
                    }
                },
                series: [{
                    type: 'column',
                    name: 'Streets',
                    data: jamFactors,
                    color: 'red'
                }],
                exporting: {
                    enabled: false
                }
		    });  
	    });
	});
})