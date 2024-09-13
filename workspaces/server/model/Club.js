
import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;

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
        type: Schema.Types.ObjectId,
        ref: 'photos', // Reference to the GridFS collection
        required: true,
    },
    contact: {
        type: String,
        
    },

    }
)


export default model('Club', clubSchema);