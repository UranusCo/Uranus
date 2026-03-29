import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URL;
    
    if (!mongoUri) {
      console.error(
        "ERROR: MONGODB_URL environment variable is not set!\n" +
        "Please ensure the MONGODB_URL is set in your environment variables or .env file.\n" +
        "Local: Add MONGODB_URL to the .env file in the project root.\n" +
        "Production: Set MONGODB_URL in your deployment platform (e.g., Koyeb environment variables)."
      );
      process.exit(1);
    }

    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error:", error);
    process.exit(1);
  }
};
