app.factory("CiModel", ["$http", "$q", function($http, $q) {
  pool = (function() {
    var maxOpCount = 2;
    var queue = [];
    var handleNext = function() {
        var item;
        if ( queue.length == 0 ) {
            return;
        }
        item = queue.shift();
        $http.get(item.url, item.options).success(item.onSuccess).error(item.onError);
    };

    return {
        get: function(url, options) {
            var deferred = $q.defer(), promise = deferred.promise;

            queue.push({ 
                    url: url, 
                    options: options, 
                    onSuccess: function(data, status, headers, config) {
                        deferred.resolve({data: data, status: status, headers: headers, config: config});
                        handleNext();
                    },
                    onFailure: function(data, status, headers, config) {
                        deferred.reject({data: data, status: status, headers: headers, config: config});
                        handleNext();
                    }
            });

            if ( queue.length <= maxOpCount ) {
                handleNext();
            }
            
            promise.success = function(fn) {
                promise.then(function(response) {
                    fn(response.data, response.status, response.headers, response.config);
                });
                return promise;
            };

            promise.error = function(fn) {
                promise.then(null, function(response) {
                    fn(response.data, response.status, response.headers, response.config);
                });
                return promise;
            };
            return promise;
        }
    };

  })();

  function getParams(config) {
    return { source: config.source, widget_id: config.id };
  }

  function getData(config) {
      //return $http.get("/api/data_sources/ci", { params: getParams(config) });
    return pool.get("/api/data_sources/ci", { params: getParams(config) });
  }

  return {
    getData: getData
  };
}]);