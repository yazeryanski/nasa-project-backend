import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
if (!MONGO_URL) throw new Error('ENV Variable error, missing MONGO_URL');


export const setDbConnection = () => {
  mongoose.set('strictQuery', false);

  mongoose.connect(process.env.MONGO_URL!);
}

