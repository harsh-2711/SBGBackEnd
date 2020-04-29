const db=require("../db");
const express=require("express");
const router=express()
const dateFormat = require('dateformat');

router.post("/add_event",(req,res,next)=>{
   
    db.query("select * from status where StatusName=?",["EventRaised"],(err,data1)=>{ 
        const data={
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
                console.log(data2)
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
                    
                        res.send(data2); 
            //     })
            }
        })
          // sending event id
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


router.get("/delete_guest/:id",(req,res,next)=>{
    db.query("delete from eventguest where GuestId=?",[req.params.id],(err,data)=>{
        if(err)
        res.status(400)
        else
        res.send("Deleted");
    })
})

router.post("/add_sponsor",(req,res,next)=>{
    console.log(req.body);
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


router.get("/delete_sponser/:id",(req,res,next)=>{
  db.query("delete from eventsponsers where SponserId=?",[req.params.id],(err,data)=>{
      if(err)
      res.status(400)
      else
      res.send("Deleted");
  })
})




module.exports=router
