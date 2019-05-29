/**
 * 
 */
var map = L.map('map').setView([ 23.8, 90.3 ], 7);
L
		.tileLayer(
				'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
				{
					maxZoom : 20,
					attribution : 'Map data',
					id : 'mapbox.light'
				}).addTo(map);
// control that shows state info on hover
var info = L.control();
info.onAdd = function(map) {
	this._div = L.DomUtil.create('div', 'info');
	this.update();
	return this._div;
};
info.update = function(props) {
	this._div.innerHTML = '<h4>District and division </h4>'
			+ (props ? '<b> Division:' + props.Division
					+ '</b><br /> <b>District: ' + props.District
					+ '</b><b></br> DistCode :' + props.DistCode : '</b>');
};
info.addTo(map);
// get color depending on Division Code value
function getColor(d) {
	return d > 80 ? '#3e0368' : d > 60 ? '#6a0aaf' : d > 40 ? '#863cbc'
			: d > 20 ? '#a168cc' : d > 0 ? '#c49ce2' : 'white';
}
function style(feature) {
	return {
		weight : 2,
		opacity : 1,
		color : 'white',
		dashArray : '3',
		fillOpacity : 0.7,
		fillColor : getColor(feature.properties.DistCode)
	};
}
function highlightFeature(e) {
	var layer = e.target;
	layer.setStyle({
		weight : 5,
		color : '#33CEFF',
		dashArray : '',
		fillOpacity : 0.7
	});
	if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		layer.bringToFront();
	}
	info.update(layer.feature.properties);
	// tooltip data show
	$.ajax({
		type : "GET",
		url : "/vmap/load",
		dataType : 'json',
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success : function(response) {
			var tenders = response.data;
			var districtCode = layer.feature.properties.DistCode;
			for (var i = 0; i < tenders.length; i++) {
				if (tenders[i].distCode == districtCode) {
					layer.bindTooltip(
							"District Name: " + tenders[i].district
									+ "<br/>Tenders: " + tenders[i].count,
							layer.feature.properties.DistCode, {
								offset : L.point(0, -40),
								sticky : false,
								direction : 'auto'
							}).openTooltip()
					// console.log(layer.feature.properties.Division);
				}
			}
		},
		error : function(e) {
			console.log("ERROR: ", e);
		}
	});
	// tooltip function ends
}
var geojson;
function resetHighlight(e) {
	geojson.resetStyle(e.target);
	var layer = e.target;
	layer.unbindTooltip(this).toggleTooltip();
	info.update();
}
function zoomToFeature(e) {
	map.fitBounds(e.target.getBounds());
}
function onEachFeature(feature, layer) {
	layer.on({
		mouseover : highlightFeature,
		mouseout : resetHighlight,
		click : zoomToFeature
	});
}
geojson = L.geoJson(statesData, {
	style : style,
	onEachFeature : onEachFeature
}).addTo(map);
map.attributionControl.addAttribution('BD');
var legend = L.control({
	position : 'topleft'
});
legend.onAdd = function(map) {
	var div = L.DomUtil.create('div', 'info legend'), grades = [ 1, 20, 40, 60,
			80 ], labels = [], from, to;
	for (var i = 0; i < grades.length; i++) {
		from = grades[i];
		to = grades[i + 1];
		labels.push('<i style="background:' + getColor(from + 1) + '"></i> '
				+ from + (to ? '&ndash;' + to : '+'));
	}
	div.innerHTML = labels.join('<br>');
	return div;
};
legend.addTo(map);