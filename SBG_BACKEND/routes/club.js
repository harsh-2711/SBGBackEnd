const db = require("../db");
const express = require("express");
const genpassword = require("generate-password");
const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sharma.aman1298@gmail.com",
        pass: "aman$1234"
    }
});
const router = express()

router.get('/get_clubid_by_email/:email', (req, res, next) => {
    db.query("Select ClubId from club where ClubEmail=?", [req.params.email], (err, data) => {
        if (err)
            res.status(400);
        else
            res.send(data);
    });
});

router.post("/add_club", (req, res, next) => {

    const name = req.body.clubname;
    const email = req.body.clubemail;
    const convener = req.body.convener;
    const dconvener = req.body.dconvener;
    const selectedstudent = req.body.ss;
    postdata = {
        ClubName: name,
        ClubEmail: email,
        Convener: convener,
        DConvener: dconvener,
        Budget: 0,
        Budget1: 0
    }
    db.query("insert into club set ?", postdata, (err, data1) => {
        if (err)
            res.status(400)
        else {
            const clubid = data1.insertId;

            const password = genpassword.generate({
                length: 7,
                numbers: true
            })
            db.query("insert into login set UserName=?,PassWord=?,Name=?,RoleId=?,IsReset=?", [email, password, name, 4, 1], (err, data2) => {
                if (err)
                    res.status(400)
                else {
                    const message = "Hello" + name + ",\n\n" +
                        "Login Credentials for Club/Committee members are:" + "\n" +
                        "Username:" + email + "\n" +
                        "Password:" + password + "\n\n" +
                        "Regards" + "\n" +
                        "SBG-DAIICT"
                    transport.sendMail({
                        to: "aman.sharma122111@gmail.com",
                        from: "sharma.aman1298@gmail.com",
                        subject: "Login Credentials",
                        text: message
                    }, (err, data3) => {
                        if (err)
                            res.status(400)
                        else {
                            for (let i = 0; i < selectedstudent.length; i++) {
                                db.query("insert into clubstudent set ClubId=?,StudentId=?", [clubid, selectedstudent[i]], (err, data) => {

                                })
                            }
                            db.query("insert into clubstudent set ClubId=?,StudentId=?", [clubid, convener], (err, data1) => {
                                if (err)
                                    res.status(400)
                                else {
                                    db.query("insert into clubstudent set ClubId=?,StudentId=?", [clubid, dconvener], (err, data) => {

                                    })
                                }
                            })

                            res.send("club added");

                        }
                    })
                }
            })



        }
    })
})



router.get("/club_member/:id", (req, res, next) => {
    console.log(req.params.id);
    db.query("select StudentId from clubstudent where ClubId=?", [req.params.id], (err, data) => {
        if (err) {
            req.status(400)
        }
        else {
            console.log(data);
            res.send(data);
        }
    })
})
router.get("/club", (req, res, next) => {
    db.query("select * from club", (err, data) => {
        if (err)
            res.status(400)
        else {
            let count1 = 0, count2 = 0;
            for (let index in data) {
                // console.log(index);
                db.query("select Name from login where UserName=?", [data[index].Convener],
                    (err, data1) => {
                        count1++;
                        if (err)
                            res.status(400)
                        else {
                            if (data1.length != 0)
                                data[index].ConvenerName = data1[0].Name;
                            else
                                data[index].ConvenerName = "";
                            if (count1 == data.length && count2 == data.length)
                                res.send(data);
                        }
                    });
                db.query("select Name from login where UserName=?", [data[index].DConvener],
                    (err, data2) => {
                        count2++;
                        if (err)
                            res.status(400)
                        else {
                            data[index].DConvenerName = data2[0].Name;
                            if (count1 == data.length && count2 == data.length)
                                res.send(data);
                        }
                    });
            }

        }

    })
})


router.get("/club/:id", (req, res, next) => {
    db.query("select * from club where ClubId=?", [req.params.id], (err, data) => {
        if (err)
            res.status(400);
        else {
            if (data[0] != null) {
                let responseData = data[0];
                db.query("select UserName,Name,Contact from login where UserName=?", [data[0].Convener], (err, convenerData) => {
                    if (convenerData[0] != null && convenerData[0] != undefined) {
                        responseData.ConvenerName = convenerData[0].Name;
                        responseData.ConvenerEmail = convenerData[0].UserName;
                        responseData.ConvenerContact = convenerData[0].Contact;
                    }
                    db.query("select UserName,Name,Contact from login where UserName=?", [data[0].DConvener], (err, dConvenerData) => {
                        if (dConvenerData[0] != null && dConvenerData[0] != undefined) {
                            responseData.DConvenerName = dConvenerData[0].Name;
                            responseData.DConvenerEmail = dConvenerData[0].UserName;
                            responseData.DConvenerContact = dConvenerData[0].Contact;
                        }
                        res.send(responseData);
                    });
                });
            }
        }
        // res.send("error occured in selecting the data");
    })
})


router.put("/edit_club", (req, res, next) => {
    const id = req.body.id;
    const name = req.body.clubname;
    const email = req.body.clubemail;
    const convener = req.body.convener;
    const dconvener = req.body.dconvener;
    const selectedstudent = req.body.ss;


    db.query("update club set ClubName=?,ClubEmail=?,Convener=?,DConvener=? where ClubId=?", [name, email, convener, dconvener, id], (err, data) => {

        if (err)
            res.status(400)
        else {
            db.query("delete from clubstudent where ClubId=?", [id], (err, data2) => {
                if (err)
                    res.status(400)
                else {
                    for (let i = 0; i < selectedstudent.length; i++) {
                        db.query("insert into clubstudent set ClubId=?,StudentId=?", [id, selectedstudent[i]], (err, data3) => {

                        })
                    }
                    db.query("insert into clubstudent set ClubId=?,StudentId=?", [id, convener], (err, data1) => {
                        if (err)
                            res.status(400)
                        else {
                            db.query("insert into clubstudent set ClubId=?,StudentId=?", [id, dconvener], (err, data) => {

                            })
                        }
                    })
                    res.send("updated")
                }
            })

        }
    })
})

router.post("/fetchclub", (req, res, next) => {
    db.query("select * from club", (err, data) => {
        if (err)
            res.status(400)
        else {

            res.send(data);
        }
    })
})

router.delete("/delete_club/:id", (req, res, next) => {
    db.query("delete from club where ClubId=?", [req.params.id], (err, data) => {
        if (err)
            res.status(400)
        else
            res.send("Club has been deleted");
    })
})


router.post("/getcore",(req,res,next)=>{
    const id=req.body.id;
    db.query("select clubstudent.*,club.Convener,club.DConvener,login.* from clubstudent join  login on login.UserName=clubstudent.StudentId join club on club.ClubId=clubstudent.ClubId  where clubstudent.ClubId=?",[id],(err,data)=>{
        if(err){
            res.status(400)
            console.log(err);
        }
        else
        {
            res.send(data);
        }
    })
})


module.exports=router
