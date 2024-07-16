//Defaults imports
const asyncHandler = require("express-async-handler");


//Controllers

exports.all_users = asyncHandler(async(req, res ,next) => {
    res.json("OK")
})