app.controller('manager2Ctrl', function ($scope,$http) {

//分页销售人员显示
    $scope.load = function(){
        $http.post("/crm/user/info/lists",{"start_page": 1,"page_size": $scope.pageSize}).success(function(response) {
            $scope.salesmans = response.data.list;
            console.log(response.data.list);
            //分页总数    
            $scope.pageSize = 10;
            $scope.pages = response.data.pages; //分页数
            $scope.newPages = $scope.pages > 10 ? 10 : $scope.pages;
            $scope.pageList = [];
            $scope.selPage = 1;
            //设置表格数据源(分页)
            $scope.setData = function () {
                $scope.items = $scope.salesmans.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));//通过当前页数筛选出表格当前显示数据
                console.log($scope.items)
            }
           
            $scope.items = $scope.salesmans.slice(0, $scope.pageSize);
            //分页要repeat的数组
            for (var i = 0; i < $scope.newPages; i++) {
                $scope.pageList.push(i + 1);
            }
            //打印当前选中页索引
            $scope.selectPage = function (page) {
                 $http.post("/crm/user/info/lists",{"start_page":page ,"page_size": $scope.pageSize,"select_type": "string","seller_id": 0}).success(function(response) {           
            $scope.salesmans = response.data.list;})
            //不能小于1大于最大
                if (page < 1 || page > $scope.pages) return;
                //最多显示分页数5
                if (page > 2) {
                //因为只显示5个页数，大于2页开始分页转换
                    var newpageList = [];
                    for (var i = (page - 3) ; i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)) ; i++) {
                        newpageList.push(i + 1);
                    }
                    $scope.pageList = newpageList;
                }
                $scope.selPage = page;
                $scope.setData();
                $scope.isActivePage(page);
                console.log("选择的页：" + page);
            };
            //设置当前选中页样式
            $scope.isActivePage = function (page) {
                return $scope.selPage == page;
            };
            //上一页
            $scope.Previous = function () {
                $scope.selectPage($scope.selPage - 1);
            }
            //下一页
            $scope.Next = function () {
                $scope.selectPage($scope.selPage + 1);
            };   
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
            }else if(data.code ==10035){
                alert("没有操作权限")
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
        //编辑后保存 更新
        $scope.saveEditClient = function(editId){
            console.log($scope.salesmans[$index]);
            console.log($scope.editId);
            $http.post('/crm/user/modify',{"id": $scope.editId,"remark": $scope.remark,"phone": $scope.phone,"name": $scope.name})
            .success(function(data){
                console.log(data);
                if(data.code == 0 ){
                    $('#editMarket').modal('hide');//关闭模态框
                    $scope.password='';
                    // $scope.load();//数据刷新
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
        $scope.id = $scope.salesmans[$index].id;
        console.log($scope.id);  //点击后会弹出三个叠加的弹框，给弹框的删除按钮一个唯一的id
    //删除
        $scope.delMarket = function(id){
            console.log($scope.salesmans[$index]);
            $http.post("/crm/user/delete/"+$scope.id).success(function(result){
                if(result.code == 0){
                    $scope.salesmans.splice($index,1);
                     
                }
                $('#wantDel').modal('hide');//关闭模态框
               
            })
        }
    }    

});
