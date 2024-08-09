import User from '../models/user.model.js';
import bycryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';   


export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = bycryptjs.hashSync(password, 10);
    const newUser = new User({username,email,password:hashedPassword})
    try{
        await newUser.save();
        res.status(201).send("User created successfully")
    }catch(error){
        next(error)
    }

}
