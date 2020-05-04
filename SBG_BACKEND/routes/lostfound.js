const express=require("express");
const db=require("../db");
const router=express();
const fs=require('fs');
const datetime=require('dateformat');
const nodemailer=require('nodemailer');
const transport=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"sharma.aman1298@gmail.com",
        pass:"aman$1234"
    }
    });

router.post("/imgupload",(req,res,next)=>{
    res.send(req.files[0].filename);
})

router.post("/submitrequest",(req,res,next)=>{
    console.log(req.body);
    const data={
         UserName:req.body.user,
         Description:req.body.desp,
         Place:req.body.place,
         DateTime:datetime(req.body.time),
         ItemName:req.body.name,
         Image:req.body.image,
         TempStatus:req.body.temp,
         FinalStatus:req.body.org
    }
    db.query("insert into lostfound set ?",[data],(err,data1)=>{
        if(err)
        res.status(400)
        else{
            res.send("Inserted");
        }
    })
})

router.get("/lfrequest",(req,res,next)=>{
    console.log("Hey Aman");
    db.query("select * from lostfound join login on lostfound.UserName=login.UserName where lostfound.FinalStatus IS NULL",(err,data1)=>{
        if(err)
        res.status(400)
        else
        {
            console.log(data1);
            res.send(data1);
        }
    })
})

router.post("/arequest",(req,res,next)=>{
    const id=req.body.itemid;
    const status=req.body.status;
    db.query("update lostfound set FinalStatus=? where ItemId=?",[status,id],(err,data)=>{
        if(err)
        res.status(400)
        else
        res.send("Done");
    })
})
router.get("/lost",(req,res,next)=>{
      
      db.query("select * from lostfound join login on lostfound.UserName=login.UserName where FinalStatus=0",(err,data)=>{
          if(err)
          res.status(400)
          else
          {
           console.log(data);
          res.send(data);
          }
      })
})

router.get("/found",(req,res,next)=>{
    db.query("select * from lostfound join login on lostfound.UserName=login.UserName where FinalStatus=1",(err,data)=>{
        if(err)
        res.status(400)
        else
        res.send(data);
    })
})

router.get("/lostfound/:id",(req,res,next)=>{

    db.query("select * from lostfound join login on lostfound.UserName=login.UserName where lostfound.ItemId=?",[req.params.id],(err,data)=>{
        if(err)
        res.status(400)
        else
        {
            console.log(data[0]);
            res.send(data[0]);
           
        
        }
    })
})

router.post("/notify",(req,res,next)=>{
    const lost=req.body.lost;
    const found=req.body.found;
    const desp=req.body.desp;
    db.query("select Name,Contact from login where UserName=?",[found],(err,data)=>{
        if(err)
        res.status(400)
        else
        {
            const foundername=data[0].Name;
            const foundercontact=data[0].Contact;
            db.query("select Name from login where UserName=?",[lost],(err,info1)=>{

            const lostname=info1[0].Name
            const message=" Hello"+ " "+ lostname + "," + "\n\n Lost Item with Following Description has been founded: \n \n"+
                   desp + "\n\n Founder Details: \n \n"+
                   "Name:"+ foundername + "\n"+
                   "Email:"+ found + "\n"+ 
                   "Contact:" + foundercontact + "\n \n" +

                   "Contact the person and get your item back" + "\n \n"+
                   "Thank you" + "\n" +
                   "SBG-DAIICT"

                   transport.sendMail({
                    to:lost,
                    from:"sharma.aman1298@gmail.com",
                    subject:"Lost Item Found",
                    text:message
                   },(err,data2)=>{
                       if(err)
                       res.status(400)
                       else
                       {
                           res.send("Message Sent");
                       }
                   })

                })
        }
    })
})

router.get("/fetchimage/:id",(req,res,next)=>{
    console.log("Hey");
     db.query("select Image from lostfound where ItemId=?",[req.params.id],(err,data)=>{
         if(err)
         res.status(400)
         else
         {
             
            var img = fs.readFile('/public/uploads/' + data[0].Image,{root:'../SBG_BACKEND'}, function (err, data1) {
                var contentType = 'image/png';
                var base64 = Buffer.from(data1).toString('base64');
                base64='data:image/png;base64,'+base64;
                res.send(base64);
              });
         }
     })
 })

module.exports=router;