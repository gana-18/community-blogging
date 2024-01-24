const  jwt = require('jsonwebtoken');

const verifyToken = async(req,res,next)=>{
    try{
        let token=req.headers.authorization;
        if(!token){
            return res.status(401).json({error:'Unauthorized'});
        }

        if(token.startsWith('Bearer ')){
            token=token.slice(7,token.length).trimLeft();
        }

        const verified=jwt.verify(token,process.env.SECRET_KEY);
        req.user=verified;
        next();
    } catch(error){
        console.error(error);
        res.status(500).json({error:'Unauthorized'});
    }
}

module.exports=verifyToken;

