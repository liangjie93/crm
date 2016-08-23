//manager1

app.controller('infoCtrl', function ($scope,$http) {
    $http.get("../data/myJson.json").success(function(response) {$scope.infos = response.infos;});
});

app.controller('editClient', function($scope){
    $http.get("../data/myJson.json").success(function(response) {$scope.infos = response.infos;});
    $scope.editClient = function(id){
        $scope.company = $scope.infos[id-1].company;
        $scope.contact = $scope.infos[id-1].contact;
        $scope.cusPhone = $scope.infos[id-1].cusPhone;
        $scope.products = $scope.infos[id-1].products;
        $scope.price = $scope.infos[id-1].price;
        $scope.progress = $scope.infos[id-1].progress;
        $scope.manager = $scope.infos[id-1].manager;
        $scope.date = $scope.infos[id-1].date;
    }
})

app.controller('optionSalesman', function($scope,$http){  //manager11、addClient
    $http.get("../data/myJson.json").success(function(response) {
        $scope.salesmans = response.salesmans;

    });


});

app.controller('searchCtrl',function($scope,$http){
    $http.get("../data/myJson.json").success(function(response) {      
        var tip = response.tip; 
        $scope.tip = tip;
        var tipArr = [];

        for(var i in tip){
            tipArr.push(tip[i].company + '-' + tip[i].manager);

            var list = tipArr;
            //测试用的数据
            // var list = ["浙江-who0", "上海-111", "浙江-122", "浙江-123", "上海-211", "上海-222", "浙江-223", "浙江-311", "北京-322", "浙江-333", "浙江-411", "北京-422", "北京-433", "浙江-511", "浙江-522",'浙江-533'];
            var old_value = "";
            var highlightindex = -1;   //高亮

            //自动完成
            function AutoComplete(auto, search, mylist) {
                if ($("#" + search).val() != old_value || old_value == "") {
                    var autoNode = $("#" + auto);   //缓存对象（弹出框）
                    var carlist = new Array();
                    var n = 0;
                    old_value = $("#" + search).val();

                    for (i in mylist) {
                        if (mylist[i].indexOf(old_value) >= 0) {
                            carlist[n++] = mylist[i];
                        }
                    }
                    if (carlist.length == 0) {
                        autoNode.hide();
                        return;
                    }
                    autoNode.empty();  //清空上次的记录
                    for (i in carlist) {
                        var wordNode = carlist[i];   //弹出框里的每一条内容

                        var newDivNode = $("<div>").attr("id", i);    //设置每个节点的id值
                        newDivNode.attr("style", "font:14px/25px arial;height:25px;padding:0 8px;cursor: pointer;");

                        newDivNode.html(wordNode).appendTo(autoNode);  //追加到弹出框

                        //鼠标移入高亮，移开不高亮
                        newDivNode.mouseover(function () {
                            if (highlightindex != -1) {        //原来高亮的节点要取消高亮（是-1就不需要了）
                                autoNode.children("div").eq(highlightindex).css("background-color", "white");
                            }
                            //记录新的高亮节点索引
                            highlightindex = $(this).attr("id");
                            $(this).css("background-color", "#ebebeb");
                        });
                        newDivNode.mouseout(function () {
                            $(this).css("background-color", "white");
                        });

                        //鼠标点击文字上屏
                        newDivNode.click(function () {
                            //取出高亮节点的文本内容
                            var comText = autoNode.hide().children("div").eq(highlightindex).text();
                            highlightindex = -1;
                            //文本框中的内容变成高亮节点的内容
                            $("#" + search).val(comText);
                        })
                        if (carlist.length > 0) {    //如果返回值有内容就显示出来
                            autoNode.show();
                        } else {               //服务器端无内容返回 那么隐藏弹出框
                            autoNode.hide();
                            //弹出框隐藏的同时，高亮节点索引值也变成-1
                            highlightindex = -1;
                        }
                    }
                }

                //点击页面 隐藏自动补全提示框
                document.onclick = function (e) {
                    var e = e ? e : window.event;
                    var tar = e.srcElement || e.target;
                    if (tar.id != search) {
                        if ($("#" + auto).is(":visible")) {
                            $("#" + auto).css("display", "none")
                        }
                    }
                }

            }

            $(function () {
                old_value = $("#search_text").val();
                $("#search_text").focus(function () {
                    if ($("#search_text").val() == "") {
                        AutoComplete("auto_div", "search_text", list);
                    }
                });

                $("#search_text").keyup(function () {
                    AutoComplete("auto_div", "search_text", list);
                });
            });

        }
    });
});

//manager2
app.controller('manager2Ctrl', function ($scope,$http) {
    $http.get("../data/myJson.json").success(function(response) {$scope.pers = response.pers;});
    $scope.editMarket = function(id){
    	$scope.name = $scope.pers[id-1].name;
		$scope.phone = $scope.pers[id-1].phone;
		$scope.remark = $scope.pers[id-1].remark;
    }
    $scope.$watch('name',function(){$scope.test();});
    $scope.$watch('phone',function(){$scope.test();});
    $scope.test = function(){	
    	if (!$scope.name ||!$scope.phone ) {
     		$scope.incomplete = true;
  		}else{
  			$scope.incomplete = false;
  		}	
    }
});


//addClient

app.controller('productCtrl',function($scope,$http){
    $scope.products = [{type:''}];
    $http.get("../data/myJson.json").success(function(response) {$scope.purposes = response.purposes;});
    $scope.addProduct = function() {
        $scope.products.push({type:''});
    };
    $scope.removeProduct = function(contactToRemove) {
        var index = $scope.products.indexOf(contactToRemove);
        $scope.products.splice(index, 1);
    };
});

    //上传图片
app.directive('fileModel', ['$parse', function ($parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs, ngModel) {
      var model = $parse(attrs.fileModel);
      var modelSetter = model.assign;
      element.bind('change', function(event){
        scope.$apply(function(){
          modelSetter(scope, element[0].files[0]);
        });
        //附件预览
       scope.file = (event.srcElement || event.target).files[0];
        scope.getFile();
      });
    }
  };
}]);

app.controller('UploaderController', function($scope, fileReader){
    $scope.getFile = function () {
        fileReader.readAsDataUrl($scope.file, $scope)
        .then(function(result) {
            $scope.imageSrc = result;
        });
    };
})
app.factory('fileReader', ["$q", "$log", function($q, $log){
  var onLoad = function(reader, deferred, scope) {
    return function () {
      scope.$apply(function () {
        deferred.resolve(reader.result);
      });
    };
  };
  var onError = function (reader, deferred, scope) {
    return function () {
      scope.$apply(function () {
        deferred.reject(reader.result);
      });
    };
  };
  var getReader = function(deferred, scope) {
    var reader = new FileReader();
    reader.onload = onLoad(reader, deferred, scope);
    reader.onerror = onError(reader, deferred, scope);
    return reader;
  };
  var readAsDataURL = function (file, scope) {
    var deferred = $q.defer();
    var reader = getReader(deferred, scope);         
    reader.readAsDataURL(file);
    return deferred.promise;
  };
  return {
    readAsDataUrl: readAsDataURL  
  };
}])
//上传图片结束

