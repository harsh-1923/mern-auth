const express = require('express');
const router = express.Router();
const UserModel = require('./UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


//LOGIN A USER
router.post("/login", async (req, res) => {
    const { username, password } = req.body.data;
    console.log(username, password);
    if(!username || !password)
     return res.status(400).json({errorMessage: "Invalid Credentials"});

    const user = await UserModel.findOne({username: username});
    if(user) {
        const passwordCheck = await bcrypt.compare(password, user.passwordHash);
        if( passwordCheck ){
            const payload = {username};
            jwt.sign(payload, "secret" , {expiresIn: "1d"}, (err, token) => {
                if(err) console.log(err);
                else{
                    res.cookie("jwt", token);
                    return res.json({
                        successMessage: "user logged in",
                        token : token
                    });
                }
            });
        }else{
            return res.json({errorMessage: "Invalid password or email"});
        }
    } else{
        return res.json({message: "Invalid credentials"});
    }

})


//REGISTER  A USER
router.post('/signup', async (req, res) => {
    const { username, password } = req.body.data;
    // console.log(req.body);

    if(!username || !password) return res.status(400).json({errorMessage: "Invalid Credentials"});

    const existingUser = await UserModel.findOne({username: username});

    if(existingUser){
        return res.status(400).json({errorMessage: "User already exists"});
    }else{

        const prime = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, prime);
        console.log(passwordHash);

        const newUser = new UserModel({
            username, passwordHash
        });
        const savedUser = await newUser.save();
        console.log(savedUser)
        return res.status(200).json({successMessage: "User created", newUser});
    }
});

module.exports = router;
