import axios from 'axios'

const instance = axios.create({
    timeout: 5000,
    baseURL: "https://sound-of-time-default-rtdb.firebaseio.com"
})

export default instance