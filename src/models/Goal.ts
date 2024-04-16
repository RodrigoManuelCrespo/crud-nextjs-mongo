import { Schema, Types, model, models } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface GoalModel {
    _id?: string
    title: string;
    description: string;
    completed: boolean;
    createdBy?: Types.ObjectId;
}

// 2. Create a Schema corresponding to the document interface.
const goalSchema = new Schema<GoalModel>({
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
    completed: {
        type: Boolean,
        required: false,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true
});

// 3. Create a Model.
export default models.Goal || model<GoalModel>('Goal', goalSchema);