const db=require('../db')
const express=require('express');
const genpassword=require("generate-password");
const nodemailer=require('nodemailer');
const transport=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"sharma.aman1298@gmail.com",
        pass:"aman$1234"
    }
    });
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


router.post("/forgot",(req,res,next)=>{
    const email=req.body.email;
    console.log(email);
     const password=genpassword.generate({
         length:7,
         numbers:true
     })
     transport.sendMail({
        to:email,
        from:"sharma.aman1298@gmail.com",
        subject:"Password Recovery",
        text:"New Password:-" + password
         
    },(err,data)=>{
        if(err)
        res.status(400);
        else
        {
            db.query("update login set isReset=? where UserName=?",[1,email],(err,data)=>{
                 if(err)
                 res.status(400)
                 else
                 res.status(200);
            })
        }
    });

    })


module.exports=router;