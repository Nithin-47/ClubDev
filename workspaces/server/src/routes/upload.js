import { handleUpload } from "#src/controllers/uploadController.js"
import upload from "#src/middleware/utils/upload.js"
import { Router } from 'express'

const uploadRouter = Router()

uploadRouter
    .post('/', upload.single('image'), handleUpload)
