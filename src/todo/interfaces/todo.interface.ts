import { Document } from 'mongoose';

export class Todo extends Document {
    readonly title: String;
    readonly description: String;
}