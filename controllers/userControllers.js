require("mongoose");
const bcrypt = require("bcryptjs")
const users = require("../models/userModels");
const {sendEmailNotification} = require("../mails/emailServices")

const jwt = require("jsonwebtoken")

exports.addUserController = async (req, res) => {
  console.log("inside adduser controllers");
  console.log(req.body);
  const {userName,email,password} = req.body;
  console.log(email);
  
  try {
    const existingUser = await users.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json("user aleady exist");
    }
    const saltRound = 10
    const hashedPassword = await bcrypt.hash(password,saltRound)
    
    console.log(hashedPassword)

    const newUser = new users({
      userName,
      email,
      password:hashedPassword,
      age: 0,
      don:null,
      phone: 0,
      place: "",
      bloodGroup: "",
      numberOfDonations: 0,
      lastDonation: null,
      authorizedDonor: false,
    })
    console.log(newUser)

    const result = await newUser.save();
    if (result) {
    res.status(200).json("success");
    await sendEmailNotification(`${email}`,`Welcome ${userName}`,'Registration successfull to Blood Cell')
    } else {
      if (!result) {
        res.status(401).json("err happened");
      }
    }
  } catch (err) {
    res.status(500).json(err.message);
    console.log(err.message)
  }
};

exports.loginUserController = async (req, res) => {
  console.log("inside login controller");
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const existingUser = await users.findOne({ email });
    if(!existingUser){
      return res.status(404).json("user not found")
    }
    const isMatch = await bcrypt.compare(password, existingUser.password)
    console.log(isMatch)
    if (isMatch) {
      const token = jwt.sign({userId:existingUser._id},process.env.JWTPASSWORD)
      res.status(200).json({user:existingUser,token});
    } else {
      res.status(404).json("no user found");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.editUserController= async(req,res)=>{
  console.log("inside edit user controller")
  const userId = req.userId
 
  const {userName,email,age,dob,phone,place,bloodGroup,photo,numberOfDonations,lastDonation,authorizedDonor} = req.body
  const uploadedPhoto = req.file ? req.file.filename : photo
  console.log(userId)
 
  try{
    const updateUser = await users.findByIdAndUpdate({_id:userId},
      {
        userName,email,age,dob,phone,place,bloodGroup,photo:uploadedPhoto,numberOfDonations,lastDonation,authorizedDonor
      },{new:true}
    )
    await updateUser.save()
    res.status(200).json(updateUser)


  }catch(err){
    res.status(500).json(err.message)
  }

}

exports.autorizedUserController =async (req,res)=>{

  try{
      const result = await users.find({authorizedDonor:true})
      res.status(200).json(result)
  }catch(err){
    res.status(500).json(err.message)
    console.log(err.message)
  }
}

exports.allUserController =async (req,res)=>{
  try{
    console.log("inside allUserController")
      const result = await users.find()
      if(result){
        res.status(200).json(result)
      }
      else{
        res.status(400).json(result)
      }
      
  }
  catch(err){
    res.status(500).json(err.message)
  }
}

exports.authoriseUserController = async (req,res)=>{
    const uId = req.params.id
    console.log("inside authorise controller")
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