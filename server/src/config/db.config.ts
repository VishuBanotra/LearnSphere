import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const connectdb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );
    console.log(
      `MONGODB is connected! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error(`MONGO connection FAILED: ${error}`);
    process.exit(1);
  }
};

export default connectdb;
