const express = require('express')
const app = express()
const ejs = require('ejs')
const Events = require('events')
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const passport = require('passport')
const MongoDbStore = require('connect-mongo')(session)//session store in mongo DB
const ck = require('ckey')//console.log(ck.SECRET_KEY)Simple and easy way to access dotenv file secrets and use it anywhere in your sub-directory.
module.exports = {
    express,app,ejs,path,expressLayouts,mongoose,session,flash,ck,MongoDbStore,passport,Events
}