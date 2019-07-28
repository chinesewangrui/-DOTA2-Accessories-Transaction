/*var xhr=new XMLHttpRequest();
xhr.onreadystatechange=function(){
    if(xhr.readyState==4&&xhr.status==200){
        var result=xhr.responseText;
        result=JASON.parse(xhr.responseText);
    }
    xhr.open("post","/user/v1/reg",true);
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
    var formate="uname="+$uname+"$upwd="+$upwd;
    xhr.send(formate);
}*/
// 封装函数，保存重用的代码
// 代码中所有不确定的，都定义为形参变量
// 所有不一定执行的代码，都要加判断条件
// 四个参数
// 1、请求的url：请求的目标服务器端接口地址
// 2、type：不同的请求类型 get post put delete
// 3、callback：回调函数，对响应回的数据进行处理的函数
// 4、data：要发送的参数，
// 参数要求：
// “变量1=”+值1+“&变量2”+值2，不要带问号，必须是字符串
// 没有参数值，data获得的就是undefined
function ajax(url,type,callback,data){
    var xhr=new XMLHttpRequest();
    // 如果发送get请求时，带参数
    if(type=="get"&&data!==undefined){
        // 需要将参数用？连接到url地址结尾
        url+="?"+data
    }
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
            var result=JASON.parse(xhr.responseText);
            callback(result);
        }
    }
    xhr.open(type,url,true);
    if(type=="post"||type=="put"){
        //请求类型是post或put时，需要设置请求头数据类型
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
    }
    if(type=="post"||type=="put"){
        xhr.send(data);
    }else{
        xhr.send();
    }
}



























