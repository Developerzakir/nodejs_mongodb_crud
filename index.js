const express  = require("express");
const mongoose  = require("mongoose");

const app = express();

const port = 3002;


//create product schema 

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  createdAt:{
    type: Date,
    default: Date.now
  }
});

//create product model
const Product = mongoose.model("Products",productSchema);


const connectDB = async ()=>{
    try{
       await mongoose.connect('mongodb://127.0.0.1:27017/productdb');
       console.log("db is connected");
    }catch(error){
        console.log("db not connected");
            console.log(error)
            process.exit(1)
    }
};

app.get("/",(request,response)=>{
    response.send("welcome to home page");
});

app.listen(port, async ()=>{
console.log(`server is running at http://localhost:${port}`);
  await connectDB();
});