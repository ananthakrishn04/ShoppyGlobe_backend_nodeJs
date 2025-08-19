import jwt from "jsonwebtoken"
import dotenv from "dotenv"

export default function(req, res, next){
    const authHeaders = req.headers["authorization"]
    const token = authHeaders && authHeaders.split(" ")[1]

    if(!token){
        return res.status(401).json({message: "Authorization Header is Missing"})
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
        if(err){
            return res.status(403).json({message: "Invalid Or Expired Token"})
        }

        req.user = data
        next()
    })
}