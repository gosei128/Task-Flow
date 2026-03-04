import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);
const clientPromise: Promise<MongoClient> = client.connect();

export default clientPromise;
