const express = require("express")
const route = express.Router()
const {addUserController, loginUserController, editUserController,autorizedUserController, allUserController,authoriseUserController} = require("../controllers/userControllers.js")
const jwtMiddleware = require("../Middlewares/jwtMiddleware.js")
const { addRequestController,getRequestController,getMyrequestsController, deleteRequestController, homeRequestController, gmailBloodRequest } = require("../controllers/requestController.js")
const multerMiddleware = require("../Middlewares/multerMiddleware.js")
const { homeAuthorisedUser } = require("../controllers/authorization.js")


route.post("/user-register",addUserController)
route.post("/user-login",loginUserController)
route.post("/add-request",jwtMiddleware,addRequestController)
route.get("/get-allRequest",getRequestController)
route.post("/get-myRequests",jwtMiddleware,getMyrequestsController)
route.delete("/delete-myRequest/:id",jwtMiddleware,deleteRequestController)
route.put("/edit-user",jwtMiddleware,multerMiddleware.single("photo"),editUserController)
route.get("/authorized-user",autorizedUserController)
route.get("/all-user",jwtMiddleware,allUserController)
route.put("/authorise/:id",jwtMiddleware,authoriseUserController)
route.get("/home-authorised-users",homeAuthorisedUser)
route.get("/home-requests",homeRequestController)
route.post("/email-request/:email",jwtMiddleware,gmailBloodRequest)

module.exports = route