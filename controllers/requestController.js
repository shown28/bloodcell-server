// require("mongoose");
const { sendRequestNotification } = require("../mails/emailServices");
const requests = require("../models/requestsModel");


exports.addRequestController = async (req, res) => {
  console.log("inside addrequest");
  const userId = req.userId;
  console.log(userId);
 

  const requestsBody = req.body;
  const newRequest = { ...requestsBody, userId };
  console.log(newRequest);

  try {
    const result = await requests.insertOne(newRequest);
    if(result){
      res.status(201).json(result);
    }
    else{
      res.status(400).json("Request not added");
    }
    // const result = await requests.insertOne(req.body)
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getRequestController = async (req, res) => {
  try{
    const result  = await requests.find()
    if(result){
      res.status(200).json(result)
    }
    else{
      res.status(400).json("No requests found")
    }
  }
  catch(err){
    res.status(500).json(err.message)
  }
}

exports.getMyrequestsController = async(req,res)=>{
  console.log("inside getMyrequests")
  console.log(req.userId)
  try{
    const userId = req.userId
    const result =await requests.find({userId})

  
    if(result){

      res.status(200).json(result)
    }
    else{
      res.status(400).json("No requests found")
    }

  }catch(err){
    res.status(500).json(err.message)
  }
}


exports.deleteRequestController = async(req,res)=>{
  console.log("inside delete request")
  const requestId = req.params.id
  try{
        const result = await requests.findByIdAndDelete(requestId)
        if(result){
          res.status(200).json("Request deleted")
        }
        else{
          res.status(400).json("Request not deleted")
        }
  }catch(err){
    res.status(500).json(err.message)
  }

}

exports.homeRequestController = async (req,res)=>{
 console.log("home request controller")
  try{
        const result = await requests.find().limit(4)
        if(result){
           res.status(200).json(result)
        }
       else{
        res.status(400).json(result)
       }

  }catch(err){
    res.status(500).json(err.message)
  }
}

exports.gmailBloodRequest = async (req,res)=>{
  console.log(req.params.email)
 const {email,phone} = req.body

  try{
      sendRequestNotification(req.params.email,'Blood Request',`You have a new request from ${email}\n
        Please contact to ${phone} immediatly`)
      res.status(200).json("request sent successfully")

  }catch(err){
    res.json(500).sent("internal server error")
  }
}