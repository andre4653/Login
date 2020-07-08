const router = require ("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require ("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization")

//registering
router.post("/register",validInfo,  async(req, res) => {
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
        const bcryptPassword = await bcrypt.hash (password, salt)

        //4. enter new user in db_____________________________________________________
        const newUser = await pool.query(
            "insert into users (user_name, user_email, user_password) values ($1, $2, $3) returning *", 
            [name, email, bcryptPassword]
        );
       


        //5. generate jwt token_________________________________________________________
        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({token});

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

//login route 
router.post("/login", validInfo, async (req, res) => {
    try {
        //1. Destructure the req.body

        const {email, password} = req.body;

        //2. checkt if user doesent exist(if not then throw err)

        const user = await pool.query("select * from users where user_email = $1", [email]);

        if (user.rows.length === 0){        // if user doesent ecist
            return res.status(401).json("User Password or email is incorrect");
        }

        //3. check if incoming pw is the same as the database pw

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);   // compare() gibt bool wert aus
        
        if (!validPassword)   {      // wenn false
            return res.status(401).json("pw of login is invalid")
        }

        //4. give jwt token
        const token = jwtGenerator(user.rows[0].user_id);
        res.json({token});

    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error")
    }
})

router.get("/is-verify", authorization, async (req, res) => {
    try {
        res.json(true);         // checks if authorized (through auth. middleware) and returns true if authorized
    } catch (err) {
        console.error(message.err)
        res.status(500).send("server error")
    }
})
module.exports= router;

// next: route that consistently check the token whenever react is refreshed