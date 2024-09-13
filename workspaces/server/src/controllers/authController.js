import User from "#src/model/user.js"
import jwt from 'jsonwebtoken'
import { compare, hash } from 'bcrypt'

const handleLogin = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ 'msg': 'Please include a username and password' })
    }

    const user = await User.findOne({ username: username }).exec()

    if (!user) {
        return res.sendStatus(401)
    }

    // Evaluate the password
    const match = await compare(password, user.password)

    if (match) {
        const roles = Object.values(user.roles).filter(Boolean)

        //create JWT here
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": user.username,
                    "roles": roles

                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        )

        const refreshToken = jwt.sign(
            { username: user.username, },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )

        //store the refresh token in the db
        user.refreshToken = refreshToken
        const result = await user.save()

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })

        res.json({ roles, accessToken })
    }
    else {
        res.sendStatus(401)
    }
}

const handleRegister = async (req, res) => {
    const { user, pswd } = req.body

    console.log(user, pswd)

    if (!user || !pswd) {
        return res.status(400).json({ 'msg': 'Please include a username and password' })
    }

    // Check for duplicate UserName in the db
    const duplicate = await User.findOne({ username: user }).exec()

    if (duplicate) {
        return res.sendStatus(409)
    }

    try {
        //encrypt the password
        const hashPswd = await hash(pswd, 10)
        //create and store the new user in the db
        const result = await User.create({
            "username": user,
            "password": hashPswd
        })

        console.log(result)
        res.status(201).json({ 'Success': `New User ${user} created` })
    } catch (err) {
        res.status(500).json({ 'msg': err.message })
    }
}

const handleLogout = async (req, res) => {

    // On client, also delete the access token

    const cookies = req.cookies

    if (!cookies?.jwt) {
        return res.sendStatus(204)
    }

    const refreshToken = cookies.jwt

    const user = await User.findOne({ refreshToken: refreshToken }).exec()

    if (!user) {
        res.clearCookie('jwt', { httpOnly: true })
        return res.sendStatus(204)
    }

    // delete refresh token in db

    user.refreshToken = ''
    const result = await user.save()

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' }) // secure: true 

    res.sendStatus(204)
}

export {
    handleLogin,
    handleRegister,
    handleLogout
}