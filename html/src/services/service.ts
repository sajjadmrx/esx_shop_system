import { ApiService } from './api.service';
import axios from 'axios';
const apiAxios = axios.create({
    baseURL: 'https://shop_system'
})
export const apiService = new ApiService(apiAxios)