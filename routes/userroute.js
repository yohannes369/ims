
import express from 'express';
const router = express.Router();

// Register route

import  {register,login,check} from '../controler/usercontroler.js';
router.post('/register',register ) 



// Login route
router.post('/login',login ) 
    


// Check user route
router.get('/check',check)


export default router;
