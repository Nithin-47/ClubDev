import { findOne, create } from '../model/User';
import { hash } from 'bcrypt';

const handleNewUser = async (req,res) => {
    const {user, pswd} = req.body;  

    if(!user || !pswd) {
        return res.status(400).json({'msg': 'Please include a username and password'});
    }

    // Check for duplicate UserName in the db
    const duplicate = await findOne({username: user}).exec();

    if(duplicate) {
        return res.sendStatus(409);
    }

    try
    {
        //encrypt the password
        const hashPswd = await hash(pswd, 10);
        //create and store the new user in the db
        const result = await create({
            "username": user,
            "password": hashPswd
        });
        

        console.log(result);
        res.status(201).json({'Success': `New User ${user} created`});
    }
    catch(err) {
        res.status(500).json({'msg': err.message});
    }
}


export default {handleNewUser};
