const db = require('../db')
const express = require('express');
const genpassword = require("generate-password");
const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sharma.aman1298@gmail.com",
        pass: "aman$1234"
    }
});
const router = express();

function isNumeric(num) {
    return !isNaN(num)
}

router.post("/register", (req, res, next) => {
    let roleId;
    let email = req.body.username;
    email = email.replace('@daiict.ac.in', '');
    if (isNumeric(email)) {    // user is students
        roleId = 3;
    }
    else {
        roleId = 10;
    }
    const postdata = {
        UserName: req.body.username,
        PassWord: req.body.password,
        Name: req.body.name,
        Contact: req.body.contact,
        RoleId: roleId,
        IsReset: 0
    }
    db.query("insert into login set ?", postdata,
        (err, data) => {
            if (err) {
                res.status(400);
                console.log(err);
            }
            else
                res.send("Registered Successfully");
        });
});



router.post("/login", (req, res, next) => {
    // console.log(req.body);
    console.log(req.body)
    const username = req.body.username
    const password = req.body.password
    req.session.username=username
    db.query("select * from login where UserName=? && PassWord=?", [username, password], (err, data) => {
        console.log(data);
        if ((data != null || data != undefined) && data.length < 1) {
            res.status(400);
        }
        else {
            console.log(data);
            const name = data[0].Name;
            const isReset = data[0].IsReset;
            db.query("select RoleName from role where RoleId = ?", [data[0].RoleId], (err, data) => {
                if (err) {
                    console.log("Error in login.js");
                }
                else {
                    req.session.username = username;
                    res.send({
                        userRole: data[0].RoleName,
                        name: name,
                        reset: isReset
                    });
                }
            });

        }

    })

})


router.post("/forgot", (req, res, next) => {
    const email = req.body.email;
    console.log(email);
    const password = genpassword.generate({
        length: 7,
        numbers: true
    })
    transport.sendMail({
        to: email,
        from: "sharma.aman1298@gmail.com",
        subject: "Password Recovery",
        text: "New Password:-" + password

    }, (err, data) => {
        if (err)
            res.status(400);
        else {
            db.query("update login set IsReset=?,PassWord=? where UserName=?", [1, password, email], (err, data) => {
                if (err)
                    res.status(400)
                else
                    res.send("Updation Successfull");
            })
        }
    });

})


router.post("/reset", (req, res, next) => {
    const user = req.body.user;
    const pass = req.body.newpass;
    console.log(user);
    db.query("update login set PassWord=?,IsReset=? where UserName=?", [pass, 0, user], (err, data1) => {
        if (err)
            res.status(400)
        else {
            res.send("Updated Successfully")
        }
    })
})


module.exports = router;