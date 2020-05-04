const db=require("../db");
const express=require("express");
const dateformat=require('dateformat');
const router=express()

router.post("/add_complaint",(req,res,next)=>{
    db.query("select * from status where StatusName=?",["ComplaintAdded"],(err,data1)=>{
        const ComplaintTags=req.body.ComplaintTags;
        const dt=new Date()
        const dt1=dt.toISOString().split('T')[0] + ' '  
        + dt.toTimeString().split(' ')[0]; 
        const data={
            UserName:req.body.UserName,
            ComplaintTitle:req.body.ComplaintTitle,
            ComplaintText:req.body.ComplaintText,
            Status:data1[0].StatusId,
            IsAnonymous:req.body.IsAnonymous,
            DateTime:dt1
        }
        db.query("insert into complaint set ?",data,(err,data2)=>{
            if(err)
                res.status(400)
            else
            {   
                if(ComplaintTags.length!=0){
                    let count=0;
                    const complaintId = data2.insertId;
                    ComplaintTags.forEach(tag=>{
                        const values={
                            ComplaintId:complaintId ,
                            ClubId:tag
                        }
                        db.query("Insert into complainttags set ?",values,(err,data3)=>{
                            if(err)
                                res.send(400);
                            else{
                                count++;
                                if(count==ComplaintTags.length){
                                    res.send("Complaint Added");
                                }
                            }
                        });
                    });
                }
                else{
                    res.send("Complaint Added");
                }
            }
        })
          // sending event id
    })
})

router.get("/get_complaints",(req,res,next)=>{
    db.query("Select c.*,s.StatusName from complaint c, status s where s.StatusId=c.Status",(err,data)=>{
        if(err){
            console.log(err);
            res.status(400);
        }
        else {
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
})

router.get("/get_complaint/:id",(req,res,next)=>{
    db.query("Select c.*,l.Name,s.StatusName from complaint c, login l, status s where c.ComplaintId = ? and c.Status=s.StatusId and l.UserName=c.UserName"
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

router.get("/get_tagged_clubs/:id",(req,res,next)=>{
    db.query("select c1.ClubName from club as c1, complaint as c2, complainttags as c3 where c1.ClubId=c3.ClubId and c2.ComplaintId = c3.ComplaintId and c2.ComplaintId=?",
    [req.params.id],(err,data)=>{
        if(err){
            res.status(400);
        }
        else{
            res.send(data);
        }
    }); 
});

router.get("/complaints_by_username/:username",(req,res,next)=>{
    db.query(
        `select * from complaint where UserName=?`,
        [req.params.UserName],(err,data)=>{
            if(err)
                res.status(400)
            else{
                res.send(data);
            }
    })
});

router.post("/add_comment",(req,res,next)=>{
    const dt=new Date()
    const dt1=dt.toISOString().split('T')[0] + ' '  
    + dt.toTimeString().split(' ')[0]; 
    const formData={
        UserName:req.body.UserName,
        ComplaintId:req.body.ComplaintId,
        Text:req.body.Text,
        DateTime:dt1
    }
    db.query("insert into complaintcomments set ?",formData,(err,data)=>{
        if(err) 
            res.status(400);
        else
            res.send(data);
    });
})

router.get("/comments/:id",(req,res,next)=>{
    db.query("Select c.*,l.Name from complaintcomments c, login l where c.ComplaintId=? and l.UserName=c.UserName",
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

module.exports=router