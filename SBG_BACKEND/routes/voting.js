const db=require('../db')
const express=require('express');
const router=express()



router.post("/add_agenda",(req,res,next)=>{
    console.log(req.body)
    const agenda=req.body.agenda;
    const selectedvoter=req.body.allow;
     const info={
         Agenda:agenda,
         Yes:0,
         No:0,
         Result:"Not Declared",
         Status:0

     }
  
     db.query("insert into voting set ?",[info],(err,data)=>{
         if(err)
         res.status(400)
         else
         {
             if(selectedvoter[0]==0)
             {
                 db.query("update login set IsVote=?",[1],(err,data5)=>{
                     if(err)
                     res.status(400)
                     else
                     res.send("Inserted");
                 })
             }
             else
             {
              for(let i=0;i<selectedvoter.length;i++)
              {
                  db.query("select * from clubstudent where ClubId=?",[selectedvoter[i]],(err,data1)=>{
                      if(err)
                      res.status(400)
                      else
                      {
                          for(let j=0;j<data1.length;j++)
                          {
                              db.query("update login set IsVote=? where UserName=?",[1,data1[j].StudentId],(err,data2)=>{

                              })
                          }
                      }
                  })
              }
              res.send("inserted");
            }
         }
     })
})

router.post("/getcurrvote",(req,res,next)=>{
    db.query("select * from voting where Status=? || Status=? ",[0,1],(err,data)=>{
        if(err)
        res.status(400)
        else
        {
            console.log(data);
            res.send(data);
        }
    })
})

router.post("/gethistvote",(req,res,next)=>{
    db.query("select * from voting where Status=?",[2],(err,data)=>{
        if(err)
        {
            res.status(400)
        }
        else
        {
            res.send(data);
        }
    })
})


router.post("/startvoting",(req,res,next)=>{
    const id=req.body.voteid;
    db.query("update voting set Status=? where VoteId=?",[1,id],(err,data)=>{
        if(err)
        res.status(400)
        else
        {
            db.query("select * from voting where Status=? || Status=? ",[0,1],(err,data1)=>{
                if(err)
                res.status(400)
                else
                {
                    db.query("select * from voting where Status=?",[2],(err,data2)=>{
                        if(err)
                        {
                            res.status(400)
                        }
                        else
                        {
                            const data3={
                                info1:data1,
                                info2:data2
                            }
                            res.send(data3)
                        }
                    })
                }
            })

        }
    })
})

router.post("/stopvoting",(req,res,next)=>{
    const id=req.body.voteid;
    db.query("select Yes,No from voting where VoteId=?",[id],(err,data10)=>{
    const Yes=data10[0].Yes;
    const No=data10[0].No;
    let result;
    if(Yes>No)
    result="Agenda Accepted"
    else
    result="Agenda Rejected"
    
    db.query("update voting set Status=?,Result=? where VoteId=?",[2,result,id],(err,data)=>{
        if(err)
        res.status(400)
        else
        {
            db.query("update login set IsVote=?",[0],(err,data5)=>{
                
            
            db.query("select * from voting where Status=? || Status=? ",[0,1],(err,data1)=>{
                if(err)
                res.status(400)
                else
                {
                    db.query("select * from voting where Status=?",[2],(err,data2)=>{
                        if(err)
                        {
                            res.status(400)
                        }
                        else
                        {
                            const data3={
                                info1:data1,
                                info2:data2
                            }
                            res.send(data3)
                        }
                    })
                }
            })
        })

        }
    })
})
})

router.post("/acceptagenda",(req,res,next)=>{
    const voteid=req.body.voteid;
    const user=req.body.user;
    db.query("select Yes from voting where VoteId=?",[voteid],(err,data)=>{
       let cnt=data[0].Yes;
       cnt++;
       db.query("update voting set Yes=? where VoteId=?",[cnt,voteid],(err,data2)=>{
           if(err)
           res.status(400)
           else{
               db.query("update login set IsVote=? where UserName=?",[2,user],(err,data3)=>{
                       if(err)
                       res.status(400)
                        else
                        {
                            db.query("select IsVote from login where UserName=?",[user],(err,data4)=>{
                                res.send({
                                    vote:data4[0].IsVote
                                }
                                 )
                            })
                        }
               })
           }
       })
    })
})

router.post("/rejectagenda",(req,res,next)=>{
    const voteid=req.body.voteid;
    const user=req.body.user;
    db.query("select No from voting where VoteId=?",[voteid],(err,data)=>{
       let cnt=data[0].No;
       cnt++;
       db.query("update voting set No=? where VoteId=?",[cnt,voteid],(err,data2)=>{
           if(err)
           res.status(400)
           else{
               db.query("update login set IsVote=? where UserName=?",[2,user],(err,data3)=>{
                       if(err)
                       res.status(400)
                        else
                        {
                            db.query("select IsVote from login where UserName=?",[user],(err,data4)=>{
                                res.send({
                                    vote:data4[0].IsVote
                                }
                                 )
                            })
                        }
               })
           }
       })
    })
})


module.exports=router;