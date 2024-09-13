import { Router } from "express"
import { handleLogin, handleRegister, handleLogout } from "#src/controllers/authController.js"
import { handleRefreshToken } from "#src/controllers/refreshTokenController.js"

const authRouter = Router()

authRouter
    .post("/register", handleRegister)
    .post("/login", handleLogin)

authRouter
    .get("/logout", handleLogout)
    .get("/refresh", handleRefreshToken)

export default authRouter