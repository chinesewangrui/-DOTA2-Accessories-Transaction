//专门负责请求页脚的html片段和页头的css文件
$(function(){
    $.ajax({
        url:"footer.html",
        type:"get",
        //data:{},不用谢，引起请求文件不带参数
        //因为请求的时静态页面，所以返回的是html片段，不是json
        //data:"json",不用写
        //请求成功后：
        success:function(result){
            //用result获得的html片段创建新的footer元素代替id为footer的空footer
            $(result).replaceAll("#footer");
            $(`<link rel="stylesheet" href="css/footer.css">`).appendTo("foot")
        }
    })
})