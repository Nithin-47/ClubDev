import app from "#src/app.js"
import mongoose from "mongoose"
import dotenv from "dotenv"

async function main() {
    dotenv.config()

    const PORT = process.env.PORT
    if (!PORT) {
        console.error("PORT is not set in the environment variables")
        return process.exit(1)
    }

    const DATABASE_URI = process.env.DATABASE_URI
    if (!DATABASE_URI) {
        console.error("DATABASE_URI is not set in the environment variables")
        return process.exit(1)
    }

    try {
        // await is required here to ensure that the connection is established before the server starts
        await mongoose.connect(process.env.DATABASE_URI)
    } catch (error) {
        console.error(`Error occurred: ${error.message}`)
        return process.exit(1)
    }

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}

main()
