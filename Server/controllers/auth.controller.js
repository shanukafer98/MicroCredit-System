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


export const signin  = async (req, res) => {
    const {email,password} = req.body;
    try{
        const validUser = await User.findOne({email});
        if (!validUser){
            return next(errorHandler(404, 'User not found!'));
        }
        const isMatch = bycryptjs.compareSync(password, validUser.password);
        if (!isMatch){
            return next(errorHandler(401, 'Wrong credentials!'));
        }
        const {password:pass,...rest} = validUser._doc;

        res.status(200).json(rest)
    }catch(error){
        next(error)
    }

}