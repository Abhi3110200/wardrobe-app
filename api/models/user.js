import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    username:{type:String, required:true, unique:true},
    gender:String,
    profileImage:String,
    outfits:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SavedOutfit"
    }]
})

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcryptjs.hash(this.password, 10);
    }
    next();
})

userSchema.methods.comparePassword = async function(password){
    return await bcryptjs.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;
