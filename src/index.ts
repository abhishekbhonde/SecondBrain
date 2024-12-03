import express from "express";
import { Request, Response } from "express-serve-static-core";
import {z} from "zod"
import dotenv from "dotenv"
dotenv.config();
import jwt from "jsonwebtoken"
import { Content, User } from "./db";
import bcrypt from "bcrypt"
import { AuthMiddleware } from "./middleware";
const app = express();
app.use(express.json());
const JWT_SECRET = process.env.JWT_SECRET;
const UserSchema = z.object({
    username:z.string().email(),
    password:z.string().min(6)
})
app.post("/api/v1/signup", async(req:Request,res:Response): Promise<void>=>{
 
    
    const validationResult = UserSchema.safeParse(req.body);
    if(!validationResult.success){
         res.status(400).json({
            error:"validation error"
        })
    }
    const {username, password} = validationResult.data!;
    const hashedPassword =await bcrypt.hash(password, 10);
    const user= await User.create({
        username,
        password:hashedPassword
    })
    res.status(201).json({
        message:"user created successfully", user
    })
  
  }
)

app.post("/api/v1/signin", async(req,res)=>{
   try {
    const{username, password} = req.body;

    const response = await User.find({
        username
    })
    
    const storedPassword = await bcrypt.compare(password, response[0].password);
    
    if(username&&storedPassword){
       const token = jwt.sign({
        username
       }, JWT_SECRET as string)

       res.status(200).json({ message: "Signin successful", token });
    }
   } catch (error) {
        res.status(500).json({
            message:"signin unsuccessful"
        })
   }

    
})

app.post("/api/v1/content", AuthMiddleware, async(req:Request,res:Response): Promise<void>=>{
    const link = req.body.link;
    const type = req.body.type;

   const content= await Content.create({
        link,
        type,
        // @ts-ignore
        userId:req.userId,
        tags:[]
    })
     res.json({
        message:"content added successfully", content
    })
})
app.get("/api/v1/content",AuthMiddleware,async (req,res)=>{
    // const userId = req.body.userId;

    // const response = await Content.find({
    //     userId
    // })
})

app.delete("/api/v1/content:id",(req,res)=>{

})

app.post("/api/v1/brain/share", (req,res)=>{

})

app.get("/api/v1/brain/:shareLink",(req,res)=>{
    
})


app.listen(3000)