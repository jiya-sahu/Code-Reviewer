const express = require('express')
const aiRoutes = require('./routes/ai.routes')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors({

  origin: 'https://auto-review.netlify.app',

  methods: ['POST'],
  credentials: true
}));
app.get('/',(req,res)=>{
    res.send("hello world")
})

app.use('/ai',aiRoutes)
module.exports = app;