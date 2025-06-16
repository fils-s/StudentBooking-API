const db = require('../models/db.js'); 
const User = db.user; 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { ErrorHandler } = require("../utils/error.js");

let login = async (req, res, next) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({ where: { username } });

        // validação
        if(user){
            if(!username || !password) {
                throw new ErrorHandler(400, "Username and password are required");
            }
            const isPasswordMatching = await bcrypt.compare(password, user.password)
            if (isPasswordMatching) {
                const token = jwt.sign({ userID: user.userID, username: user.username, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.status(200).json({ message: "Login successful", token });
            }
            else{
                throw new ErrorHandler(401, "Invalid credentials");
            }
        } else {
            throw new ErrorHandler(404, "User not found");
        }
    } catch(error){
        if (error instanceof ErrorHandler) {
            return next(error);
        }
        console.error(error);
        return next(new ErrorHandler(500, "Internal server error"));
    }
}


let signIn = async (req, res, next) => {
    try {
        const { username, password, userType, email, phoneNumber, approval, banned} = req.body;

        // validações
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            throw new ErrorHandler(409, "Username already exists");
        }
        if (!username || !password || !phoneNumber) {
            throw new ErrorHandler(400, "Username, password, and phoneNumber are required");
        }
        if(!userType){
            userType = 'student' // valor default
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        // Novo user
        const newUser = await User.create({
            username,
            password: hashedPassword,
            userType,
            email,
            phoneNumber,
            approval: false,
            banned: false 
        });

        res.status(201).json({ message: "User created successfully", userID: newUser.userID });
        
    } catch (error) {
        if (error instanceof ErrorHandler) {
            return next(error);
        }
        console.error(error);
        return next(new ErrorHandler(500, "Internal server error"));
    }
}

let patchUser = async (req, res, next) => {
  try {
      const { username, password, userType, email, phoneNumber, approval, banned} = req.body;

      const userID = req.userID;

      const user = await User.findOne({
          where: { userID: userID },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const updateFields = {};
      if (username !== undefined) updateFields.username = username;
      if (password !== undefined) {
          const hashedPassword = await bcrypt.hash(password, 10);
          updateFields.password = hashedPassword
        }
      if (email !== undefined) updateFields.email = email;
      if (phoneNumber !== undefined) updateFields.phoneNumber = phoneNumber;

      // Only allow admin to update approval, banned, and userType
        const loggedUser = await User.findOne({ where: { userID: req.userID } });
        const isAdmin = loggedUser && loggedUser.userType === 'admin';

        if ((approval !== undefined || banned !== undefined || userType !== undefined) && !isAdmin) {
            return res.status(403).json({ message: "You're not allowed to do this request." });
        }

      await User.update(updateFields, { where: { userID: userID } });

      res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = {
    login, signIn, patchUser
};