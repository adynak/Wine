wineDetective.controller('NavigationController',
    [
        '$scope',
        'Data',
        'AsOfDate',
        'modalService',
        '$location',
        function($scope, Data, AsOfDate, modalService, $location) {

            $scope.prompts = txtNavigation;

            Data.setViewName(txtNavigation.brandName);
            $scope.AsOfDate = AsOfDate;
            $scope.Data = Data;

            $scope.startOver = function() {
                modalService.startOver();
            };

            $scope.goBack = function() {
                window.history.go(-1); 
                return false;
            };

            $scope.btnDone = function() {
                Data.setViewName(txtSideMenu.brandName);
                $location.path("/home");
            };

            $scope.isIphone = function(){
                if (Data.getDeviceType() == "iPhone"){
                    return true;
                } else {
                    return false;
                }
            }

            $scope.isHomePage = function(){
                if (Data.getViewName() == txtNavigation.brandName){
                    action = true;
                } else {
                    action = false;
                }
                return action;
            }
        }
    ]);