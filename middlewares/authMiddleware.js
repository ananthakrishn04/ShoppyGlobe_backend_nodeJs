import jwt from "jsonwebtoken"

//Auth Token Verification Middleware
export default function(req, res, next){
    // check if authorization headers have been added to the request
    const authHeaders = req.headers["authorization"]
    //if yes, take the JWT token from the header
    const token = authHeaders && authHeaders.split(" ")[1]

    //if no token, return error
    if(!token){
        return res.status(401).json({message: "Authorization Header is Missing"})
    }

    //verify JWT token signature
    jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
        //if verification fails, return error
        if(err){
            return res.status(403).json({message: "Invalid Or Expired Token"})
        }

        //append to payload to request Object
        req.user = data
        //go to next middleware
        next()
    })
}