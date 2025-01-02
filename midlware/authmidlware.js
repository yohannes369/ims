import jwt from 'jsonwebtoken';

async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.json({ msg: "Authorization is invalid" });
    }

    const token = authHeader.split(' ')[1];
    console.log(authHeader);
    console.log(token);

    try {
        const data = jwt.verify(token, "john");
        req.user = { username: data.username, userid: data.user_id };
        next();
    } catch (error) {
        res.json({ msg: "Authentication invalid" });
    }
}

export default authMiddleware;


// import jwt from 'jsonwebtoken';

//  const authmidlware = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({ msg: 'No token provided' });
//     }

//     try {
//         const data = jwt.verify(token, "john");
//         req.user = { username: data.username, userid: data.userid };
  //    return  res.json({data})
//         next();
//     } catch (err) {
//         return res.status(403).json({ msg: 'Invalid token' });
//     }
// };

// export default authmidlware;