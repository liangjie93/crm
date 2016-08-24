app.controller('manager1Ctrl', function($scope,$http){

    //销售经理
    $http.get("../data/myJson.json").success(function(response) {
        $scope.salesmans = response.salesmans;

    });
    //获取客户信息
    $http.get("../data/myJson.json").success(function(response) {
        $scope.infos = response.infos;

    //输入提示框    
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

    //生成报表
    $scope.export =

    //编辑客户
    $scope.editClient = function(id){                        
        console.log($scope.infos[id-1]);
        $scope.company = $scope.infos[id-1].company;
        $scope.contact = $scope.infos[id-1].contact;
        $scope.cusPhone = $scope.infos[id-1].cusPhone;
        $scope.department = $scope.infos[id-1].department;           
        $scope.testAccount = $scope.infos[id-1].testAccount;
        // $scope.products = $scope.infos[id-1].products;
         $scope.prePrice = $scope.infos[id-1].prePrice;
        // $scope.progress = $scope.infos[id-1].progress;//进展
        // $scope.selectSalesman = $scope.infos[id-1].manager;                
    }
    
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
});
