const  jwt = require('jsonwebtoken')

async function authToken (req, res, next) {
    try {
        const token = req.cookies?.token ||req.headers?.cookie.split("token=")[1];
        
        
       

        console.log(token);
        if(!token){
            return res.json({
                message: " User Not login",
                error:true,
                success:false
            })
          }

        jwt.verify(token,process.env.TOKEN_SECRET_KEY, function(err, decoded) {
          
          console.log(err);
          console.log(decoded);

          if(err){
            console.log("Error auth",err);
          } 

          req.userId= decoded?._id

          next()

          
             
          });
          
         

    } catch (err) {
        res.status(400).json({
            message:err.message ||err,
            error:true,
            data:[],
            success: false,
        
        })
    }

}

module.exports = authToken