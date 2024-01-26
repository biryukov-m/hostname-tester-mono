import mongoose, { ConnectOptions } from 'mongoose';

async function connectDb() {
  try {
    const uri = process.env.MONGO_URI;
    const dbName = process.env.MONGO_DB_NAME;
    if (!uri) {
      throw new Error("Can't find mongo uri in process.env.MONGO_URI");
    }
    if (!dbName) {
      throw new Error("Can't find mongo db name in process.env.MONGO_DB_NAME");
    }
    const clientOptions: ConnectOptions = {
      serverApi: { version: '1', strict: true, deprecationErrors: true },
      dbName
    };
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    // eslint-disable-next-line no-console
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.dir(error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

export default connectDb;
