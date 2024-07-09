const mongoose = require("mongoose")

const connectDatabase =async  () => {

    await mongoose.connect("mongodb+srv://anujkurmi199:GcKkYFllJMQ7T11K@cluster0.udyg0kh.mongodb.net/blog" ,{useNewUrlParser : true})

    console.log("MongoDB Connection Successfully")

}

module.exports = connectDatabase
