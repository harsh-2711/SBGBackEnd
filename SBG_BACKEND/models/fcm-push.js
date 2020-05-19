var gcm = require('node-gcm');
const db=require('../db'); 

var fcmPush={           // for Android and iOS devices FCM based 
    sendNotification:function (UserName, Title, Body, EventId) {
        // Set up the sender with your GCM/FCM API key (declare this once for multiple messages)
        // var sender = new gcm.Sender(222488116906)
        var sender = new gcm.Sender('AAAAM81TPqo:APA91bGVqi_Gf4cpi8gFhK-tWlgy0efJV6FCFBH8PVQsfhqHar3VEUKx3ekiYpFo5XbU25MIrJ9eKRPwIqZk9ccO_0w02pW-oHqqsIedgh4tZ_2TQN8WVbtpbHVtcwsONRyjietVNixo');
        console.log("FROM FCM UserName"+UserName);
        var message = new gcm.Message({
            // collapseKey: 'demo',
            // priority: 'high',
            // contentAvailable: true,
            // delayWhileIdle: true,
            // timeToLive: 300,
            // restrictedPackageName: "somePackageName",
            // dryRun: true,
            notification: {
                title: Title,
                body: Body,
                EventId: EventId
            },
            data: {
                title: Title,
                body: Body,
                EventId: EventId
            },
            // notification: {
                
            // }
        });

        db.query("Select Token from fcmsubscriptions where UserName=?",UserName,(err,data)=>{
            if(err){
                // res.send(400);
                return;
            }
            else{
                if(data.length!=0){
                    const tokens = [];
                    data.forEach(item=>{
                        tokens.push(item.Token);
                    })
                    sender.send(message, { registrationTokens: tokens }, function (err, response) {
                        console.log("Error -> "+err);  
                        console.log("Response -> ");
                        console.log(response);
                        // var failed_tokens = tokens.filter((token, i) => response[i].error != null);
                        // console.log('These tokens are no longer ok:', failed_tokens);
                        // for(let i=0;i<failed_tokens.length;i++){
                        //     db.query("delete from fcmsubscription where Token=?",failed_tokens[i],(err,data)=>{
                        //         // nothing to do
                        //     })
                        // }
                    });
                }
                return;
            }
        })
    }
}

module.exports = fcmPush;
