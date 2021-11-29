
import axios from 'axios';
import store from '@/store';

const urlBaseApi="https://ikcount.com/iklab";
var api = function () {
    return axios.create({
                baseURL: urlBaseApi,
            });
}

export default api;