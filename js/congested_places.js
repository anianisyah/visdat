$(function () {

    var chart;
	
    $(document).ready(function() {
       	var jqxhr = $.getJSON("https://raw.githubusercontent.com/anianisyah/visdat/master/data/recap_most_traffic_street.json", function(data) {
        //var jqxhr = $.getJSON("data/recap_most_traffic_street2.json", function(data) {
            var places = [];
            var jamFactors = [];
        //    var businest_morning = [];
          //  var businest_evening = [];
            var colors = Highcharts.getOptions().colors;
            for (var i = 0; i < jqxhr.responseJSON.length; i++){
            	if(jqxhr.responseJSON[i]["jam_factor"] > 1){
            		places.push(jqxhr.responseJSON[i]["street_name"]);
            		jamFactors.push(jqxhr.responseJSON[i]["jam_factor"]);
            //        businest_morning.push(jqxhr.responseJSON[i]["busiest_hour_morning"]);
             //       businest_evening.push(jqxhr.responseJSON[i]["busiest_hour_evening"]);
                    color: colors[i];
            	}
                //console.log(businest_evening[i]);
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
                        text: 'Percentage'
                    }
                },
                tooltip: {
                    formatter: function() { 
                        var point = this.point,
                            // s = this.x +'<br><b> Jam Factor: '+ this.y +'</b><br/>'  + 
                            // '<b>Businest Morning Hour :'+ businest_morning[this.point.index] +' </b><br/>' +
                            // '<b>Businest Morning Hour :'+ businest_evening[this.point.index] +'</b><br/>' ;
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
