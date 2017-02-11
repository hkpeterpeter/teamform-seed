$(function(){        
    /* reportrange */
    if($("#reportrange").length > 0){   
        $("#reportrange").daterangepicker({                    
            ranges: {
               'Today': [moment(), moment()],
               'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
               'Last 7 Days': [moment().subtract(6, 'days'), moment()],
               'Last 30 Days': [moment().subtract(29, 'days'), moment()],
               'This Month': [moment().startOf('month'), moment().endOf('month')],
               'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            opens: 'left',
            buttonClasses: ['btn btn-default'],
            applyClass: 'btn-small btn-primary',
            cancelClass: 'btn-small',
            format: 'MM.DD.YYYY',
            separator: ' to ',
            startDate: moment().subtract('days', 29),
            endDate: moment()            
          },function(start, end) {
              $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        });
        
        $("#reportrange span").html(moment().subtract('days', 29).format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
    }
    /* end reportrange */
    
    /* Rickshaw dashboard chart */
    // var seriesData = [ [], [] ];
    // var random = new Rickshaw.Fixtures.RandomData(1000);

    // for(var i = 0; i < 100; i++) {
        // random.addData(seriesData);
    // }

    // var rdc = new Rickshaw.Graph( {
            // element: document.getElementById("dashboard-chart"),
            // renderer: 'area',
            // width: $("#dashboard-chart").width(),
            // height: 250,
            // series: [{color: "#33414E",data: seriesData[0],name: 'New'}, 
                     // {color: "#1caf9a",data: seriesData[1],name: 'Returned'}]
    // } );

    // rdc.render();

    // var legend = new Rickshaw.Graph.Legend({graph: rdc, element: document.getElementById('dashboard-legend')});
    // var shelving = new Rickshaw.Graph.Behavior.Series.Toggle({graph: rdc,legend: legend});
    // var order = new Rickshaw.Graph.Behavior.Series.Order({graph: rdc,legend: legend});
    // var highlight = new Rickshaw.Graph.Behavior.Series.Highlight( {graph: rdc,legend: legend} );        

    // var rdc_resize = function() {                
            // rdc.configure({
                    // width: $("#dashboard-area-1").width(),
                    // height: $("#dashboard-area-1").height()
            // });
            // rdc.render();
    // }

    // var hoverDetail = new Rickshaw.Graph.HoverDetail({graph: rdc});

    // window.addEventListener('resize', rdc_resize);        

    // rdc_resize();
    /* END Rickshaw dashboard chart */
    
    /* Donut dashboard chart */
    Morris.Donut({
        element: 'dashboard-donut-1',
        data: [
            {label: "Started", value: 10},
            {label: "Completed", value: 7},
            {label: "Plan", value: 6}
        ],
        colors: ['#33414E', '#1caf9a', '#FEA223'],
        resize: true
    });
    /* END Donut dashboard chart */
	
	
    /* Bar dashboard chart */
    Morris.Bar({
        element: 'dashboard-bar-1',
        data: [
            { y: 'Sep 30', a: 13, b: 0 },
            { y: 'Oct 10 ', a: 13, b: 2 },
            { y: 'Oct 20', a: 14, b: 8 },
            { y: 'Oct 30', a: 17, b: 12 },
            { y: 'Nov 10', a: 20, b: 15 },
            { y: 'Nov 20', a: 23, b: 20 },
            { y: 'Nov 30', a: 23, b: 23 }
        ],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Plan', 'Complete'],
        barColors: ['#33414E', '#1caf9a'],
        gridTextSize: '10px',
        hideHover: true,
        resize: true,
        gridLineColor: '#E5E5E5'
    });
    /* END Bar dashboard chart */
    
    /* Line dashboard chart */
    Morris.Line({
      element: 'dashboard-line-1',
      data: [
        { y: '2016-9-30', a: 0,b: 0},
        { y: '2016-10-10', a: 3,b: 0},
        { y: '2016-10-20', a: 5,b: 0},
        { y: '2016-10-30', a: 8,b: 1},
        { y: '2016-11-10', a: 8,b: 1},
        { y: '2016-11-20', a: 10,b: 2},
        { y: '2016-11-30', a: 13,b: 3}
      ],
      xkey: 'y',
      ykeys: ['a','b'],
      labels: ['Positive','Negative'],
      resize: true,
      hideHover: true,
      xLabels: 'day',
      gridTextSize: '10px',
      lineColors: ['#1caf9a','#33414E'],
      gridLineColor: '#E5E5E5'
    });   
    /* EMD Line dashboard chart */
    /* Moris Area Chart */
      Morris.Area({
      element: 'dashboard-area-1',
       data: [
        { y: '2016-9-30', a: 0,b: 0},
        { y: '2016-10-10', a: 0,b: 3},
        { y: '2016-10-20', a: 0,b: 5},
        { y: '2016-10-30', a: 1,b: 8},
        { y: '2016-11-10', a: 1,b: 8},
        { y: '2016-11-20', a: 2,b: 10},
        { y: '2016-11-30', a: 3,b: 13}
      ],
      xkey: 'y',
      ykeys: ['a','b'],
      labels: ['Negative','Postive'],
      resize: true,
      hideHover: true,
      xLabels: 'day',
      gridTextSize: '10px',
      lineColors: ['#33414E','#1caf9a'],
      gridLineColor: '#E5E5E5'
    });
    /* End Moris Area Chart */
    /* Vector Map */
    var jvm_wm = new jvm.WorldMap({container: $('#dashboard-map-seles'),
                                    map: 'world_mill_en', 
                                    backgroundColor: '#FFFFFF',                                      
                                    regionsSelectable: true,
                                    regionStyle: {selected: {fill: '#B64645'},
                                                    initial: {fill: '#33414E'}},
                                    markerStyle: {initial: {fill: '#1caf9a',
                                                   stroke: '#1caf9a'}},
                                    markers: [{latLng: [50.27, 30.31], name: 'Kuen'},                                              
                                             
                                                                                      
                                              {latLng: [51.51, -0.13], name: 'Howe'},                                                                                                      
                                              {latLng: [40.71, -74.00], name: 'Cally'},
                                              {latLng: [35.38, 139.69], name: 'Kit'},
                                        
                                              {latLng: [28.61, 77.20], name: 'Fish'},
                                              {latLng: [39.91, 116.39], name: 'Harry'}]
                                });    
    /* END Vector Map */

    
    $(".x-navigation-minimize").on("click",function(){
        setTimeout(function(){
            rdc_resize();
        },200);    
    });
    
    
});

