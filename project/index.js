const express = require('express');
const {connectmongodB} = require('./connect.js');
const email = require('./routes/email.js');
const home = require('./routes/home.js');
const user = require('./routes/user.js');
const askquestion = require('./routes/ask-question.js'); 
const path = require('path');
const cookieParser = require("cookie-parser");
const sock = require('socket.io');
const http = require('http');
const send = require('./routes/send.js');


const app = express();
const PORT = 8002;

const server = http.createServer(app);
const io = sock(server);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
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
app.use("/askQuestion", askquestion);

app.use("/", send(io));

io.on('connection', (sock) => {
    console.log('connected');
    sock.on('join-room', (questionId) => {
        console.log(`room: ${questionId}`);
        sock.join(questionId);
    });
    sock.on('disconnect', () => {
        console.log('disconnected');
    });
});

