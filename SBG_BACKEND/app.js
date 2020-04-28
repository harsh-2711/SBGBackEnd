const express=require("express");
const app=express();
const BodyParser=require("body-parser");
const authRouter=require("./routes/login");
const dataRouter=require("./routes/data");
const clubRouter=require("./routes/club");
const venueRouter=require("./routes/venue");
const eventRouter=require("./routes/event");
const session=require("express-session")
var cors = require('cors')
app.use(cors())
app.use(session({secret:"aman",resave:false,saveUninitialized:false}));
app.use(BodyParser.json())
app.use(
BodyParser.urlencoded({
  extended:true
}));
app.use(authRouter);
app.use(dataRouter);
app.use(clubRouter);
app.use(venueRouter);
app.use(eventRouter);
const PORT = 8081;
app.listen(PORT, () => {
  console.log("Server is Running");
});