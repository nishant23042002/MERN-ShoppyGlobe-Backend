import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(() => console.log('MongoDB connected'))
            .catch(err => console.error('MongoDB connection error:', err));
    }
    catch (err) {
        console.log("Something went wrong")
        process.exit(1)
    }
}