import {
    createNewClub,
    getClubs,
    getSpecificClub
} from "#src/controllers/clubsController.js"
import upload from "#src/middleware/utils/upload.js"
import { Router } from 'express'

const clubsRouter = Router()

clubsRouter.route('/')
    .get(getClubs)
    .post(upload.single('image'), createNewClub)

clubsRouter.route('/:name')
    .get(getSpecificClub)

export default clubsRouter
