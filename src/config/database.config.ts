import { connect, Error } from "mongoose";

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined");
    }
    await connect(mongoUri);
  } catch (error: Error | any) {
    console.log("❌ Mongodb connection failed : ", error.message);
    process.exit(1);
  }
};

export default connectDB;
