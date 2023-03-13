import { AxiosInstance } from "axios";
import { ProductInCart } from '../interfaces/product.interface';

export class ApiService {
    constructor(private axios: AxiosInstance) { }

    async closeUi() {
        return this.axios.post('/close')
    }

    async buy(data: ProductInCart[]) {
        try {
            const response = await this.axios.post('/buy', data)
            return response.data
        } catch (error) {
            throw error
        }
    }
}