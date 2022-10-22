$(function () {
    //加载树形结构
    loadModuleInfo(); 
});

//定义树形结构对象
var zTreeObj;

//加载资源树形数据
function loadModuleInfo() {
    //通过ajax查询资源列表
    $.ajax({
        type:"post",
        url:ctx+"/module/queryAllModules?roleId="+$("input[name='roleId']").val(),
        dataType:"json",
        success:function (data) {

            // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
            var setting = {
                //使用复选框
                check: {
                    enable: true
                },
                //使用简单的JSON数据
                data: {
                    simpleData: {
                        enable: true
                    }
                },
                //绑定函数
                callback: {
                    //当checkbox/radio 被选中或取消选中时触发的函数
                    onCheck: zTreeOnCheck
                }
            };
            zTreeObj = $.fn.zTree.init($("#test1"), setting, data);
        }
    })
}

//被选中或取消时候触发
function zTreeOnCheck(event, treeId, treeNode) {
    // alert(treeNode.tId + ", " + treeNode.name + "," + treeNode.checked);
    //获取所有被勾选的节点集合，如果checked=false,表示未勾选的节点。如果checked=true,表示获取勾选的节点
    var nodes= zTreeObj.getCheckedNodes(true);
    //获取所有的资源的id值 mIds=1&mIds=2&mIds=3
    //判断并遍历选中的节点集合
    if (nodes.length>0){
        //定义资源ID
        var mIds="mIds";
        //遍历节点集合,获取资源的ID
        for (var i=0;i<nodes.length;i++){
            if (i<nodes.length-1){
                mIds += nodes[i].id + "&mIds=";
            }else {
                mIds += nodes[i].id;
            }
        }
        console.log(mIds);
    }
    $.ajax({
        type:"post",
        url:ctx+"/role/addGrant",
        data:mids+"&roleId="+$("input[name='roleId']").val(),
        dataType:"json",
        success:function (data) {
            console.log(data);
        }
    })

};