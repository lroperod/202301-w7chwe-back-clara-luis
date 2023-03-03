import app from './app.js';
import dotenv from 'dotenv';
import log from './logger.js';
import connectDB from './database/connection.js';
import mongoose from 'mongoose';

dotenv.config();

const port = process.env.PORT ?? 3000;
const mongoUrl = process.env.MONGO_URL ?? '';
mongoose.set('strictQuery', false);

app.listen(port, async () => {
  await connectDB(mongoUrl);
  log.info(`Server started in port ${port}`);
});
