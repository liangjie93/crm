var app = angular.module('app', ['ngRoute', 'ui.bootstrap']);

var permissionList;
app.run(function (permissions) {
    permissions.setPermissions(permissionList);
});
app.controller("appCtrl",function($scope,$http){
    angular.element(document).ready(
        function () {
            $.get("/crm/user/permission", function (result) {
                permissionList = result.data.userinfo;
                // console.info(result); 
                $scope.judge = false;
                // angular.bootstrap(document, ['app']);
                console.log( result.data.userinfo)
                if(permissionList.role == 2){
                    $scope.judge = true;
                    
                }else{
                    $scope.user = permissionList.account;//销售人员登录 在新建客户时 下拉框默认自己
                    $scope.managerid = permissionList.id;
                    console.log($scope.managerid)
                }

            })
        }
    ) 

//退出   
    $scope.logout = function(){
        $http.get("/crm/user/logout").success(function(result){
            if(result.code == 0){
                 // window.location.replace("/crm/user/index.html");
            }
        })
    }
})

angular.module('app').factory('permissions', function ($rootScope) {
    var permissionList;
    return {
        setPermissions: function (permissons) {
            permissionList = permissons;
            $rootScope.$broadcast('permissionsChanged');
        }
    };
});
app.directive('hasPermission', function (permissions) {
    return {
        link: function (scope, element, attrs) {

            console.info("element" + element);
            function toggleVisibileBaseOnPermission() {
                if (permissions == null) {
                    element.hide();
                } else {
                    element.show();
                }
            }

            scope.$on('permissionsChanged', toggleVisibileBaseOnPermission);
        }

    }
})