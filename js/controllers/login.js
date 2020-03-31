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

            Data.getInventory($scope.credentials).then(function(results) {
                if (results.length < 200){
                    var div = document.createElement("div");
                    div.innerHTML = results;
                    var text = div.textContent || div.innerText || "";
                    $scope.invalidMessage = text;
                } else {
                    ParseDownload.setWineData(results);
                    $location.path('/home');
                }
            }, function(err) {
                $scope.invalidMessage= err;
            });

        };

    }
]);