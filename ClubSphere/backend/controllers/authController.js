import { findOne } from '../model/User';

import { sign } from 'jsonwebtoken';

import { compare } from 'bcrypt';

const handleLogin = async (req,res) => {
    const {username, password} = req.body;

    if(!username || !password) {
        return res.status(400).json({'msg': 'Please include a username and password'});
    }

    const user = await findOne({username: username}).exec();

    if(!user) {
        return res.sendStatus(401);
    }

    //Evaluate the password

    const match = await compare(password, user.password);

    if(match) {
        const roles = Object.values(user.roles).filter(Boolean);

        //create JWT here
        const accessToken = sign(
            {
            "UserInfo" : {
                "username": user.username,
                "roles": roles

                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '30s'}
        );

        const refreshToken = sign(
            {username: user.username,},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );

        //store the refresh token in the db
        user.refreshToken = refreshToken;
        const result = await user.save();

        res.cookie('jwt',refreshToken, {httpOnly: true,sameSite:'None', maxAge: 24*60*60*1000});

        res.json({roles, accessToken});
    }
    else {
        res.sendStatus(401);
    }
}


export default {handleLogin};