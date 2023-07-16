const authService = require('../services/authService');

const register = async (req,res,next) => {
   try{
     let response = await authService.register(req.body.username,req.body.password);
      
     return res.status(response.status).json({
        status : response.status,
        success : true,
        message : response.message
     })
   }catch(error){
      return res.status(400).json({
        status : 400,
        success : false,
        error : error.message
      })
   }
}

const login = async (req,res,next) => {
    try{
      let response = await authService.login(req.body.username,req.body.password);
      
      return res.status(response.status).json({
        status : response.status,
        success : true,
        jwtToken : response.jwtToken,
        message : response.message
     })

    }catch(error){
        return res.status(400).json({
            status : 400,
            success : false,
            error : error.message
          })
    }
}

const logout = async (req,res,next) => {
    try{

    }catch(error){
     
    }
}

module.exports = {
    register,
    login,
    logout
}