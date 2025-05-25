const express = require('express');
const {connectmongodB} = require('./connect.js');
const email = require('./routes/email.js');
const home = require('./routes/home.js');
const user = require('./routes/user.js');
const resource = require('./routes/resourceshare.js');
const askquestion = require('./routes/ask-question.js');
const lost = require('./routes/lostnfound.js'); 
const path = require('path');
const cookieParser = require("cookie-parser");
const sock = require('socket.io');
const http = require('http');
const send = require('./routes/send.js');
const fs = require('fs');
const multer = require('multer');
const { restrictToLoggedinUserOnly } = require('./middleware/logincheck.js');
const {put_files} = require('./controller/resource.js');
const {post_lost} = require('./controller/lostnfound.js');

const app = express();
const PORT = 8002;

const server = http.createServer(app);
const io = sock(server);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.set('views', path.resolve("./view"));

//Middle ware

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.json());

connectmongodB('mongodb://localhost:27017/woc').then(()=>{
    console.log('DB up');
});

app.set('view engine', 'ejs');
app.use('/static', express.static(path.join(__dirname, 'view')));

//Routes

app.use("/email", email);
app.use("/home", home);
app.use("/user",user);
app.use("/askQuestion", askquestion);
app.use("/resource", restrictToLoggedinUserOnly, resource);
app.use("/lostnfound", restrictToLoggedinUserOnly, lost);


//Socket IO 
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

// file upload

const storage = multer.diskStorage({
    destination: function(req, res, cb){
        return cb(null, "./uploads");
    },
    filename: function (req, file, cb){
        return cb (null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({storage});

app.use('/uploads', express.static('uploads'));

app.post('/giveresource', restrictToLoggedinUserOnly, upload.single('file'), put_files);

app.post('/lostnfound', restrictToLoggedinUserOnly, upload.single('file'), post_lost);
