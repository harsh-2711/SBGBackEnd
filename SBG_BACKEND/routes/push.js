const db=require("../db")
const express=require("express")
const webpush=require("web-push")
const router=express()
const publickey="BN_K5rJpA-m8xRBSCrpAL3n1dQDb3swAENJX3Dpv9UwBgjW8YFeh4NNXCQnMBhmXkwDQRnd5U7pGLegqM9l5bz8"
const privatekey="9VGeb9DG9qDFSIO0UNuFpLXfvwZ_xbmmqeeboV2XYZM"
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
