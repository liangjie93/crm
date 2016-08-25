app.controller('manager2Ctrl', function ($scope,$http) {

//销售人员显示
    $http.post("/crm/user/info/lists",{"start_page": 0,"page_size": 0})
    .success(function(response) {
        $scope.salesmans = response.data.list;
        console.log(response.data.list)
    });
//添加
    $scope.$watch('new_name',function(){$scope.test2();});
    $scope.$watch('new_phone',function(){$scope.test2();});
    $scope.$watch('new_account',function(){$scope.test2();});
    $scope.$watch('new_password',function(){$scope.test2();});
    $scope.test2 = function(){   
        if (!$scope.new_name ||!$scope.new_phone ||!$scope.new_account ||!$scope.new_password ) {
            $scope.new_incomplete = true;
        }else{
            $scope.new_incomplete = false;
        }   
    }  
    // $scope.submitForm = function(isValid) {
    //         if (!isValid) {
    //             alert('验证失败');
    //         }
    //     };
//保存
    $scope.saveUser = function(){
        $http.post('/crm/user/add',{"name": $scope.new_name,"remark": $scope.remark,"phone": $scope.new_phone,"pwd": $scope.new_password,"account": $scope.new_account})
        .success(function(data){
            console.log(data);
            if(data.code == 0){
                console.log($scope.new_name);
            }else if(data.code == 10010){
                alert("此账号已存在")
            }else if(data.code ==10027){
                alert("用户没有登陆账号")
            }
            
        })
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
//确认删除？    
    $scope.conDel = false;
    $scope.wantDel = function($index){
        // console.log($index);
        $scope.conDel = true;
    }
    $scope.cancelDel = function(){
        $scope.conDel = false;
    }    
//删除
    $scope.delMarket = function($index){
        console.log($scope.salesmans[$index]);
        console.log($index);
        console.log($scope.salesmans[$index].id);
        // $http.post("/crm/user/delete/"+$scope.salesmans[$index].id)
        // .success(function(result){
            // if(result.code == 0){
            //      $scope.salesmans.splice($index,1);

            // }else{
            //     alert(msg)
            // }
        // })
    }


//分页
    $scope.page = {
        "pageSize":10,"pageNo":1,"totalCount":99
    };
    $scope.pageChanged = function(){

    }
});
