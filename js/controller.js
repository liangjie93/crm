//manager1

// app.controller('searchCtrl', function ($scope) {
//     $scope.toogle = function () {
//         $scope.tip = true;
//         $scope.tip = !$scope.tip;
//     }
// })

app.controller('infoCtrl', function ($scope) {

    $scope.infos = [
        {id: 1 , company: 'zj', contact: '12', department: '22', products: 'L', price: '121W', progress: '...', manager: 'who', date: '121' },
        {id: 2 , company: 'zj', contact: '12', department: '22', products: 'L', price: '121W', progress: '...', manager: 'who', date: '121' },
        {id: 3 , company: 'zj', contact: '12', department: '22', products: 'L', price: '121W', progress: '...', manager: 'who', date: '121' },
        {id: 4 , company: 'zj', contact: '12', department: '22', products: 'L', price: '121W', progress: '...', manager: 'who', date: '121' }
    ];
})

app.controller('optionSalesman', function($scope){
	$scope.salesmans = ['liu','zhang','li','zhou']
})


//manager2
app.controller('manager2Ctrl', function ($scope) {
    $scope.pers = [
        {id: 1 , name: 'li', phone: '123' ,remark: '555'},
        {id: 2 , name: 'zi', phone: '222' ,remark: '555'},
        {id: 2 , name: 'll', phone: '133' ,remark: '555'}
    ];
    $scope.editMarket = function(id){
    	$scope.name = $scope.pers[id-1].name;
		$scope.phone = $scope.pers[id-1].phone;
		$scope.remark = $scope.pers[id-1].remark;

    }

    $scope.$watch('name',function(){$scope.test();});
    $scope.$watch('phone',function(){$scope.test();});
    $scope.test = function(){	
    	if (!$scope.name.length ||!$scope.phone.length) {
     		$scope.incomplete = true;
  		}else{
  			$scope.incomplete = false;
  		}	
    }


})



//edit
app.controller('optionPurpose',function($scope){
	$scope.purposes = ['lala','lalala']
})
        

