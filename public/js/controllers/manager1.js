app.controller('manager1Ctrl', function($scope,$http,$filter){

//管路员查看销售经理
    $http.post("/crm/user/lists",{"start_page": 0,"page_size": 0})
    .success(function(response) {
        $scope.salesmans = response.data.list;
        console.log(response.data.list)
    });
//类别
    $scope.type = ["A类","B类",'C类','D类']
    $http.post("/crm/client/search",
        {
          "start_page": 0,
          "page_size": 0,
          "select_type": $scope.x,
          "seller_id": 0
        })    
//获取客户信息
    $http.post("/crm/client/search",{"start_page": 0,"page_size": 0,"select_type": "string","seller_id": 0})
    .success(function(response) {
        $scope.clients = response.data.list;
        // console.log(response.data.list);
        // var clients = response.data.list;
        // for(i in clients){
        //     console.log(clients[i].selectType)
        //     if(clients[i].selectType == "B"){
        //         $(".second-section .table #type").css("background-color","blue")
        //     }
        // }
        

//日期格式化
    $filter("date")($scope.lasttime, "yyyy-MM-dd");

//输入提示框    
        var tip = response.data.list; 
        $scope.tip = tip;
        var tipArr = [];
        for(var i in tip){
            tipArr.push(tip[i].company + '-' + tip[i].sellName);
            var list = tipArr;
            // console.log(list);
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
    $scope.export = function(){
        var form = $("<form>");   //定义一个form表单
        form.attr('style','display:none');   //在form表单中添加查询参数
        form.attr('target','');
        form.attr('method','post');
        form.attr('action',"/crm/client/export");
        var input1 = $('<input>'); 
        input1.attr('type','hidden'); 
        input1.attr('name','exportPostTime'); 
        input1.attr('value','timeString'); 
        $('body').append(form);  //将表单放置在web中
        form.append(input1);   //将查询参数控件提交到表单上
        form.submit();   //表单提交
    }

    $scope.abbb = function(a,b){
        return a == b;
    }
//编辑客户
    $scope.editClient = function($index){                        
        console.log($scope.clients[$index]);//当前用户信息
        $scope.id = $scope.clients[$index].id;
        $scope.company = $scope.clients[$index].company;
        $scope.contractName = $scope.clients[$index].contractName;
        $scope.contractPhone = $scope.clients[$index].contractPhone;
        $scope.deptName = $scope.clients[$index].deptName;           
        $scope.testAccount = $scope.clients[$index].testAccount;
        $scope.sellName = $scope.clients[$index].sellName;
        $scope.products = $scope.clients[$index].products;//产品 价格
        $scope.remark =  $scope.clients[$index].remark;
        $scope.price = $scope.clients[$index].price;//总价

        console.log("$scope.products");
        console.log($scope.products);
        console.log($scope.purposes);
        console.log("$scope.purposes");
        console.log($scope.price);

        $scope.productList = [];

        for(var i in $scope.products){
            $scope.productList.push($scope.products[i].name);
            $scope.priceList = $scope.products[i].price;
            $scope.idList = $scope.products[i].id;

            console.log($scope.products[i])
        //保存  更新客户信息
            $scope.saveEditClient = function(){
                // console.log($scope.remark);
                console.log($scope.products);
                // console.log($scope.priceList);
                // console.log($scope.idList);
                console.log($scope.productList);
                // console.log($scope.sellName);
                $http.post("/crm/client/modify",{
                  "id": $scope.id,
                  "company": $scope.company,
                  "contractName": $scope.contractName,
                  "contractPhone": $scope.contractPhone,
                  "deptname":  $scope.deptName,
                  "products": [
                    {
                      "id": $scope.idList,
                      "price": $scope.priceList
                    }
                  ],
                  "testAccount": $scope.testAccount,
                  "remark": $scope.remark,
                  "businessLicense": "url",
                  "price": $scope.price
                }).success(function(data){
                    console.log(data)
                    if (data.code == 0) {
                        
                    }
                }) 
            }


        }  

    }
//产品
    $http.post('/crm/product/lists',{})
    .success(function(response){
        $scope.purposes = response.data;
        console.log(response.data);
    })
//产品意向 增加删除
    $scope.products = [{type:''}];
    $scope.addProduct = function() {
        $scope.products.push({type:'',price:''});
    };
    $scope.removeProduct = function(contactToRemove) {
        var index = $scope.products.indexOf(contactToRemove);
        $scope.products.splice(index, 1);
    };

//删除客户
    $scope.wantDel = function($index){
        console.log($index);
        $scope.id = $scope.clients[$index].id;
        console.log($scope.id);
        $scope.delClient = function(id){
            console.log($scope.clients[$index]);
            // $http.post("/crm/client/delete/"+$scope.id).success(function(result){
                // if(result.code == 0){
                    // $scope.clients.splice($index,1)
                // }
                $('#wantDel').modal('hide');//关闭模态框
            // })
        }
    }
//分页
    $scope.page = {
        "pageSize":10,"pageNo":1,"totalCount":99};
        $scope.pageChanged = function(){
    }    
});
