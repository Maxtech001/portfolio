require("dotenv").config(); 
const express = require("express"); // // this is a very fast server
const mongoose = require("mongoose"); /// this is used to communicate with mongo dbs or any non relational data base
const bodyParser = require("body-parser"); // this is used to use to make request body available to the server
const app = express(); // this is create an instance for an express
//const secret = process.env.PAYSTACK_SECRET
const Message = require("./model")
const PORT = process.env.PORT || 4000;

//server set up ends here
const MONGOURL = process.env.MONGOURL; // ***This paragraph handle the server connection
mongoose.connect(MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const DB = mongoose.connection; // ***This paragraph helps me to know the condition of the server connection
DB.on("connected", () => {
  console.log("Database is connected");
});
app.set("view engine", "ejs"); // this sets view engine to ejs
app.set("views", __dirname + "/views"); // this tells where view folder for vercel##
app.use(bodyParser.urlencoded({ extended: false })); //  this is set up for body parser
app.use(bodyParser.json()); // this is also a set up for body parser/ this set up a req.body to object
app.use(express.static(__dirname + "/public")); // all sta

// app.get('/pages/:page',(req, res)=>{
// let page = req.params.page
// res.render('pages/'+ page, {title:x})
// })
// app.get("/pages/home",(req, res)=>{
//   console.log(req.body);
// // res.render('pages/home', {title: 'Send'})
// });

app.get("/", (req, res) => {
res.render("pages/home", { title:"home", message:""});
});

app.post("/pages/contact", async (req, res) => {
  let name = req.body.name;
  let email =req.body.email;
  let subject =req.body.subjct;
  let message =req.body.message;
  
 const newMessage = new Message({
  name: name,
  email: email,
  subject: subject,
  message: message,
 })
await newMessage.save()
res.render("pages/home", {title:"home", message:"Thanks for your message" })
})

app.listen(PORT, () => {
  console.log(`server is live on port ${PORT}`);
});
