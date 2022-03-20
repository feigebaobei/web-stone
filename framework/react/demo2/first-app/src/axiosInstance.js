import axios from 'axios'
import {ACCESS_KEY} from './config'
let instance = axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        'Accept-Version': 'v1',
        'Authorization': `Client-ID ${ACCESS_KEY}`,
    }
})
// let fn = () => {
//     instance.
// }

// fn({k: v}).then
export default instance