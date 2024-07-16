//Get export
const userGet = require("../users/catalog/get/get")

function userRoutes(app) {
    //User to routes

    app.use(userGet) //Get to user routes
    
} 
module.exports = userRoutes