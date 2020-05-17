const db=require("../db")
const express=require("express")
const webpush=require("web-push")
const router=express()
const publickey="BGxwNY7oZ0WQPxRwEKiehWdLw1pYOXBI3Mju2HQmx4SHbUG1s0pJ6ThZG42a2Tpge6YYBlIAuOTQmliV8uWsASo"
const privatekey="UDgYP-_1xwZXHvKmirtxAb32muoDATaLbAgwYA0uEk0"
webpush.setVapidDetails('mailto:sharma.aman1298@gmail.com',publickey,privatekey)


router.post("/notifypush",(req,res,next)=>{
    console.log("Aman")
    console.log(req.body)
    const info=req.body.subscription;
    const payload=JSON.stringify({title:'Event Remainder'})
    webpush.sendNotification(info,payload).catch(err=>{
        console.log("Error in push notification");
    })
})


module.exports=router
