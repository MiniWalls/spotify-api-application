require("dotenv").config();
var express = require('express'); // Express web server framework
var cors = require('cors');
var cookieParser = require('cookie-parser');

const authRouter = require("./routes/authorization_route");
 
var app = express();
 
app.use(express.static(__dirname + '/public'))
    .use(cors())
    .use(cookieParser());

app.use("/", authRouter);

console.log('Listening on 3001');
app.listen(3001);