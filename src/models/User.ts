import { Schema, model, models } from "mongoose"

export interface UserModel {
    _id?: string
    username: string;
    email: string;
    password: string;
}


const userSchema = new Schema<UserModel>({
    email: {
        type: String,
        unique: true,
        require: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false,
        minLenght: 6,
    },
    username: {
        type: String,
        require: [true, 'Fullname is required'],
        minLenght: 3,
        maxLenght: 40,
    }
})

const user = models.User || model('User', userSchema)

export default user