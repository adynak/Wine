wineDetective.controller('NavigationController',
    [
        '$scope',
        'Data',
        'AsOfDate',
        'modalService',
        function($scope, Data, AsOfDate, modalService) {

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