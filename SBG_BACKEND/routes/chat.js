const db = require("../db");
const express = require("express");
const router = express();
const datatime = require("dateformat");
const verifyToken = require('../utils/VerifyToken');

const push = require('../models/push-notifications');
const fcmPush = require('../models/fcm-push')
    // to send notification call push.sendNotification(<UserName>,<Title>,<Body>,<EventId>)

// push.sendNotification("deanSASgfadfg","You have a new message","Convener rep","eventId")

router.post("/deanattach", verifyToken, (req, res, next) => {
    console.log(req.files);
    res.send(req.files);
});

router.post("/deanmessage", verifyToken, (req, res, next) => {
    db.query("select StatusId from status where StatusName=?", ["MessageFromDeanToSBG"], (err, data1) => {
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
                                // console.log(info2);
                            res.send(info2);
                        })
                    })
                }
            })
            fcmPush.sendNotification('convener_sbg@daiict.ac.in', 'New Message', 'You have a new message from Dean Students', req.body.event);
            fcmPush.sendNotification('dy_convener_sbg@daiict.ac.in', 'New Message', 'You have a new message from Dean Students', req.body.event);
            push.sendNotification('convener_sbg@daiict.ac.in', 'New Message', 'You have a new message from Dean Students', req.body.event);
            push.sendNotification('dy_convener_sbg@daiict.ac.in', 'New Message', 'You have a new message from Dean Students', req.body.event);
        })
    })
})


router.post("/deanmessage1", verifyToken, (req, res, next) => {
    // console.log(req.body.event);
    db.query("select StatusId from status where StatusName=?", ["MessageFromDeanToSBG"], (err, data1) => {
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
                                //   console.log(info2);
                            res.send(info2);
                        })

                    })
                }
            })
            fcmPush.sendNotification('convener_sbg@daiict.ac.in', 'New Message', 'You have a new message from Dean Students', req.body.event);
            fcmPush.sendNotification('dy_convener_sbg@daiict.ac.in', 'New Message', 'You have a new message from Dean Students', req.body.event);
            push.sendNotification('convener_sbg@daiict.ac.in', 'New Message', 'You have a new message from Dean Students', req.body.event);
            push.sendNotification('dy_convener_sbg@daiict.ac.in', 'New Message', 'You have a new message from Dean Students', req.body.event);
        })
    })
})

router.post("/clubmessage", verifyToken, (req, res, next) => {
    db.query("select StatusId from status where StatusName=?", ["MessageFromClubToSBG"], (err, data1) => {
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

                            //   console.log(info2);
                            res.send(info2);
                        })

                    })
                    fcmPush.sendNotification('convener_sbg@daiict.ac.in', 'New Message', 'You have a new message from' + name, req.body.event);
                    fcmPush.sendNotification('dy_convener_sbg@daiict.ac.in', 'New Message', 'You have a new message from' + name, req.body.event);
                    push.sendNotification('convener_sbg@daiict.ac.in', 'New Message', 'You have a new message from' + name, req.body.event);
                    push.sendNotification('dy_convener_sbg@daiict.ac.in', 'New Message', 'You have a new message from' + name, req.body.event);
                }
            })
        })
    })
})


router.post("/sbgmessage", verifyToken, (req, res, next) => {
    db.query("select StatusId from status where StatusName=?", ["MessageFromSBGToDean"], (err, data1) => {
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

                            //   console.log(info2);
                            res.send(info2);
                        })

                    })
                }
            })
            fcmPush.sendNotification('dean@daiict.ac.in', 'New Message ', 'You have a new message from SBG', req.body.event);
            push.sendNotification('dean@daiict.ac.in', 'New Message ', 'You have a new message from SBG', req.body.event);

        })
    })
})

router.post("/sbgcmessage", verifyToken, (req, res, next) => {
    db.query("select StatusId from status where StatusName=?", ["MessageFromSBGToClub"], (err, data1) => {
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

                            //   console.log(info2);
                            res.send(info2);
                        })

                    })
                }
                fcmPush.sendNotification(name, 'New Message', 'You have a new message from SBG', req.body.event);
                push.sendNotification(name, 'New Message', 'You have a new message from SBG', req.body.event);

            })
        })
    })
})

router.post("/sbgmessage1", verifyToken, (req, res, next) => {
    //  console.log(req.body);
    db.query("select StatusId from status where StatusName=?", ["MessageFromSBGToDean"], (err, data1) => {
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

                            res.send(info2);
                        })

                    })
                }
            })
            fcmPush.sendNotification('dean@daiict.ac.in', 'New Message', 'You have a new message from SBG', req.body.event);
            push.sendNotification('dean@daiict.ac.in', 'New Message', 'You have a new message from SBG', req.body.event);

        })
    })
})

router.post("/sbgcmessage1", verifyToken, (req, res, next) => {
    // console.log(req.body);
    db.query("select StatusId from status where StatusName=?", ["MessageFromSBGToClub"], (err, data1) => {
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
                                //  console.log(info2.mes);

                            res.send(info2);
                        })

                    })
                }
                fcmPush.sendNotification(name, 'New Message', 'You have a new message from SBG', req.body.event);
                push.sendNotification(name, 'New Message', 'You have a new message from SBG', req.body.event);

            })
        })
    })
})
router.post("/clubmessage1", verifyToken, (req, res, next) => {
    // console.log(req.body);
    db.query("select StatusId from status where StatusName=?", ["MessageFromClubToSBG"], (err, data1) => {
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
                fcmPush.sendNotification('convener_sbg@daiict.ac.in', 'New Message' + name, 'You have a new message from' + "" + name, req.body.event);
                fcmPush.sendNotification('dy_convener_sbg@daiict.ac.in', 'New Message' + name, 'You have a new message from Dean Students' + "" + name, req.body.event);
                push.sendNotification('convener_sbg@daiict.ac.in', 'New Message' + name, 'You have a new message from' + "" + name, req.body.event);
                push.sendNotification('dy_convener_sbg@daiict.ac.in', 'New Message' + name, 'You have a new message from Dean Students' + "" + name, req.body.event);
            })
        })
    })
})


router.post("/mes_data", verifyToken, (req, res, next) => {
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
                //    console.log(info2.mes)
            res.send(info2);
        })
    })
})

router.post("/sbgattach", verifyToken, (req, res, next) => {
    res.send(req.files);
})


router.get("/requestmessage", verifyToken, (req, res, next) => {
    fcmPush.sendNotification('convener_sbg@daiict.ac.in', 'New Message', 'You have a new message from Dean Students', req.body.event);
    push.sendNotification('convener_sbg@daiict.ac.in', 'New Message', 'You have a new message from Dean Students', req.body.event);

})

router.post("/sbgcattach", verifyToken, (req, res, next) => {
    res.send(req.files);
})

router.post("/clubattach", verifyToken, (req, res, next) => {
    res.send(req.files);
})

router.get("/download/:path", verifyToken, (req, res, next) => {
    const name = req.params.path
        // console.log(name)
    res.download("../SBG_BACKEND/public/uploads/" + name)
});
module.exports = router