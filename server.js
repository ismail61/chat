const {
  express,
  app,
  ejs,
  path,
  expressLayouts,
  mongoose,
  session,
  flash,
  ck,
  MongoDbStore,
  passport,
  Events
} = require("./require/requires");

//Database Connection
require("./require/database");
//Session Store
const session_store = new MongoDbStore({
  mongooseConnection : mongoose.connection,
  collection : 'sessions',

})

//middleware
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended : true}))

//session
app.use(
  session({
    secret: 'process.env.SECRET_KEY',
    resave: false,
    store : session_store,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, //24 hour
    },
  })
);
//passport config
require('./app/config/passport')(passport)
app.use(passport.initialize())
app.use(passport.session())
app.use(flash());

//global middleware
app.use((req,res,next)=>{
  res.locals.session = req.session
  res.locals.user = req.user
  next()
})

//ejs setup
app.use(expressLayouts);
app.set("views", path.join(__dirname, "resources/views"));
app.set("view engine", "ejs");

require("./routes/routes")(app);

const PORT = process.env.PORT || 5555;
const Server = app.listen(PORT, () => {
  console.log(`server at running at port ${PORT}`);
});


// socket io
const io = require('socket.io')(Server)


io.on('connection', function(socket) {

  console.log('Client connected.')
  //receive send message
  socket.on('sendMsg',msg=>{
    socket.broadcast.emit('receiveMsg',msg)
  })

})

