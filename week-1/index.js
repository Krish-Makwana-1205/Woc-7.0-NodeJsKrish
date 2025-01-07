const express = require('express');
const {connectmongodB} = require('./connect.js');
const {putEmail} = require('./controller/CRUD.js');
const home = require('./routes/home.js');
const path = require('path');

const app = express();
const PORT = 8002;


app.listen(PORT, ()=>{
    console.log("server up");
})
app.set('views', path.resolve("./view"));

app.use(express.urlencoded({extended: false}));

connectmongodB('mongodb://localhost:27017/woc').then(()=>{
    console.log('DB up');
});

app.set('view engine', 'ejs');
app.use('/static', express.static(path.join(__dirname, 'view')));


app.use("/", home);