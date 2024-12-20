var express = require('express');
var router = express.Router();

router.get('/test',async (req,res)=>{
    ctx={
        message: "Welcome to the Final project page"
    }

    res.render('test',ctx);

});

router.get('/',async (req,res)=>{
    if (req.session.user){
        user=req.session.user;
    }else{
        user=null;
    }
    })
    
    router.get('/:id',async (req,res)=>{
        id=req.params.id;
    })

module.exports = router;