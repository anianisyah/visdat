
var map = L.map('mapid').setView([-6.21462, 106.84513], 11);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		maxZoom: 18,
		id: 'mapbox.streets',
		accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
	}).addTo(map);
	
JSONItems="";
var JSONItems = [];
function getColor(d) {
    return d == 1 ? 'lightgreen' :
           d==2   ? 'green' :
           d==3  ? 'yellow' :
           d==4  ? 'orange' :
           d==5  ? 'red':'white' ;
}

var legend = L.control({position: 'topleft'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [1,2,3,4,5],
        labels = ['sangat lancar','lancar','padat','macet','macet parah'];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i])+'"></i> '+labels[i] +'<br>';
    }

    return div;
};

legend.addTo(map);
					
$(document).ready(function(){
	console.log("asasas");
	$('.waktu').on('change', function (){
		if( $(this).attr('value')  == "1"){
			var latlang_red = lightred_data_2018_10_24_12_00;
			var latlang_lightgreen = lightgreen_data_2018_10_24_12_00;
			var latlang_darkgreen = darkgreen_data_2018_10_24_12_00;
			var latlang_darkyellow = darkyellow_data_2018_10_24_12_00;
			var latlang_lightyellow = lightyellow_data_2018_10_24_12_00;
		}else if ( $(this).attr('value') == "2"){
			var latlang_red = lightred_data_2018_10_25_08_00;
			var latlang_lightgreen = lightgreen_data_2018_10_25_08_00;
			var latlang_darkgreen = darkgreen_data_2018_10_25_08_00;
			var latlang_darkyellow = darkyellow_data_2018_10_25_08_00;
			var latlang_lightyellow = lightyellow_data_2018_10_25_08_00;
		}
			var multiPolyLineOptions_red = {color:'red'};
			var multiPolyLineOptions_lightgreen = {color:'lightgreen'};
			var multiPolyLineOptions_darkgreen = {color:'green'};
			var multiPolyLineOptions_lightyellow = {color:'yellow'};
			var multiPolyLineOptions_darkyellow = {color:'orange'};

		// Creating multi poly-lines
			 var multipolyline_red = L.polyline(latlang_red , multiPolyLineOptions_red);
			 
			 // Adding multi poly-line to map
			 multipolyline_red.addTo(map);
			 var multipolyline_lightgreen = L.polyline(latlang_lightgreen , multiPolyLineOptions_lightgreen);
			 
			 // Adding multi poly-line to map
			 multipolyline_lightgreen.addTo(map);
			 var multipolyline_darkgreen = L.polyline(latlang_darkgreen , multiPolyLineOptions_darkgreen);
			 
			 // Adding multi poly-line to map
			 multipolyline_darkgreen.addTo(map);
			 var multipolyline_darkyellow = L.polyline(latlang_darkyellow , multiPolyLineOptions_darkyellow);
			 
			 // Adding multi poly-line to map
			 multipolyline_darkyellow.addTo(map);
			 var multipolyline_lightyellow = L.polyline(latlang_lightyellow , multiPolyLineOptions_lightyellow);
			 
			 // Adding multi poly-line to map
			 multipolyline_lightyellow.addTo(map);
		
		
	});
		

	
});
