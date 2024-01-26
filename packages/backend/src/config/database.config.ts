import mongoose, { ConnectOptions } from 'mongoose';

async function connectDb() {
  try {
    const uri = process.env.MONGO_URI;
    const dbName = process.env.MONGO_DB_NAME;

    if (!uri) {
      throw new Error("Can't find MongoDB URI in process.env.MONGO_URI");
    }

    if (!dbName) {
      throw new Error("Can't find MongoDB database name in process.env.MONGO_DB_NAME");
    }

    const clientOptions: ConnectOptions = {
      serverApi: { version: '1', strict: true, deprecationErrors: true },
      dbName
    };

    await mongoose.connect(uri, clientOptions);

    const isConnected = mongoose.connection.readyState === 1;

    if (!isConnected) {
      throw new Error('Failed to connect to MongoDB');
    }

    await mongoose.connection.db.admin().command({ ping: 1 });

    // eslint-disable-next-line no-console
    console.log('Pinged your deployment. Successfully connected to MongoDB!');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

export default connectDb;
