const express=require("express");
const app=express();
const path=require("path");
const multer=require("multer");
const BodyParser=require("body-parser");
const authRouter=require("./routes/login");
const dataRouter=require("./routes/data");
const clubRouter=require("./routes/club");
const venueRouter=require("./routes/venue");
const eventRouter=require("./routes/event");
const chatRouter=require("./routes/chat");
const subRouter=require("./routes/subscriber");
const lostfoundRouter=require("./routes/lostfound");
const eventlifeCycle=require("./routes/eventcycle");
const complaintRouter=require("./routes/complaints");
const votingRouter=require("./routes/voting");
const budgetRouter=require("./routes/budget")
const reportRouter=require("./routes/report")
const suggestionRouter=require("./routes/suggestions");
const achievementsRouter=require("./routes/achievements");
const session=require("express-session")

const filestorage=multer.diskStorage(
  {
      destination:(req,file,cb)=>{
          cb(null,"./public/uploads");
      },
      filename:(req,file,cb)=>{
          cb(null,file.originalname);
      }
  }
)

app.use(multer({storage:filestorage}).any("upload"))
var cors = require('cors')
app.use(cors())
app.use(session({secret:"aman",resave:false,saveUninitialized:false}));
app.use(BodyParser.json())
app.use("/public",express.static(path.join(__dirname, 'public')));
app.use(
BodyParser.urlencoded({
  extended:true
}));
app.use(authRouter);
app.use(dataRouter);
app.use(clubRouter);
app.use(venueRouter);
app.use(eventRouter);
app.use(eventlifeCycle);
app.use(chatRouter);
app.use(complaintRouter);
app.use(suggestionRouter);
app.use(subRouter);
app.use(lostfoundRouter);
app.use(votingRouter)
app.use(budgetRouter)
app.use(achievementsRouter)
app.use(reportRouter);
const PORT = 8081;
app.listen(PORT, () => {
  console.log("Server is Running");
});