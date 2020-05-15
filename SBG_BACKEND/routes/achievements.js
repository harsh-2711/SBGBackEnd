const db = require("../db");
const express = require("express");
const router = express()

router.post('/achievement', (req, res, next) => {
    db.query("Select StatusId from status where StatusName = ?", ["AchievementAdded"], (err, data) => {
        if (err)
            res.status(400);
        else {
            req.body.achievementData.Status = data[0].StatusId;
            db.query("insert into achievements set ?", req.body.achievementData,
                (err, data) => {
                    if (err)
                        res.status(400);
                    else {
                        const achievementId = data.insertId;
                        let count = 0;
                        req.body.winnerData.forEach(element => {
                            element.AchievementId = achievementId;
                            db.query("insert into achievementwinners set ?", element,
                                (err, data) => {
                                    if (err)
                                        res.status(400);
                                    else {
                                        count++;
                                        if (req.body.winnerData.length == count) {
                                            res.send(data);
                                        }
                                    }
                                })
                        });
                    }
                });
        }
    })
})

router.get("/achievement_status/:id", (req, res, next) => {
    db.query("select s1.* from achievements s, status s1 where s.Status=s1.StatusId and s.AchievementId=?"
        , [req.params.id], (err, data) => {
            if (err) {
                console.log(err);
                res.status(400);
            }
            else {
                res.send(data);
            }
        });
})

router.post("/approve_achievement", (req, res, next) => {
    db.query("select StatusId from status where StatusName = ?", ["AchievementApproved"],
        (err, data) => {
            if (err) {
                console.log(err);
                res.status(400);
            }
            else {
                db.query("update achievements set Status=? where AchievementId=?",
                    [data[0].StatusId, req.body.AchievementId], (err, data2) => {
                        if (err) {
                            console.log(err);
                            res.status(400);
                        }
                        else {
                            res.send(data2);
                        }
                    });
            }
        });
});

router.post("/reject_achievement", (req, res, next) => {
    db.query("select StatusId from status where StatusName = ?", ["AchievementRejected"],
        (err, data) => {
            if (err) {
                console.log(err);
                res.status(400);
            }
            else {
                db.query("update achievements set status=? where AchievementId=?",
                    [data[0].StatusId, req.body.AchievementId], (err, data2) => {
                        if (err) {
                            console.log(err);
                            res.status(400);
                        }
                        else {
                            res.send(data2);
                        }
                    });
            }
        });
});

router.get('/approved_achievements', (req, res, next) => {
    db.query("Select * from achievements where Status=20", (err, data) => {
        if (err)
            res.status(400);
        else
            res.send(data);
    })
})
router.get('/requested_achievements', (req, res, next) => {
    db.query("Select * from achievements where Status=19", (err, data) => {
        if (err)
            res.status(400);
        else
            res.send(data);
    })
})

router.get("/achievement/:id", (req, res, next) => {
    db.query("Select * from achievements where AchievementId=?"
        , [req.params.id], (err, data) => {
            if (err) {
                console.log(err);
                res.status(400);
            }
            else {
                res.send(data);
            }
        })
});

router.get("/winners/:id", (req, res, next) => {
    db.query("Select * from achievementwinners where AchievementId=?"
        , [req.params.id], (err, data) => {
            if (err) {
                console.log(err);
                res.status(400);
            }
            else {
                res.send(data);
            }
        })
});

module.exports = router