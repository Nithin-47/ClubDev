
import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    }
);


export default model('Employee', employeeSchema);