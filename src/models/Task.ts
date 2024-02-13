import { Schema, model, models } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface TaskModel {
    _id?: string
    title: string;
    description: string;
    priority: string;
}

// 2. Create a Schema corresponding to the document interface.
const taskSchema = new Schema<TaskModel>({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    priority: {
        type: String,
        required: true,
        trim: true
    },
}, {
    timestamps: true
});

// 3. Create a Model.
export default models.Task || model<TaskModel>('Task', taskSchema);