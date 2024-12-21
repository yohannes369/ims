import dbconn from '../db/dbconfig.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { json } from 'express';
export const register = async (req, res) => {
    try {
        const { username, firstname, lastname, email, password } = req.body;

        if (!username || !firstname || !lastname || !email || !password) {
            return res.status(400).json({ msg: 'Please fill in all required fields' });
        }

        // Insert the user into the database
        

        // Fetch the user details to return in the response
        const [user] = await dbconn.query('SELECT username, user_id FROM users WHERE username = ? OR email = ?', [username, email]);
        
             if(user.length>0){
                 return res.status(400).json({msg:"already ready register"})
             }
            //  password validation
            if(password.length < 8){
                res.status(400).json({msg:"passord length must be at least eigt character"})
            }
            //    generate hash password
               const salt = await bcrypt.genSalt(7);
                  const hashpassword  = await bcrypt.hash(password,salt)
            //   insert user in database
             await dbconn.execute(
                'INSERT INTO users (username, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)',
                [username, firstname, lastname, email, hashpassword]
            );
            res.status(201).json( {msg:"user is created"})
             
    } catch (err) {
        res.status(500).json({ msg: 'An error occurred during registration.' });
    }
};
      





//    login functionalit

export const login = async(req, res) => {
    const {  email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please fill in all required fields' });
    }
    try {
        const [user] = await dbconn.query('SELECT username, user_id, password FROM users WHERE  email = ?', [ email]);
            if(user.length == 0){
                return res.json({ msg: 'invalid credintaly  ' });
            }
        const ismatch = await bcrypt.compare(password, user[0].password)
        if(!ismatch){

            return res.json({ msg:"invalid crenintial"})
        }
        const username=user[0].username
        const user_id=user[0].user_id
        const token =jwt.sign({username,user_id},"john")
           return  res.json({msg :"user is login",token})
        
         
        // return res.json({ user:user})

    } catch (err) {
        res.status(500).json({ msg: 'something is wrong' });
    }
};


export const check = async(req, res) => {
   const username= req.user.username
   const user_id =req.user.user_id

        res.json({msg:"valied user",username,user_id})
    // res.send('Welcome to the user check page!');
};