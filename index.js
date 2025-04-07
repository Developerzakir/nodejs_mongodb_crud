const express  = require("express");
const app = express();

const port = 3002;

app.get("/",(request,response)=>{
    response.send("welcome to home page");
});

app.listen(port, ()=>{
console.log(`server is running at http://localhost:${port}`);
});