(function() {
      angular.module('d3').directive('map', map);
      map.$inject = ['d3Service'];

      function map(d3Service) {
            return {
                  restrict: 'EA',
                  scope: {},
                  templateUrl: 'public/views/templates/map.html',
                  link: function(scope, element, attrs) {
                        d3Service.d3().then(function(d3) {
                              var margin = {
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0
                              }, width = parseInt(d3.select('#map').style('width')),
                                    width = width - margin.left - margin.right + 10,
                                    mapRatio = .5,
                                    height = width * mapRatio + 100;
                              var radius = d3.scale.sqrt().domain([0, 1e6]).range([0, 10]);
                              var projection = d3.geo.mercator().scale(width).translate([width * 2.165, height * 1.75]);
                              var path = d3.geo.path().projection(projection);
                              var svg = d3.select("#map").append("svg").attr("width", width).attr("height", height);
                              queue().defer(d3.json, "/public/us.json").defer(d3.json, "/public/test-centroids.json").await(ready);
                              function ready(error, us, centroid) {
                                    svg.append("path").attr("class", "states").datum(topojson.feature(us, us.objects.states)).attr("d", path);
                                    svg.selectAll(".symbol").data(centroid.features.sort(function(a, b) {
                                          return b.properties.population - a.properties.population;
                                    })).enter().append("path").attr("class", "symbol").attr("d", path.pointRadius(function(d) {
                                          return radius(d.properties.population);
                                    }));
                              }
					
					
                        });
                  }
            };
      }
})();