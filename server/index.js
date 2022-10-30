const express = require('express')
const cors = require('cors')
//const clientCredentials = requite('./clientCredentials.js')

const port = 3001
const app = express()

app.use(cors())


app.get('/', (req,res) => {
    console.log("Testing")
    res.sendStatus(200)
})

app.listen(port)