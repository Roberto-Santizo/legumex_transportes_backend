import axios from 'axios';

const mapBoxApiClient = axios.create({
    baseURL: process.env.MAPBOX_URL,
});


export default mapBoxApiClient;

