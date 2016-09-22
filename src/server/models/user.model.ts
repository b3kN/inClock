// # Auto Model

// Note: MongoDB will autogenerate an `_id` for each `User` object created

// Grab the Mongoose module
import mongoose = require('mongoose');

let Schema = mongoose.Schema;

interface IUser {
    username: string;
    password: string;
}

export class User implements IUser {
    username: string;
    password: string;

    constructor(data: IUser) {
        this.username = data.username;
        this.password = data.password;
    }
}

let userSchema = new Schema({
    username: { required: true, type: String },
    password: { required: true, type: String }
});

export interface UserDocument extends User, mongoose.Document { }

export let Users = mongoose.model<UserDocument>('User', userSchema);