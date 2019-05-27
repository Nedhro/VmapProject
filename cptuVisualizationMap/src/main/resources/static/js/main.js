/**
 * 
 */


$(document).ready(
		function() {

			$.ajax({
				type : "GET",
				url : "/vmap/load",
				dataType : 'json',
				success : function(response) {

					var tenders = response.data;
					
					console.log(tenders);

					var table1 = $('#table1');
					table1.find("tbody tr").remove();

					for (var i = 0; i < tenders.length; i++) {

						table1.append("<tr><td>" + tenders[i].district + "</td><td>"
								+ tenders[i].count + "</td></tr>");
						 
						

//						L.marker([ 23.8,90.3],10).bindPopup(
//								'District :' + tenders[i][1] + '<br> Tenders:'
//										+ tenders[i][2]).addTo(map);
//						marker.bindTooltip("my tooltip text").openTooltip();
						
//						var marker = L.marker([ 23.8, 90.3 ], 7);
//						marker.bindPopup("Loading...")
//						marker.on('click', function(e) {
//						    var popup = e.target.getPopup();
//						    var url="/vmap/load";
//						    $.get(url).done(function(tenders) {
//						        popup.setContent(tenders);
//						        popup.update();
//						    });
//						var marker = new L.marker([-19, -119], {opacity : 0});
//						marker.bindTooltip('<div>Some Custom Html</div>', {permanent: true, className: "leaflet-custom-label", offset: [0, 0] });
//						marker.addTo(map);

						
					}
					
					console.log("success response");

					var listTenders = response.data1;
					var table2 = $('#table2');
					table2.find("tbody tr").remove();

					for (var j = 0; j < listTenders.length; j++) {

						console.log(listTenders[j]);

						table2.append("<tr><td>" + j + "</td><td>"
								+ listTenders[j].ministry + "</td><td>"
								+ listTenders[j].division + "</td><td>"
								+ listTenders[j].divCode + "</td><td>"
								+ listTenders[j].organization + "</td><td>"
								+ listTenders[j].district + "</td><td>"
								+ listTenders[j].distCode + "</td><td>"
								+ listTenders[j].amount + "</td><td>"
								+ listTenders[j].awardDate + "</td><td>"
								+ listTenders[j].pe.code + "</td><td>"
								+ listTenders[j].pe.name + "</td><td>"
								+ listTenders[j].pe.nature + "</td><td>"
								+ listTenders[j].pe.type + "</td><td>"
								+ listTenders[j].pe.status + "</td></tr>");

					}

					console.log("success response");

				},
				error : function(e) {
					console.log("ERROR: ", e);

				}

			});
			
			//info leaflet-control
			
			
		});
