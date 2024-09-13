import { Schema, model } from 'mongoose'

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
)


export default model('employee', employeeSchema)
