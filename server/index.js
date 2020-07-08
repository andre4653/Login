const express = require("express");
const app = express();
const cors = require("cors");

//middleware

app.use(express.json()); // access to req.body
app.use(cors());         // backend can access frontend and otherwise

//register and login routes
app.use("/auth", require("./routes/jwtAuth"));

//dashbard route
app.use("/dashboard", require("./routes/dashboard"));

app.listen(5000, () => {
    console.log("server is listening on port 5000");
})