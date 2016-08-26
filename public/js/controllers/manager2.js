app.controller('manager2Ctrl', function ($scope,$http) {

//销售人员显示
    $scope.load = function(){
        $http.post("/crm/user/info/lists",{"start_page": 0,"page_size": 0})
        .success(function(response) {
            $scope.salesmans = response.data.list;
            console.log(response.data.list)
        });
    }
    $scope.load();
    
//添加
    //保存按钮禁用
    $scope.$watch('new_name',function(){$scope.test();});
    $scope.$watch('new_phone',function(){$scope.test();});
    $scope.$watch('new_account',function(){$scope.test();});
    $scope.$watch('new_password',function(){$scope.test();});
    $scope.test = function(){   
        if (!$scope.new_name ||!$scope.new_phone ||!$scope.new_account ||!$scope.new_password ) {
            $scope.new_incomplete = true;
        }else{
            $scope.new_incomplete = false;
        }   
    }  
//保存
    $scope.saveUser = function(){
        $http.post('/crm/user/add',{"name": $scope.new_name,"remark": $scope.new_remark,"phone": $scope.new_phone,"pwd": $scope.new_password,"account": $scope.new_account})
        .success(function(data){
            console.log(data);
            if(data.code == 0){
                console.log($scope.new_account);
                $('#addMarket').modal('hide');//关闭模态框
                    $scope.new_name='';
                    $scope.new_phone='';
                    $scope.new_password='';
                    $scope.new_account='';
                    $scope.new_remark='';   //数据清空
                    $scope.load();//数据刷新
            }else if(data.code == 10010){
                alert("此账号已存在")
            }else if(data.code ==10027){
                alert("用户没有登陆账号")
            }else if(data.code == 10023){
                alert("添加用户请补全信息")
            }
        })
    }  
//编辑
    $scope.editMarket = function($index){
        console.log($scope.salesmans[$index]);
        $scope.name = $scope.salesmans[$index].name;
        $scope.phone = $scope.salesmans[$index].phone;
        $scope.remark = $scope.salesmans[$index].remark;
        $scope.editId = $scope.salesmans[$index].id; 
        console.log($scope.editId);
        //编辑后保存
        $scope.saveEditClient = function(editId){
            console.log($scope.salesmans[$index]);
            console.log($scope.editId);
            $http.post('/crm/user/modify',{"id": $scope.editId,"remark": $scope.remark,"phone": $scope.phone,"name": $scope.name})
            .success(function(data){
                console.log(data);
                if(data.code == 0 ){
                    $('#editMarket').modal('hide');//关闭模态框
                    $scope.password='';
                    $scope.load();//数据刷新
                }
            })
        }        

    }
    $scope.$watch('name',function(){$scope.test2();});
    $scope.$watch('phone',function(){$scope.test2();});
    $scope.test2 = function(){   
        if (!$scope.name ||!$scope.phone) {
            $scope.incomplete = true;
        }else{
            $scope.incomplete = false;
        }   
    }

//确认删除？    
    $scope.wantDel = function($index){
        console.log($index);
        $scope.delId = $scope.salesmans[$index].id;
        console.log($scope.delId);  //点击后会弹出三个叠加的弹框，给弹框的删除按钮一个唯一的id
    //删除
        $scope.delMarket = function(delId){
            console.log($scope.salesmans[$index]);
            $http.post("/crm/user/delete/"+$scope.salesmans[$index].id)
            .success(function(result){
                if(result.code == 0){
                    // $scope.salesmans.splice($index,1);
                    
                }
                $('#wantDel').modal('hide');//关闭模态框
            })
        }
    }    
 

//分页
    $scope.page = {
        "pageSize":10,"pageNo":1,"totalCount":99
    };
    $scope.pageChanged = function(){

    }
});
