const db = require('../db')
const express = require('express');
const router = express()
const verifyToken = require('../utils/VerifyToken');


router.post("/getreportevent1", verifyToken, (req, res, next) => {
    const club = req.body.club
    db.query("select ClubId from club where ClubEmail=?", [club], (err, data) => {
        if (err)
            res.status(400)
        else {
            db.query("select * from event where ClubId=? and StatusId=?", [data[0].ClubId, 5], (err, data1) => {
                if (err)
                    res.status(400)
                else {
                    console.log(data1)
                    res.send(data1);
                }
            })
        }
    })
})

router.post('/report1', verifyToken, (req, res, next) => {
    console.log(req.body);
    db.query("update event set StatusId=? where EventId=?", [6, req.body.ReportData.EventId.value], (err, data1) => {
        if (err)
            res.status(400);
        else {

            const info = {
                EventId: req.body.ReportData.EventId.value,
                ReportDate: req.body.ReportData.ReportDate,
                Attendance: req.body.ReportData.Attendance,
                Description: req.body.ReportData.Description,
                Images: req.body.ReportData.Images
            }
            db.query("insert into report set ?", info,
                (err, data) => {
                    if (err)
                        res.status(400);
                    else {
                        const ReportId = data.insertId;
                        let count = 0;
                        req.body.winnerData.forEach(element => {
                            element.ReportId = ReportId;
                            element.StudentId = parseInt(element.StudentId)
                            console.log(element)
                            db.query("insert into reportwinners set ?", element,
                                (err, data2) => {
                                    if (err)
                                        res.status(400);
                                    else {
                                        count++;
                                        if (req.body.winnerData.length == count) {
                                            res.send("inserted");
                                        }
                                    }
                                })
                        });
                    }
                });
        }
    })
})

router.get("/getreport", verifyToken, (req, res, next) => {
    db.query("select report.*,event.EventName,event.EventId,event.StatusId,club.ClubName from report join event on event.EventId=report.EventId join club on club.ClubId=event.ClubId where event.StatusId=?", [7], (err, data) => {
        if (err)
            res.status(400)
        else {

            res.send(data)
        }
    })
})


router.get("/getreprequest", verifyToken, (req, res, next) => {
    db.query("select report.*,event.EventName,event.EventId,event.StatusId,club.ClubName from report join event on event.EventId=report.EventId join club on club.ClubId=event.ClubId where event.StatusId=?", [6], (err, data) => {
        if (err)
            res.status(400)
        else {

            res.send(data)
        }
    })
})

router.get("/getreport1/:id", verifyToken, (req, res, next) => {
    db.query("select report.*,event.EventName,event.EventId,event.StatusId,club.ClubName from report join event on event.EventId=report.EventId join club on club.ClubId=event.ClubId where report.ReportId=?", [req.params.id], (err, data) => {
        if (err)
            res.status(400)
        else {
            console.log(data);
            res.send(data)
        }
    })
})


router.get("/winners1/:id", verifyToken, (req, res, next) => {

    db.query("select * from reportwinners where ReportId=?", [req.params.id], (err, data) => {
        if (err)
            res.status(400)
        else {
            res.send(data);
        }
    })
})


router.post("/acceptreport", verifyToken, (req, res, next) => {
    const id = req.body.id;
    db.query("select EventId from report where ReportId=?", [id], (err, data) => {
        if (err)
            res.status(400)
        else {
            const event = data[0].EventId;
            db.query("update event set StatusId=? where EventId=?", [7, event], (err, data) => {
                if (err)
                    res.status(400)
                else {
                    res.send("Inserted");
                }
            })
        }
    })
})
router.post("/rejectreport", verifyToken, (req, res, next) => {
    const id = req.body.id;
    db.query("select EventId from report where ReportId=?", [id], (err, data) => {
        if (err)
            res.status(400)
        else {
            const event = data[0].EventId;
            db.query("update event set StatusId=? where EventId=?", [5, event], (err, data) => {
                if (err)
                    res.status(400)
                else {
                    res.send("Inserted");
                }
            })
        }
    })
})

router.post("/sbgseccattach", verifyToken, (req, res, next) => {
    res.send(req.files);
})


router.post("/sbgseccmessage", verifyToken, (req, res, next) => {
    db.query("select StatusId from status where StatusName=?", ["MessageFromSecToClub"], (err, data1) => {
        db.query("select Name from login where UserName=?", [req.body.user], (err, data2) => {

            const name = data2[0].Name;
            const dt = new Date()
            const dt1 = dt.toISOString().split('T')[0] + ' ' +
                dt.toTimeString().split(' ')[0];
            const data = {
                MessageText: req.body.message,
                EventId: req.body.event,
                UserName: name,
                DateTime: dt1,
                MessageDirection: data1[0].StatusId,
                IsNotified: false

            }
            db.query("insert into communication set ?", data, (err, data2) => {
                if (err)
                    res.status(400)
                else {
                    const mes_id = data2.insertId;

                    for (let i = 0; i < req.body.files.length; i++) {
                        const info = {
                            Name: req.body.files[i].filename,
                            MessageId: mes_id
                        }
                        db.query("insert into attachments set ?", info, (err, data3) => {})
                    }
                    db.query("select * from communication  where EventId=? ORDER BY DateTime ASC", [req.body.event], (err, data5) => {
                        db.query("select * from attachments", (err, data3) => {
                            for (let i = 0; i < data5.length; i++) {
                                data5[i].DateTime = data5[i].DateTime.toISOString().split('T')[0] + ' ' +
                                    data5[i].DateTime.toTimeString().split(' ')[0];
                            }
                            info2 = {
                                mes: data5,
                                attach: data3
                            }

                            console.log(info2);
                            res.send(info2);
                        })

                    })
                }
            })
        })
    })
})
router.post("/clubsecmessage", verifyToken, (req, res, next) => {
    db.query("select StatusId from status where StatusName=?", ["MessageFromClubToSec"], (err, data1) => {
        db.query("select Name from login where UserName=?", [req.body.user], (err, data2) => {

            const name = data2[0].Name;
            const dt = new Date()
            const dt1 = dt.toISOString().split('T')[0] + ' ' +
                dt.toTimeString().split(' ')[0];
            const data = {
                MessageText: req.body.message,
                EventId: req.body.event,
                UserName: name,
                DateTime: dt1,
                MessageDirection: data1[0].StatusId,
                IsNotified: false

            }
            db.query("insert into communication set ?", data, (err, data2) => {
                if (err)
                    res.status(400)
                else {
                    const mes_id = data2.insertId;

                    for (let i = 0; i < req.body.files.length; i++) {
                        const info = {
                            Name: req.body.files[i].filename,
                            MessageId: mes_id
                        }
                        db.query("insert into attachments set ?", info, (err, data3) => {})
                    }
                    db.query("select * from communication  where EventId=?  ORDER BY DateTime  ASC", [req.body.event], (err, data5) => {
                        db.query("select * from attachments", (err, data3) => {
                            for (let i = 0; i < data5.length; i++) {
                                data5[i].DateTime = data5[i].DateTime.toISOString().split('T')[0] + ' ' +
                                    data5[i].DateTime.toTimeString().split(' ')[0];
                            }
                            info2 = {
                                mes: data5,
                                attach: data3
                            }

                            console.log(info2);
                            res.send(info2);
                        })

                    })
                }
            })
        })
    })
})

router.post("/sbgseccmessage1", verifyToken, (req, res, next) => {
    console.log(req.body);
    db.query("select StatusId from status where StatusName=?", ["MessageFromSecToClub"], (err, data1) => {
        db.query("select Name from login where UserName=?", [req.body.user], (err, data2) => {

            const name = data2[0].Name;
            const dt = new Date()
            const dt1 = dt.toISOString().split('T')[0] + ' ' +
                dt.toTimeString().split(' ')[0];
            const data = {
                MessageText: req.body.message,
                EventId: req.body.event,
                UserName: name,
                DateTime: dt1,
                MessageDirection: data1[0].StatusId,
                IsNotified: false

            }
            db.query("insert into communication set ?", data, (err, data2) => {
                if (err)
                    res.status(400)
                else {
                    db.query("select * from communication  where EventId=?  ORDER BY DateTime ASC", [req.body.event], (err, data5) => {
                        db.query("select * from attachments", (err, data3) => {
                            for (let i = 0; i < data5.length; i++) {
                                data5[i].DateTime = data5[i].DateTime.toISOString().split('T')[0] + ' ' +
                                    data5[i].DateTime.toTimeString().split(' ')[0];
                            }
                            info2 = {
                                mes: data5,
                                attach: data3
                            }
                            console.log(info2.mes);

                            res.send(info2);
                        })

                    })
                }
            })
        })
    })
})


router.post("/clubsecmessage1", verifyToken, (req, res, next) => {
    console.log(req.body);
    db.query("select StatusId from status where StatusName=?", ["MessageFromClubToSec"], (err, data1) => {
        db.query("select Name from login where UserName=?", [req.body.user], (err, data2) => {

            const name = data2[0].Name;
            const dt = new Date()
            const dt1 = dt.toISOString().split('T')[0] + ' ' +
                dt.toTimeString().split(' ')[0];
            const data = {
                MessageText: req.body.message,
                EventId: req.body.event,
                UserName: name,
                DateTime: dt1,
                MessageDirection: data1[0].StatusId,
                IsNotified: false

            }
            db.query("insert into communication set ?", data, (err, data2) => {
                if (err)
                    res.status(400)
                else {
                    db.query("select * from communication  where EventId=?  ORDER BY DateTime ASC", [req.body.event], (err, data5) => {
                        db.query("select * from attachments", (err, data3) => {
                            for (let i = 0; i < data5.length; i++) {
                                data5[i].DateTime = data5[i].DateTime.toISOString().split('T')[0] + ' ' +
                                    data5[i].DateTime.toTimeString().split(' ')[0];
                            }
                            info2 = {
                                mes: data5,
                                attach: data3
                            }

                            res.send(info2);
                        })

                    })
                }
            })
        })
    })
})


router.post("/attendreport", verifyToken, (req, res, next) => {

    res.send(req.files[0].filename);
})
module.exports = router