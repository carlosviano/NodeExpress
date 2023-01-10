import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    _id: String,
    name: {type: String, required:true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: String
});

const userModel = mongoose.model('User', userSchema);

export default userModel;