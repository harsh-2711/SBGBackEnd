
var db=require('../db'); 
const webPush = require('web-push')
var push={
    init:function () {
       
        const publicVapidKey="BGxwNY7oZ0WQPxRwEKiehWdLw1pYOXBI3Mju2HQmx4SHbUG1s0pJ6ThZG42a2Tpge6YYBlIAuOTQmliV8uWsASo"
         const privateVapidKey="UDgYP-_1xwZXHvKmirtxAb32muoDATaLbAgwYA0uEk0"
      
        webPush.setVapidDetails('mailto:sharma.aman1298@gmail.com',publicVapidKey, privateVapidKey)

        return true;
    },
    sendNotification:function (UserName, Title, Body, EventId){
        db.query("select * from pushsubscription where UserName=?",UserName,
        (err,data)=>{

            if(err){
                return -1;
            }
            else{
                if(data.length>0)
                {
                const payload={
                    title: Title,
                    body: Body,
                    eventId: EventId
                }
                
                const payloadString = JSON.stringify(payload);
              console.log(payloadString)
                data.forEach(subscription=>{
                        subscribe={
                            endpoint:subscription.EndPoint,
                            expirationTime:subscription.Expire,
                            keys:{
                                auth:subscription.Auth,
                                p256dh:subscription.Other
                            }

                        }
                    webPush.sendNotification(subscribe,payloadString)
                    .catch(error=> console.error("Error in sending push notification\n"+error))
                })

                db.query("insert into notifications set UserName=?,EventId=?,Title=?,SubTitle=?,IsNotified=?",[UserName,EventId,Title,Body,false],(err,data6)=>{
                    if(err)
                    res.status(400)
                    else
                    {

                    }
                }

                )
            }
        }
        })
    }  
};

module.exports=push;