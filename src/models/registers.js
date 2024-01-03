const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const empSchema=new mongoose.Schema({
    name:{type:String,required:true},
    contactNo:{type:Number,required:true,unique:true},
    age:{type:Number,required:true},
    gender:{type:String,required:true},
    email:{type:String,unique:true,trim:true,unique:true},
    password:{type:String,required:true},
    confirmPassword:{type:String,required:true}
    })

empSchema.pre("save", async function(next){
    if(this.isModified("password")){
        // console.log(`the current password is ${this.password}`);
        this.password=await bcrypt.hash(this.password,10);
        // console.log(`the password now is ${this.password}`);
        this.confirmPassword= undefined;
    }

    next();
})
    const Register=new mongoose.model("Register",empSchema)
    module.exports=Register;