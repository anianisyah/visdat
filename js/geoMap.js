

var map = L.map('mapid').setView([-6.21462, 106.84513], 11);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		maxZoom: 18,
		id: 'mapbox.streets',
		accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
	}).addTo(map);
	for ( var i=0; i < markers.length; ++i ) 
	{
		L.marker( [markers[i].start_lat, markers[i].start_long] )
	      .bindPopup(  'status kemacetan: '+ markers[i].criticality+'<br>'+" jalan ditutup " )
	      .addTo( map );
	}
JSONItems="";
var JSONItems = [];

$(document).ready(function(){
	console.log("asasas");
	$('.waktu').on('change', function (){
		if( $(this).attr('value')  == "1"){
			var latlang_red = red_data_2018_10_24_12_00;
			var latlang_green = green_data_2018_10_24_12_00;
			 // Creating poly line options
		}else if ( $(this).attr('value') == "2"){
			var latlang_red = red_data_2018_10_25_08_00;
			var latlang_green = green_data_2018_10_25_08_00;
		}
		var multiPolyLineOptions_red = {color:'red',    "opacity": 0.5};
		 var multiPolyLineOptions_green = {color:'green',     "opacity": 0.5};
		 // Creating multi poly-lines
		 var multipolyline_red = L.polyline(latlang_red , multiPolyLineOptions_red);
		 
		 // Adding multi poly-line to map
		 multipolyline_red.addTo(map);
		 var multipolyline_green = L.polyline(latlang_green , multiPolyLineOptions_green);
		 
		 // Adding multi poly-line to map
		 multipolyline_green.addTo(map);
	});
		

	
});
