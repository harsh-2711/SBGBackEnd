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
            res.status(400);
        else{
            if(data[0]!=null){
                let responseData=data[0];
                db.query("select UserName,Name,Contact from login where UserName=?",[data[0].Convener],(err,convenerData)=>{
                    if(convenerData[0]!=null && convenerData[0]!=undefined){
                        responseData.ConvenerName = convenerData[0].Name;
                        responseData.ConvenerEmail = convenerData[0].UserName;
                        responseData.ConvenerContact = convenerData[0].Contact;
                    }
                    db.query("select UserName,Name,Contact from login where UserName=?",[data[0].DConvener],(err,dConvenerData)=>{
                        if(dConvenerData[0]!=null && dConvenerData[0]!=undefined){
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
