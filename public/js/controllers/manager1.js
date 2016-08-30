app.controller('manager1Ctrl', function($scope,$http,$filter){

//管路员查看销售经理 下拉列表
    $http.post("/crm/user/lists",{"start_page": 0,"page_size": 0})
    .success(function(response) {
        $scope.sells = response.data.list;
        console.log($scope.sells)
    });
//类别 下拉列表
    $scope.types = ["A类","B类",'C类','D类'];
    $http.post("/crm/client/search",
        {
          "start_page": 0,
          "page_size": 0,
          "select_type": $scope.x,
          "seller_id": 0
        })    

//分页         
    $http.post("/crm/client/search",{"start_page":1 ,"page_size": $scope.pageSize,"select_type": "string","seller_id": 0}).success(function(response) {           
            $scope.clients = response.data.list; 
            //日期格式化
            $filter("date")($scope.lasttime, "yyyy-MM-dd");
        //分页总数    
            $scope.pageSize = 10;
            $scope.pages = response.data.pages; //分页数
            $scope.newPages = $scope.pages > 10 ? 10 : $scope.pages;
            $scope.pageList = [];
            $scope.selPage = 1;
            //设置表格数据源(分页)
            $scope.setData = function () {
                $scope.items = $scope.clients.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));//通过当前页数筛选出表格当前显示数据
            }
           
            $scope.items = $scope.clients.slice(0, $scope.pageSize);
            //分页要repeat的数组
            for (var i = 0; i < $scope.newPages; i++) {
                $scope.pageList.push(i + 1);
            }
            //打印当前选中页索引
            $scope.selectPage = function (page) {
                 $http.post("/crm/client/search",{"start_page":page ,"page_size": $scope.pageSize,"select_type": "string","seller_id": 0}).success(function(response) {           
            $scope.clients = response.data.list;})
            //不能小于1大于最大
                if (page < 1 || page > $scope.pages) return;
                //最多显示分页数5
                if (page > 2) {
                //因为只显示5个页数，大于2页开始分页转换
                    var newpageList = [];
                    for (var i = (page - 3) ; i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)) ; i++) {
                        newpageList.push(i + 1);
                    }
                    $scope.pageList = newpageList;
                }
                $scope.selPage = page;
                $scope.setData();
                $scope.isActivePage(page);
                console.log("选择的页：" + page);
            };
            //设置当前选中页样式
            $scope.isActivePage = function (page) {
                return $scope.selPage == page;
            };
            //上一页
            $scope.Previous = function () {
                $scope.selectPage($scope.selPage - 1);
            }
            //下一页
            $scope.Next = function () {
                $scope.selectPage($scope.selPage + 1);
            };   
        })   
//获取客户信息
    $scope.load = function(){
        $http.post("/crm/client/search",{"start_page": 1,"page_size": $scope.pageSize,"select_type": "string","seller_id": 0})
        .success(function(response) {           
            $scope.clients = response.data.list;
    // //输入提示框    
        //     var tip = response.data.list; 
        //     $scope.tip = tip;
        //     // console.log(tip)
        //     var tipArr = [];
        //     for(var i in tip){
        //         tipArr.push(tip[i].company);
        //         var list = tipArr;

        //         //测试用的数据
        //         // var list = ["浙江-who0", "上海-111", "浙江-122", "浙江-123", "上海-211", "上海-222", "浙江-223", "浙江-311", "北京-322", "浙江-333", "浙江-411", "北京-422", "北京-433", "浙江-511", "浙江-522",'浙江-533'];
        //         var old_value = "";
        //         var highlightindex = -1;   //高亮
        //         //自动完成
        //         function AutoComplete(auto, search, mylist) {
        //             if ($("#" + search).val() != old_value || old_value == "") {
        //                 var autoNode = $("#" + auto);   //缓存对象（弹出框）
        //                 var carlist = new Array();
        //                 var n = 0;
        //                 old_value = $("#" + search).val();

        //                 for (i in mylist) {
        //                     if (mylist[i].indexOf(old_value) >= 0) {
        //                         carlist[n++] = mylist[i];
        //                     }
        //                 }
        //                 if (carlist.length == 0) {
        //                     autoNode.hide();
        //                     return;
        //                 }
        //                 autoNode.empty();  //清空上次的记录
        //                 for (i in carlist) {
        //                     var wordNode = carlist[i];   //弹出框里的每一条内容

        //                     var newDivNode = $("<div>").attr("id", i);    //设置每个节点的id值
        //                     newDivNode.attr("style", "font:14px/25px arial;height:25px;padding:0 8px;cursor: pointer;");

        //                     newDivNode.html(wordNode).appendTo(autoNode);  //追加到弹出框

        //                     //鼠标移入高亮，移开不高亮
        //                     newDivNode.mouseover(function () {
        //                         if (highlightindex != -1) {        //原来高亮的节点要取消高亮（是-1就不需要了）
        //                             autoNode.children("div").eq(highlightindex).css("background-color", "white");
        //                         }
        //                         //记录新的高亮节点索引
        //                         highlightindex = $(this).attr("id");
        //                         $(this).css("background-color", "#ebebeb");
        //                     });
        //                     newDivNode.mouseout(function () {
        //                         $(this).css("background-color", "white");
        //                     });

        //                     //鼠标点击文字上屏
        //                     newDivNode.click(function () {
        //                         //取出高亮节点的文本内容
        //                         var comText = autoNode.hide().children("div").eq(highlightindex).text();
        //                         highlightindex = -1;
        //                         //文本框中的内容变成高亮节点的内容
        //                         $("#" + search).val(comText);



        //                     })
        //                     if (carlist.length > 0) {    //如果返回值有内容就显示出来
        //                         autoNode.show();
        //                     } else {               //服务器端无内容返回 那么隐藏弹出框
        //                         autoNode.hide();
        //                         //弹出框隐藏的同时，高亮节点索引值也变成-1
        //                         highlightindex = -1;
        //                     }
        //                 }
        //             }

        //             //点击页面 隐藏自动补全提示框
        //             document.onclick = function (e) {
        //                 var e = e ? e : window.event;
        //                 var tar = e.srcElement || e.target;
        //                 if (tar.id != search) {
        //                     if ($("#" + auto).is(":visible")) {
        //                         $("#" + auto).css("display", "none")
        //                     }
        //                 }
        //             }

        //         }

        //         $(function () {
        //             old_value = $("#search_text").val();
        //             $("#search_text").focus(function () {
        //                 if ($("#search_text").val() == "") {
        //                     AutoComplete("auto_div", "search_text", list);
        //                 }
        //             });

        //             $("#search_text").keyup(function () {
        //                 AutoComplete("auto_div", "search_text", list);
        //             });
        //         });

        //     }

        });   
    }
    $scope.load();


//建议框

    // $scope.click = false ;
    $scope.suggest = function(){
        $scope.click = true ;
        $http.post("/crm/client/suggest",{ "start_page": 1,"page_size": 10, "company": $scope.company})
        .success(function(response){
            // console.log(response.data.list)
            $scope.tip = response.data.list;
            var tip = response.data.list; 
            $scope.tip = tip;
            console.log(tip)
            var tipArr = [];
            for(var i in tip){
                tipArr.push(tip[i].company);
                var list = tipArr;                 
                console.log(list)
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
        })

    }

//搜索
    $scope.search = function(){
        // console.log($scope.x.company)
        console.log($scope.selectSalesman)
        //  $http.post("/crm/client/search",{
        //       "start_page": 0,
        //       "page_size": 0,
        //       "select_type": $scope.serachType,
        //       "seller_id": $scope.sell.id,
        //       "company": $scope.x.company
        // })
        // .success(function(response){

        // })
    }    
//生成报表
    $scope.export = function(){
        var form = $("<form>");   //定义一个form表单
        form.attr('style','display:none');   //在form表单中添加查询参数
        form.attr('target','');
        form.attr('method','get');
        form.attr('action',"/crm/client/export");
        var input1 = $('<input>'); 
        input1.attr('type','hidden'); 
        input1.attr('name','exportPostTime'); 
        input1.attr('value','timeString'); 
        $('body').append(form);  //将表单放置在web中
        form.append(input1);   //将查询参数控件提交到表单上
        form.submit();   //表单提交
    }

//上传图片
    $scope.uploadImg = function(){
       
    }

//编辑客户
    $scope.editClient = function($index){                        
        console.log($scope.clients[$index]);//当前用户信息
        $scope.id = $scope.clients[$index].id;
        console.log($scope.clients[$index].id)
        $scope.company = $scope.clients[$index].company;
        $scope.contractName = $scope.clients[$index].contractName;
        $scope.contractPhone = $scope.clients[$index].contractPhone;
        $scope.deptName = $scope.clients[$index].deptName;           
        $scope.testAccount = $scope.clients[$index].testAccount;
        $scope.sellName = $scope.clients[$index].sellName;
        $scope.products = $scope.clients[$index].products;//产品 价格
        $scope.remark =  $scope.clients[$index].remark;        
    //保存  更新客户信息
        $scope.saveEditClient = function(){
            var req_data={};
            req_data={
                "id": $scope.id,
                "company": $scope.company,
                "contractName": $scope.contractName,
                "contractPhone": $scope.contractPhone,
                "deptname":  $scope.deptName,
                "products": $scope.products,
                "testAccount": $scope.testAccount,
                "remark": $scope.remark,
                "businessLicense": "url"
            }
            console.info(req_data);
            if($scope.products==null)return;
             $http.post("/crm/client/modify",
               JSON.stringify(req_data) 
            ).success(function(data){
                if (data.code == 0) { 
                    console.log(data)
                    $scope.load();
                    $('.myModal').modal('hide');
                    $scope.load();    
                }else{
                    
                }
            })    
        };
                
    }
    
//产品
    $http.post('/crm/product/lists',{})
    .success(function(response){
        $scope.purposes = response.data;
        console.log(response.data);
    })
    //产品意向 增加删除
    $scope.product = [{name:'',price:'',id:''}];
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
            $http.post("/crm/client/delete/"+$scope.id).success(function(result){
                if(result.code == 0){
                    $scope.clients.splice($index,1)
                }
                $('#wantDel').modal('hide');//关闭模态框
            })
        }
    }

//查看进展记录 添加
    $scope.typeDetil = [
        {"id":"A","type":"A类(用意非常明确且重点维护)"},
        {"id":"B","type":"B类(意向比较明确，但需要持续沟通)"},
        {"id":"C","type":'C类(无明显意向，正在沟通中)'},
        {"id":"D","type":'D类(无意向，正在沟通)'}
    ];

    $scope.progress = function($index){
        // console.log($scope.clients[$index].selectType)
        $scope.new_progress = '';
        $scope.clientId = $scope.clients[$index].id;
        // $scope.typeId = $scope.type.id;
        $filter("date")($scope.lasttime, "yyyy-MM-dd");
       
        $scope.company = $scope.clients[$index].company;
        $http.post("/crm/client/progress/"+$scope.clientId+"/lists")
        .success(function(response){
            $scope.records = response.data.list;
            // console.log(response)
            $scope.save=false
         //提交進展
            $scope.submit = function(){ 
                console.log($scope.type) 
                console.log($scope.new_progress)
                var data = {
                      "message": $scope.new_progress,
                      "selectType": $scope.type, //ng-model='type' $scope.type值为value='{{type.id}}' ；undefined时可以提交 所以在没有选择时 不会报错
                      "clientId": $scope.clientId   
                }
                console.log(data)
                $http.post("/crm/client/process/save",data)
                .success(function(result){
                    if($scope.new_progress != ""){
                        if(result.code == 0){
                            $scope.new_progress='';
                            $('#maintain').modal('hide');
                        }
                    }else {alert("请输入信息") }
                $scope.load();                           
                });
              
            }
        })
   

    }

});
