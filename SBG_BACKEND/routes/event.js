const db=require("../db");
const express=require("express");
const uuid=require("uuid-random"); 
const router=express()
const dateFormat = require('dateformat');

router.post("/add_event",(req,res,next)=>{
   const user=req.body.user;
   
    db.query("select * from status where StatusName=?",["EventRaised"],(err,data1)=>{

        let eventId=uuid(); // creating even id manually

        const data={
            EventId:eventId,
            EventName:req.body.eventName,
            ClubId:req.body.clubId,
            VenueId:req.body.venue,
            StartDateTime:req.body.startDateTime,
            EndDateTime:req.body.endDateTime,
            StatusId:data1[0].StatusId
        }
        db.query("insert into event set ?",data,(err,data2)=>{
            if(err)
                res.status(400)
            else
            {
                // const id=data2.insertId;
                // const dt=new Date();
                // const DateTime=dateFormat(dt);
                // const info={
                //     EventId:id,
                //     AfterStatus:data1[0].StatusId,
                //     DateTime:DateTime,
                //     UserName:user
                // } 
                // inserting log entry 
                // db.query("insert into statuschangelog set ?",info,(err,data2)=>{
                    if(err)
                        res.status(400)
                    else
                        res.send({insertedEventId: eventId}); 
            //     })
            }
        })
          // sending event id
    })
})

router.put("/update_event",(req,res,next)=>{
    const eventid=req.body.eventId
    const EventName=req.body.eventName
    const ClubId=req.body.clubId
    const VenueId=req.body.venue
    const StartDateTime=req.body.startDateTime
    const EndDateTime=req.body.endDateTime

    db.query("update event set EventName=?,ClubId=?,VenueId=?,StartDateTime=?,EndDateTime=? where EventId=?",[EventName,ClubId,VenueId,StartDateTime,EndDateTime,eventid],(err,data1)=>{
        if(err)
            res.status(400)
        else
            res.send("Event Updated");
    })
})

router.get("/event/:id",(req,res,next)=>{
    db.query(
        `select * from event where EventId=?`,
        [req.params.id],(err,data)=>{
            if(err)
                res.status(400)
            else{
                res.send(data);
            }
    })
});

router.get("/get_event",(req,res,next)=>{
    db.query("select e.EventId, e.EventName,v.VenueName,c.ClubName,e.StartDateTime,e.EndDateTime,s.StatusName from event e,club c,venue v,status s where e.VenueId=v.VenueId and e.ClubId=c.ClubId and e.StatusId=s.StatusId",(err,data)=>{
     if(err)
     res.status(400)
     else
     res.send(data);
    })
})

router.get("/get_event_guests/:id",(req,res,next)=>{
    db.query(
        `select * from eventguest where EventId=?`,
        [req.params.id],(err,data)=>{
            if(err)
                res.status(400)
            else{
                res.send(data);
            }
    })
});

router.get("/get_event_sponsers/:id",(req,res,next)=>{
    db.query(
        `select * from eventsponsers where EventId=?`,
        [req.params.id],(err,data)=>{
            if(err)
                res.status(400)
            else{
                res.send(data);
            }
    })
});

router.get("/get_event/:id",(req,res,next)=>{
    db.query(
        `select e.EventId, e.EventName,v.VenueName,c.ClubName,e.StartDateTime,e.EndDateTime,s.StatusName 
        from event e,club c,venue v,status s 
        where e.EventId=?
        and e.VenueId=v.VenueId 
        and e.ClubId=c.ClubId 
        and e.StatusId=s.StatusId`,
        [req.params.id],(err,data)=>{
            if(err)
                res.status(400)
            else{
                res.send(data);
            }
    })
//   db.query("select * from event  join venue  on (event.VenueId=venue.VenueId) join club on (event.ClubId=club.ClubId) join status on (event.StatusId=status.StatusId) join eventsponsers on (event.EventId=eventsponsers.EventId) and event.EventId=?",[req.params.id],(err,data1)=>{
 
//     if(err)
//        res.status(400)
//        else
//        {
//         db.query("select * from event  join venue  on (event.VenueId=venue.VenueId) join club on (event.ClubId=club.ClubId) join status on (event.StatusId=status.StatusId) join eventguest on (event.EventId=eventguest.EventId) and event.EventId=?",[req.params.id],(err,data2)=>{
//        const data3={
//            data1:data1,
//            data2:data2
//        }
//        res.send(data3);

//    })
// }
// })

})


router.post("/add_guest",(req,res,next)=>{
      const data={
          GuestName:req.body.guestName,
          Description:req.body.guestDescription,
          EventId:req.body.eventId
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


router.delete("/delete_guests/:id",(req,res,next)=>{
    db.query("delete from eventguest where EventId=?",[req.params.id],(err,data)=>{
        if(err)
        res.status(400)
        else
        res.send("All the Guests Deleted");
    })
})

router.post("/add_sponsor",(req,res,next)=>{
    const data={
        SponserName:req.body.sponserName,
        SponserLink:req.body.sponserLink,
        EventId:req.body.eventId,
        Description:req.body.sponserDescription,
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


router.delete("/delete_sponsers/:id",(req,res,next)=>{
  db.query("delete from eventsponsers where EventId=?",[req.params.id],(err,data)=>{
      if(err)
      res.status(400)
      else
      res.send("Deleted");
  })
})




module.exports=router
