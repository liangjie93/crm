app.controller('manager2Ctrl', function ($scope,$http) {
    $http.get("../data/myJson.json").success(function(response) {$scope.pers = response.pers;console.log(response.pers);});
    $scope.editMarket = function(id){
        $scope.name = $scope.pers[id-1].name;
        $scope.phone = $scope.pers[id-1].phone;
        $scope.remark = $scope.pers[id-1].remark;
    }
    $scope.$watch('name',function(){$scope.test1();});
    $scope.$watch('phone',function(){$scope.test1();});
    $scope.test1 = function(){   
        if (!$scope.name ||!$scope.phone ) {
            $scope.incomplete = true;
        }else{
            $scope.incomplete = false;
        }   
    }
    $scope.$watch('new_name',function(){$scope.test2();});
    $scope.$watch('new_phone',function(){$scope.test2();});
    $scope.test2 = function(){   
        if (!$scope.new_name ||!$scope.new_phone ) {
            $scope.new_incomplete = true;
        }else{
            $scope.new_incomplete = false;
        }   
    }
});