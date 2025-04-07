const express  = require("express");
const mongoose  = require("mongoose");

const app = express();

const port = 3002;


//One way to connect mongodb
// mongoose.connect('mongodb://127.0.0.1:27017/products')
// .then(()=>console.log("db is connected"))
// .catch((error)=>{
//     console.log("db not connected");
//     console.log(error)
//     process.exit(1)
// });

const connectDB = async ()=>{
    try{
       await mongoose.connect('mongodb://127.0.0.1:27017/products');
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