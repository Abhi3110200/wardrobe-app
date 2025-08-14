import mongoose from "mongoose";

const outfitSchema = new mongoose.Schema({
    ocassion:String,
    style:String,
    items:[String],
    image:String,
    embedding:[Number],
})

const Outfit = mongoose.model("Outfit", outfitSchema);

export default Outfit;
