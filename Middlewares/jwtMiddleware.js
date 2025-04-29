const jwt = require("jsonwebtoken")
require("dotenv")

const jwtMiddleware = (req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1] 
    console.log(token)
    console.log("inside jwt middle ware")
    
    if(token !=" "){
        // res.status(200).json(token)
        try{
            const jwtResponse = jwt.verify(token,process.env.JWTPASSWORD)
            console.log(jwtResponse)    
            req.userId = jwtResponse.userId
            
            next()

        }catch(err){
            res.status(401).json("token not valid")
        }
       
         
    }else{
        res.status(404).json("no token found")
    }
    
}

module.exports = jwtMiddleware