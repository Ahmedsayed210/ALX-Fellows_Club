import jwt from 'jsonwebtoken';


export const verifyToken = async (req, res, next) => {
    try{
        let token = req.header("Authorization");
        if (!token) {
            return res.status(403).json("You are not authenticated!");
        }
        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
        }
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verified;
        next();

    } catch (error) {
        res.status(500).json({error : err.message});
    }
    
};  // This function is used to verify the token of the user. If the token is valid, the user is authenticated and the next function is called. If the token is not valid, the user is not authenticated and an error message is returned. If the token is not present, the user is not authenticated and an error message is returned.