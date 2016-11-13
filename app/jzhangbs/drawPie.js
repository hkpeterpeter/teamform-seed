google.charts.load('current', {'packages':['corechart']});

google.charts.setOnLoadCallback(drawChart);
function drawChart() {

  var data = google.visualization.arrayToDataTable([
    ['can', 'num'],
    ['Yes', 7],
    ['No', 2],
  ]);

  var options = {
    title: 'javascript',
    legend: 'none'
  };

  var chart1 = new google.visualization.PieChart(document.getElementById('piechart1'));
  var chart2 = new google.visualization.PieChart(document.getElementById('piechart2'));

  chart1.draw(data, options);
  chart2.draw(data, options);
}
