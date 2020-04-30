const db=require("../db");
const express=require("express");
const router=express();
const mv=require("mv");
const fs=require("fs")
const datatime=require("dateformat");
const formidable=require("formidable");



router.post("/deanattach",(req,res,next)=>{
    console.log(req.files);
    res.send(req.files);
});

router.post("/deanmessage",(req,res,next)=>{
db.query("select StatusId from status where StatusName=?",["MessageFromDeanToSBG"],(err,data1)=>{
const dt=req.body.dt;
const dt1=datatime(dt);
const data={
      MessageText:req.body.message,
      EventId:parseInt(req.body.event),
      UserName:req.body.user,
      DateTime:dt1,
      MessageDirection:data1[0].StatusId,
      IsNotified:false

}
db.query("insert into communication set ?",data,(err,data2)=>{
    if(err)
    res.status(400)
    else
    {
        const mes_id=data2.insertId;
        
        for(let i=0 ;i < req.body.files.length ;i++)
        {
            const info={
                Name:req.body.files[i].filename,
                MessageId:mes_id
            }
                 db.query("insert into attachments set ?",info,(err,data3)=>{
                 })
        }
      db.query("select * from communication where EventId=?",[parseInt(req.body.event)] + 'ORDER BY MessageId ASC',(err,data5)=>{
          db.query("select * from attachments",(err,data3)=>{
              info2={
                  mes:data5,
                  attach:data3
              }
              console.log(info2);
              res.send(info2);
          })

      })
    }
})
})
})


router.post("/deanmessage1",(req,res,next)=>{
    db.query("select StatusId from status where StatusName=?",["MessageFromDeanToSBG"],(err,data1)=>{
        const dt=req.body.dt;
        const dt1=datatime(dt);
        const data={
              MessageText:req.body.message,
              EventId:parseInt(req.body.event),
              UserName:req.body.user,
              DateTime:dt1,
              MessageDirection:data1[0].StatusId,
              IsNotified:false
        
        }
        db.query("insert into communication set ?",data,(err,data2)=>{
            if(err)
            res.status(400)
            else
            {
                  db.query("select * from communication where EventId=?",[parseInt(req.body.event)] + 'ORDER BY MessageId ASC',(err,data5)=>{
          db.query("select * from attachments",(err,data3)=>{
              info2={
                  mes:data5,
                  attach:data3
              }
              
              res.send(info2);
          })

      })
            }
        })
 })
})


router.post("/mes_data",(req,res,next)=>{
    db.query("select * from communication  where EventId=?",[parseInt(req.body.event)] + 'ORDER BY MessageId ASC',(err,data5)=>{
        db.query("select * from attachments",(err,data3)=>{
            info2={
                mes:data5,
                attach:data3
            }
           
            res.send(info2);
        })
})
})


router.post("/sbgattach",(req,res,next)=>{
    res.send(req.files);
})

router.post("/sbgmessage",(req,res,next)=>{
    db.query("select StatusId from status where StatusName=?",["MessageFromSBGToDean"],(err,data1)=>{
        const dt=req.body.dt;
        const dt1=datatime(dt);
        const data={
              MessageText:req.body.message,
              EventId:parseInt(req.body.event),
              UserName:req.body.user,
              DateTime:dt1,
              MessageDirection:data1[0].StatusId,
              IsNotified:false
        
        }
        db.query("insert into communication set ?",data,(err,data2)=>{
            if(err)
            res.status(400)
            else
            {
                const mes_id=data2.insertId;
                
                for(let i=0 ;i < req.body.files.length ;i++)
                {
                    const info={
                        Name:req.body.files[i].filename,
                        MessageId:mes_id
                    }
                         db.query("insert into attachments set ?",info,(err,data3)=>{
                         })
                }
              db.query("select * from communication where EventId=?",[parseInt(req.body.event)] + 'ORDER BY MessageId ASC',(err,data5)=>{
                  db.query("select * from attachments",(err,data3)=>{
                      info2={
                          mes:data5,
                          attach:data3
                      }
                      console.log(info2);
                      res.send(info2);
                  })
        
              })
            }
        })
        })
        })
 
        
 router.post("/sbgmessage1",(req,res,next)=>{
     console.log(req.body);
    db.query("select StatusId from status where StatusName=?",["MessageFromSBGToDean"],(err,data1)=>{
        const dt=req.body.dt;
        const dt1=datatime(dt);
        const data={
              MessageText:req.body.message,
              EventId:parseInt(req.body.event),
              UserName:req.body.user,
              DateTime:dt1,
              MessageDirection:data1[0].StatusId,
              IsNotified:false
        
        }
        db.query("insert into communication set ?",data,(err,data2)=>{
            if(err)
            res.status(400)
            else
            {
                  db.query("select * from communication where EventId=?",[parseInt(req.body.event)] + 'ORDER BY MessageId ASC',(err,data5)=>{
          db.query("select * from attachments",(err,data3)=>{
              info2={
                  mes:data5,
                  attach:data3
              }
              
              res.send(info2);
          })

      })
            }
        })
 })  
 })       

router.get("/download/:path",(req,res,next)=>{
    const name=req.params.path
    console.log(name)
    res.download("../SBG_BACKEND/public/uploads/"+name) 
  });
module.exports=router