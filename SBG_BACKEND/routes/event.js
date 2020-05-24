const db = require("../db");
const express = require("express");
const uuid = require("uuid-random");
const router = express()
const dateFormat = require('dateformat');
const verifyToken = require('../utils/VerifyToken');

router.post("/add_event", verifyToken, (req, res, next) => {
    const user = req.body.user;

    db.query("select * from status where StatusName=?", ["EventRaised"], (err, data1) => {

        let eventId = uuid(); // creating even id manually
        console.log(req.body.storeposter)
        const data = {
            EventId: eventId,
            EventName: req.body.eventName,
            ClubId: req.body.clubId,
            VenueId: req.body.venue,
            StartDateTime: req.body.startDateTime,
            EndDateTime: req.body.endDateTime,
            StatusId: data1[0].StatusId,
            Agenda: req.body.agenda,
            Poster: req.body.storeposter,
            Link: req.body.link,
            Type: req.body.type,
            Youtube: req.body.youtube
        }
        db.query("insert into event set ?", data, (err, data2) => {
                if (err)
                    res.status(400)
                else {
                    // const id=data2.insertId;
                    // const dt=new Date();
                    // const DateTime=dateFormat(dt);
                    // const info={
                    //     EventId:id,
                    //     AfterStatus:data1[0].StatusId,
                    //     DateTime:DateTime,
                    //     UserName:user
                    // } 
                    // // inserting log entry 
                    // db.query("insert into statuschangelog set ?",info,(err,data2)=>{
                    //     if(err)
                    //         res.status(400)
                    //     else
                    //         res.send({insertedEventId: eventId}); 
                    // })
                    res.send({ insertedEventId: eventId });
                }
            })
            // sending event id
    })
})
router.put("/update_event", verifyToken, (req, res, next) => {
    console.log(req.body.storeposter);
    const eventid = req.body.eventId
    const EventName = req.body.eventName
    const ClubId = req.body.clubId
    const VenueId = req.body.venue
    const StartDateTime = req.body.startDateTime
    const EndDateTime = req.body.endDateTime
    const updatedate = dateFormat(StartDateTime);
    const updatedate1 = dateFormat(EndDateTime);
    const Agenda = req.body.agenda
    const Poster = req.body.storeposter
    const Link = req.body.link
    const type = req.body.type
    const youtube = req.body.youtube
    console.log(Poster + "Varsha1")
    db.query("update event set EventName=?,ClubId=?,VenueId=?,StartDateTime=?,EndDateTime=?,Agenda=?,Poster=?,Link=?,Type=?,Youtube=? where EventId=?", [EventName, ClubId, VenueId, updatedate, updatedate1, Agenda, Poster, Link, type, youtube, eventid], (err, data1) => {
        if (err)
            res.status(400)
        else
            res.send("Event Updated");
    })
})

router.put("/update_event1", verifyToken, (req, res, next) => {
    const eventid = req.body.eventId
    const EventName = req.body.eventName
    const ClubId = req.body.clubId
    const VenueId = req.body.venue
    const StartDateTime = req.body.startDateTime
    const EndDateTime = req.body.endDateTime
    const updatedate = dateFormat(StartDateTime);
    const updatedate1 = dateFormat(EndDateTime);
    const Agenda = req.body.agenda
    const Poster = req.body.storeposter1
    const Link = req.body.link
    const type = req.body.type

    console.log(Poster + "Varsha")
    db.query("update event set EventName=?,ClubId=?,VenueId=?,StartDateTime=?,EndDateTime=?,Agenda=?,Poster=?,Link=?,Type=?  where EventId=?", [EventName, ClubId, VenueId, updatedate, updatedate1, Agenda, Poster, Link, type, eventid], (err, data1) => {
        if (err)
            res.status(400)
        else {
            db.query("delete from attachments where MessageId=?", [eventid], (err, data2) => {
                if (err)
                    res.status(400)
                else
                    res.send("Event Updated");
            })

        }
    })
})

router.get("/event/:id", verifyToken, (req, res, next) => {
    db.query(
        `select * from event where EventId=?`, [req.params.id], (err, data) => {
            if (err)
                res.status(400)
            else {
                db.query("select * from attachments where MessageId=?", [req.params.id], (err, data2) => {
                    const data3 = {
                        info: data,
                        attach: data2
                    }
                    res.send(data3);
                })
            }
        })
});

router.get("/event_status/:id", verifyToken, (req, res, next) => {
    db.query(
        `select e.StatusId,s.StatusName 
        from status as s, event as e
        where s.StatusId=e.StatusId
        and e.EventId = ?
        `, [req.params.id], (err, data) => {
            if (err)
                res.status(400)
            else {
                res.send(data);
            }
        })
});

router.get("/get_events_with_status/:status", verifyToken, (req, res, next) => {
    db.query(
        `select e.EventId, e.EventName,v.VenueName,c.ClubName,e.StartDateTime,e.EndDateTime,s.StatusName 
        from event e,club c,venue v,status s 
        where e.VenueId=v.VenueId 
        and e.ClubId=c.ClubId 
        and e.StatusId=s.StatusId
        and s.StatusName = ?        
        `, [req.params.status], (err, data) => {
            if (err)
                res.status(400)
            else {
                res.send(data);
            }
        })
});

router.get("/get_events_for_dean", verifyToken, (req, res, next) => {
    db.query(
        `select e.EventId, e.EventName,v.VenueName,c.ClubName,e.StartDateTime,e.EndDateTime,s.StatusName 
        from event e,club c,venue v,status s 
        where e.VenueId=v.VenueId 
        and e.ClubId=c.ClubId 
        and e.StatusId=s.StatusId
        and s.StatusName in ("ForwardedBySBG","Approve","RejectedByDean")        
        `, (err, data) => {
            if (err)
                res.status(400)
            else {
                res.send(data);
            }
        })
})

router.get("/get_events_for_club_convener/:userId", verifyToken, (req, res, next) => {

    db.query('select ClubId from club where ClubEmail=?', [req.params.userId], (err1, data1) => {

        if (data1.length != 0) {

            db.query(
                `select e.EventId, e.EventName,v.VenueName,c.ClubName,e.StartDateTime,e.EndDateTime,s.StatusName 
                from event e,club c,venue v,status s 
                where e.VenueId=v.VenueId 
                and e.ClubId = ?
                and c.ClubId = ?
                and e.StatusId=s.StatusId
                and s.StatusName in ("EventRaised","ForwardedBySBG","RejectedBySBG","Approve","RejectedByDean","ReportPending","ReportSubmitted","Finished")        
                `, [data1[0].ClubId, data1[0].ClubId], (err2, data2) => {
                    console.log(data2);
                    if (err2)
                        res.status(400)
                    else {
                        res.send(data2);
                    }
                })
        } else
            res.send("No clubs found");
    });
})

router.get("/get_event", verifyToken, (req, res, next) => {
    db.query("select e.EventId, e.EventName,v.VenueName,c.ClubName,e.StartDateTime,e.EndDateTime,s.StatusName,e.Type,e.Link,e.Poster,e.Youtube from event e,club c,venue v,status s where e.VenueId=v.VenueId and e.ClubId=c.ClubId and e.StatusId=s.StatusId", (err, data) => {
        if (err)
            res.status(400)
        else {

            res.send(data);
        }
    })
})

router.get("/get_event_guests/:id", verifyToken, (req, res, next) => {
    db.query(
        `select * from eventguest where EventId=?`, [req.params.id], (err, data) => {
            if (err)
                res.status(400)
            else {

                res.send(data);
            }
        })
});

router.get("/get_event_sponsers/:id", verifyToken, (req, res, next) => {
    db.query(
        `select * from eventsponsers where EventId=?`, [req.params.id], (err, data) => {
            if (err)
                res.status(400)
            else {
                res.send(data);
            }
        })
});

router.get("/get_event/:id", verifyToken, (req, res, next) => {
    db.query(
            `select e.EventId, e.EventName,v.VenueName,c.ClubName,e.StartDateTime,e.EndDateTime,s.StatusName,e.Type,e.Link,e.Poster,e.Agenda,e.Youtube
        from event e,club c,venue v,status s 
        where e.EventId=?
        and e.VenueId=v.VenueId 
        and e.ClubId=c.ClubId 
        and e.StatusId=s.StatusId`, [req.params.id], (err, data) => {
                if (err)
                    res.status(400)
                else {
                    db.query("select * from attachments where MessageId=?", [req.params.id], (err, data2) => {
                        const data3 = {
                            info: data,
                            attach: data2
                        }

                        res.send(data3);
                    })

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


router.post("/add_guest", verifyToken, (req, res, next) => {
    const data = {
        GuestName: req.body.guestName,
        Description: req.body.guestDescription,
        EventId: req.body.eventId
    }

    db.query("insert into eventguest set ?", data, (err, data1) => {
        if (err)
            res.status(400)
        else
            res.send("inserted");
    })
})


router.put("/edit_guest", verifyToken, (req, res, next) => {
    const id = req.body.id
    const name = req.body.name;
    const desp = req.body.des;
    const eventid = req.body.eventid;

    db.query("update eventguest set GuestName=?,EventId=?,Description=? where GuestId=?", [name, eventid, desp, id], (err, data1) => {
        if (err)
            res.status(400)
        else
            res.send("updated");
    })
})


router.delete("/delete_guests/:id", verifyToken, (req, res, next) => {
    db.query("delete from eventguest where EventId=?", [req.params.id], (err, data) => {
        if (err)
            res.status(400)
        else
            res.send("All the Guests Deleted");
    })
})

router.post("/add_sponsor", verifyToken, (req, res, next) => {
    console.log(req.body);
    const data = {
        SponserName: req.body.sponserName,
        SponserLink: req.body.sponserLink,
        EventId: req.body.eventId,
        Description: req.body.sponserDescription,
    }

    db.query("insert into eventsponsers set ?", data, (err, data1) => {
        if (err)
            res.status(400)
        else
            res.send("inserted");
    })
})


router.put("/edit_sponsor", verifyToken, (req, res, next) => {
    const id = req.body.id
    const name = req.body.name;
    const link = req.body.link;
    const eventid = req.body.eventid;

    db.query("update eventsponsers SponserName=?,EventId=?,SponserLink=? where SponserId=?", [name, eventid, link, id], (err, data1) => {
        if (err)
            res.status(400)
        else
            res.send("updated");
    })
})


router.delete("/delete_sponsers/:id", verifyToken, (req, res, next) => {
    db.query("delete from eventsponsers where EventId=?", [req.params.id], (err, data) => {
        if (err)
            res.status(400)
        else
            res.send("Deleted");
    })
})

router.post("/event_poster", verifyToken, (req, res, next) => {

    res.send(req.files[0].filename);
})

router.post("/event_attach", verifyToken, (req, res, next) => {

    res.send(req.files);
})

router.post("/add_event_attach", verifyToken, (req, res, next) => {
    console.log(req.body + "event_attach")
    const id = req.body.message_id;
    for (let i = 0; i < req.body.files.length; i++) {
        const info = {
            Name: req.body.files[i].filename,
            MessageId: id
        }
        db.query("insert into attachments set ?", [info], (err, data) => {
            if (err)
                res.status(400)
            else
                res.send("Inserted");
        })
    }
})



module.exports = router