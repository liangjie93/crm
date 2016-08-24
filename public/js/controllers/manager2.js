app.controller('manager2Ctrl', function ($scope,$http) {

//销售人员显示
    $http.post("/crm/user/info/lists",{"start_page": 0,"page_size": 0})
    .success(function(response) {
        $scope.salesmans = response.data.list;
    });
//添加
    $scope.$watch('new_name',function(){$scope.test2();});
    $scope.$watch('new_phone',function(){$scope.test2();});
    $scope.test2 = function(){   
        if (!$scope.new_name ||!$scope.new_phone ) {
            $scope.new_incomplete = true;
        }else{
            $scope.new_incomplete = false;
        }   
    }  
//编辑
    $scope.editMarket = function($index){
        console.log($scope.salesmans[$index]);
        $scope.name = $scope.salesmans[$index].name;
        $scope.phone = $scope.salesmans[$index].phone;
        $scope.remark = $scope.salesmans[$index].remark;
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
//删除
    // $scope.confirmDle = function(){
    //     alert()
    // }
    $scope.delMarket = function($index){
        console.log($index);
        console.log($scope.salesmans[$index].id);
        $http.post("/crm/user/delete/"+$scope.salesmans[$index].id)
        .success(function(result){
            if(result.code == 0){
                 $scope.salesmans.splice($index,1);

            }else{
                alert(msg)
            }
        })
    }


});