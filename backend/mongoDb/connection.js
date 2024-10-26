const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/netflix")
.then(()=>console.log("MongoDB Database Connected"))
.catch((error)=>console.log(error))