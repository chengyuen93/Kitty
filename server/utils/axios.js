import axios from 'axios';

const Axios = axios.create({
  // timeout: 3000,
  headers: {
    ['x-api-key']: process.env.CAT_API_KEY
  },
  baseURL: `${process.env.CAT_ENDPOINT}`,
  withCredentials: true
});


export default Axios;
