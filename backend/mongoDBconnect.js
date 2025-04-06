import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const mongo_url = process.env.MONGO_DB_URL;
        if (!mongo_url) {
            throw new Error("MongoDB connection string is missing in environment variables.");
        }

        await mongoose.connect(mongo_url, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });

        console.log("✅ MongoDB connected successfully");
    } catch (err) {
        console.error("❌ Error connecting to MongoDB:", err.message);
    }
};

export default connectDB;

//crceseca10464