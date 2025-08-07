const express = require('express');
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/posts");
//const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

const cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


app.post('/register', async (req, res) => {
    console.log(req.body)
    let { email, name, password, age, username } = req.body;

    let user = await userModel.findOne({ email });
    if (user)
        return res.status(500).send("user is already present ");

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let user = await userModel.create({
                username,
                name,
                age,
                email,
                password: hash
            });

            let token = jwt.sign({ email: email, userid: user._id }, "shhsh");
            res.cookie("token", token);
            res.send("registered");
        });
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});