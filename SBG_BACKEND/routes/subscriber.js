
const db=require('../db')
const express=require('express');
const router=express()





router.post("/subdata",(req,res,next)=>{
    console.log(req.body);
    const user=req.body.user
    db.query("select ClubId from subscriber where UserName=?",[user],(err,data)=>{
        if(data)
        {
            console.log(data);
            res.send(data);
        }
        else
        {
            res.status(400);
        }
        
    })
})


router.post("/intdata",(req,res,next)=>{
    const user=req.body.user;
    db.query("select EventId from interested where UserName=?",[user],(err,data)=>{
        if(data)
        {
            res.send(data);
        }
        else
        {
            res.status(400);
        }
    })
})

router.post("/subscribe",(req,res,next)=>{
    
    const user=req.body.user;
    const id=req.body.clubid
    db.query("insert into subscriber set ClubId=?,UserName=?",[id,user],(err,data)=>{
        if(err)
        res.status(400);
        else
        {
         console.log(data);
         res.send(data);
        }
    })
})

router.post("/unsubscribe",(req,res,next)=>{
    
    const user=req.body.user;
    const id=req.body.clubid
    db.query("delete from subscriber where ClubId=? && UserName=?",[id,user],(err,data)=>{
        if(err)
        res.status(400);
        else
        {
        res.send(data);
        }
    })
})


router.post("/interested",(req,res,next)=>{
    console.log(req.body);
    const user=req.body.user;
    const id=req.body.eventid;
    db.query("insert into interested set EventId=?,UserName=?",[id,user],(err,data)=>{
         if(err)
         res.status(400);
         else
         {
             res.send(data);
         }
    })
})

router.post("/uninterested",(req,res,next)=>{
    const user=req.body.user;
    const id=req.body.eventid;
    db.query("delete from interested where EventId=? && UserName=?",[id,user],(err,data)=>{
         if(err)
         res.status(400);
         else
         {
             res.send(data);
         }
    })
})


router.post("/clubevent",(req,res,next)=>{
    
    const id=req.body.id;
    db.query(
        `select e.EventId, e.EventName,v.VenueName,c.ClubName,e.StartDateTime,e.EndDateTime,s.StatusName 
        from event e,club c,venue v,status s 
        where e.VenueId=v.VenueId 
        and e.ClubId=c.ClubId
        and e.StatusId=s.StatusId
        and e.ClubId=?
        and s.StatusName = ?     
        `,[id,"Approve"],(err,data)=>{
            if(err)
                res.status(400)
            else{
                
                res.send(data);
            }
    })
});

module.exports=router;