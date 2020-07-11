const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization")


router.get("/", authorization, async(req, res) =>{          //muss autorisiert sein
    try {
        //req.user has the payload, see authorization
        //res.json(req.user); 

        const user = await pool.query("select user_name from users where user_id = $1", [req.user]);
        res.json(user.rows[0])
    } catch (err) {
        console.error (err.message);
        res.status(500).json ("server error");
        
    }
})
module.exports = router;