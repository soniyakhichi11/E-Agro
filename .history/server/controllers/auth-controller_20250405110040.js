const User=require("../models/user-mode");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
    try {
        res.status(200).send("Welcome to the practice project using router");
    } catch (error) {
        console.log(error);
    }
};

//register logic
const register = async(req,res)=>{
    try{
        // console.log(req.body); 
        const{username,email,phone,password} = req.body;

        const userExist= await User.findOne({email:email}); // to find if email already exist or not
        if(userExist){
            return res.status(400).json({msg:"email already exists"});
        }
        // const saltRound =10;
        // const hash_password = await bcrypt.hash(password,saltRound);

        const userCreated=await User.create({username,email,phone,password}); //if not exist then create
        
        res.status(200).json({
            msg:"registration successful",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
            username: userCreated.username, // Add this
            email: userCreated.email,     
            });
    }catch(error){
        console.error("Error during registration:", error);
        next(error);
    }   
};

//login logictrt
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isPasswordCorrect = await userExist.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = userExist.generateToken();

        res.status(200).json({
            msg: "Login successful",
            token,
            userId: userExist._id.toString(),      // ✅
            username: userExist.username,          // ✅
            email: userExist.email
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


module.exports = { home,register,login};



// mongodb+srv://<db_username>:<db_password>@cluster0.kuwob.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
