import mongoose, { Schema, Model } from 'mongoose';

let cachedConnection: mongoose.Connection | null = null;

export async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  const uri : string = 'mongodb+srv://ronneyjadhav1:root@firstcuster.cjsmzkd.mongodb.net/?retryWrites=true&w=majority&appName=firstCuster';

  const options = {
    dbName: "url_shortner"
  };

  const connection = await mongoose.connect(uri, options);
  cachedConnection = connection.connection;
  return cachedConnection;
}

export function getDatabaseConnection() {
  if (!cachedConnection) {
    throw new Error('Database connection has not been established.');
  }
  return cachedConnection;
}

// Define the Mongoose schema
const urlSchema = new Schema({
  short_url: String,
  long_url: String,
});

// Define the Mongoose model
export const Url: Model<any> = mongoose.models.Url || mongoose.model('Url', urlSchema);

