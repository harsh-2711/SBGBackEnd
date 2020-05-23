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
const notificationRouter=require("./routes/push");
const pushRouter=require("./routes/push-notifications")
const session=require("express-session")
const certificates = require("./routes/certificates")
// var router = express.Router()

// a middleware function with no mount path. This code is executed for every request to the router
app.use(function (req, res, next) {
  res.addListener("finish",()=>{
      console.log(req.originalUrl +' -> '+ res.statusCode + ' -> ' +  res.statusMessage)
  })
  next()
})

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
var MemoryStore =session.MemoryStore;
app.use(session({
    secret: "1234567890QWERTY",
    resave: true,
    store: new MemoryStore(),
    saveUninitialized: true
}));
app.use(multer({storage:filestorage}).any("upload"))
var cors = require('cors')
app.use(cors())

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
app.use(notificationRouter)
app.use(pushRouter)
app.use(certificates)



const PORT = 8081;
app.listen(PORT, () => {
  console.log("Server is Running");
});
