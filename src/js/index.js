import '../css/style.css'
import jq from 'jquery'
;(function($){
	console.log($('#map'))

	$.getJSON('/src/data/data.json', function(data) {
	  var ds = new DataSet();
	  var dv = ds.createView().source(data);
	  dv.transform({
	    type: 'diagram.voronoi',
	    fields: ['x', 'y'],
	    size: [800, 600],
	    as: ['_x', '_y']
	  });
	  console.log(data)

	  var chart = new G2.Chart({
	    container: 'mountNode',
	    forceFit: true,
	    height: window.innerHeight,
	    padding: 0
	  });
	  chart.axis(false);
	  chart.legend(false);
	  chart.tooltip({
	    showTitle: false
	  });

	  chart.source(dv);
	  chart.polygon().position('_x*_y').color('value').label('value', {
	    offset: 0,
	    textStyle: {
	      fill: '#fff',
	      fontSize: '12',
	      textAlign: 'center',
	      shadowBlur: 2,
	      shadowColor: 'rgba(0, 0, 0, .45)'
	    }
	  });

	  chart.render();
	});
})(jq)