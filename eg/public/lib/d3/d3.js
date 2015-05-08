(function() {
      angular.module('d3', []).factory('d3Service', ['$document', '$q', '$rootScope',
            function($document, $q, $rootScope) {
			
			//using d3 this way was suggested by http://www.ng-newsletter.com/posts/d3-on-angular.html as a more efficient way to use d3 as a directive/injectable component
			//I'm not sure at this point how true it is, but i'm trying it anyways
			
			
			//create defer object
                  var d = $q.defer();

			
                  function onScriptLoad() {
                        // Load client in the browser
                        loadNextScript();
                        $rootScope.$apply(function() {
                              d.resolve(window.d3);
                        });
                  }
			
			
                  // Create a script tag with d3 as the source
                  // and call our onScriptLoad callback when it
                  // has been loaded
                  var scriptTag = $document[0].createElement('script');
                  scriptTag.type = 'text/javascript';
                  scriptTag.async = true;
                  scriptTag.src = 'http://d3js.org/d3.v3.min.js';

			//load the second script
                  function loadNextScript() {
                        var scriptTagOne = $document[0].createElement('script');
                        scriptTagOne.type = 'text/javascript';
                        scriptTagOne.async = true;
                        scriptTagOne.src = 'http://d3js.org/d3.hexbin.v0.min.js';
                        scriptTagOne.onreadystatechange = function() {
                              if(this.readyState == 'complete') onScriptLoad();
                        }
                        var s = $document[0].getElementsByTagName('body')[0];
                        s.appendChild(scriptTagOne);
                  }
                  var s = $document[0].getElementsByTagName('body')[0];
                  s.appendChild(scriptTag);
                  scriptTag.onload = onScriptLoad;
                  return {
                        d3: function() {
                              return d.promise;
                        }
                  };
            }
      ]);
})();