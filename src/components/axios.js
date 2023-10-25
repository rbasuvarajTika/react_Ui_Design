import Axios from 'axios';
const axiosBaseURL = Axios.create({
    baseURL:'https://dev.tika.mobi:8443/next-service'
});
export default axiosBaseURL