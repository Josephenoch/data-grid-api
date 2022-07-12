require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const User = require('./models/User')

app.use(express.json())
app.use(cors())
app.use(morgan("tiny"))

require("./db/mongodb")

app.get('/', (req, res) => {
    res.send(`<h1>Hello World</h1>`)
})

app.post('/api/users',(req, res) => {
    let body = req.body

    const user = new User({
        firstName: body.firstName,
        lastName: body.lastName,
        age: body.age,
        description: body.description,
        pay: body.pay
    })
    user.save()
    .then(user=>{
        console.log("User is saved")
        res.status(200).json(user)
    })
    .catch(err=>{
        console.log(`This Error: ${err} occured`)
        res.status(400).end()
    })
})
app.get('/api/users', (req, res) => {
    User.find({}).then(users => {
        res.status(200).json(users)
    })
})

app.delete('/api/users/:id',(req,res)=>{
    User.findByIdAndDelete(req.params.id).then(() => {
        res.status(200).end()
    }).catch(error => res.status(400).end())    
})

app.put('/api/users/:id', (req, res) =>{
    const { firstName, lastName, age, description, pay } = req.body
    User.findByIdAndUpdate(
        req.params.id,
        { firstName, lastName, age, description, pay },
        { new: true, runValidators: true, context: 'query' }
    ).then(updatedUser => {
        res.json(updatedUser)
    }).catch(error => res.status(400).json({
        success: false,
        message:'failed to update user',
        error: error
    }))
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`)
})