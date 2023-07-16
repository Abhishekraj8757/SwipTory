const jwtToken = require('jsonwebtoken');
const dotenv = require('dotenv').config();


const generateAuthToken = async (username,userId) => {
  try{
    const tokenPayload = {
        username,
        userId
    }

    const token = jwtToken.sign(tokenPayload,process.env.JWT_SECRET_KEY,{
        expiresIn : '24h'
    })
    
    return token;
  }catch(error){
    throw new Error('Error in generating jwt token!')
  }
}

const isAuthenticated = (req,res,next) => {

        try{
            let token = req?.headers?.authorization?.split(" ")[1];
            if(!token)return res.status(400).json({'message' : 'token is missing!'});
    
            let decodedToken = jwtToken.verify(token,process.env.JWT_SECRET_KEY);
            req.user = decodedToken;
    
            next();
          }catch(error){
            return res.status(403).send({
                 status : 403,
                 message : 'Invalid jwt token!'
              })
          }
}

module.exports = {
    generateAuthToken,
    isAuthenticated
}