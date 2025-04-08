const mongoose=require("mongoose");

// const URI="mongodb://localhost:27017/mern_admin";

const URI=process.env.MONGODB_URL;
console.log(URI);
const connectDB = async ()=>{
    try{
        await mongoose.connect(URI);
        console.log("Connected Mongo done");
    }  catch(error){
        console.error("database connection failed");
        process.exit(0);
    }
};

module.exports= connectDB;