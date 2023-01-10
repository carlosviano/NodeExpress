import mongoose from 'mongoose'

const mongodbConnection = async () => {
    await mongoose.set('strictQuery',false)
    await mongoose.connect(process.env.DB_HOST)
}

export default mongodbConnection;

