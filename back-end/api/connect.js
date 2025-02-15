import { MongoClient } from "mongodb";

const URI = "mongodb+srv://antoniobarros:DVUuLk0kbcZvOVi6@antonio.daxwg.mongodb.net/?retryWrites=true&w=majority&appName=Antonio";

const client = new MongoClient(URI);

export const database = client.db('Spotify');

//const songCollection = await database.collection('songs').find({}).toArray();

//console.log(songCollection);