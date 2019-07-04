$
		.ajax({
			type : "GET",
			url : "/vmap/load",
			dataType : 'json',
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},
			success : function(response) {
				var tenders = response.data;
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
					this._div.innerHTML = '<h4>District and Division</h4>'
							+ (props ? '<b> Division:' + props.Division
									+ '</b><br /> <b>District: '
									+ props.District
									+ '</b><b></br> DistCode :'
									+ props.DistCode : '</b>');
				};
				info.addTo(map);
				// get color
				function getColor(y) {
					var colors = [ '#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C',
							'#FC4E2A' ];
					var c1 = colors[0];
					var c2 = colors[1];
					var c3 = colors[2];
					var c4 = colors[3];
					var c5 = colors[4];
					/**/
					//console.log(from);
					var uniqueTenderCount = [];
					for (var i = 0; i < tenders.length; i++) {
						if (i == 0) {
							uniqueTenderCount.push(tenders[i].count);
						} else {
							if (uniqueTenderCount.indexOf(tenders[i].count) < 0) {
								uniqueTenderCount.push(tenders[i].count);
							}
						}
					}
					//console.log("unique array");
					var sortedTenders = uniqueTenderCount.reverse();
					//console.log(sortedTenders);
					var max = sortedTenders[sortedTenders.length - 1];
					//console.log(max);
					var r1 = Math.floor(max / 5)-1;
					var r2 = Math.floor(max * 2 / 5)-1;
					var r3 = Math.floor(max * 3 / 5)-1;
					var r4 = Math.floor(max * 4 / 5)-1;
					var r5 = Math.floor(max * 5 / 5)-1;
					//console.log(r1,r2);
					return y > r5 ? c5 : y > r4 ? c4 : y > r3 ? c3 : y > r2 ?c2
							: y > r1 ? c1 : 'white';
				}
				function style(feature) {
					// console.log(feature);
					for (var i = 0; i < tenders.length; i++) {
						if (tenders[i].distCode == feature.properties.DistCode) {
							// console.log(tenders[i].count);
							return {
								weight : 1,
								opacity:1,
							    color:'white',
							    dashArray:0.1,
							    fillOpacity:0.7,
								fillColor : getColor(tenders[i].count)
							};
						}
					}
				}
				function highlightFeature(e) {
					var layer = e.target;
					layer.setStyle({
						weight:1,
					    color:'green',
					    fillColor:'#093987',
					    fillOpacity:1
					});
					if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
						layer.bringToFront();
					}
					info.update(layer.feature.properties);
					// tooltip
					var districtCode = layer.feature.properties.DistCode;
					for (var i = 0; i < tenders.length; i++) {
						if (tenders[i].distCode == districtCode) {
							layer.bindTooltip(
									"District Name: " + tenders[i].district
											+ "<br/>Tenders: "
											+ tenders[i].count,
									layer.feature.properties.DistCode, {
										offset : L.point(0, -40),
										sticky : false,
										direction : 'auto'
									}).openTooltip();
							// console.log(layer.feature.properties.Division);

						}
					}
					// tooltip ends
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
				var uniqueTenderCount = [];
				for (var i = 0; i < tenders.length; i++) {
					if (i == 0) {
						uniqueTenderCount.push(tenders[i].count);
					} else {
						if (uniqueTenderCount.indexOf(tenders[i].count) < 0) {
							uniqueTenderCount.push(tenders[i].count);
						}
					}
				}
				console.log("unique array");
				var sortedTenders = uniqueTenderCount.reverse();
				console.log(sortedTenders);
				var max = sortedTenders[sortedTenders.length - 1];
				console.log(max);
				var a = Math.floor(max / 5);
				var b = Math.floor(max * 2 / 5);
				var c = Math.floor(max * 3 / 5);
				var d = Math.floor(max * 4 / 5);
				var e = Math.floor(max * 5 / 5);
				// console.log(sortedTenders.length);
				legend.onAdd = function(map) {
					var div = L.DomUtil.create('div', 'info legend'), grades = [
							a, b, c, d, e ], labels = [], from, to;
					for (var i = 0; i < grades.length; i++) {
						from = grades[i];
						to = grades[i + 1];
						labels.push('<i style="background:' + getColor(from+1) + '"></i> '
								+ from + (to ? '&ndash;' + to : '+'));
//						var colors = [ '#FFEDA0', '#FED976', '#FEB24C',
//								'#FD8D3C', '#FC4E2A' ];
//						var color = colors[i];
						// style.backgroundColor = color;
					}
					div.innerHTML = labels.join('<br>');
					return div;
				};
				legend.addTo(map);
			},
			error : function(e) {
				console.log("ERROR: ", e);
			}
		});