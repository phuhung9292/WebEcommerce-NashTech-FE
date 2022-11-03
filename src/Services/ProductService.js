import axios from "axios";
import authHeader from "./AuthHeader";
const PRODUCT_API_BASE_URL = "http://localhost:8080/api/v1/product";
const PRODUCT_ITEM_BASE_URL = "http://localhost:8080/api/v1/productitem";
const CART_ITEM = "http://localhost:8080/api/v1/cart";
class ProductService {
  getProducts() {
    return axios.get(PRODUCT_API_BASE_URL);
  }
  getProductItem(productId) {
    return axios.get(PRODUCT_ITEM_BASE_URL + `/${productId}`);
  }
  getProductItemByProductIdSizeIdColorId(productId, sizeId, colorId) {
    return axios.get(
      PRODUCT_ITEM_BASE_URL + `/${productId}` + `/${sizeId}` + `/${colorId}`
    );
  }
  addProductItemToCart(productItemId, quantity) {
    return axios.post(
      CART_ITEM + `/${productItemId}`,
      { quantity },
      {
        headers: authHeader(),
      }
    );
  }
}
export default new ProductService();
