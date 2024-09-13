
import { findOne } from '../model/User';

const handleLogout = async (req,res) => {

    // On client, also delete the access token

    const cookies = req.cookies;

    if(!cookies?.jwt) {
        return res.sendStatus(204);
    }

    const refreshToken = cookies.jwt;

    const user = await findOne({refreshToken:refreshToken}).exec();

    if(!user) {
        res.clearCookie('jwt',{httpOnly: true});
        return res.sendStatus(204); 
    }

  // delete refresh token in db

    user.refreshToken = ''; 
    const result = await user.save();

    res.clearCookie('jwt',{httpOnly: true,sameSite:'None'}); // secure: true 

    res.sendStatus(204);
}


export default {handleLogout};