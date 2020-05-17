const db = require("../db");
const express = require('express')
const app = express();


// in this request we will get subscription object with endpoint url which sends the message directly to the device
app.post('/subscribe-for-push-notification', (req,res,next)=>{
    console.log(req.body)
    const values={
        UserName: req.body.UserName,
                                               //JSON.stringify(req.body.Subscription)
        EndPoint:req.body.Subscription.endpoint,
        Expire:req.body.Subscription.expirationTime,
        Auth:req.body.Subscription.keys.auth,
        Other:req.body.Subscription.keys.p256dh
    }

    console.log(req.body.UserName);

    db.query("insert into pushsubscription set ?",[values],(err,data)=>{
        if(err){
            console.error(err);
            res.send(400);
        }
        else{
            res.send(data);
        }
    })


})

app.post('/unsubscribe-for-push-notification', (req,res,next)=>{
    console.log(req.body.UserName + "from unscribe")
    console.log(req.body.Subscription);
    console.log(req.body.UserName)

    const subscriptionString = req.body.Subscription.endpoint     //JSON.stringify(req.body.Subscription);

    db.query("delete from pushsubscription where UserName=? && EndPoint=?",[req.body.UserName,subscriptionString],(err,data)=>{
        if(err){
            res.status(400);
        }
        else{
            res.send("Done")
        }
    })
})


module.exports = app