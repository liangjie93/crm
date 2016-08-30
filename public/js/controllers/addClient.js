app.controller('addClientCtrl',function($scope,$http,$location){
   
//销售经理
    $http.post("/crm/user/lists",{"start_page": 0,"page_size": 0})
    .success(function(response) {
        $scope.salesmans = response.data.list;
        console.log($scope.salesmans)

    });
//产品
    $http.post("/crm/product/lists",{})
    .success(function(response){
        // console.log(response.data)
        $scope.purposes = response.data;
    })    
    //产品意向 增加删除
    $scope.products = [{name:'',price:''}];
    $scope.addProduct = function() {
        $scope.products.push({type:'',price:''});
    };
    $scope.removeProduct = function(contactToRemove) {
        var index = $scope.products.indexOf(contactToRemove);
        $scope.products.splice(index, 1);
    };
//保存 
    // if(!$scope.new_company ||)
    $scope.saveClient = function(){
        console.log(111)
        console.log($scope.id)
        // console.log($scope.new_contact)
        // console.log($scope.new_contractPhone)
        // console.log($scope.new_deptName)
        // console.log($scope.selectSalesman.id);
        // console.log($scope.products);
        var req_data = {
            "company": $scope.new_company,
            "contractName": $scope.new_contact,
            "contractPhone": $scope.new_contractPhone,
            "deptname":  $scope.new_deptName,
            "managerid":$scope.managerid,
            "products":$scope.products,
            "testAccount": $scope.testAccount,
            "remark": $scope.remark,
            "businessLicense": "url"
        }
        console.log(req_data);
        if($scope.products==null){
           return
        };
         $http.post("/crm/client/save",
           JSON.stringify(req_data) 
        ).success(function(data){
            if (data.code == 0) { 
                console.log(data)
                $scope.toUrl = function(path){
                    path = "#/manager1"
                }
            }else{
                    alert("信息不能为空")
                }
        })    
    }

    // $scope.uploadImg = function(){
    //     $http.post("/crm/img/upload").success(function(result){
    //         $scope.imageSrc=result;
    //         console.log($scope.imageSrc)
    //     })
    // }

//上传图片
    $(function() {  
        $("#uploadImage").fileupload({  
            url: '/crm/img/upload',  
            sequentialUploads: true  
        }).bind('fileuploadprogress', function (e, data) {  
            var progress = parseInt(data.loaded / data.total * 100, 10);  
            $("#progress").css('width',progress + '%');  
            $("#progress").html(progress + '%');  
        }).bind('fileuploaddone', function (e, data) {  
            $("#show").attr("src","__PUBLIC__/"+data.result);  
            $("#upload").css({display:"none"});  
            $("#cancle").css({display:""});  
        });  
                 
    });  

   
})
// app.directive('fileModel', ['$parse', function ($parse) {
//   return {
//     restrict: 'A',
//     link: function(scope, element, attrs, ngModel) {
//       var model = $parse(attrs.fileModel);
//       var modelSetter = model.assign;
//       element.bind('change', function(event){
//         scope.$apply(function(){
//           modelSetter(scope, element[0].files[0]);
//         });
//         //附件预览
//            scope.file = (event.srcElement || event.target).files[0];
//         scope.getFile();
//       });
//     }
//   };
// }]);
// app.controller('addClientCtrl', function($scope, fileReader){
//     $scope.getFile = function () {
//         fileReader.readAsDataUrl($scope.file, $scope)
//                       .then(function(result) {
//                           $scope.imageSrc = result;
//                       });
//     };
// })
// app.factory('fileReader', ["$q", "$log", function($q, $log){
//   var onLoad = function(reader, deferred, scope) {
//     return function () {
//       scope.$apply(function () {
//         deferred.resolve(reader.result);
//       });
//     };
//   };
//   var onError = function (reader, deferred, scope) {
//     return function () {
//       scope.$apply(function () {
//         deferred.reject(reader.result);
//       });
//     };
//   };
//   var getReader = function(deferred, scope) {
//     var reader = new FileReader();
//     reader.onload = onLoad(reader, deferred, scope);
//     reader.onerror = onError(reader, deferred, scope);
//     return reader;
//   };
//   var readAsDataURL = function (file, scope) {
//     var deferred = $q.defer();
//     var reader = getReader(deferred, scope);         
//     reader.readAsDataURL(file);
//     return deferred.promise;
//   };
//   return {
//     readAsDataUrl: readAsDataURL  
//   };
// }])


