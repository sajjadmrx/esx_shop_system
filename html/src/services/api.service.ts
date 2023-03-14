import { AxiosInstance } from "axios";
import { ProductInCart, Product } from '../interfaces/product.interface';
interface Response<AT> {
    success: boolean
    message: string
    attach: AT
}
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

    async addItem(data: Product): Promise<Response<Product[]>> {
        try {
            const response = await this.axios.post<Response<Product[]>>('/item:add', data)

            return response.data
        } catch (error) {
            throw error
        }
    }
}