require("dotenv").config();
var express = require('express'); // Express web server framework
var cors = require('cors');
var cookieParser = require('cookie-parser');
const port = process.env.PORT || 3001;

const authRouter = require("./routes/authorization_route");
 
var app = express();

app.use(cors());
app.use(cookieParser());

app.use("/", authRouter);

console.log(`Listening on ${port}`);
app.listen(port);