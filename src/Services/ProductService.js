import axios from "axios";
import authHeader from "./AuthHeader";
const PRODUCT_API_BASE_URL = "http://localhost:8080/api/v1/product";
const PRODUCT_ITEM_BASE_URL = "http://localhost:8080/api/v1/productitem";
const CART_ITEM = "http://localhost:8080/api/v1/cart";
const CATEGORY_API_BASE_URL = "http://localhost:8080/api/v1/category";
const API_GET_PRODUCT_BY_CATE_ID =
  "http://localhost:8080/api/v1/product/search/cate";
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
  getAllCategory() {
    return axios.get(CATEGORY_API_BASE_URL + "/categories");
  }
  getCategoryById(id) {
    return axios.get(CATEGORY_API_BASE_URL + `/${id}`);
  }
  updateCatebyId(id, typeCategory) {
    return axios.post(
      CATEGORY_API_BASE_URL + `/update` + `/${id}`,
      {
        typeCategory,
      },
      {
        headers: authHeader(),
      }
    );
  }
  createCate(typeCategory) {
    return axios.post(
      CATEGORY_API_BASE_URL + "/createcategory",
      {
        typeCategory,
      },
      {
        headers: authHeader(),
      }
    );
  }
  getProductByCateId(cateid) {
    return axios.get(API_GET_PRODUCT_BY_CATE_ID, {
      params: { cateid: cateid },
    });
  }
}
export default new ProductService();
