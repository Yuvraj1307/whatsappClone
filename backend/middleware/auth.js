var jwt = require('jsonwebtoken');


const auth=(req,res,next)=>{

let token=req.headers.authorization?.split(" ")[1]

// console.log(token)
if(!token){
     return res.status(404).send({msg:"please login first"})
}
jwt.verify(token, process.env.SECREP_KEY, function(err, decoded) {
    if(err){
         res.status(404).send({msg:"please login again"})
    }else{
        req.body.userID=decoded.userID
        req.body.email=decoded.email
        next()
    }
    // console.log(decoded) // bar
  });



}


module.exports={auth}