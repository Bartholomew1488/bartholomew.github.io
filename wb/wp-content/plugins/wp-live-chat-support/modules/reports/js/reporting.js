jQuery(function() {
    jQuery( "#reporting_tabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
    jQuery( "#reporting_tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
});

if( typeof wplc_reporting_statistics !== 'undefined' ){

	var reporting_data = JSON.parse( wplc_reporting_statistics );


	var urls = [];

	var temp = ['URL', 'Count'];

	urls.push(temp);

	jQuery.each(reporting_data.individual_urls_counted, function(key, val){
		var temp = [ key, val ];
		urls.push(temp);
	});

	var chat_totals = [];

	var temp2 = ['Date', 'Count'];

	chat_totals.push(temp2);

	jQuery.each(reporting_data.daily_chat_totals, function(key, val){
		var temp2 = [ key, val ];
		chat_totals.push(temp2);
	});
	

}

google.charts.load('current', {'packages':['corechart', 'bar']});

google.charts.setOnLoadCallback(wplc_drawChart);
function wplc_drawChart() {

	var visualization_data = google.visualization.arrayToDataTable(urls);

	var options = {
	  legend: 'none',

	};

	var chart = new google.visualization.PieChart(document.getElementById('popular_pages_graph'));

	jQuery("body").on("click", "#reporting_tabs li", function(){
		chart.draw(visualization_data, options);
	});
	
}

google.charts.setOnLoadCallback(wplc_drawChart2);

function wplc_drawChart2() {
	var visualization_data = google.visualization.arrayToDataTable(chat_totals);

	var options = {
	  	legend: { position: 'none' },
	};

	var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

	chart.draw(visualization_data, options);
	
	jQuery("body").on("click", "#reporting_tabs li", function(){
		chart.draw(visualization_data, options);
	});
}

