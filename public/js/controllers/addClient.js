app.controller('addClientCtrl',function($scope,$http,$location){
   
//销售经理
    $http.post("/crm/user/lists",{"start_page": 0,"page_size": 0})
    .success(function(response) {
        $scope.salesmans = response.data.list;
        console.log(response.data.list)
    });
//产品
    $http.post("/crm/product/lists",{})
    .success(function(response){
        console.log(response.data)
        $scope.purposes = response.data;
    })    
//产品意向 增加删除
    $scope.products = [{type:''}];
    // $http.get("../data/myJson.json").success(function(response) {$scope.purposes = response.purposes;});
    $scope.addProduct = function() {
        $scope.products.push({type:''});
    };
    $scope.removeProduct = function(contactToRemove) {
        var index = $scope.products.indexOf(contactToRemove);
        $scope.products.splice(index, 1);
    };

//添加    
    // $scope.$watch = ('new_company',function(){$scope.test();});
    // $scope.$watch = ('new_contact',function(){$scope.test();});
    // $scope.$watch = ('new_contractPhone',function(){$scope.test();});
    // $scope.$watch = ('new_deptName',function(){$scope.test();});
    // $scope.incomplete = false;
    $scope.test = function(){
        if (!$scope.new_company ||!$scope.new_contact ||!$scope.new_contractPhone ||!$scope.new_deptName ) {
            $scope.incomplete = true;
        }else{
            $scope.incomplete = false;
        }
    }
    
//保存
    $scope.saveClient = function(){
      $http.post("/crm/client/save",    
        {"company": !$scope.new_company,
          "contractname": $scope.new_contact,
          "contractphone": $scope.new_contractPhone,
          "deptname": $scope.new_deptName,
          "products": [
            {
              "id": $scope.products.$index.id,
              "price":$scope
            }
          ],
          "testaccount": $scope.new_testAccount,
          "remark": $scope.new_remark,
          "businesslicense": "string",
          "price": "string"
        }).success(function(data){
            console.log(data);
            if(data.code == 0 ){
                // $scope.toUrl = function(path){
                //     $location.path(path);
                //     console.log(path);
                // }
            }else if(data.code == 10032){
                alert("...")
            }
        })
    }
})