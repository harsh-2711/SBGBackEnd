const db=require("../db");
const express=require("express");
const router=express()


router.post("/add_event",(req,res,next)=>{
   
    db.query("select * from status where StatusName=?",["EventRaised"],(err,data1)=>{

    
    const data={
        EventName:req.body.name,
        ClubId:req.body.clubid,
        VenueId:req.body.venueid,
        StartDateTime:req.body.starttime,
        EndDateTime:req.body.endtime,
        StatusId:data1[0].StatusId
    }
    db.query("insert into event set ?",data,(err,data2)=>{
        if(err)
        res.status(400)
        else
        res.send("Inserted");
    })
})
})


router.put("/update_event",(req,res,next)=>{
        const eventid=req.body.eventid
        const EventName=req.body.name
        const ClubId=req.body.clubid
        const VenueId=req.body.venueid
        const StartDateTime=req.body.starttime
        const EndDateTime=req.body.endtime

        db.query("update event set EventName=?,ClubId=?,VenueId=?,StartDateTime=?,EndDateTime=? where EventId=?",[EventName,ClubId,VenueId,StartDateTime,EndDateTime,eventid],(err,data1)=>{
            if(err)
            res.status(400)
            else
            res.send("Updated");
        })

})

router.post("/get_event",(req,res,next)=>{
    db.query("select e.EventName,v.VenueName,c.ClubName,e.StartDateTime,e.EndDateTime,s.StatusName from event e,club c,venue v,status s where e.VenueId=v.VenueId and e.ClubId=c.ClubId and e.StatusId=s.StatusId",(err,data)=>{
     if(err)
     res.status(400)
     else
     res.send(data);
    })
})


router.get("/get_event/:id",(req,res,next)=>{
  db.query("select * from event  join venue  on (event.VenueId=venue.VenueId) join club on (event.ClubId=club.ClubId) join status on (event.StatusId=status.StatusId) join eventsponsers on (event.EventId=eventsponsers.EventId) and event.EventId=?",[req.params.id],(err,data1)=>{
 
    if(err)
       res.status(400)
       else
       {
        db.query("select * from event  join venue  on (event.VenueId=venue.VenueId) join club on (event.ClubId=club.ClubId) join status on (event.StatusId=status.StatusId) join eventguest on (event.EventId=eventguest.EventId) and event.EventId=?",[req.params.id],(err,data2)=>{
       const data3={
           data1:data1,
           data2:data2
       }
       res.send(data3);

   })
}
})
})


router.post("/add_guest",(req,res,next)=>{
      const data={
          GuestName:req.body.name,
          Description:req.body.des,
          EventId:req.body.eventid
      }

      db.query("insert into eventguest set ?",data,(err,data1)=>{
          if(err)
          res.status(400)
          else
          res.send("inserted");
      })
})


router.put("/edit_guest",(req,res,next)=>{
    const id=req.body.id
    const name=req.body.name;
    const desp=req.body.des;
    const eventid=req.body.eventid;
    
    db.query("update eventguest set GuestName=?,EventId=?,Description=? where GuestId=?",[name,eventid,desp,id],(err,data1)=>{
        if(err)
        res.status(400)
        else
        res.send("updated");
    })
})


router.get("/delete_guest/:id",(req,res,next)=>{
    db.query("delete from eventguest where GuestId=?",[req.params.id],(err,data)=>{
        if(err)
        res.status(400)
        else
        res.send("Deleted");
    })
})

router.post("/add_sponsor",(req,res,next)=>{
    const data={
        SponserName:req.body.name,
        SponserLink:req.body.link,
        EventId:req.body.eventid
    }

    db.query("insert into eventsponsers set ?",data,(err,data1)=>{
        if(err)
        res.status(400)
        else
        res.send("inserted");
    })
})


router.put("/edit_sponsor",(req,res,next)=>{
  const id=req.body.id
  const name=req.body.name;
  const link=req.body.link;
  const eventid=req.body.eventid;
  
  db.query("update eventsponsers SponserName=?,EventId=?,SponserLink=? where SponserId=?",[name,eventid,link,id],(err,data1)=>{
      if(err)
      res.status(400)
      else
      res.send("updated");
  })
})


router.get("/delete_sponser/:id",(req,res,next)=>{
  db.query("delete from eventsponsers where SponserId=?",[req.params.id],(err,data)=>{
      if(err)
      res.status(400)
      else
      res.send("Deleted");
  })
})



module.exports=router
