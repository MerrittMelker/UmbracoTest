angular.module("umbraco")
.controller("Productions.ProductionDeleteController",
	function ($scope, productionResource, navigationService) {
	    $scope.delete = function (id) {
	        productionResource.deleteById(id).then(function () {
	            navigationService.syncTree({ tree: 'productionsTree', path: ["-1", "MORE IDS HERE"], forceReload: true });
	            navigationService.hideNavigation();

	        });

	    };
	    $scope.cancelDelete = function () {
	        navigationService.hideNavigation();
	    };
	});