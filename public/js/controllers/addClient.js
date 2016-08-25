app.controller('addClientCtrl',function($scope,$http){
   
//销售经理
    $http.get("../data/myJson.json").success(function(response) {
        $scope.salesmans = response.salesmans;

    });
//产品意向
    $scope.products = [{type:''}];
    $http.get("../data/myJson.json").success(function(response) {$scope.purposes = response.purposes;});
    $scope.addProduct = function() {
        $scope.products.push({type:''});
    };
    $scope.removeProduct = function(contactToRemove) {
        var index = $scope.products.indexOf(contactToRemove);
        $scope.products.splice(index, 1);
    };
//保存
    $scope.saveClient = function(){
      $http.post()
    }

//     
//     $scope.$watch = ('new_company',function(){$scope.test();});
//     $scope.$watch = ('new_contact',function(){$scope.test();});
//     $scope.$watch = ('new_cusPhone',function(){$scope.test();});
//     $scope.$watch = ('new_department',function(){$scope.test();});
    
//     $scope.test = function(){
//         if (!$scope.new_company ||!$scope.new_contact ||!$scope.new_cusPhone ||!$scope.new_department ) {
//             $scope.incomplete = true;
//         }else{
//             $scope.incomplete = false;
//         }
//     }

})