const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()

const port = process.env.PORT || 5000

app.use(morgan('dev'))
app.use(bodyParser.json())

app.get('/ping', (req, res, next) =>{
  res.status(200).send({message: 'PONG!'})
})

app.use((req,res,next) =>{
  const status = 404
  const message = `Could not ${req.method} ${req.url}`

  next({ status, message })
})

app.use((err, req, res, next) =>{
  console.error(err)
  const errorMessage = {}

  errorMessage.status = err.status || 500
  errorMessage.message = err.message || 'Something went wrong'

  if(process.env.NODE_ENV !== 'production'){
    errorMessage.stack = err.stack
  }

  res.status(errorMessage.status).send(errorMessage)

  // const status = err.status || 500
  // res.status(status).json({error: 'Something went wrong'})
})


const listener = () => console.log(`Listening on port ${port}`)
app.listen(port, listener)
