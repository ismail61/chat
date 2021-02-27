const homeController = require("../app/controllers/homeController");
const authController = require("../app/controllers/authController");

const parser = require("body-parser");
const bodyParserUrl = parser.urlencoded({ extended: true });
const bodyParser = parser.json();

function routes(app) {
  app.get("/", homeController().home);
  app.get("/login", authController().login); 
  app.get("/register", authController().register); 
}

module.exports = routes;
