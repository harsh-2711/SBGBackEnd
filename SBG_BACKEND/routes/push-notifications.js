const db = require("../db");
const express = require('express')
const app = express();
const verifyToken = require('../utils/VerifyToken');

app.post('/subscribe-for-fcm-push', verifyToken, (req, res, next) => {
    // console.log(req.body);
    db.query("select * from fcmsubscriptions where Token=?", req.body.Token, (err0, data0) => {
        if (err0) {
            console.log(err0.message);
            res.send(400);
        } else {
            if (data0.length == 0) {
                db.query("insert into fcmsubscriptions set ?", req.body, (err, data) => {
                    if (err) {
                        res.status(400);
                        res.send("Some error occured !\n" + err.message);
                        console.log(err.message);
                    } else {
                        res.status(200);
                        res.send("Added to subscriptions");
                    }
                })
            } else {
                res.status(200);
                res.send("Already Added to subscriptions");
            }
        }
    });

})

app.post('/unsubscribe-from-fcm-push', verifyToken, (req, res, next) => {
    db.query("delete from fcmsubscriptions where Token=?", [req.body.token], (err, data) => {
        if (err) {
            res.status(400);
            res.send("Some error occured !\n" + err.message);
            console.log(err.message);
        } else {
            res.status(200);
            res.send("removed from subscriptions");
        }
    })
})


// in this request we will get subscription object with endpoint url which sends the message directly to the device
app.post('/subscribe-for-push-notification', verifyToken, (req, res, next) => {
    console.log(req.body)
    const values = {
        UserName: req.body.UserName,
        //JSON.stringify(req.body.Subscription)
        EndPoint: req.body.Subscription.endpoint,
        Expire: req.body.Subscription.expirationTime,
        Auth: req.body.Subscription.keys.auth,
        Other: req.body.Subscription.keys.p256dh
    }

    console.log(req.body.UserName);

    db.query("insert into pushsubscription set ?", [values], (err, data) => {
        if (err) {
            console.error(err);
            res.send(400);
        } else {
            res.send(data);
        }
    })


})

app.post('/unsubscribe-for-push-notification', verifyToken, (req, res, next) => {
    console.log(req.body.UserName + "from unscribe")
    console.log(req.body.Subscription);
    console.log(req.body.UserName)

    const subscriptionString = req.body.Subscription.endpoint //JSON.stringify(req.body.Subscription);

    db.query("delete from pushsubscription where UserName=? && EndPoint=?", [req.body.UserName, subscriptionString], (err, data) => {
        if (err) {
            res.status(400);
        } else {
            res.send("Done")
        }
    })
})


app.post("/getnotification", verifyToken, (req, res, next) => {
    const user = req.body.user
    db.query("select * from notifications where UserName=?", [user], (err, data) => {
        if (err)
            res.status(400)
        else {
            res.send(data)
        }

    })
})

app.post("/deletenotify", verifyToken, (req, res, next) => {
    const id = req.body.id
    const user = req.body.user
    db.query("delete from notifications where NotificationId in (?)", [id], (err, data) => {
        if (err) {
            res.status(400)
            console.log(err.message);
        } else {
            db.query("select * from notifications where UserName=?", [user], (err, data2) => {
                if (err)
                    res.status(400)
                else {
                    res.send(data2)
                }
            })
        }
    })
})

module.exports = app