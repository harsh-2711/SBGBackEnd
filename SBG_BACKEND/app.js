const express=require("express");
const app=express();
const BodyParser=require("body-parser");
const authRouter=require("./routes/login");
const session=require("express-session")
app.use(session({secret:"aman",resave:false,saveUninitialized:false}));
app.use(BodyParser.json())
app.use(
BodyParser.urlencoded({
  extended:true
}));
app.use(authRouter);
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log("Server is Running");
});