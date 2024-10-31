import User from '../models/auth.model.js';
import bycryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';   


export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = bycryptjs.hashSync(password, 10);
    const newUser = new User({username,email,password:hashedPassword})
    try{
        await newUser.save();
        res.status(201).send("User created successfully")
    }catch(error){RE
        res.status(500).send(error) 
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
        res.status(500).send(error) 
    }

}






export const signOut = async (req, res) => {    
    try{
        res.status(200).json("Signout successfully")
    }catch(error){
        res.status(500).send(error) 
    }

}