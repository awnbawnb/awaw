layui.use(['form', 'layer'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery;


    //关闭弹出层
    $("#closeBtn").click(function (){
        //当你再iframe页面关闭自身时
        var index=parent.layer.getFrameIndex(window.name);//先得到当前iframe层的索引
        parent.layer.close(index);//再执行关闭
        });

    $.post(ctx+"/user/queryAllSales",function (res) {
        for(var i=0;i<res.length;i++){
            if($("input[name='man']").val() == res[i].id){
                $("#assignMan").append("<option value=\""+res[i].id+"\"  selected='selected' >"+res[i].uname+"</option>");
            }else{
                $("#assignMan").append("<option value=\""+res[i].id+"\"   >"+res[i].uname+"</option>");
            }

        }
        // 重新渲染下拉框内容
        layui.form.render("select");
    });


    //监听表单submit事件
    form.on('submit(addOrUpdateSaleChance)',function (data) {
        var index= top.layer.msg("数据提交中,请稍后...",{icon:16,time:false,shade:0.8});

        //发送ajax请求
        var url = ctx+"/sale_chance/add";//添加操作

        //通过营销机会的ID来判断当前需要执行添加操作还是修改操作
        //如果营销机会的ID为空，则表示执行添加操作:如果ID不为空，则表示执行更新操作
        //通过获取隐藏域中的ID
        var saleChanceId = $("[name='id']").val();
        //判断ID是否为空
        if (saleChanceId != null && saleChanceId != ''){
            //更新操作
            url=ctx + "/sale_chance/update";
        }

        $.post(url,data.field,function (res) {
           //判断是否成功200为成功
            if(res.code==200){
                //成功
                //提示成功
                top.layer.msg("操作成功",{icon: 6});
                //关闭加载层
                top.layer.close(index);
                //关闭弹出层
                layer.closeAll("iframe");
                // 刷新父页面,重新加载数据
                parent.location.reload();
            }else{
                layer.msg(res.msg,{icon:5});
            }
        });
        return false;
    });

 /*   //加载指派人的下拉框
    $.ajax({
        type:"get",
        url:ctx + "/user/queryAllSales",
        data:{},
        success:function (data){
            // console.log(data);
            //判断返回的数据是否为空
            if (data!=null){
                //获取隐藏域设置的指派人ID
                var assignManId=$("#assignManId").val();

                //遍历返回的数据
                for (var i=0;i<data.length;i++){
                    var opt="";
                    //如果循环得到的ID与隐藏域中的ID相等，则表示被选中
                    if (assignManId==data[i].id){
                        //设置下拉选项,设置下拉选项选中
                        opt="<option value='"+data[i].id+"' selected='selected'>"+data[i].uname+"</option>";
                    }else {
                        //设置下拉选项
                        opt ="<option value='"+data[i].id+"'>"+data[i].uname+"</option>";
                    }

                    //将下拉框选项设置到下拉框中
                    $("#assignMan").append(opt);
                }
            }
            //重新渲染下拉框的内容
            layui.form.render("select");
        }
    });*/

});