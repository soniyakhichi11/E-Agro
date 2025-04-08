 const mongoose=require("mongoose");
 const bcrypt=require("bcryptjs");
 const jwt= require("jsonwebtoken");
 const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },

 });

 // for password securing
 userSchema.pre('save',async function(){

    const user = this;
    if(!user.isModified('password')){
       return  next();
    }
    try {
      const saltRound = await bcrypt.genSalt(10);
      const hash_password = await bcrypt.hash(user.password,saltRound);
        user.password=hash_password;
    } catch (error) {
       return  next(error);
    }
 });

 //compare the password
 userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
 }

 //json web token
//  userSchema.methods.generateToken = function () {
//     try {
//         const payload = {
//             userId: this._id.toString(),
//             username: this.username, // Include username for simplicity
//         };
//         return jwt.sign(payload, "YOUR_SECRET_KEY", { expiresIn: "30d" });
//     } catch (error) {
//         console.error("Token generation error:", error);
//     }
// };

userSchema.methods.generateToken = function () {
    return jwt.sign(
        { userID: this._id.toString() }, // Simplified payload
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
    );
};


 const User = new mongoose.model("User",userSchema);

 module.exports=User; 