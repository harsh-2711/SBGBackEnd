const db=require('../db')
const express=require('express');
const router=express()

router.get('/all_users',(req,res,next)=>{
    db.query("select UserName,Name from login",(err,data)=>{
        if(err)
            res.status(400);
        else
            res.send(data);
    });
});

router.post("/data",(req,res,next)=>{
    // console.log(req.body);
    const user=req.body.user;
    db.query("select * from login where UserName=?",[user],(err,data1)=>{
        if(err)
        res.status(400)
        else
        {
            db.query("select RoleName from role where RoleId=?",[data1[0].RoleId],(err,data2)=>{
             console.log(data2[0].RoleName + "Aman");
              res.send({ 
                 user:data1[0].Name,
                 userEmail:user,
                 status:data1[0].IsReset,
                 role:data2[0].RoleName,
                 vote:data1[0].IsVote
              })
              })
        }
    })
});

router.post("/sub_data",(req,res,next)=>{
    const user=req.body.user
    db.query("select * from subscriber where Username=?",[user],(err,data)=>{

    })
})

router.post("/data1",(req,res,next)=>{
  
     const user=req.body.user;
     db.query("select ClubId from club where ClubEmail=?",[user],((err,data)=>{
         if(err)
         res.status(400)
         else
         {
             const info={
                clubid:data[0].ClubId
             }
             res.send(info);
         }
     }))
})

router.post("/data2",(req,res,next)=>{
   
    const club=req.body.club
    db.query("select EventId from event where ClubId=?",[club],(err,data3)=>{
        if(err)
        res.status(400)
        else
        {
           
            const info={
                event:data3[0].EventId
            }
            res.send(info);
        }
    })
})

module.exports=router;