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
             const voteid=data.insertId;
              for(let i=0;i<selectedvoter.length;i++)
              {
                  db.query("select * from clubstudent where ClubId=?",[selectedvoter[i]],(err,data1)=>{
                      if(err)
                      res.status(400)
                      else
                      {
                          for(let j=0;j<data1.length;j++)
                          {
                              db.query("insert into voteperson set VoteId=?,StudentId=?,IsVote=?",[voteid,data1[j].StudentId,1],(err,data2)=>{

                              })
                          }
                      }
                  })
              }
              res.send("inserted");
            }
         
     })
})

router.post("/add_agenda2",(req,res,next)=>{
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
             const voteid=data.insertId;
              for(let i=0;i<selectedvoter.length;i++)
              {
                  
                 db.query("insert into voteperson set VoteId=?,StudentId=?,IsVote=?",[voteid,selectedvoter[i],1],(err,data2)=>{

                    })
              }
              res.send("Inserted");
        }
   })

})
              
            


router.post("/add_agenda1",(req,res,next)=>{
    const agenda=req.body.agenda;
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
            const voteid=data.insertId;
            db.query("select UserName from login where RoleId=?",[3],(err,data1)=>{
                if(err)
                res.status(400)
                else
                {
                      for(let i=0;i<data1.length;i++)
                      {
                          db.query("insert into voteperson set VoteId=?,StudentId=?,IsVote=?",[voteid,data1[i].UserName,1],(err,data2)=>{
                              
                          })
                      }
                      res.send("inserted");
                }
            })
        }
    })
    

})
router.post("/getcurrvote",(req,res,next)=>{
    db.query("select * from voting  where voting.Status=? || voting.Status=? ORDER BY VoteId ASC ",[0,1],(err,data)=>{
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
            db.query("delete from voteperson where VoteId=?",[id],(err,data5)=>{
                
            
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
               db.query("update voteperson set IsVote=? where StudentId=? && VoteId=?",[2,user,voteid],(err,data3)=>{
                       if(err)
                       res.status(400)
                        else
                        {
                            db.query("select IsVote from voteperson where StudentId=? && VoteId=?",[user,voteid],(err,data4)=>{
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
               db.query("update voteperson set IsVote=? where StudentId=? && VoteId=?",[2,user,voteid],(err,data3)=>{
                       if(err)
                       res.status(400)
                        else
                        {
                            db.query("select IsVote from voteperson where StudentId=? && VoteId=?",[user,voteid],(err,data4)=>{
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

router.post("/checkvote",(req,res,next)=>{
    console.log(req.body);
    const voteid=req.body.voteid
    const user=req.body.user
    db.query("select * from voteperson where VoteId=? && StudentId=?",[voteid,user],(err,data)=>{
        if(err)
        res.status(400)
        else
        {
            if(data.length==0)
            {
                res.send({
                    status:0
                })
            }
            else
            {
            res.send({
                status:data[0].IsVote
            })
        }
        }
    })
})


module.exports=router;