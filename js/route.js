app.controller('manager1Controller',function($scope){});
app.controller('manager2Controller',function($scope){});
app.controller('addClientController',function($scope){});

app.config(function($routeProvider){
    $routeProvider
    .when('/manager1',{
        templateUrl:'manager1.html',
        controller: 'manager1Controller',
        // resolve: {
        //         deps: app.resolveScriptDeps([
        //             'js/jquery.zclip.min.js',
        //             'yourjs2.js'
        //         ])
        //     }
    })
    .when('/manager2',{
        templateUrl:'manager2.html',
        controller: 'manager2Controller'})
    .when('/edit',{
        templateUrl:'addClient.html',
        controller: 'addClientController'})

    .otherwise({
        redirectTo: 'manager1.html'
    });
   
});
