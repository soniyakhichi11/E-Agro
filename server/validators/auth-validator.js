const {z}= require("zod");

const signupSchema = z.object({
     username:z
     .string({required_error:"Name is required"})
     .trim()
     .min(3,{message:"name must be atleast of 3 char"})
     .max(255,{message:"Name must not be more than 255 char"}),

     email:z
     .string({required_error:"Email is required"})
     .trim()
     .email({meassage:"invald email address"})
     .min(3,{message:"email must be atleast of 3 char"})
     .max(255,{message:"email must not be more than 255 char"}),
     
     phone:z
     .string({required_error:"Name is required"})
     .trim()
     .min(10,{message:"phone must be atleast of 10 char"})
     .max(20,{message:"phone must not be more than 20 char"}),
     
     password:z
     .string({required_error:"password is required"})
     .min(7,{message:"password must be atleast of 7 char"})
     .max(1024,{message:"password must not be more than 1024 char"}),
     
});

module.exports=signupSchema;