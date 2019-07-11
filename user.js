const express=require('express');
const pool=require('../pool.js');
let router=express.Router();
//添加路由
//注册接口
router.post('/v1/reg',(res,req)=>{
    var obj=req.body;
    var sql="insert into dota2_user set ?";
    pool.query(sql,[obj],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send("1")
        }else{
            res.send("0")
        }
    })
})
//登录接口
router.get("/v1/login/:uname&:upwd",(req,res)=>{
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
//用户检索,验证用户名是否可用
router.get('/v1/detail/:uname',(res,req)=>{
    var $uname=req.params.uname;
    var sql="select uname from dota2_user where uname=?";
    pool.query(sql,[$uname],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send("1")
        }else{
            res.send("0")
        }
    })
})
//用户列表接口(待补全)
router.get('/v1/userlist',(req,res)=>{
    var sql="select uid,uname,upwd,email,phone,gender,user_name from dota2_user";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
//修改用户资料
router.put('/v1/updateuser',(res,req)=>{
    var $uid=req.body.uid;
    var $uname=req.body.uname;
    var $phone=req.body.phone;
    var $email=req.body.email;
    var $user_name=req.body.user_name;
    var $gender=req.body.gender;
    var sql="update dota2_user set uname=?,phone=?,email=?,user_name=?,gender=? where uid=?"
    pool.query(sql,[$uname,$phone,$email,$user_name,$gender,$uid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send("1")
        }else{
            res.send("0")
        }
    })
})
//密码修改
router.put('/v1/updateupwd',(res,req)=>{
    var $upwd=req.body.upwd;
    var $uid=req.body.uid;
    var sql="update from dota2_user set upwd=? where uid=?";
    pool.query(sql,[$upwd,$uid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send("1")
        }else{
            res.send("0")
        }
    })
})
//删除用户
router.delete('/v1/delete/:uid',(req,res)=>{
    var $uid=req.params.uid;
    var sql="delete from dota2_user where uid=?";
    pool.query(sql,[$uid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send("1")
        }else{
            res.send("0")
        }
    })
})
module.exports=router;



















