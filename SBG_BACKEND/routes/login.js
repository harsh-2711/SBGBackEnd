const db=require('../db')
const express=require('express');
const router=express();


router.post("/login",(req,res,next)=>{
    // console.log(req.body);
     const username=req.body.username
     const password=req.body.password
    db.query("select * from login where UserName=? && PassWord=?",[username,password],(err,data)=>{     
         
    if(data.length<1)
    {
        res.status(400);
    }
    else
    {
        const name = data[0].Name;
        db.query("select RoleName from role where RoleId = ?",[data[0].RoleId],(err,data)=>{
            if(err){
                console.log("Error in login.js");
            }
            else{
                req.session.username=username;
                res.send({
                    userRole: data[0].RoleName,
                    name: name
                });
            }
        });
        
    }
        
    })

})


module.exports=router;