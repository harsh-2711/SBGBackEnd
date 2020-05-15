const db = require("../db");
const express = require("express");
const router = express()


router.post("/add_venue", (req, res, next) => {
    const name = req.body.name
    const cap = req.body.cap;
    let hasac = req.body.hasac;
    let hasproj = req.body.hasproj;
    if (hasac == '')
        hasac = 0
    if (hasproj == '')
        hasproj = 0
    postdata = {
        VenueName: name,
        Capacity: cap,
        HasAc: hasac,
        HasProj: hasproj
    }
    db.query("insert into venue set ?", postdata, (err, data1) => {
        if (err)
            res.status(400)
        else {
            res.send(data1);

        }
    })
})




router.post("/add_venueman", (req, res, next) => {

    const data = {
        VenueId: req.body.VenueId,
        Email: req.body.Email,
        Name: req.body.Name
    }
    db.query("insert into venueman set ?", data, (err, data1) => {
        if (err)
            res.status(400)
        else
            res.send("Added");
    })
})


router.post("/get_venueman", (req, res, next) => {
    const id = req.body.id;
    db.query("select * from venueman where VenueId=?", [id], (err, data) => {
        if (err)
            res.status(400)
        else {
            console.log(data);
            res.send(data);
        }
    })
})

router.post("/delete_venueman", (req, res, next) => {
    const VenueId = req.body.VenueId

    db.query("delete from venueman where VenueId=?", [VenueId], (err, data) => {
        if (err)
            res.status(400)
        else
            res.send("Deleted")
    })
})

router.get("/venue", (req, res, next) => {

    db.query("select * from venue", (err, data) => {
        if (err)
            res.status(400)
        else
            res.send(data);
    })
})


router.get("/venue/:id", (req, res, next) => {

    db.query("select * from venue where VenueId=?", [req.params.id], (err, data) => {
        if (err)
            res.status(400)
        else {

            res.send(data);
        }
    })
})


router.put("/edit_venue", (req, res, next) => {

    const id = req.body.id;
    const name = req.body.name;
    const cap = req.body.cap;
    let hasac = req.body.hasac;
    let hasproj = req.body.hasproj;
    if (hasac == '')
        hasac = false
    if (hasproj == '')
        hasproj = false

    db.query("update venue set VenueName=?,Capacity=?,HasAc=?,HasProj=? where VenueId=?", [name, cap, hasac, hasproj, id], (err, data) => {

        if (err)
            res.send(400)
        else
            res.send("Venue data Updated");

    })
})

router.delete("/delete_venue/:id", (req, res, next) => {
    db.query("delete from venue where VenueId=?", [req.params.id], (err, data) => {
        if (err)
            res.status(400)
        else
            res.send("Venue has been deleted");
    })
})


module.exports = router
