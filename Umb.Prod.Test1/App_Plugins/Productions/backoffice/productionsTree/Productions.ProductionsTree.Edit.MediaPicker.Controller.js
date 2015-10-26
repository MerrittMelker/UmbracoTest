//$scope.openMediaPicker = function() {
//         dialogService.mediaPicker({ callback: populatePicture });
//}
//function populatePicture(item) {
//     $scope.node = item;
//     $scope.production.ProductionHeaderImageID = item.id;
//}
//$scope.removePicture = function() {
//    $scope.node = undefined;
//    $scope.production.ProductionHeaderImageID = 0;
//}
//if ($scope.production.ProductionHeaderImageID > 0) {
//    entityResource.getById($scope.production.ProductionHeaderImageID, "Media").then(function (item) {
//       $scope.node = item;
//          });
//}