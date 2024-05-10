// mongodb.ts

import { MongoClient, MongoClientOptions } from 'mongodb';

const uri: string | undefined = 'mongodb+srv://ronneyjadhav1:root@firstcuster.cjsmzkd.mongodb.net/?retryWrites=true&w=majority&appName=firstCuster';
const options: MongoClientOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error('Add Mongo URI to .env.local');
}

  client = new MongoClient(uri, options);
  clientPromise = client.connect();

export default clientPromise;
