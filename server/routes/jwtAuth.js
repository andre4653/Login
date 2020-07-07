const router = require ("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");

//registering
router.post("/register", async(req, res) => {
    try {
        //1. destructure req.body___________________________________________________
        const{name, email, password} = req.body;


        //2. check if user exists____________________________________________________ 
        const user = await pool.query("select * from users where user_email = $1", [email]) // returns[] if email doesent exist
        
        if (user.rows.length !==0) {    // if email exist
            return res.status(410).send("user already exists")
        }


        //bcrypt the password________________________________________________________
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound)

        const bcryptPassword = bcrypt.hash (password, salt)

        //4. enter new user in db_____________________________________________________
        const newUser = await pool.query(
            "insert into users (user_name, user_email, user_password) values ($1, $2, $3) returning *", 
            [name, email, bcryptPassword]
        );
        res.json(newUser.rows[0]);


        //5. generate jwt token_________________________________________________________
            

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

module.exports= router;