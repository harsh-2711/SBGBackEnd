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

router.post("/register",(req,res,next)=>{
    const postdata={
        UserName:req.body.username,
        PassWord:req.body.password,
        Name:req.body.name,
        Contact:req.body.contact,
        RoleId:3,
        IsReset:0
    }
    db.query("insert into login set ?",postdata,
    (err,data)=>{ 
        if(err)
            res.status(400);
        else    
            res.send("Registered Successfully");
    });
});    
         

router.post("/login",(req,res,next)=>{
    // console.log(req.body);
     const username=req.body.username
     const password=req.body.password
    db.query("select * from login where UserName=? && PassWord=?",[username,password],(err,data)=>{     
         
    if((data!=null || data!=undefined) && data.length<1)
    {
        res.status(400);
    }
    else
    {
        const name = data[0].Name;
        const isReset=data[0].IsReset;
        db.query("select RoleName from role where RoleId = ?",[data[0].RoleId],(err,data)=>{
            if(err){
                console.log("Error in login.js");
            }
            else{
                req.session.username=username;
                res.send({
                    userRole: data[0].RoleName,
                    name: name,
                    reset:isReset
                });
            }
        });
        
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
            db.query("update login set IsReset=?,PassWord=? where UserName=?",[1,password,email],(err,data)=>{
                 if(err)
                 res.status(400)
                 else
                 res.send("Updation Successfull");
            })
        }
    });

    })


  router.post("/reset",(req,res,next)=>{
      const user=req.body.user;
      const pass=req.body.newpass;
      console.log(user);
      db.query("update login set PassWord=?,IsReset=? where UserName=?",[pass,0,user],(err,data1)=>{
          if(err)
          res.status(400)
          else
          {
              res.send("Updated Successfully")
          }
      })
  })  


module.exports=router;