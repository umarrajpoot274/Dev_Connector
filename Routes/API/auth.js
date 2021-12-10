const express = require('express');
router= express.Router();
const Auth=require('../../middleware/auth');
const User = require('../../models/user');
const jwt= require('jsonwebtoken');
const config= require('config');
const {check, validationResult}=require('express-validator');
const bcrypt = require('bcryptjs');

//@route Post api/auth
//@dec   Authentication user & get token
//@access public
router.get('/',Auth,async (req,res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send(
            'Server Error.'
        );
    }
});
router.post(
    '/',
[
    check('email','Please include a valid Email')
    .isEmail(),
    check('password','Please enter a password with 6 of more charcter')
    .exists()
],
 async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    }
    // checking validation of email, password
        const {email, password } = req.body;

        try{
            //if user exist
            let user = await User.findOne({ email });
            if(!user){
                res.status(400).json({
                    errors:[{
                        msg:'Invalid Credentials email'
                    }]
                });
            }
            const isMatch = await bcrypt.compare(
                password, user.password
            );
            if(!isMatch){
                return res.status(400).json({
                    errors:[{
                        msg:'Invalid Credentials password.'
                    }]
                });
            }

        const payload={
            user:{
                id:user.id
            }
        }
        //sign token
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn:360000},
            (err,token)=>{
                if(err) throw err;
                res.json({token});
            });

        }catch(err){
            console.log(err.message);
            res.status(500).send('Server Error');
        }   
    });
module.exports = router;