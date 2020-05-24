const express = require("express");
const db = require("../db");
const router = express();
const fs = require('fs');
const datetime = require('dateformat');
const nodemailer = require('nodemailer');
const verifyToken = require('../utils/VerifyToken');
const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sharma.aman1298@gmail.com",
        pass: "aman$1234"
    }
});

router.post("/imgupload", verifyToken, (req, res, next) => {
    res.send(req.files[0].filename);
})

router.post("/submitrequest", verifyToken, (req, res, next) => {
    console.log(req.body);
    const data = {
        UserName: req.body.user,
        Description: req.body.desp,
        Place: req.body.place,
        DateTime: datetime(req.body.time),
        ItemName: req.body.name,
        Image: req.body.image,
        TempStatus: req.body.temp,
        FinalStatus: req.body.org
    }
    db.query("insert into lostfound set ?", [data], (err, data1) => {
        if (err)
            res.status(400)
        else {
            res.send("Inserted");
        }
    })
})

router.get("/lfrequest", verifyToken, (req, res, next) => {
    console.log("Hey Aman");
    db.query("select * from lostfound join login on lostfound.UserName=login.UserName where lostfound.FinalStatus IS NULL", (err, data1) => {
        if (err)
            res.status(400)
        else {
            console.log(data1);
            res.send(data1);
        }
    })
})

router.post("/arequest", verifyToken, (req, res, next) => {
    const id = req.body.itemid;
    const status = req.body.status;
    db.query("update lostfound set FinalStatus=? where ItemId=?", [status, id], (err, data) => {
        if (err)
            res.status(400)
        else
            res.send("Done");
    })
})

router.post("/rrequest", verifyToken, (req, res, next) => {
    const id = req.body.itemid;
    db.query("delete from lostfound where ItemId=?", [id], (err, data) => {
        if (err)
            res.status(400)
        else
            res.send("Item Rejected");
    })
})


router.get("/lost", verifyToken, (req, res, next) => {

    db.query("select * from lostfound join login on lostfound.UserName=login.UserName where FinalStatus=0", (err, data) => {
        if (err)
            res.status(400)
        else {
            console.log(data);
            res.send(data);
        }
    })
})

router.get("/found", verifyToken, (req, res, next) => {
    db.query("select * from lostfound join login on lostfound.UserName=login.UserName where FinalStatus=1", (err, data) => {
        if (err)
            res.status(400)
        else
            res.send(data);
    })
})

router.get("/lostfound/:id", verifyToken, (req, res, next) => {

    db.query("select * from lostfound join login on lostfound.UserName=login.UserName where lostfound.ItemId=?", [req.params.id], (err, data) => {
        if (err)
            res.status(400)
        else {
            console.log(data[0]);
            res.send(data[0]);


        }
    })
})

router.post("/notify", verifyToken, (req, res, next) => {
    console.log(req.body);
    const lost = req.body.lost;
    const found = req.body.found;
    const desp = req.body.desp;
    const name = req.body.name;
    const place = req.body.place;
    db.query("select Name,Contact from login where UserName=?", [lost], (err, data) => {
        if (err)
            res.status(400)
        else {
            const lostname = data[0].Name;
            const lostcontact = data[0].Contact;
            db.query("select Name from login where UserName=?", [found], (err, info1) => {

                const foundername = info1[0].Name
                const message = " Hello" + " " + foundername + "," + "\n\n Item with Following Description has been claimed by someone: \n \n" +
                    "Item Name:" + name + "\n" +
                    "Lost Place:" + place + "\n" +
                    "Description" + "\n" +
                    desp +
                    "\n\n Claimed Person Details: \n \n" +
                    "Name:" + lostname + "\n" +
                    "Email:" + lost + "\n" +
                    "Contact:" + lostcontact + "\n \n" +

                    "Contact the person and pass on the item" + "\n \n" +
                    "Thank you" + "\n" +
                    "SBG-DAIICT"

                transport.sendMail({
                    to: found,
                    from: "sharma.aman1298@gmail.com",
                    subject: "Found Item Claimed",
                    text: message
                }, (err, data2) => {
                    if (err)
                        res.status(400)
                    else {
                        res.send("Message Sent");
                    }
                })

            })
        }
    })
})

router.get("/fetchimage/:id", verifyToken, (req, res, next) => {
    console.log("Hey");
    db.query("select Image from lostfound where ItemId=?", [req.params.id], (err, data) => {
        if (err)
            res.status(400)
        else {

            var img = fs.readFile('/public/uploads/' + data[0].Image, { root: '../SBG_BACKEND' }, function(err, data1) {
                var contentType = 'image/png';
                var base64 = Buffer.from(data1).toString('base64');
                base64 = 'data:image/png;base64,' + base64;
                res.send(base64);
            });
        }
    })
})

module.exports = router;