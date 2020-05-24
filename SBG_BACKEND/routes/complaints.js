const db = require("../db");
const express = require("express");
const dateformat = require('dateformat');
const verifyToken = require('../utils/VerifyToken');
const router = express()

router.post("/add_complaint", verifyToken, (req, res, next) => {
    db.query("select * from status where StatusName=?", ["ComplaintAdded"], (err, data1) => {
        const ComplaintTags = req.body.ComplaintTags;
        const dt = new Date()
        const dt1 = dt.toISOString().split('T')[0] + ' ' +
            dt.toTimeString().split(' ')[0];
        const data = {
            UserName: req.body.UserName,
            ComplaintTitle: req.body.ComplaintTitle,
            ComplaintText: req.body.ComplaintText,
            Status: data1[0].StatusId,
            IsAnonymous: req.body.IsAnonymous,
            DateTime: dt1
        }
        db.query("insert into complaint set ?", data, (err, data2) => {
                if (err)
                    res.status(400)
                else {
                    if (ComplaintTags.length != 0) {
                        let count = 0;
                        const complaintId = data2.insertId;
                        ComplaintTags.forEach(tag => {
                            const values = {
                                ComplaintId: complaintId,
                                ClubId: tag
                            }
                            db.query("Insert into complainttags set ?", values, (err, data3) => {
                                if (err)
                                    res.send(400);
                                else {
                                    count++;
                                    if (count == ComplaintTags.length) {
                                        res.send("Complaint Added");
                                    }
                                }
                            });
                        });
                    } else {
                        res.send("Complaint Added");
                    }
                }
            })
            // sending event id
    })
})

router.get("/get_complaints", verifyToken, (req, res, next) => {
    db.query("Select c.*,s.StatusName from complaint c, status s where s.StatusId=c.Status", (err, data) => {
        if (err) {
            console.log(err);
            res.status(400);
        } else {
            if (data.length != 0) {
                for (let i = 0; i < data.length; i++) {
                    data[i].DateTime = data[i].DateTime.toISOString().split('T')[0] + ' ' +
                        data[i].DateTime.toTimeString().split(' ')[0];
                }
                res.send(data);
            }
        }

    })
})

router.get("/get_complaint/:id", verifyToken, (req, res, next) => {
    db.query("Select c.*,l.Name,s.StatusName from complaint c, login l, status s where c.ComplaintId = ? and c.Status=s.StatusId and l.UserName=c.UserName", [req.params.id], (err, data) => {
        if (err) {
            console.log(err);
            res.status(400);
        } else {
            if (data.length != 0) {
                for (let i = 0; i < data.length; i++) {
                    data[i].DateTime = data[i].DateTime.toISOString().split('T')[0] + ' ' +
                        data[i].DateTime.toTimeString().split(' ')[0];
                }
                res.send(data);
            }
        }
    })
});

router.get("/complaint_status/:id", verifyToken, (req, res, next) => {
    db.query("select s.* from status s, complaint c where c.Status=s.StatusId and c.ComplaintId=?", [req.params.id], (err, data) => {
        if (err) {
            res.status(400);
        } else {
            res.send(data);
        }
    });
});

router.get("/get_tagged_clubs/:id", verifyToken, (req, res, next) => {
    db.query("select c1.ClubName from club as c1, complaint as c2, complainttags as c3 where c1.ClubId=c3.ClubId and c2.ComplaintId = c3.ComplaintId and c2.ComplaintId=?", [req.params.id], (err, data) => {
        if (err) {
            res.status(400);
        } else {
            res.send(data);
        }
    });
});

router.post('/change_to_in_process', verifyToken, (req, res, next) => {
    db.query("select StatusId from status where StatusName='ComplaintInProcess'",
        (err, data) => {
            if (err)
                res.status(400);
            else {
                db.query("update complaint set status=? where ComplaintId=?", [data[0].StatusId, req.body.id], (err, data2) => {
                    if (err)
                        res.status(400);
                    else {
                        res.send(data2);
                    }
                });
            }
        });
});

router.post('/change_to_solved', verifyToken, (req, res, next) => {
    db.query("select StatusId from status where StatusName='ComplaintResolved'",
        (err, data) => {
            if (err)
                res.status(400);
            else {
                db.query("update complaint set status=? where ComplaintId=?", [data[0].StatusId, req.body.id], (err, data2) => {
                    if (err)
                        res.status(400);
                    else {
                        res.send(data2);
                    }
                });
            }
        });
});

router.get('/vote_count/:id', verifyToken, (req, res, next) => {
    db.query("select sum(Vote) as voteCount from complaintvotes where ComplaintId=?", [req.params.id],
        (err, data) => {
            if (err) {
                console.log("select from complaintvotes");
                res.status(400);
            } else {
                res.send(data);
            }
        });
});

router.get('/has_voted/:userName/:id', verifyToken, (req, res, next) => {
    db.query("Select * from complaintvotes where UserName = ? and ComplaintId=?", [req.params.userName, req.params.id],
        (err, data) => {
            if (err)
                res.status(400);
            else {
                if (data.length != 0)
                    res.send(true);
                else
                    res.send(false);
            }
        });
});

router.post("/downvote", verifyToken, (req, res, next) => {
    userName = req.body.userName;
    complaintId = req.body.complaintId;

    db.query("select * from complaintvotes where UserName=? and ComplaintId=?", [userName, complaintId],
        (err, data) => {
            if (err) {
                console.log(err)
                res.status(400)
            } else {
                if (data.length == 0) { // not voted before -> insert query
                    db.query("insert into complaintvotes set ?", { UserName: userName, ComplaintId: complaintId, Vote: -1 }, (err1, data1) => {
                        if (err1) {
                            res.status(400);
                            console.log("Cannot insert into complaintvotes");
                        } else {
                            res.send(data1);
                        }
                    });
                } else { // already voted 
                    res.send("Already voted");
                }
            }
        });
});

router.post("/upvote", verifyToken, (req, res, next) => {
    userName = req.body.userName;
    complaintId = req.body.complaintId;

    db.query("select * from complaintvotes where UserName=? and ComplaintId=?", [userName, complaintId],
        (err, data) => {
            if (err) {
                console.log(err)
                res.status(400)
            } else {
                if (data.length == 0) { // not voted before -> insert query
                    db.query("insert into complaintvotes set ?", { UserName: userName, ComplaintId: complaintId, Vote: 1 }, (err1, data1) => {
                        if (err1) {
                            res.status(400);
                            console.log("Cannot insert into complaintvotes");
                        } else {
                            res.send(data1);
                        }
                    });
                } else { // already voted 
                    res.send("Already voted");
                }
            }
        });
});

router.get("/complaints_by_username/:username", verifyToken, (req, res, next) => {
    db.query(
        `select * from complaint where UserName=?`, [req.params.UserName], (err, data) => {
            if (err)
                res.status(400)
            else {
                res.send(data);
            }
        })
});

router.post("/add_comment", verifyToken, (req, res, next) => {
    const dt = new Date()
    const dt1 = dt.toISOString().split('T')[0] + ' ' +
        dt.toTimeString().split(' ')[0];
    const formData = {
        UserName: req.body.UserName,
        ComplaintId: req.body.ComplaintId,
        Text: req.body.Text,
        DateTime: dt1
    }
    db.query("insert into complaintcomments set ?", formData, (err, data) => {
        if (err)
            res.status(400);
        else {
            res.send(data);
            // db.query("Select * from complaintcomments where ComplaintId = ?",[req.body.ComplaintId],(err,data2)=>{
            //     if(err)
            //         res.status(400);
            //     else    
            //         res.send(data2);
            // });
        }
    });
})

router.get("/comments/:id", verifyToken, (req, res, next) => {
    db.query("Select c.*,l.Name from complaintcomments c, login l where c.ComplaintId=? and l.UserName=c.UserName",
        req.params.id, (err, data) => {
            if (err) {
                console.log(err);
                res.status(400);
            } else {
                if (data.length != 0) {
                    for (let i = 0; i < data.length; i++) {
                        data[i].DateTime = data[i].DateTime.toISOString().split('T')[0] + ' ' +
                            data[i].DateTime.toTimeString().split(' ')[0];
                    }
                    res.send(data);
                }
            }
        });
});

module.exports = router