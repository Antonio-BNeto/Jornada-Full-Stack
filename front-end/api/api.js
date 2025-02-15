import axios from 'axios';

const URL = "http://localhost:3000";

const responsiveArtists = await axios.get(`${URL}/artists`); 

const responsiveSongs = await axios.get(`${URL}/songs`); 

export const artistArray = responsiveArtists.data;

export const songsArray = responsiveSongs.data;
