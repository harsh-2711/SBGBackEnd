const db=require('../db')
const express=require('express');
const router=express()


router.post("/data",(req,res,next)=>{
    const user=req.body.user;
   
    db.query("select * from login where UserName=?",[user],(err,data1)=>{
        if(err)
        res.status(400)
        else
        {
              res.send({ 
                  user:data1[0].Name,
                 status:data1[0].IsReset,
                 role:data1[0].RoleId
              })
        }
    })
})



module.exports=router;