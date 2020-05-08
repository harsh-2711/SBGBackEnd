const db=require("../db");
const express=require("express");
const dateformat=require('dateformat');
const router=express()

router.post("/add_suggestion",(req,res,next)=>{
    db.query("select * from status where StatusName=?",["SuggestionAdded"],(err,data1)=>{
        const SuggestionTags=req.body.SuggestionTags;
        const dt=new Date()
        const dt1=dt.toISOString().split('T')[0] + ' '  
        + dt.toTimeString().split(' ')[0]; 
        const data={					
            UserName:req.body.UserName,
            SuggestionTitle:req.body.SuggestionTitle,
            SuggestionText:req.body.SuggestionText,
            Status:data1[0].StatusId,
            // IsAnonymous:req.body.IsAnonymous,
            DateTime:dt1
        }
        console.log(data);
        db.query("insert into suggestion set ?",data,(err,data2)=>{
            if(err){
                res.status(400)
                console.log(err);
            }
            else
            {   
                if(SuggestionTags.length!=0){
                    let count=0;
                    const SuggestionId = data2.insertId;
                    SuggestionTags.forEach(tag=>{
                        const values={
                            SuggestionId:SuggestionId ,
                            ClubId:tag
                        }
                        db.query("Insert into suggestiontags set ?",values,(err,data3)=>{
                            if(err){
                                console.log(err);
                                res.send(400);
                            }
                            else{
                                count++;
                                if(count==SuggestionTags.length){
                                    res.send("Suggestion Added");
                                }
                            }
                        });
                    });
                }
                else{
                    res.send("Suggestion Added");
                }
            }
        })
          // sending event id
    })
})

router.get("/suggestions",(req,res,next)=>{
    db.query("select s.*,s1.StatusName,l.Name from suggestion s, status s1, login l where s.Status=s1.StatusId and s.UserName=l.UserName"
    ,(err,data)=>{
        if(err){
            console.log(err);
            res.status(400);
        }
        else{
            if(data.length!=0){
                for(let i=0;i<data.length;i++)
                {
                    data[i].DateTime=data[i].DateTime.toISOString().split('T')[0] + ' '  
                    + data[i].DateTime.toTimeString().split(' ')[0]; 
                }
                res.send(data);
            }
        }
    });
})

router.get("/suggestion_status/:id",(req,res,next)=>{
    db.query("select s1.* from suggestion s, status s1 where s.Status=s1.StatusId and s.SuggestionId=?"
    ,[req.params.id],(err,data)=>{
        if(err){
            console.log(err);
            res.status(400);
        }
        else{
            res.send(data);
        }
    });
})

router.get("/get_suggestion_tagged_clubs/:id",(req,res,next)=>{
    db.query("select s.*,c.ClubName from suggestion s, suggestiontags st, club c where s.SuggestionId=? and s.SuggestionId=st.SuggestionId and c.ClubId=st.ClubId",
    [req.params.id],(err,data)=>{
        if(err){
            console.log(err);
            res.status(400);
        }
        else{
            res.send(data);
        }
    });
});


router.get("/get_suggestion/:id",(req,res,next)=>{
    db.query("Select c.*,l.Name,s.StatusName from suggestion c, login l, status s where c.SuggestionId = ? and c.Status=s.StatusId and l.UserName=c.UserName"
    ,[req.params.id],(err,data)=>{
        if(err){
            console.log(err);
            res.status(400);
        }
        else{
            if(data.length!=0){
                for(let i=0;i<data.length;i++)
                {
                    data[i].DateTime=data[i].DateTime.toISOString().split('T')[0] + ' '  
                    + data[i].DateTime.toTimeString().split(' ')[0]; 
                }
                res.send(data);
            }
        }
    })
});

router.post("/accept_suggestion",(req,res,next)=>{
    db.query("select StatusId from status where StatusName = ?",["SuggestionAccepted"],
    (err,data)=>{
        if(err){
            console.log(err);
            res.status(400);
        }
        else{
            db.query("update suggestion set status=? where SuggestionId=?",
            [data[0].StatusId,req.body.SuggestionId],(err,data2)=>{
                if(err){
                    console.log(err);
                    res.status(400);
                }
                else{
                    res.send(data2);
                }
            });
        }
    });
});

router.post("/reject_suggestion",(req,res,next)=>{
    db.query("select StatusId from status where StatusName = ?",["SuggestionRejected"],
    (err,data)=>{
        if(err){
            console.log(err);
            res.status(400);
        }
        else{
            db.query("update suggestion set status=? where SuggestionId=?",
            [data[0].StatusId,req.body.SuggestionId],(err,data2)=>{
                if(err){
                    console.log(err);
                    res.status(400);
                }
                else{
                    res.send(data2);
                }
            });
        }
    });
});

router.get("/suggestion_comments/:id",(req,res,next)=>{
    db.query("Select c.*,l.Name from suggestioncomments c, login l where c.SuggestionId=? and l.UserName=c.UserName",
    req.params.id,(err,data)=>{
        if(err){
            console.log(err);
            res.status(400);
        }
        else{
            if(data.length!=0){
                for(let i=0;i<data.length;i++)
                {
                    data[i].DateTime=data[i].DateTime.toISOString().split('T')[0] + ' '  
                    + data[i].DateTime.toTimeString().split(' ')[0]; 
                }
                res.send(data);
            }
        }
    });
});

router.post("/add_suggestion_comment",(req,res,next)=>{
    const dt=new Date()
    const dt1=dt.toISOString().split('T')[0] + ' '  
    + dt.toTimeString().split(' ')[0]; 
    const formData={
        UserName:req.body.UserName,
        SuggestionId:req.body.SuggestionId,
        Text:req.body.Text,
        DateTime:dt1
    }
    db.query("insert into suggestioncomments set ?",formData,(err,data)=>{
        if(err) {
            res.status(400);
            console.log(err);
        }
        else{
            res.send(data);
            // db.query("Select * from complaintcomments where ComplaintId = ?",[req.body.ComplaintId],(err,data2)=>{
            //     if(err)
            //         res.status(400);
            //     else    
            //         res.send(data2);
            // });
        }
    });
})

module.exports=router