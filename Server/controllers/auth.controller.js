import User from '../models/auth.model.js';
import bcrypt from 'bcryptjs';



export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
  
    try {
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  };





export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });//Check if user exists
    if (!validUser) {
      return res.status(404).json({ message: 'User not found!' });
    }

    const isMatch = bcrypt.compareSync(password, validUser.password); // Fixed typo here
    if (!isMatch) {
      return res.status(401).json({ message: 'Wrong credentials!' });
    }

    const { password: pass, ...rest } = validUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};





export const signOut = async (req, res) => {    
    try{
        res.status(200).json("Signout successfully")
    }catch(error){
        res.status(500).send(error) 
    }

}