const db=require('../db'); 
const webPush = require('web-push')

const push={            // for normal web-push-notifications VAPID key based
    init:function () {
       
        const publicVapidKey="BN_K5rJpA-m8xRBSCrpAL3n1dQDb3swAENJX3Dpv9UwBgjW8YFeh4NNXCQnMBhmXkwDQRnd5U7pGLegqM9l5bz8"
         const privateVapidKey="9VGeb9DG9qDFSIO0UNuFpLXfvwZ_xbmmqeeboV2XYZM"
      
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