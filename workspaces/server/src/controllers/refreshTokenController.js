import User from "#src/model/user.js"
import jwt from 'jsonwebtoken'

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) {
        return res.sendStatus(401)
    }

    const refreshToken = cookies.jwt

    const user = await User.findOne({ refreshToken: refreshToken }).exec()

    if (!user) {
        return res.sendStatus(403) // Forbidden
    }

    //Evaluate the jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {

            if (err || user.username !== decoded.username) {
                return res.sendStatus(403)
            }

            const roles = Object.values(user.roles)


            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            )

            res.json({ accessToken })
        }
    )
}

export { handleRefreshToken }