const  users = require("../models/userModels")
const jwtMiddleware = require("../Middlewares/jwtMiddleware")

exports.authoriseUser = async (req,res)=>{
    const uId = req.params.id
    try{
        const result = await users.findByIdAndUpdate({_id:uId},{authorizedDonor:true},{new:true})
        if(result){
            res.status(200).json(result)
        }else{
            res.status(401).json(result)
        }
    }catch(err){
        res.status(500).json(err.message)
    }
}
exports.homeAuthorisedUser = async (req,res)=>{
    console.log("inside homeAuthoriseUserController")
    try{
        const result = await users.find({authorizedDonor:true}).limit(4)
        res.status(200).json(result)
    }catch(err){
        res.status(500).json(err.message)
    }
}