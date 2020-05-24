const express = require("express");
var path = require('path');
const db = require("../db");
const router = express();
const fs = require('fs');
const datetime = require('dateformat');
const verifyToken = require('../utils/VerifyToken');

router.post("/upload-certificate", verifyToken, (req, res, next) => {
    res.send(req.files[0].filename);
})

router.post('/issue-certificate', verifyToken, (req, res, next) => {
    let statusId = "";
    let by = "";
    db.query("select RoleId from login where UserName=?", req.body.IssuedBy, (err2, data2) => {
        if (data2[0].RoleId == 4) // its club
        {
            statusId = "CertificateNotApproved";
            by = "club";
        } else if (data2[0].RoleId == 7 || data2[0].RoleId == 9) // its secretary or SBG Master account
        {
            statusId = "CertificateApproved";
            by = "sbg";
        } else {
            res.status(400);
        }
        db.query("select StatusId from status where StatusName = ?", statusId,
            (err, data1) => {
                if (data1.length != 0) {
                    const studentList = req.body.Students;
                    let count = 0;
                    studentList.forEach((username) => {
                        const data = {
                            UserName: username,
                            DateTime: req.body.DateTime,
                            Certificate: req.body.Certificate,
                            Name: req.body.Name,
                            Status: data1[0].StatusId,
                            IssuedBy: req.body.IssuedBy
                        }
                        db.query("insert into certificates set ?", data, (err, data) => {
                            if (err) {
                                console.log(err);
                                res.status(400);
                            } else {
                                count++;
                                if (count == studentList.length) {
                                    if (by == "club") {
                                        res.send("Certificate sent to Secretary for approval !");
                                    } else {
                                        res.send("Certificate Issued !");
                                    }
                                }
                            }
                        });
                    });
                }
            });

    });


})


router.get('/issued-certificates/:userName', verifyToken, (req, res, next) => {
    db.query("Select RoleId from login where UserName=?", req.params.userName, (err1, data1) => {
        if (err1) {
            console.log(err1);
            res.status(400);
        } else {
            if (data1[0].RoleId == 4) //  club
            {
                db.query("Select * from certificates where Status = 25 and IssuedBy = ? ", req.params.userName, (err, data) => {
                    if (err) {
                        console.log(err);
                        res.status(400);
                    } else {
                        res.send(data);
                    }
                })
            } else if (data1[0].RoleId == 7 || data1[0].RoleId == 9) { //  sbg or secretary
                db.query("Select * from certificates where Status = 25", (err, data) => {
                    if (err) {
                        console.log(err);
                        res.status(400);
                    } else {
                        res.send(data);
                    }
                })
            }
        }
    })
});

router.get('/pending-approval-certificates/:userName', verifyToken, (req, res, next) => {
    db.query("Select RoleId from login where UserName=?", req.params.userName, (err1, data1) => {
        if (err1) {
            console.log(err1);
            res.status(400);
        } else {
            if (data1[0].RoleId == 4) //  club
            {
                db.query("Select * from certificates where Status = 24 and IssuedBy = ? ", req.params.userName, (err, data) => {
                    if (err) {
                        console.log(err);
                        res.status(400);
                    } else {
                        res.send(data);
                    }
                })
            } else if (data1[0].RoleId == 7 || data1[0].RoleId == 9) { //  sbg or secretary
                db.query("Select * from certificates where Status = 24", (err, data) => {
                    if (err) {
                        console.log(err);
                        res.status(400);
                    } else {
                        res.send(data);
                    }
                })
            }
        }
    })
});


router.get("/certificates/:userName", verifyToken, (req, res, next) => {
    db.query("select StatusId from status where StatusName = ?", "CertificateApproved",
        (err, data1) => {
            db.query("select * from certificates where UserName = ? and Status=?", [req.params.userName, data1[0].StatusId], (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(400);
                } else {
                    res.send(data);
                }
            });
        });
})

router.get('/view-certificate/:id', verifyToken, (req, res, next) => {
    // console.log("Hey");
    db.query("select * from certificates where CertificateId=?", [req.params.id], (err, data) => {
        if (err)
            res.status(400)
        else {
            res.send('/public/uploads/' + data[0].Certificate);
        }
    })
})

router.get("/download-certificate/:id", verifyToken, (req, res, next) => {
    // console.log("Hey");
    db.query("select Certificate from certificates where CertificateId=?", [req.params.id], (err, data) => {
        if (err)
            res.status(400)
        else {
            const fileName = data[0].Certificate;
            var img = fs.readFile(path.resolve('../SBG_BACKEND/public/uploads/' + fileName),
                function(err1, data1) {
                    if (err1) {
                        res.status(400);
                        console.log(err1);
                        // res.send(err1);
                    } else {
                        var contentType = fileName.substr(fileName.lastIndexOf('.') + 1);;
                        var base64 = Buffer.from(data1).toString('base64');
                        if (contentType == 'jpg') {
                            base64 = 'data:image/jpg;base64,' + base64;
                        } else if (contentType == 'jpeg') {
                            base64 = 'data:image/jpeg;base64,' + base64;
                        } else if (contentType == 'png') {
                            base64 = 'data:image/png;base64,' + base64;
                        }
                        res.send({
                            blob: base64,
                            name: fileName
                        });
                    }
                });
        }
    })
})

router.post("/approve-certificate", verifyToken, (req, res, next) => {
    db.query("Select StatusId from status where StatusName = ?", "CertificateApproved",
        (err, data) => {
            if (err) {
                console.log(err);
                res.status(400);
            } else {
                db.query("update certificates set Status=? where CertificateId = ?", [data[0].StatusId, req.body.id],
                    (err1, data1) => {
                        if (err1) {
                            console.log(err1);
                            res.status(400);
                        } else {
                            res.send("Approved");
                        }
                    })
            }
        });
})

router.post("/reject-certificate", verifyToken, (req, res, next) => {
    db.query("Select StatusId from status where StatusName = ?", "CertificateRejected",
        (err, data) => {
            if (err) {
                console.log(err);
                res.status(400);
            } else {
                db.query("update certificates set Status=? where CertificateId = ?", [data[0].StatusId, req.body.id],
                    (err1, data1) => {
                        if (err1) {
                            console.log(err1);
                            res.status(400);
                        } else {
                            res.send("Rejected");
                        }
                    })
            }
        });
})
module.exports = router;