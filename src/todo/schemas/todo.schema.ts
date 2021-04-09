import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
    title: { type: String, index: true },
    description: { type: String, default: null },
    status: { type: String, default: "TODO", index: true },
    timestamp: { type: Number, default: Date.now },
});