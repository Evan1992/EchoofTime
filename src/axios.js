import axios from 'axios'

const instance = axios.create({
    baseURL: "https://sound-of-time-default-rtdb.firebaseio.com/"
})

export default instance