const db = require("../db");
const express = require("express");
const datetime = require("node-datetime");
const dateformat = require('dateformat');
const router = express()
const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sharma.aman1298@gmail.com",
        pass: "aman$1234"
    }
});

const push = require('../models/push-notifications');
// to send notification call push.sendNotification(<UserName>,<Title>,<Body>,<EventId>)
const fcmPush = require('../models/fcm-push')

router.post("/forward", (req, res, next) => {
    const id = req.body.id;
    const status = req.body.status;
    const user = req.body.user;
    db.query("select * from status where StatusName=?", ["ForwardedBySBG"], (err, data) => {
        console.log(data[0].StatusId);

        db.query("update event set StatusId=? where EventId=?", [data[0].StatusId, id], (err, data1) => {
            if (err)
                res.status(400)
            else {
                const dt = new Date();
                const DateTime = dateformat(dt);
                const info = {
                    EventId: id,
                    BeforeStatus: status,
                    AfterStatus: data[0].StatusId,
                    DateTime: DateTime,
                    UserName: user
                }
                // inserting log entry 
                db.query("insert into statuschangelog set ?", info, (err, data2) => {
                    if (err)
                        res.status(400)
                    else
                        res.send("Request Forwarded");
                })
            }
        })
    })

});

sendEmailToVenueManagers = function (eventId) {
    db.query(`select e.*,v.VenueName,c.ClubName from event as e, venue as v, club as c
             where EventId=? and v.VenueId=e.VenueId and c.ClubId=e.ClubId`, [eventId], (err, data) => {
        db.query(` SELECT * FROM venueman WHERE VenueId = (Select VenueId from event where EventId='` + eventId + "')",
            (error, data3) => {
                if (error)
                    console.log(error);
                else {
                    data3.forEach(manager => {
                        const mailText = "Hello " + manager.Name + `,\n\n\nFollowing are the details of an approved event :` +
                            `\n\nEvent Name : ` + data[0].EventName +
                            `\nOrganized by : ` + data[0].ClubName +
                            `\nEvent Starts at : ` + data[0].StartDateTime +
                            `\nEvent Ends at : ` + data[0].EndDateTime +
                            '\n\nPlease co-ordinate with the organizers.' +
                            '\n\nDean Students,\nDA-IICT.'
                        transport.sendMail({
                            to: "aman.sharma122111@gmail.com",
                            from: "sharma.aman1298@gmail.com",
                            subject: "New Event at " + data[0].VenueName,
                            text: mailText
                        }, (err, GmailResponse) => {
                            if (err)
                                console.log("Error sending email " + err);
                            else {
                                console.log("Mail sent");
                            }
                        });
                    });
                }
            });
    });
}

router.post("/approve", (req, res, next) => {
    const id = req.body.id;
    const status = req.body.status;
    const user = req.body.user;
    db.query("select * from status where StatusName=?", ["Approve"], (err, data) => {
        db.query("update event set StatusId=? where EventId=?", [data[0].StatusId, id], (err, data1) => {
            if (err)
                res.status(400)
            else {

                db.query("select c.ClubId,c.ClubName,e.EventName from event e, club c where e.EventId = ? and c.ClubId=e.ClubId",id,(err2,data2)=>{
                    if(data2.length!=0){
                        db.query("select * from subscriber where ClubId = ?",data2[0].ClubId,
                        (err3,data3)=>{
                            if(data3.length!=0){
                                data3.forEach(clubSubscriber=>{
                                    push.init();
                                    push.sendNotification(clubSubscriber, data2[0].ClubName, "New Event : "+data2[0].EventName+" scheduled",id);
                                    fcmPush.sendNotification(clubSubscriber, data2[0].ClubName, "New Event : "+data2[0].EventName+" scheduled",id);
                                })
                            }
                        })                        
                    }
                });

                const dt = new Date();
                const DateTime = dateformat(dt);
                const info = {
                    EventId: id,
                    BeforeStatus: status,
                    AfterStatus: data[0].StatusId,
                    DateTime: DateTime,
                    UserName: user
                }
                // inserting log entry 
                db.query("insert into statuschangelog set ?", info, (err, data2) => {
                    if (err)
                        res.status(400)
                    else {
                        sendEmailToVenueManagers(id);
                        res.send(data2);
                    }
                })
            }
        })
    })
})


router.post("/rejected_by_sbg", (req, res, next) => {
    const id = req.body.id;
    const status = req.body.status;
    const user = req.body.user;

    db.query("select * from status where StatusName=?", ["RejectedBySBG"], (err, data) => {
        console.log(data[0].StatusId);
        db.query("update event set StatusId=? where EventId=?", [data[0].StatusId, id], (err, data1) => {
            if (err)
                res.status(400)
            else {
                const dt = new Date();
                const DateTime = dateformat(dt);
                const info = {
                    EventId: id,
                    BeforeStatus: status,
                    AfterStatus: data[0].StatusId,
                    DateTime: DateTime,
                    UserName: user
                }
                // inserting log entry 
                db.query("insert into statuschangelog set ?", info, (err, data2) => {
                    if (err)
                        res.status(400)
                    else
                        res.send("Request Rejected");
                })
            }
        })
    })
})

router.post("/rejected_by_dean", (req, res, next) => {
    const id = req.body.id;
    const status = req.body.status;
    const user = req.body.user;

    db.query("select * from status where StatusName=?", ["RejectedByDean"], (err, data) => {
        console.log(data[0].StatusId);
        db.query("update event set StatusId=? where EventId=?", [data[0].StatusId, id], (err, data1) => {
            if (err)
                res.status(400)
            else {
                const dt = new Date();
                const DateTime = dateformat(dt);
                const info = {
                    EventId: id,
                    BeforeStatus: status,
                    AfterStatus: data[0].StatusId,
                    DateTime: DateTime,
                    UserName: user
                }
                // inserting log entry 
                db.query("insert into statuschangelog set ?", info, (err, data2) => {
                    if (err)
                        res.status(400)
                    else
                        res.send("Request Rejected");
                })
            }
        })
    })
})

router.post("/complete", (req, res, next) => {
    const id = req.body.id;
    const status = req.body.status;
    const user = req.body.user;

    db.query("select * from status where StatusName=?", ["ReportPending"], (err, data) => {
        console.log(data[0].StatusId);
        db.query("update event set StatusId=? where EventId=?", [data[0].StatusId, id], (err, data1) => {
            if (err)
                res.status(400)
            else {
                const dt = new Date();
                const DateTime = dateformat(dt);
                const info = {
                    EventId: id,
                    BeforeStatus: status,
                    AfterStatus: data[0].StatusId,
                    DateTime: DateTime,
                    UserName: user
                }
                // inserting log entry 
                db.query("insert into statuschangelog set ?", info, (err, data2) => {
                    if (err)
                        res.status(400)
                    else
                        res.send("Done");
                })
            }
        })
    })
})


router.post("/report", (req, res, next) => {
    const id = req.body.id;
    const status = req.body.status;
    const user = req.body.user;

    db.query("select * from status where StatusName=?", ["ReportSubmitted"], (err, data) => {
        console.log(data[0].StatusId);
        db.query("update event set StatusId=? where EventId=?", [data[0].StatusId, id], (err, data1) => {
            if (err)
                res.status(400)
            else {
                const dt = new Date();
                const DateTime = dateformat(dt);
                const info = {
                    EventId: id,
                    BeforeStatus: status,
                    AfterStatus: data[0].StatusId,
                    DateTime: DateTime,
                    UserName: user
                }
                // inserting log entry 
                db.query("insert into statuschangelog set ?", info, (err, data2) => {
                    if (err)
                        res.status(400)
                    else
                        res.send("Done");
                })
            }
        })
    })
})

router.post("/finish", (req, res, next) => {
    const id = req.body.id;
    const status = req.body.status;
    const user = req.body.user;

    db.query("select * from status where StatusName=?", ["Finished"], (err, data) => {
        console.log(data[0].StatusId);
        db.query("update event set StatusId=? where EventId=?", [data[0].StatusId, id], (err, data1) => {
            if (err)
                res.status(400)
            else {
                const dt = new Date();
                const DateTime = dateformat(dt);
                const info = {
                    EventId: id,
                    BeforeStatus: status,
                    AfterStatus: data[0].StatusId,
                    DateTime: DateTime,
                    UserName: user
                }
                // inserting log entry 
                db.query("insert into statuschangelog set ?", info, (err, data2) => {
                    if (err)
                        res.status(400)
                    else
                        res.send("Done");
                })
            }
        })
    })
})

router.get("/event_log/:id", (req, res, next) => {
    db.query(`
        SELECT l.Name,scl.* 
        from login as l, statuschangelog as scl 
        WHERE scl.UserName = l.UserName
        and scl.EventId = ? 
        order by scl.DateTime
    `, [req.params.id], (err, data) => {
        if (err)
            res.status(400);
        else {
            let count1 = 0, count2 = 0;;
            data.forEach((dataItem) => {
                db.query(`select StatusName from status where StatusId=?`
                    , [dataItem.BeforeStatus], (err, data1) => {
                        if (err)
                            res.status(400);
                        else {
                            count1++;
                            dataItem.BeforeStatusName = data1[0].StatusName;
                            if (count1 == data.length && count2 == data.length)
                                res.send(data);
                        }
                    });
                db.query(`select StatusName from status where StatusId=?`
                    , [dataItem.AfterStatus], (err, data2) => {
                        if (err)
                            res.status(400);
                        else {
                            count2++;
                            dataItem.AfterStatusName = data2[0].StatusName;
                            if (count1 == data.length && count2 == data.length)
                                res.send(data);
                        }
                    });
            });


            // res.send(data);
        }
    });
});

module.exports = router
