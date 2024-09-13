import corsOptions from "#src/config/corsOptions.js"
import credentials from "#src/middleware/credentials.js"
import { logger } from "#src/middleware/logEvents.js"
import authRouter from "#src/routes/auth.js"
import clubsRouter from "#src/routes/clubs.js"
import imagesRouter from "#src/routes/images.js"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"

const app = express()

app.use(logger)
app.use(credentials)
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())

// set up routes
app.use("/auth", authRouter)

app.use(bodyParser.urlencoded({ extended: false }))
app.use("/clubs", clubsRouter)
app.use("/images", imagesRouter)

export default app