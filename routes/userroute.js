
import express from 'express';
const router = express.Router();
import authmidlware from '../midlware/authmidlware.js';
// Register route

import  {register,login,check,add,manager} from '../controler/usercontroler.js';
router.post('/register',register ) 



// Login route
router.post('/login',login ) 
    // admin user
router.post('/add',add)
//  manger route
router.post('/manager',manager)
// Check user route
router.get('/check', authmidlware,check)


export default router;
