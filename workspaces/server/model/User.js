
import { Schema as _Schema, model } from 'mongoose';
import _default from '../config/roles_list';
const { Editor, Admin } = _default;

const Schema = _Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: {
            type: Number,
        },
        Admin: {
            type: Number,
        }

    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    }
});

export default model('User', userSchema);