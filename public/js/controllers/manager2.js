app.controller('manager2Ctrl', function ($scope,$http) {
    //销售人员显示
    $http.post("/crm/user/info/lists",{"start_page": 0,"page_size": 0})
    .success(function(response) {
        $scope.lists = response.data.list;
    });
    

    
    //编辑
    $scope.editMarket = function(id){
        $scope.name = $scope.lists[id-1].name;
        $scope.phone = $scope.lists[id-1].phone;
        $scope.remark = $scope.lists[id-1].remark;
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