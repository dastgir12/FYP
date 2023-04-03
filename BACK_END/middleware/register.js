const jwt = require('jsonwebtoken');
const config = require('config');


const jwtSecret = config.get('jwtSecret');

module.exports = (req, res, next) => {
    let token = req.header('authtoken');
    if (!token) {
        return res.status(401).json({ msg: "No Token Available, Authorization Failed" });
    }
    try {
        let decode = jwt.verify(token, jwtSecret);
            req.user= decode.user;
            next();
        }
    catch (err) {
        return res.status(401).json({ msg: "Token is not valid" })
    }
}