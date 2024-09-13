import { findOne } from '../model/User';
import { verify, sign } from 'jsonwebtoken';

const handleRefreshToken = async (req,res) => {
    const cookies = req.cookies;

    if(!cookies?.jwt) {
        return res.sendStatus(401);
    }

    
    
    const refreshToken = cookies.jwt;

    const user = await findOne({refreshToken:refreshToken}).exec();

    if(!user) {
        return res.sendStatus(403); // Forbidden
    }

    //Evaluate the jwt

    verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded) => {

            if(err || user.username !== decoded.username) {
                return res.sendStatus(403);
            }

            const roles = Object.values(user.roles);


            const accessToken = sign(
                {"UserInfo" : {
                    "username": decoded.username,
                    "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30s'}
            );

            res.json({accessToken});
        }
    );

    
}


export default {handleRefreshToken};