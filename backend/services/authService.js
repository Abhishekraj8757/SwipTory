const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const {generateAuthToken} = require('../middlewares/authentication');


const register = async (username,password) => {
    try{
    //   const response = await 
    //check if a user is already present
     const checkIfUserPresent = await userModel.findOne({username : username},{username : 1});
     if(checkIfUserPresent){
        return {
            status : 409,
            message : 'User already present!'
        }
     }

     let encryptedPassword = await bcrypt.hash(password,10);
     let newUser = new userModel({
        username,
        password : encryptedPassword
     })

     await newUser.save();

     return {
        status : 201,
        message : 'User created successfully!'
     }
    }catch(error){
       throw new Error('Error in creating a new User!');
    }
}

const login = async (username,password) => {
    try{
     
      const checkIfUserPresent = await userModel.findOne({username : username},{username : 1,password : 1});
      if(!checkIfUserPresent)return {
        status : 400,
        message : "User is not registered!"
      }
    
      const matchPassword = await bcrypt.compare(password,checkIfUserPresent.password);
      if(!matchPassword){
        return {
            status : 400,
            message : "Password is not correct!"
        }
      }

      const jwtToken = await generateAuthToken(checkIfUserPresent.username,checkIfUserPresent._id);
      return {
        status : 200,
        jwtToken,
        message : "User logged In!"
      }

    }catch(error){
       throw new Error('Error in logging a user!');
    }
}

const logout = async () => {
    try{

    }catch(error){
     
    }
}

module.exports = {
    register,
    login,
    logout
}