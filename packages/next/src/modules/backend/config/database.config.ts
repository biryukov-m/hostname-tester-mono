import mongoose from 'mongoose';

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var mongoose: any; // This must be a `var` and not a `let / const`
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const dbName = process.env.MONGO_DB_NAME;

if (!dbName) {
  throw new Error("Can't find MongoDB database name in process.env.MONGO_DB_NAME");
}

let cached = global.mongoose;

if (!cached) {
  // eslint-disable-next-line no-multi-assign
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((_mongoose) => _mongoose);
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
