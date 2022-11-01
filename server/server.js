const express = require('express')

const port = 3001
const app = express()


app.get('/', (req,res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Hello World');
    res.end();
})

app.listen(port)