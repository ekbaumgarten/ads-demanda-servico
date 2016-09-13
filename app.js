angular.module('adsApp', [])
	.controller('AdsController', ['$scope', '$timeout', function ($scope, $timeout) {
		var ads = this;

		ads.demands = [];
		ads.json_demands = '[11, 5, 2, 0, 9, 9, 1, 5, 1, 3, 3, 3, 7, 4, 12, 8, 5, 2, 6, 1, 11, 1, 2, 4, 2, 1, 3, 9, 0, 10, 3, 3, 1, 5, 18, 4, 22, 8, 3, 0, 8, 9, 2, 3, 12, 1, 3, 1, 7, 5, 14, 7, 7, 28, 1, 3, 2, 11, 13, 2, 0, 1, 6, 12, 15, 0, 6, 7, 19, 1, 1, 9, 1, 5, 3, 17, 10, 15, 43, 2, 6, 1, 13, 13, 19, 10, 9, 20, 19, 2, 27, 5, 20, 5, 10, 8, 2, 3, 1, 1, 4, 3, 6, 13, 10, 9, 1, 1, 3, 9, 9, 4, 0, 3, 6, 3, 27, 3, 18, 4, 6, 0, 2, 2, 8, 4, 5, 1, 4, 18, 1, 0, 16, 20, 2, 2, 2, 12, 28, 0, 7, 3, 18, 12, 3, 2, 8, 3, 19, 12, 5, 4, 6, 0, 5, 0, 3, 7, 0, 8, 8, 12, 3, 7, 1, 3, 1, 3, 2, 5, 4, 9, 4, 12, 4, 11, 9, 2, 0, 5, 8, 24, 1, 5, 12, 9, 17, 12, 6, 4, 3, 5, 7, 4, 4, 4, 11, 3, 8]';
		ads.json_service = '[11, 8, 1, 6, 26, 21, 17, 13, 31, 17, 23, 2, 131, 11, 20, 3, 21, 12, 31, 0, 20, 20, 16, 26, 19, 3, 19, 4, 7, 11, 29, 19, 21, 6, 15, 1, 11, 18, 3, 16, 11, 2, 10, 13, 18, 5, 20, 4, 17, 3, 4, 15, 2, 20, 7, 33, 30, 7, 13, 12, 30, 0, 20, 11, 4, 18, 17, 27, 4, 15, 11, 6, 10, 6, 7, 3, 1, 12, 14, 33, 24, 6, 3, 18, 4, 27, 8, 0, 20, 24, 14, 27, 1, 24, 31, 20, 17, 21, 6, 27, 24, 16, 15, 28, 10, 0, 1, 4, 5, 19, 6, 5, 5, 16, 32, 9, 26, 10, 25, 3, 1, 13, 24, 6, 15, 15, 4, 8, 25, 9, 11, 34, 24, 6, 1, 17, 6, 1, 24, 10, 15, 24, 15, 19, 20, 4, 9, 11, 11, 8, 25, 24, 2, 8, 22, 7, 15, 17, 22, 22, 14, 27, 17, 6, 17, 19, 15, 19, 13, 4, 23, 19, 16, 2, 10, 24, 25, 18, 6, 7, 32, 3, 8, 2, 25, 24, 16, 6, 5, 14, 0, 16, 2, 9, 2, 16, 17, 11, 2]';

		ads.tIncomming = null;//Timeout para entrada de demandas
		ads.tProcessing = null;//Timeout para processamento das demandas

		ads.processing_index = null;
		ads.simulate = function () {
			$timeout.cancel(ads.tIncomming);
			$timeout.cancel(ads.tProcessing);
			ads.demands = [];
			ads.tIncomming = null;
			ads.tProcessing = null;
			ads.processing_index = null;

			var demands_json = JSON.parse(ads.json_demands);
			var service_json = JSON.parse(ads.json_service);
			for (var i = 0; i < demands_json.length; i++) {
				ads.demands[i] = {created: false, code: i, incomming_time: demands_json[i], processing_time: service_json[i], executing: false, complete: false};
			}
			ads.addDemand(0);
		};

		ads.addDemand = function (demand_index) {
			ads.tIncomming = $timeout(function() {
				if (ads.processing_index === null) {
					ads.processDemand(demand_index);
				}
				ads.demands[demand_index].created = true;
				ads.addDemand(demand_index+1);
			}, ads.demands[demand_index].incomming_time * 1000);
		};

		ads.processDemand = function (demand_index) {
			ads.processing_index = demand_index;
			ads.demands[ads.processing_index].executing = true;
			ads.tProcessing = $timeout(function () {
				ads.demands[ads.processing_index].executing = false;
				ads.demands[ads.processing_index].complete = true;
				if (ads.demands[demand_index + 1].created) {
					ads.processDemand(ads.processing_index + 1);
				} else {
					ads.processing_index = null;
				}
			}, ads.demands[ads.processing_index].processing_time * 1000);
		};

	}]);