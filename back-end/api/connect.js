import { MongoClient } from "mongodb";

process.loadEnvFile();

const URI = process.env.MONGO_URI;

if (!URI) {
    throw new Error("Variável de ambiente MONGO_URI não definida. Crie um arquivo .env em back-end/ (veja .env.example).");
}

const client = new MongoClient(URI);

export const database = client.db('Spotify');

//const songCollection = await database.collection('songs').find({}).toArray();

//console.log(songCollection);