import { getImagesBucketStream } from "#src/services/mongo_db.js"
import mongoose from "mongoose"

export async function fetchAndRenderImage(req, res) {
    try {
        const gfs = getImagesBucketStream()

        const imageFindCursors = gfs.find({
            _id: new mongoose.Types.ObjectId(req.params.id),
        })
        
        const images = await imageFindCursors.toArray()

        if (!images || images.length === 0) {
            return res.status(204).json({ 'msg': 'No images found' })
        }

        const image = images[0]

        const readStream = gfs.openDownloadStream(image._id)

        readStream.pipe(res)
    } catch (err) {
        res.status(500).json({ 'msg': err.message })
        console.error(err)
    }
}