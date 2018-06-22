const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()

const port = process.env.PORT || 5000

app.use(morgan('dev'))
app.use(bodyParser.json())

app.get('/ping', (req, res, next) =>{
  res.send('PONG!')
})

app.use((err, req, res, next) =>{
  const status = err.status || 500
  res.status(status).json({error: 'Internal Server Error'})
})

app.use((req,res,next) =>{
  res.status(404).json({message: 'Not Found'})
})

const listener = () => console.log(`Listening on port ${port}`)
app.listen(port, listener)
