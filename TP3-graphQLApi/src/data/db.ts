import { readdirSync } from "fs";
import * as mongoDB from "mongodb";
import { CollectionInfo } from "mongodb";
import path from "path";

export let db: mongoDB.Db;

export async function connectToDatabase() {
    const collectionNames = readdirSync(path.resolve(__dirname, '../schemas/'))
        .filter(r => r.search(/^index/g) == -1)
        .map(x => `${x ? x.slice(0, -9) : null}s`);

    const client = new mongoDB.MongoClient(process.env.DB_URL);

    // Connect to the cluster
    await client.connect();

    db = client.db();
    const currentCollections = await db.listCollections<Pick<CollectionInfo, "name">>({}, { nameOnly: true })
        .toArray();

    collectionNames.forEach(x => {
        if (!currentCollections.map(x => x.name).includes(x))
            db.createCollection(x);
    });

    console.log(
        `Successfully connected to database`,
    );
}