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
//database
require("./require/database");


//session
const session_store = new MongoDbStore({
    mongooseConnection : mongoose.connection,
    collection : 'sessions',
  
  })
app.use(
    session({
        secret : 'ilove',
        resave : false,
        saveUninitialized : true,
        store : session_store,
        cookie : {
            maxAge : 1000 * 60 * 60 * 24 //24 hour
        }   
    })
)
//ejs setup
app.use(expressLayouts);
app.set("views", path.join(__dirname, "resources/views"));
app.set("view engine", "ejs");

require("./routes/routes")(app);

const PORT = process.env.PORT || 5555;
const Server = app.listen(PORT, () => {
  console.log(`server at running at port ${PORT}`);
});

