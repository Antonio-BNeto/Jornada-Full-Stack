import { artistArray } from "../../front-end/src/assets/database/artists.js";
import { songsArray } from "../../front-end/src/assets/database/songs.js";
import { database } from "./connect.js";

const newArtistArray = artistArray.map((currentArtistObj)=> {
    const newArtistObj = {...currentArtistObj};
    delete newArtistObj.id;

    return newArtistObj;
})

const newSongArray = songsArray.map((currentSongObj)=> {
    const newSongObj = {...currentSongObj};
    delete newSongObj.id;

    return newSongObj;
})

const responseSongs = await database.collection('songs').insertMany(newSongArray);

const responseArtist = await database.collection('artists').insertMany(newArtistArray);


console.log(responseArtist);
console.log(responseSongs);