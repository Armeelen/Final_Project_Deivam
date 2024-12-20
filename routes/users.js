var express = require('express');
var User = require('../models/users');
var router = express.Router();


router.get('/loginPage',async (req,res)=>{
    ctx={
        message: "Welcome to the login page"
    }
    res.render('login',ctx);
});

router.get('/registerPage',async (req,res)=>{
    ctx={
        message: "Welcome to the register page"
    }
    res.render('register',ctx);
});


//login route
router.post('/login', async (req,res)=>{
    username=req.body.username;
    password=req.body.password;

    //check if user exists
    // let user=await User.findOne({where:{username:username,password:password}})
    User.findOne({
        where: {
            username: req.body.username,
            password: req.body.password
        }
    })
    .then((user) => {
        if(user){
            // res.send("Login successful");
            my_user={
                id:user.id,
                username:user.username,
                type:user.type
            }
            req.session.user=my_user;
            res.redirect('./Game/index.html');  
        }
        else{
            res.send("Invalid username or password");
        }
    })
    .catch((error) => {
        res.send("Error logging in");
    });
});

//login route
router.post('/register', async (req,res)=>{
    //create id using length
    users=await User.findAll();
    id=users.length+1;

    User.create({
        id:id,
        username: req.body.username,
        password: req.body.password
    })
    .then((user) => {
        my_user={
            id:id,
            username: req.body.username,
            type: req.body.password
        }
        req.session.user=my_user;
        res.redirect('/products');  
    })
    .catch((error) => {
        res.send("Error creating user");
    });
});

//logout
router.get('/logout', async (req,res)=>{
    req.session.user=null;
    res.redirect('/products');
});


module.exports = router;