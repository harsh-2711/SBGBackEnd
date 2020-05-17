require('dotenv').config({path: 'variables.env'})
var db=require('../db'); 
 
var push={
    init:function () {
        const webPush = require('web-push')
        const publicVapidKey = process.env.PUBLIC_VAPID_KEY
        const privateVapidKey = process.env.PRIVATE_VAPID_KEY

        webPush.setVapidDetails('mailto:maulik9211@gmail.com',publicVapidKey, privateVapidKey)

        return true;
    },
    sendNotification:function (UserName, Title, Body, EventId){
        db.query("select Subscription from pushsubscription where UserName=?",UserName,
        (err,data)=>{
            if(err){
                return -1;
            }
            else{
                const payload={
                    title: Title,
                    body: Body,
                    eventId: EventId
                }
                const payloadString = JSON.stringify(payload);
                data.forEach(subscription=>{
                    webPush.sendNotification(subscription, payloadString)
                    .catch(error=> console.error("Error in sending push notification\n"+error))
                })
            }
        })
    }  
};

module.exports=push;