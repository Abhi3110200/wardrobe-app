import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { HfInference } from "@huggingface/inference";
import jwt from "jsonwebtoken";
import User from "./models/user.js";
import SavedOutfit from "./models/savedOutfit.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ error: "Invalid token" });
      req.user = decoded;
      next();
    });
  };

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


app.post('/register',async (req,res)=>{
    try {
        const {email,password,gender,profileImage,username} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({error:"Email already exists"});
        }

        const existingUsername = await User.findOne({username});
        if(existingUsername){
            return res.status(400).json({error:"Username already exists"});
        }
        const user = await User.create({email,password,gender,profileImage,username, outfits:[]});
       await user.save();
       const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"15d"});
       res.status(201).json({token});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }
})

app.post('/login',async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"User not found"});
        }
        const isPasswordValid = await user.comparePassword(password);
        if(!isPasswordValid){
            return res.status(400).json({error:"Invalid password"});
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"15d"});
        res.status(200).json({token});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }
})


app.get('/me', authenticateToken, async (req,res)=>{
    try {
      
        const user = await User.findById(req.user.id).select("-password");
        if(!user){
            return res.status(404).json({error:"User not found"});
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }
})

app.post('/save-outfit', authenticateToken, async (req,res)=>{
    try {
        const {date, caption, occasion, visibility, isOotd} = req.body;
        const userId = req.user.id;
        let user = await User.findById(userId);
        if(!user){
            return res.status(404).json({error:"User not found"});
        }

        const itemsWithImages = req.body.items?.map((item)=>{
            if(!item || typeof item !== "object"){
               console.warn("Invalid item");
               return null;
            }

            let imageUrl = item?.image;
            if(!imageUrl || !imageUrl.match(/^https?:\/\/res\.cloudinary\.com/)){
               console.warn("Invalid image URL");
               return null;
            }
            return {
                id: item.id !== undefined ? item.id : "null",
                type: item.type || "shirt",
                gender: item.gender || "unisex",
                image: imageUrl,
                x: item.x !== undefined ? item.x : 0,
                y: item.y !== undefined ? item.y : 0,
              };
        })
        const validItems = itemsWithImages.filter((item) => item !== null);

    if (validItems.length == 0) {
      return res.status(400).json({ error: "No valid items provided" });
    }

    const newOutfit = new SavedOutfit({
      userId: user._id,
      date,
      items: validItems,
      caption: caption || "",
      occasion: occasion || "",
      visibilty: visibility || "Everyone",
      isOotd: isOotd || false,
    });

    await newOutfit.save();

    user.outfits.push(newOutfit._id);
    await user.save();

    res.status(201).json({ outfit: newOutfit });
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }
})