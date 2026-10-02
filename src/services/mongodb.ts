import { MongoClient, ObjectId } from "mongodb";

type Upload = {
  _id: ObjectId;
  name: string | null;
  path: string | null;
  size: number;
  isProcessed: boolean;
  createdAt: Date;
  updatedAt: Date;
};

let client: MongoClient | null = null;

export async function getMongoDatabase(
  mongodbUri: string,
  mongodbDbName: string
) {
  if (!client) {
    client = new MongoClient(mongodbUri);
    await client.connect();
  }

  return client.db(mongodbDbName);
}

async function getDatabase(
  mongodbUri: string,
  mongodbDbName: string
) {
  if (!client) {
    client = new MongoClient(mongodbUri);
    await client.connect();
  }

  return client.db(mongodbDbName);
}

export async function getUnprocessedUploads(
  mongodbUri: string,
  mongodbDbName: string
): Promise<Upload[]> {
  const db = await getDatabase(mongodbUri, mongodbDbName);

  const uploads = db.collection<Upload>("uploads");

  return uploads
    .find({
      isProcessed: false,
    })
    .toArray();
}

export async function markAsProcessed(
  mongodbUri: string,
  mongodbDbName: string,
  id: string
): Promise<boolean> {
  const db = await getDatabase(mongodbUri, mongodbDbName);

  const uploads = db.collection<Upload>("uploads");

  const result = await uploads.updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: {
        isProcessed: true,
        updatedAt: new Date(),
      },
    }
  );

  return result.modifiedCount === 1;
}