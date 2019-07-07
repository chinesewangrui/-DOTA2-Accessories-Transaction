const mysql=require("mysql");
let pool=mysql.createPool({
    host:"127.0.0.1",
    port:3306,
    user:"root",
    password:"",
    datatbase:"dota2",
    connectionLimit:10
});
module.exports=pool;









