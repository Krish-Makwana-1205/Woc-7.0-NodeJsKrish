const express = require('express');
const {connectmongodB} = require('./connect.js');

const app = express();
const PORT = 8002;

app.listen(PORT, ()=>{
    console.log("server up");
})

app.use(express.urlencoded({extended: false}));

connectmongodB('mongodb://localhost:27017/woc').then(()=>{
    console.log('DB up');
});