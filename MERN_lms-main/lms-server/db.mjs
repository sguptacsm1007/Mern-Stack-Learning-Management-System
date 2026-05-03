import { MongoClient } from "mongodb";
import "./loadEnvironment.mjs";

const connectionString = process.env.ATLAS_URI || '';

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}
//connect to lms db
let db = conn.db("lms");

export default db;