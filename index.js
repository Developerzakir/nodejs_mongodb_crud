const express  = require("express");
const mongoose  = require("mongoose");

const app = express();

const port = 3002;


app.use(express.json());
app.use(express.urlencoded({extended: true}));

//create product schema 

const productSchema = new mongoose.Schema({
  title: {
    type:String,
    required:true 
  },
  price: {
    type:Number,
    required:true 
  },
  description: {
    type:String,
    required:true 
  },
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


//route for data insert into db
app.post("/products", async (req,res)=>{
    try{

        const newProduct =  new Product({
            title: req.body.title,
            price: req.body.price,
            description: req.body.description
        });

        const productData = await newProduct.save();

       res.status(201).send(productData);
    }catch(error){
        res.status(500).send({message: error.message});
    }
});

app.listen(port, async ()=>{
console.log(`server is running at http://localhost:${port}`);
  await connectDB();
});


//route for products read from browser
app.get('/products', async (req,res)=>{
    try{
        const products = await Product.find();
        if(products){
            res.status(200).send(products);
        }else{
            res.status(404).send({
                message: 'Product not found'
            });
        }

    }catch(error){
        res.status(500).send({message: error.message});
    }
});

//route for single product find from browser
app.get('/products/:id', async (req,res)=>{
    try{
        const id = req.params.id;
        // const products = await Product.findOne({_id:id}).select({_id:0,title:1}); 
        //1 =true, 0=false

         //another way to skip some field data
        const product = await Product.findOne({_id:id},{_id:0,title:1}); 
        if(product){
            res.status(200).send(product);
        }else{
            res.status(404).send({
                message: 'Product not found'
            });
        }

    }catch(error){
        res.status(500).send({message: error.message});
    }
});