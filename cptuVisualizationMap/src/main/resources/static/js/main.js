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
					//console.log(tenders);
					var table1 = $('#table1');
					table1.find("tbody tr").remove();
					for (var i = 0; i < tenders.length; i++) {
						table1.append("<tr><td>" + tenders[i].district + "</td><td>"
								+ tenders[i].count + "</td></tr>");	
					}
					//console.log("success response");
					var listTenders = response.data1;
					var table2 = $('#table2');
					table2.find("tbody tr").remove();
					for (var j = 0; j < listTenders.length; j++) {
						//console.log(listTenders[j]);
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
					} //console.log("success response");
				},
				error : function(e) {
					console.log("ERROR: ", e);
				}
			});
		});