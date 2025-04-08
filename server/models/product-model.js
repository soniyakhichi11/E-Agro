const mongoose = require('mongoose');

const productSchema=new mongoose.Schema({
    imageurl:{
        type:String,

    },
    
});

const Product = new mongoose.model("Product",productSchema);

 module.exports=Product; 
 