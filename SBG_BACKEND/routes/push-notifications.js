const db = require("../db");
const express = require('express')
const app = express();


// in this request we will get subscription object with endpoint url which sends the message directly to the device
app.post('/subscribe-for-push-notification', (req,res)=>{
    const values={
        UserName: req.body.UserName,
        Subscription:  req.body.Subscription         //JSON.stringify(req.body.Subscription)
    }

    console.log(req.body.Subscription);

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

app.post('/unsubscribe-for-push-notification', (req,res)=>{
    console.log(req.body.Subscription);

    const subscriptionString = req.body.Subscription     //JSON.stringify(req.body.Subscription);

    db.query("delete from pushsubscription where UserName=? and Subscription=?",[req.body.UserName,subscriptionString],(err,data)=>{
        if(err){
            console.error(err);
            res.send(400);
        }
        else{
            res.send(data);
        }
    })
})


module.exports = app