let express=require('express');
let app=express();

const router=require("./routes/regRoutes.js");
let db=require("./config/db.js");
let cookie=require('cookie-parser');
let session=require("express-session");

let bodyparser=require('body-parser');

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(bodyparser.json());

app.use(session({
    secret:"111111111fdf",
    resave:false,
    saveUninitialized:false
}));

app.set('view engine',"ejs");


app.use("/",router);


module.exports=app;

