app.controller('manager1Ctrl',function($scope){});
app.controller('manager2Ctrl',function($scope){});
app.controller('addClientCtrl',function($scope){});
// app.controller('editClientCtrl',function($scope){});


app.config(function($routeProvider){
    
    $routeProvider
    .when('/manager1',{
        templateUrl:'manager1.html',
        controller: 'manager1Ctrl',
    })
    .when('/manager2',{
        templateUrl:'manager2.html',
        controller: 'manager2Ctrl'
    })
    .when('/manager1/addClient',{
        templateUrl:'addClient.html',
        controller: 'addClientCtrl'
    })
    // .when('/manager1/editClient',{
    //     templateUrl:'editClient.html',
    //     controller: 'editClientCtrl'
    // })
    .otherwise({
        redirectTo: 'manager1.html'
    });
   
});
