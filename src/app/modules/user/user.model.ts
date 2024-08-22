import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

export const userSchema = new Schema<TUser>({
    id: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    needsPasswordChange: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ['admin', 'student', 'faculty']
    },
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, 
{
    timestamps: true,
});

export const User = model<TUser>('User', userSchema);