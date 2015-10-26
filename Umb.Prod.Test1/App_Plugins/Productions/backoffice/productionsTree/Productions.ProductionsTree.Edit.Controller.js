
angular.module("umbraco").controller("Productions.ProductionEditController",
function ($scope, $routeParams, $http, assetsService, productionResource, notificationsService, navigationService, dialogService, entityResource, angularHelper) {
    $scope.production = { id: 0, };
    // GENERATE TABS
    $scope.tabs = { tab: [{ id: 1, label: "Main" }, { id: 2, label: "Dates" }] };
    $scope.loaded = false;
    var locale = 'en-US';
    var dateformat = 'MM/DD/YYYY HH:mm:ss';

    if ($routeParams.id == -1) {
        $scope.production = {};
        $scope.loaded = true;
        //initAssets();
    }
    else {
        //get a production id -> service
        productionResource.getById($routeParams.id).then(function (response) {
            $scope.production = response.data;
            $scope.production.StartDate = response.data.StartDate;
            $scope.production.EndDate = response.data.EndDate;
            $scope.loaded = true;
            initAssets();
        });
    }

    $scope.save = function (production) {
        productionResource.save(production).then(function (response) {
            $scope.production = response.data;

            notificationsService.success("Success", production.ProductionName + " has been saved");
            navigationService.syncTree({ tree: 'productionsTree', path: ["-1", "MORE IDS HERE"], forceReload: true });
        });
    };

    //DATE PICKER
    var initAssets = function (production) {
        assetsService
        .loadJs("/App_Plugins/Productions/scripts/moment-with-locales.js")
        .then(function () {
            //Set the right local of the current user in moment
            //moment.locale([locale, 'en']);
            if ($routeParams.id == -1) {
                $scope.production.CreatedDate = moment().format('MM/DD/YYYY HH:mm:ss');
            }
            if ($routeParams.create == "true") {
                $scope.production.StartDate = moment().format('MM/DD/YYYY HH:mm:ss');
                $scope.production.EndDate = moment().format('MM/DD/YYYY HH:mm:ss');
            }
            assetsService.loadCss("/App_Plugins/Productions/scripts/bootstrap-datetimepicker.min.css");
            assetsService
                .loadJs("/App_Plugins/Productions/scripts/bootstrap-datetimepicker.js")
                .then(function () {
                    ////this function will execute when all dependencies have loaded
                    $('#datetimepicker1').datetimepicker({ language: 'en-US' });
                    $('#datetimepicker2').datetimepicker({ language: 'en-US' });

                    $('#datetimepicker1 input').val(moment.utc($scope.production.StartDate).format('MM/DD/YYYY HH:mm:ss'));
                    $('#datetimepicker2 input').val(moment.utc($scope.production.EndDate).format('MM/DD/YYYY HH:mm:ss'));

                    ////$('#datetimepicker2').datetimepicker({
                    ////    language: locale
                    ////});
                    ////$('#datetimepicker2 input').val(moment.utc(production.StartDate).format('l LT'));

                    $('#datetimepicker1').on('dp.change', function (e) {
                        var d = moment(e.date); //.format('MM/DD/YYYY HH:mm:ss');
                        //$('#datetimepicker1 input').val(d.format('l LT'));
                        $scope.production.StartDate = d.format('MM/DD/YYYY HH:mm:ss');
                    });
                    $('#datetimepicker2').on('dp.change', function (e) {
                        var d = moment(e.date); //.format('MM/DD/YYYY HH:mm:ss');
                        //$('#datetimepicker1 input').val(d.format('l LT'));
                        $scope.production.EndDate = d.format('MM/DD/YYYY HH:mm:ss');
                    });
                    ////$('#datetimepicker2').on('dp.change', function (e) {
                    ////    var d = moment(e.date);
                    ////    //$('#datetimepicker2 input').val(d.format('l LT'));
                    ////    $scope.event.endtime = d.format('MM/DD/YYYY HH:mm:ss');
                    ////});

                    // SET UPDATED DATE
                    $scope.production.LastUpdatedDate = moment().format('MM/DD/YYYY HH:mm:ss');
                });
        });
    }
    initAssets();
    }
);
