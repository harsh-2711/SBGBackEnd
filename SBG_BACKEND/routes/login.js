const db=require('../db')
const express=require('express');
const router=express();


router.post("/login",(req,res,next)=>{
    
     const username=req.body.username
     const password=req.body.password
    db.query("select * from login where UserName=? && PassWord=?",[username,password],(err,data)=>{     
         
    if(data.length<1)
    {
        res.status(400);
    }
    else
    {
        req.session.username=username;
        res.send("Logged in successfully");

    }
        
    })

})


module.exports=router;