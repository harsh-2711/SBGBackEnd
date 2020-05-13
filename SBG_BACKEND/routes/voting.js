const db=require('../db')
const express=require('express');
const router=express()
const genpassword=require("generate-password");
const nodemailer=require('nodemailer');
const transport=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"sharma.aman1298@gmail.com",
        pass:"aman$1234"
    }
    });



router.post("/add_agenda",(req,res,next)=>{
    console.log(req.body)
    const agenda=req.body.agenda;
    const selectedvoter=req.body.allow;
    const option1=req.body.option1
    const option2=req.body.option2
    const option3=req.body.option3
    const option4=req.body.option4
    const password=genpassword.generate({
        length:7,
        numbers:true
    })
     const info={
         Agenda:agenda,
         Result:"Not Declared",
         Status:0,
         Code:password

     }
  
     db.query("insert into voting set ?",[info],(err,data)=>{
         if(err)
         res.status(400)
         else
         {
             const voteid=data.insertId;
            
               db.query("insert into voteoption set VoteId=?,Options=?,Count=?",[voteid,option1,0],(err,opt1)=>{
                   if(err)
                   res.status(400)
                   else
                   {
                    db.query("insert into voteoption set VoteId=?,Options=?,Count=?",[voteid,option2,0],(err,opt2)=>{
                        if(err)
                        res.status(400)
                        else
                        {
                            db.query("insert into voteoption set VoteId=?,Options=?,Count=?",[voteid,option3,0],(err,opt3)=>{
                                if(err)
                                res.status(400)
                                else
                                {
                                    db.query("insert into voteoption set VoteId=?,Options=?,Count=?",[voteid,option4,0],(err,opt4)=>{
                                        if(err)
                                        res.status(400)
                                        else
                                        {
                                            
                                        }
                                })
                        }
                    })
                }
            })
        }
                   
  })
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
                                    if(err)
                                    res.status(400)
                                    else
                                    {
                                        const message="Hello" + ",\n\n" +
                                        "Secret Code for following agenda is:" + "\n" +
                                         "Agenda:" +  agenda + "\n" +
                                         "Code:" + password + "\n\n" +
                                         "Regards" + "\n" +
                                         "SBG-DAIICT"
                                        transport.sendMail({
                                            to:"aman.sharma122111@gmail.com",
                                            from:"sharma.aman1298@gmail.com",
                                            subject:"Secret Code for Voting",
                                            text:message
                                        },(err,data3)=>{
                                            
                                    }

                              )}
                              
                          })
                      }
                    }
              })
              res.send("inserted");
            }
        }
     })
})

router.post("/add_agenda2",(req,res,next)=>{
    console.log(req.body)
    const agenda=req.body.agenda;
    const selectedvoter=req.body.allow;
    const option1=req.body.option1
    const option2=req.body.option2
    const option3=req.body.option3
    const option4=req.body.option4
    const password=genpassword.generate({
        length:7,
        numbers:true
    })
     const info={
         Agenda:agenda,
         Result:"Not Declared",
         Status:0,
         Code:password

     }
  
     db.query("insert into voting set ?",[info],(err,data)=>{
         if(err)
         res.status(400)
         else
         {
             const voteid=data.insertId;
             db.query("insert into voteoption set VoteId=?,Options=?,Count=?",[voteid,option1,0],(err,opt1)=>{
                if(err)
                res.status(400)
                else
                {
                 db.query("insert into voteoption set VoteId=?,Options=?,Count=?",[voteid,option2,0],(err,opt2)=>{
                     if(err)
                     res.status(400)
                     else
                     {
                         db.query("insert into voteoption set VoteId=?,Options=?,Count=?",[voteid,option3,0],(err,opt3)=>{
                             if(err)
                             res.status(400)
                             else
                             {
                                 db.query("insert into voteoption set VoteId=?,Options=?,Count=?",[voteid,option4,0],(err,opt4)=>{
                                     if(err)
                                     res.status(400)
                                     else
                                     {
                                         
                                     }
                             })
                     }
                 })
             }
         })
     }
                
})
              for(let i=0;i<selectedvoter.length;i++)
              {
                  
                 db.query("insert into voteperson set VoteId=?,StudentId=?,IsVote=?",[voteid,selectedvoter[i],1],(err,data2)=>{
                      if(err)
                      res.status(400)
                      else
                      {
                        const message="Hello" + ",\n\n" +
                        "Secret Code for following agenda is:" + "\n" +
                         "Agenda:" +  agenda + "\n" +
                         "Code:" + password + "\n\n" +
                         "Regards" + "\n" +
                         "SBG-DAIICT"
                        transport.sendMail({
                            to:"aman.sharma122111@gmail.com",
                            from:"sharma.aman1298@gmail.com",
                            subject:"Secret Code for Voting",
                            text:message
                        },(err,data3)=>{
                            
                    }

              )
                      }
                    })
              }
              res.send("Inserted");
        }
   })

})
              
            


router.post("/add_agenda1",(req,res,next)=>{
    const agenda=req.body.agenda;
    const option1=req.body.option1
    const option2=req.body.option2
    const option3=req.body.option3
    const option4=req.body.option4
    const password=genpassword.generate({
        length:7,
        numbers:true
    })
    const info={
        Agenda:agenda,
        Result:"Not Declared",
        Status:0,
        Code:password

    }
    db.query("insert into voting set ?",[info],(err,data)=>{
        if(err)
        res.status(400)
        else
        {
            const voteid=data.insertId;
            db.query("insert into voteoption set VoteId=?,Options=?,Count=?",[voteid,option1,0],(err,opt1)=>{
                if(err)
                res.status(400)
                else
                {
                 db.query("insert into voteoption set VoteId=?,Options=?,Count=?",[voteid,option2,0],(err,opt2)=>{
                     if(err)
                     res.status(400)
                     else
                     {
                         db.query("insert into voteoption set VoteId=?,Options=?,Count=?",[voteid,option3,0],(err,opt3)=>{
                             if(err)
                             res.status(400)
                             else
                             {
                                 db.query("insert into voteoption set VoteId=?,Options=?,Count=?",[voteid,option4,0],(err,opt4)=>{
                                     if(err)
                                     res.status(400)
                                     else
                                     {
                                         
                                     }
                             })
                     }
                 })
             }
         })
     }
                
})
            db.query("select UserName from login where RoleId=?",[3],(err,data1)=>{
                if(err)
                res.status(400)
                else
                {
                      for(let i=0;i<data1.length;i++)
                      {
                          db.query("insert into voteperson set VoteId=?,StudentId=?,IsVote=?",[voteid,data1[i].UserName,1],(err,data2)=>{
                            if(err)
                            res.status(400)
                            else
                            {
                              const message="Hello" + ",\n\n" +
                              "Secret Code for following agenda is:" + "\n" +
                               "Agenda:" +  agenda + "\n" +
                               "Code:" + password + "\n\n" +
                               "Regards" + "\n" +
                               "SBG-DAIICT"
                              transport.sendMail({
                                  to:"aman.sharma122111@gmail.com",
                                  from:"sharma.aman1298@gmail.com",
                                  subject:"Secret Code for Voting",
                                  text:message
                              },(err,data3)=>{
                                  
                          }
      
                    )
                            }
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
        
            res.send({
                info2:data
            })
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
    db.query("select * from voteoption where VoteId=?",[id],(err,data10)=>{
   
    
    db.query("update voting set Status=? where VoteId=?",[2,id],(err,data)=>{
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
                                info2:data2,
                                result:data10
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
    console.log(req.body)
    const voteid=req.body.voteid;
    const user=req.body.user;
    const option=req.body.choice
    db.query("select Count from voteoption where VoteId=? && Options=?",[voteid,option],(err,data)=>{
       let cnt=data[0].Count;
       cnt++;
       db.query("update voteoption set Count=? where VoteId=? && Options=?",[cnt,voteid,option],(err,data2)=>{
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


router.post("/fetchoption",(req,res,next)=>{
     const voteid=req.body.voteid;
     db.query("select Options from voteoption where VoteId=?",[voteid],(err,data1)=>{
         if(err)
         res.status(400)
         else
         {
             console.log(data1)
             res.send(data1)
         }
     })
})

router.post("/getvotecount",(req,res,next)=>{
    const voteid=req.body.id;
    db.query("select * from voteoption where VoteId=?",[voteid],(err,data2)=>{
        if(err)
        res.status(400)
        else
        {
            res.send(data2)
        }
    })
})


router.post("/submitresult",(req,res,next)=>{
    const voteid=req.body.voteid
    const result=req.body.result

      db.query("update voting set Result=? where VoteId=?",[result,voteid],(err,data2)=>{
          if(err)
          res.status(400)
          else
          {
              db.query("select * from voting where VoteId=?",[voteid],(err,data3)=>{
                  res.send({
                      info2:data3
                  })
              })
          }
      })
})
module.exports=router;