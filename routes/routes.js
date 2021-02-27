const homeController = require("../app/controllers/homeController");
const authController = require("../app/controllers/authController");
const checkUser = require('../app/controllers/authController')

const parser = require("body-parser");
const bodyParserUrl = parser.urlencoded({ extended: true });
const bodyParser = parser.json();

function routes(app) {
  app.get("/",checkUser().auth, homeController().home);
  app.get("/login", authController().login); 
  app.post("/login", authController().loginUser); 
  app.get("/register", authController().register); 
  app.post("/register", authController().userRegister); 
}

module.exports = routes;
