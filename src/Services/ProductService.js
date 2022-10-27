import axios from "axios";

const PRODUCT_API_BASE_URL = "http://localhost:8080/api/v1/product";

class ProductService {
  getProducts() {
    return axios.get(PRODUCT_API_BASE_URL);
  }
}
export default new ProductService();
