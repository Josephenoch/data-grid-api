const mongoose = require('mongoose')
console.log("Connecting to mongoDB...")

const url = process.env.MONGODB_URI

mongoose.connect(url).then(() => {
  console.log("Successfully connected to MongoDB")
}).catch(err => {
  console.log("Failed to connect to mongoDB:", err)
})