const db=require("../db");
const express=require("express");
const datetime=require("node-datetime");
const dateformat=require('dateformat');
const router=express()


router.post("/forward",(req,res,next)=>{
    const id=req.body.id;
    const status=req.body.status;
    const user=req.body.user;
    db.query("select * from status where StatusName=?",["ForwardedBySBG"],(err,data)=>{
        console.log(data[0].StatusId);
        
        db.query("update event set StatusId=? where EventId=?",[data[0].StatusId,id],(err,data1)=>{
            if(err)
            res.status(400)
            else
            {
               const dt=new Date();
               const DateTime=dateformat(dt);
               const info={
                   EventId:id,
                   BeforeStatus:status,
                   AfterStatus:data[0].StatusId,
                   DateTime:DateTime,
                   UserName:user
               } 
               // inserting log entry 
             db.query("insert into statuschangelog set ?",info,(err,data2)=>{
            if(err)
            res.status(400)
            else
            res.send("Request Forwarded");
             })
            }
        })
    })
  
})


router.post("/approve",(req,res,next)=>{
    const id=req.body.id;
    const status=req.body.status;
    const user=req.body.user;
    db.query("select * from status where StatusName=?",["Approve"],(err,data)=>{
        db.query("update event set StatusId=? where EventId=?",[data[0].StatusId,id],(err,data1)=>{
            if(err)
            res.status(400)
            else
            {
                const dt=new Date();
                const DateTime=dateformat(dt);
                const info={
                    EventId:id,
                    BeforeStatus:status,
                    AfterStatus:data[0].StatusId,
                    DateTime:DateTime,
                    UserName:user
                } 
                // inserting log entry 
              db.query("insert into statuschangelog set ?",info,(err,data2)=>{
             if(err)
             res.status(400)
             else
             res.send("Request Approved");
              })
           
            }
        })
    })
})


router.post("/reject",(req,res,next)=>{
    const id=req.body.id;
    const status=req.body.status;
    const user=req.body.user;

    db.query("select * from status where StatusName=?",["Reject"],(err,data)=>{
        console.log(data[0].StatusId);
        db.query("update event set StatusId=? where EventId=?",[data[0].StatusId,id],(err,data1)=>{
            if(err)
            res.status(400)
            else
            {
                const dt=new Date();
                const DateTime=dateformat(dt);
                const info={
                    EventId:id,
                    BeforeStatus:status,
                    AfterStatus:data[0].StatusId,
                    DateTime:DateTime,
                    UserName:user
                } 
                // inserting log entry 
              db.query("insert into statuschangelog set ?",info,(err,data2)=>{
             if(err)
             res.status(400)
             else
             res.send("Request Rejected");
              })
            }
        })
    })
})

router.post("/complete",(req,res,next)=>{
    const id=req.body.id;
    const status=req.body.status;
    const user=req.body.user;

    db.query("select * from status where StatusName=?",["ReportPending"],(err,data)=>{
        console.log(data[0].StatusId);
        db.query("update event set StatusId=? where EventId=?",[data[0].StatusId,id],(err,data1)=>{
            if(err)
            res.status(400)
            else
            {
                const dt=new Date();
                const DateTime=dateformat(dt);
                const info={
                    EventId:id,
                    BeforeStatus:status,
                    AfterStatus:data[0].StatusId,
                    DateTime:DateTime,
                    UserName:user
                } 
                // inserting log entry 
              db.query("insert into statuschangelog set ?",info,(err,data2)=>{
             if(err)
             res.status(400)
             else
             res.send("Done");
              })
            }
        })
    })
})


router.post("/report",(req,res,next)=>{
    const id=req.body.id;
    const status=req.body.status;
    const user=req.body.user;

    db.query("select * from status where StatusName=?",["ReportSubmitted"],(err,data)=>{
        console.log(data[0].StatusId);
        db.query("update event set StatusId=? where EventId=?",[data[0].StatusId,id],(err,data1)=>{
            if(err)
            res.status(400)
            else
            {
                const dt=new Date();
                const DateTime=dateformat(dt);
                const info={
                    EventId:id,
                    BeforeStatus:status,
                    AfterStatus:data[0].StatusId,
                    DateTime:DateTime,
                    UserName:user
                } 
                // inserting log entry 
              db.query("insert into statuschangelog set ?",info,(err,data2)=>{
             if(err)
             res.status(400)
             else
             res.send("Done");
              })
            }
        })
    })
})

router.post("/finish",(req,res,next)=>{
    const id=req.body.id;
    const status=req.body.status;
    const user=req.body.user;

    db.query("select * from status where StatusName=?",["Finished"],(err,data)=>{
        console.log(data[0].StatusId);
        db.query("update event set StatusId=? where EventId=?",[data[0].StatusId,id],(err,data1)=>{
            if(err)
            res.status(400)
            else
            {
                const dt=new Date();
                const DateTime=dateformat(dt);
                const info={
                    EventId:id,
                    BeforeStatus:status,
                    AfterStatus:data[0].StatusId,
                    DateTime:DateTime,
                    UserName:user
                } 
                // inserting log entry 
              db.query("insert into statuschangelog set ?",info,(err,data2)=>{
             if(err)
             res.status(400)
             else
             res.send("Done");
              })
            }
        })
    })
})






module.exports=router
