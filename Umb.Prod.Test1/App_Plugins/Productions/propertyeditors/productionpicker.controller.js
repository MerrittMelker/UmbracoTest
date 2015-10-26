angular.module("umbraco").controller("Productions.ProductionPickerController",
	function ($scope, dialogService) {

	    function populate(data) {
	        alert('oh hai');
	        $scope.model.value = data;
	    };

	    $scope.openPicker = function () {
	        dialogService.open({
	            template: "../App_Plugins/Productions/propertyeditors/productionpickerdialog.html",
	            scope: $scope,
	            callback: populate
	        });
	    };	    
	});


angular.module("umbraco").controller("Productions.ProductionPickerDialogController",
	function ($scope, dialogService) {

	    $scope.dialogEventHandler = $({});

	    $scope.dialogEventHandler.bind("treeNodeSelect", function (ev, args) {
	        args.event.preventDefault();
	        args.event.stopPropagation();
	        $scope.submit(args.node.id);
	    });
	});