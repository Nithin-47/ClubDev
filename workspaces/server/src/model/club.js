import { Schema, model } from 'mongoose'
import { IMAGE_BUCKET_NAME } from "#src/config/general.js"

const clubSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
    },
    longDescription: {
        type: String,
        required: true
    },
    image: {
        type: String,
        // type: Schema.Types.ObjectId, // this for some reason is not working, so serialization of BSON error
        ref: IMAGE_BUCKET_NAME, // Reference to the GridFS collection
        required: true,
    },
    contact: {
        type: String,

    },
})

export default model('club', clubSchema)
