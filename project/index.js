const express = require('express');
const {connectmongodB} = require('./connect.js');
const email = require('./routes/email.js');
const home = require('./routes/home.js');
const user = require('./routes/user.js');
const path = require('path');
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 8002;


app.listen(PORT, ()=>{
    console.log("server up");
})
app.set('views', path.resolve("./view"));

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.json());

connectmongodB('mongodb://localhost:27017/woc').then(()=>{
    console.log('DB up');
});

app.set('view engine', 'ejs');
app.use('/static', express.static(path.join(__dirname, 'view')));


app.use("/email", email);
app.use("/home", home);
app.use("/user",user);