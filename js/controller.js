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

app.controller('searchCtrl',function(){

    //测试用的数据
    var test_list = ["浙江-000", "浙江-111", "浙江-122", "浙江-123", "上海-211", "上海-222", "浙江-223", "浙江-311", "北京-322", "浙江-333", "浙江-411", "北京-422", "北京-433", "浙江-511", "浙江-522",'浙江-533'];
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
                AutoComplete("auto_div", "search_text", test_list);
            }
        });

        $("#search_text").keyup(function () {
            AutoComplete("auto_div", "search_text", test_list);
        });
    });

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
    	if (!$scope.name ||!$scope.phone ) {
     		$scope.incomplete = true;
  		}else{
  			$scope.incomplete = false;
  		}	
    }
})


//addClient
app.controller('optionPurpose',function($scope){
	$scope.purposes = ['lala','lalala']
})
        

app.controller('operateCtrl', function(){
    $(document).ready(function($){
         $('#plus').bind('click',function(){
            console.log(1);
            $(this).parent().parent().append('<label style="margin-top: 10px;" class="col-sm-2 control-label"></label><div style="margin-top: 10px;"><div class="col-sm-4" ng-controller="optionPurpose"><select class="form-control" id="inputName1" ng-model="selectPurpose" ng-options="purpose for purpose in purposes"><option value="1">下拉选择</option></select></div><div class="col-sm-2"><input type="text" class="form-control" placeholder="请输入报价"></div><div class="glyphicon glyphicon-remove" id="del" aria-hidden="true"></div></div>')
        })
        
    })
    
   
})