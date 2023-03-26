const mongoose = require('mongoose')

const db = 'mongodb+srv://admin:admin@cluster0.7oura.mongodb.net/?retryWrites=true&w=majority'

const connectDB = async () =>{
    try {
        await mongoose.connect(db,{
            useNewUrlParser: true
        });

        console.log("MongoDB Connected")
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;