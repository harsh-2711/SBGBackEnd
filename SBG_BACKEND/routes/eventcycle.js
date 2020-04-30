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


router.post("/rejected_by_sbg",(req,res,next)=>{
    const id=req.body.id;
    const status=req.body.status;
    const user=req.body.user;

    db.query("select * from status where StatusName=?",["RejectedBySBG"],(err,data)=>{
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

router.post("/rejected_by_dean",(req,res,next)=>{
    const id=req.body.id;
    const status=req.body.status;
    const user=req.body.user;

    db.query("select * from status where StatusName=?",["RejectedByDean"],(err,data)=>{
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

router.get("/event_log/:id",(req,res,next)=>{
    db.query(`
        SELECT l.Name,scl.* 
        from login as l, statuschangelog as scl 
        WHERE scl.UserName = l.UserName
        order by scl.DateTime
    `,[req.params.id],(err,data)=>{
        if(err)
            res.status(400);
        else{
            let count1=0,count2=0;;
            data.forEach((dataItem)=>{
                db.query(`select StatusName from status where StatusId=?`
                ,[dataItem.BeforeStatus],(err,data1)=>{
                    if(err) 
                        res.status(400);
                    else{
                        count1++;
                        dataItem.BeforeStatusName = data1[0].StatusName;
                        if(count1==data.length && count2==data.length)
                            res.send(data);
                    }
                });
                db.query(`select StatusName from status where StatusId=?`
                ,[dataItem.AfterStatus],(err,data2)=>{
                    if(err) 
                        res.status(400);
                    else{
                        count2++;
                        dataItem.AfterStatusName = data2[0].StatusName;
                        if(count1==data.length && count2==data.length)
                            res.send(data);
                    }
                });
            });
                
            
            // res.send(data);
        }
    });
});

module.exports=router
