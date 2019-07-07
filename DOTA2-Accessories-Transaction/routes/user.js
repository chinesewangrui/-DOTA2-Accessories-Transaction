const express=require('express');
const pool=require('../pool.js');
let router=express.Router();
//添加路由
//注册接口

//登录接口
router.get("/login/:uname&:upwd",(req,res)=>{
    var $uname=req.params.uname;
    var $upwd=req.params.upwd;
    var sql="select uname,upwd from dota2_user where uname=? and upwd=?"
    pool.query(sql,{$uname,$upwd},(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send("1")
        }else{
            res.send("0")
        }
    })
})
//用户检索

//用户列表接口

//修改用户

//删除用户

module.exports=router;



















