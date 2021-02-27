const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcrypt')

function passportInit(passport){
    
    passport.use(new LocalStrategy
    (
        {
            usernameField : 'email'
        },
        async (email,password,done)=>{
            const user = await User.findOne({
                email : email
            })
            if(!user){
                return done(null,false,{message : "Email doesn't match"})
            }
            bcrypt.compare(password,user.password,(err,match)=>{
                if(match){
                    return done(null,user)
                }
                if(err) {
                    return done(null,false,{message : "Something went wrong"})
                }
                if(!match){
                    return done(null,false,{message : "Password doesn't match"})
                }
            })
        }
    ))
    passport.serializeUser((user,done)=>{
        done(null,user._id) //user id store into session
    })
    passport.deserializeUser((id,done)=>{
        User.findById(id,(err,user)=>{
            done(err,user)
        })
    })
}

module.exports = passportInit