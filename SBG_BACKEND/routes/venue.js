const db=require("../db");
const express=require("express");
const router=express()


router.post("/add_venue",(req,res,next)=>{
    const name=req.body.name
    const cap=req.body.cap;
    const hasac=req.body.hasac;
    const hasproj=req.body.hasproj;
    postdata={
        VenueName:name,
        Capacity:cap,
        HasAc:hasac,
        HasProj:hasproj
    }
    db.query("insert into venue set ?",postdata,(err,data1)=>{
        if(err)
        res.status(400)
        else
        {
            res.send("Venue has been added");
        }
    })
})

router.get("/venue",(req,res,next)=>{
    db.query("select * from venue",(err,data)=>{
        if(err)
        res.status(400)
        else
        res.send(data);
    })
})


router.get("/venue/:id",(req,res,next)=>{
    db.query("select * from venue where VenueId=?",[req.params.id],(err,data)=>{
        if(err)
        res.status(400)
        else
        {
         
        res.send(data);
        }
    })
})


router.put("/edit_venue",(req,res,next)=>{
  console.log(req.body)
    const id=req.body.id;
    const name=req.body.name;
    const cap=req.body.cap;
    let hasac=req.body.hasac;
    let hasproj=req.body.hasproj;
    if(hasac=='')
    hasac=false
    if(hasproj=='')
    hasproj=false
    
    db.query("update venue set VenueName=?,Capacity=?,HasAc=?,HasProj=? where VenueId=?",[name,cap,hasac,hasproj,id],(err,data)=>{

        if(err)
        res.send(400)
        else
        res.send("Venue data Updated");

    })
})

router.delete("/delete_venue/:id",(req,res,next)=>{
    db.query("delete from venue where VenueId=?",[req.params.id],(err,data)=>{
        if(err)
        res.status(400)
        else
        res.send("Venue has been deleted");
    })
})


module.exports=router
