const jwt = require("jsonwebtoken");
require("dotenv").config()

module.exports = async (req, res, next) => {
    try {
        const jwtToken = req.header("token");

        if(!jwtToken){              // wenn keins vorhanden ist
            return res.status(403).json("not authorized");
        }
        
        //check if token is valid, man härrte 12345 reinschreiben können
        const payload = jwt.verify(jwtToken, process.env.jwtSecret) //verify is die special methode von jwt


        req.user = payload.user;
        next();

    } catch (err) {
        console.error(err.message)
        return res.status(403).json("not Authorize");
    }
}

// checks if token is valid