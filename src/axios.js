import Axios from 'axios';
const axiosBaseURL = Axios.create({
       baseURL:'https://dev2.tika.mobi:8443/next-service'
        //baseURL:'http://localhost:9094'
});
export default axiosBaseURL