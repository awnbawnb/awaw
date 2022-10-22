layui.use(['form', 'layer','formSelects'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery;
    var  formSelects = layui.formSelects;


//加载下拉框
    var userId=$("input[name='id']").val();
    formSelects.config('selectId',{
        type:"post",//请求方式
        searchUrl:ctx+"/role/queryAllRoles?userId="+userId,//请求地址
        //自定义返回数据中name的key, 默认 name
        keyName: 'roleName',
        //自定义返回数据中value的key, 默认 value
        keyVal: 'id'
    },true);


    //关闭弹出层
    $("#closeBtn").click(function (){
        //当你再iframe页面关闭自身时
        var index=parent.layer.getFrameIndex(window.name);//先得到当前iframe层的索引
        parent.layer.close(index);//再执行关闭
    });

    //表单Submit监听
    form.on('submit(addOrUpdateUser)',function (data) {
        var index= top.layer.msg("数据提交中,请稍后...",{icon:16,time:false,shade:0.8});

        //得到所有的表单元素的值
        var forData=data.field;
        console.log(forData);
        //请求地址
        var url=ctx + "/user/add";//添加

        //判断用户ID是否为空,如果不为空则为更新操作
        if ($("[name='id']").val()){
            //更新操作
            var url=ctx + "/user/update";
        }


        $.post(url,forData,function (res) {
            if(res.code==200){
                top.layer.msg("操作成功",{icon: 6});
                top.layer.close(index);
                layer.closeAll("iframe");
                // 刷新父页面
                parent.location.reload();
            }else{
                layer.msg(res.msg,{icon:5});
            }
        });
        return false;
    });


});