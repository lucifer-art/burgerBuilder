import axios from 'axios';

const instance = axios.create({
    baseURL:'https://react-my-burger-app-ecc4b-default-rtdb.firebaseio.com'
})


export default instance;