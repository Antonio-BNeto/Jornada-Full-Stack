import express from 'express';
import cors from 'cors';
import { database } from './connect.js';

const app = express();
const PORT = 3000;

app.use(cors());
//app.use(express.json());

app.get('/', (request, response) => {
    response.send("Só vamos trabalhar com os endpoints  ");
})

app.get('/artists', async (request, response) => {
    response.send(await database.collection('artists').find({}).toArray());
})

app.get('/songs', async (request, response) => {
    response.send(await database.collection('songs').find({}).toArray());
})


app.listen(PORT, () => {
    console.log(`Servidor está escutando na porta ${PORT}`);
})