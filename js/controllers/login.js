wineDetective.controller('LoginController', 
    [
        '$scope', 
        '$http', 
        '$location', 
        'Data', 
        '$rootScope',
        'ParseDownload',

    function($scope, $http, $location, Data, $rootScope, ParseDownload) {

        $scope.prompts    = txtLogin;
        $scope.prompts.visibility = txtLogin.visibilityShow;
        $scope.required   = true;
        Data.setViewName(txtLogin.btnLogin);
        $scope.credentials = {
            account:"",
            password:"",
            localStorage: true
        }

        $scope.toggleVisiblity = function(){
            var temp = document.getElementById("password"); 
            if (temp.type === "password") { 
                temp.type = "text"; 
                $scope.prompts.visibility = txtLogin.visibilityHide;
            } 
            else { 
                temp.type = "password"; 
                $scope.prompts.visibility = txtLogin.visibilityShow;
            } 
        }
        
        $scope.login = function() {
            var results;
            
            if ($scope.credentials.localStorage){
                results = localStorage.getItem("bottles");
                if (results === null){

                    Data.getInventoryCurl($scope.credentials).then(function(results) {
                        if (results.length < 200){
                            var div = document.createElement("div");
                            div.innerHTML = results;
                            var text = div.textContent || div.innerText || "";
                            $scope.invalidMessage = text;
                        } else {
                            localStorage.setItem("bottles", results);
                            localStorage.setItem("downloadDate", Data.getFormattedDate());
                            ParseDownload.setWineData(results);
                            $location.path('/home');
                        }
                    }, function(err) {
                        $scope.invalidMessage= err;
                    });                    

                } else {
                    ParseDownload.setWineData(results);
                    $location.path('/home');
                }
            } else {

                Data.getInventoryCurl($scope.credentials).then(function(results) {
                    if (results.length < 200){
                        var div = document.createElement("div");
                        div.innerHTML = results;
                        var text = div.textContent || div.innerText || "";
                        $scope.invalidMessage = text;
                    } else {
                        localStorage.setItem("bottles", results);
                        localStorage.setItem("downloadDate", Data.getFormattedDate());
                        ParseDownload.setWineData(results);
                        $location.path('/home');
                    }
                }, function(err) {
                    $scope.invalidMessage= err;
                });
            }

        };

    }
]);