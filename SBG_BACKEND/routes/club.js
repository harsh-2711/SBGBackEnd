const db=require("../db");
const express=require("express");
const router=express()


router.post("/add_club",(req,res,next)=>{
    const name=req.body.clubname;
    const email=req.body.clubemail;
    const convener=req.body.convener;
    const dconvener=req.body.dconvener;
    postdata={
        ClubName:name,
        ClubEmail:email,
        Convener:convener,
        DConvener:dconvener
    }
    db.query("insert into club set ?",postdata,(err,data1)=>{
        if(err)
        res.status(400)
        else
        {
            res.send("Club has been added");
        }
    })
})

router.get("/club",(req,res,next)=>{
    db.query("select * from club",(err,data)=>{
        if(err)
        res.status(400)
        else
        res.send(data);
    })
})


router.get("/club/:id",(req,res,next)=>{
    db.query("select * from club where ClubId=?",[req.params.id],(err,data)=>{
        if(err)
        res.status(400)
        else
        res.send(data);
    })
})


router.put("/edit_club",(req,res,next)=>{
    const id=req.body.id;
    const name=req.body.clubname;
    const email=req.body.clubemail;
    const convener=req.body.convener;
    const dconvener=req.body.dconvener;


    db.query("update club set ClubName=?,ClubEmail=?,Convener=?,DConvener=? where ClubId=?",[name,email,convener,dconvener,id],(err,data)=>{

        if(err)
        res.send(400)
        else
        res.send("Club data Updated");

    })
})

router.delete("/delete_club/:id",(req,res,next)=>{
    db.query("delete from club where ClubId=?",[req.params.id],(err,data)=>{
        if(err)
        res.status(400)
        else
        res.send("Club has been deleted");
    })
})


module.exports=router
