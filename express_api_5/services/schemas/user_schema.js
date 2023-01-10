import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    _id: String,
    name: {type: String},
    email: {type: String,unique: true},
    password: {type: String},
    role: String
});

const userModel = mongoose.model('User', userSchema);

export default userModel;