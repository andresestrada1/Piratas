const jwt = require('jsonwebtoken');
const secret_key = "llave secreta";

module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, secret_key, (err, payload) => {
        if(err) {
            res.status(401).json({message: "No autorizado!"})
        } else {
            next();
        }
    })
}