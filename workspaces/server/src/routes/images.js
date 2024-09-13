import { fetchAndRenderImage } from "#src/controllers/imagesController.js"
import { Router } from "express"

const imagesRouter = Router()

imagesRouter.route('/:id')
    .get(fetchAndRenderImage)

export default imagesRouter