const db=require('../db')
const express=require('express');
const router=express()

router.post("/addfund",(req,res,next)=>{
   
    const amt=req.body.amt;
    db.query("select Budget from login where UserName=?",["convener_sbg@daiict.ac.in"],(err,data)=>{
        if(err)
        res.status(400)
        else
        {
            let fund=data[0].Budget;
            fund=parseInt(fund)+parseInt(amt);
            db.query("update login set Budget=? where UserName=?",[fund,"convener_sbg@daiict.ac.in"],(err,data1)=>{
                if(err)
                res.status(400)
                else
                {
                    db.query("select Budget from login where UserName=?",["convener_sbg@daiict.ac.in"],(err,data2)=>{
                        res.send({
                            budget:data2[0].Budget
                        })
                    })
                    
                }
            })
        }
    })
})


router.post("/distributefund",(req,res,next)=>{
    const club=req.body.club
    const amt=req.body.amt
    db.query("select Budget from club where ClubId=?",[club],(err,data)=>{
        if(err)
        res.status(400)
        else
        {
            let fund=data[0].Budget
            fund=parseInt(fund)+parseInt(amt);
            db.query("update club set Budget=?,Budget1=? where ClubId=?",[fund,fund,club],(err,data1)=>{
                if(err)
                res.status(400)
                else
                {
                    db.query("select Budget from login where UserName=?",["convener_sbg@daiict.ac.in"],(err,data2)=>{
                        let fund1=data2[0].Budget
                        fund1=parseInt(fund1)-parseInt(amt)
                        db.query("update login set Budget=? where UserName=?",[fund1,"convener_sbg@daiict.ac.in"],(err,data3)=>{
                            if(err)
                            res.status(400)
                            else
                            {
                                db.query("select Budget from login where UserName=?",["convener_sbg@daiict.ac.in"],(err,data2)=>{
                                    res.send({
                                        budget:data2[0].Budget
                                    })
                                })
                            }
                        })
                    })
                   
                }
            })
        }
    })
    
})

router.post("/fetchfund",(req,res,next)=>{
    db.query("select Budget from login where UserName=?",["convener_sbg@daiict.ac.in"],(err,data)=>{
        if(err)
        res.status(400)
        else
        {
            res.send({
                budget:data[0].Budget
            })
        }
    })
})

router.post("/getremainfund",(req,res,next)=>{
    const club=req.body.club
    db.query("select * from club where ClubId=?",[club],(err,data)=>{
        if(err)
        res.status(400)
        else
        {
            
             res.send({
                 name:data[0].ClubName,
                 fund:data[0].Budget
             })
        }
    })
})

router.post("/getremainfund1",(req,res,next)=>{
    const club=req.body.club
    db.query("select * from club where ClubEmail=?",[club],(err,data)=>{
        if(err)
        res.status(400)
        else
        {
            
             res.send({
                 name:data[0].ClubName,
                 fund:data[0].Budget
             })
        }
    })
})

router.post("/addExpenses",(req,res,next)=>{
    console.log(req.body)
    const club=req.body.club;
    const amt=req.body.amt;
    const desp=req.body.desp; 
    const qty=req.body.qty;
    const price=req.body.price
     db.query("select * from club where ClubEmail=?",[club],(err,data)=>{
         if(err)
         res.status(400)
         else
         {

            db.query("insert into expenses set ClubId=?,Amount=?,Description=?,Qty=?,Price=?,Status=?",[data[0].ClubId,parseInt(amt),desp,qty,price,0],(err,data2)=>{
                if(err)
                res.status(400)
                else
                {
                    let fund=data[0].Budget;
                     fund=parseInt(fund)-parseInt(amt);
                    db.query("update club set Budget=? where ClubId=?",[fund,data[0].ClubId],(err,data3)=>{
                        if(err)
                        res.status(400)
                        else
                        {
                            res.send("Inserted");
                        }
                    })
                }
            })
         }
     })

})


router.post("/getExpenses",(req,res,next)=>{
    const id=req.body.id
    db.query("select * from expenses where ClubId=? and Status=?",[id,1],(err,data)=>{
        if(err)
        res.status(400)
        else
        {
            console.log(data);
            res.send(data);
        }
    })
})

router.post("/getExpenses1",(req,res,next)=>{
    console.log(req.body)
    const id=req.body.id
    db.query("select * from expenses where ClubId=? and Status=?",[id,0],(err,data)=>{
        if(err)
        res.status(400)
        else
        {
            console.log(data);
            res.send(data);
        }
    })
})


router.post("/approveexpense",(req,res,next)=>{
    const id=req.body.id;
    db.query("update expenses set Status=? where ClubId=? && Status=?",[1,id,0],(err,data2)=>{
        if(err)
        res.status(400)
        else
        {
             res.send("updated");
        }
    })
})
router.post("/rejectexpense",(req,res,next)=>{
    const id=req.body.id;
    db.query("update expenses set Status=? where ClubId=? && Status=?",[2,id,0],(err,data2)=>{
        if(err)
        res.status(400)
        else
        {
             res.send("updated");
        }
    })
})

router.post("/attendreport",(req,res,next)=>{
      
    res.send(req.files[0].filename);
})
module.exports=router
