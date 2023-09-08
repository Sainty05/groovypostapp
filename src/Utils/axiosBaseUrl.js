import Axios from "axios";
const axiosBaseUrl = Axios.create({
  baseURL: "http://74.249.153.209:8081/api",
});

export default axiosBaseUrl;
