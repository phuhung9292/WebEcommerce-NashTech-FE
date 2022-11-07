import axios from "axios";
import authHeader from "./AuthHeader";
const PRODUCT_API_BASE_URL = "http://localhost:8080/api/v1/product";
const PRODUCT_ITEM_BASE_URL = "http://localhost:8080/api/v1/productitem";
const CART_ITEM = "http://localhost:8080/api/v1/cart";
const CATEGORY_API_BASE_URL = "http://localhost:8080/api/v1/category";
const API_GET_PRODUCT_BY_CATE_ID =
  "http://localhost:8080/api/v1/product/search/cate";
const VARIATION_API = "http://localhost:8080/api/v1/variation";
const VARIATION_OPTION_API = "http://localhost:8080/api/v1/variationoption";
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
  adminAddProduct(categoryId, name, description, productImage) {
    return axios.post(
      PRODUCT_API_BASE_URL,
      { categoryId, name, description, productImage },
      { headers: authHeader() }
    );
  }
  getVariationByCateId(cateId) {
    return axios.get(VARIATION_API + "/cate" + `/${cateId}`);
  }
  getVariationOptionByVariationId(id) {
    return axios.get(VARIATION_OPTION_API + "/variation" + `/${id}`);
  }
  addVariationOption(variationId, value) {
    return axios.post(
      VARIATION_OPTION_API + "/create",
      { variationId, value },
      { headers: authHeader() }
    );
  }
  getProductById(id) {
    return axios.get(PRODUCT_API_BASE_URL + `/${id}`);
  }
  updateProduct(id, name, description, productImage, categoryId) {
    return axios.put(
      PRODUCT_API_BASE_URL + "/update",
      { id, name, description, productImage, categoryId },
      { headers: authHeader() }
    );
  }
  adminGetAllProductItemByProductId(id) {
    return axios.get(PRODUCT_ITEM_BASE_URL + "/admin" + `/${id}`);
  }
  adminGetAllColorAndSizeByCateId(id) {
    return axios.get(VARIATION_OPTION_API + "/cate" + `/${id}`);
  }

  adminCreateProductItem(
    productId,
    variation1,
    variation2,
    quantity,
    price,
    productImage
  ) {
    return axios.post(
      PRODUCT_ITEM_BASE_URL,
      { quantity, price, productImage },
      {
        headers: authHeader(),

        params: {
          productId: productId,
          variation1: variation1,
          variation2: variation2,
        },
      }
    );
  }
  getProductItemByProductItemId(id) {
    return axios.get(PRODUCT_ITEM_BASE_URL + "/productItemId" + `/${id}`);
  }
  updateProductItem(id, quantity, price, productImage) {
    return axios.put(
      PRODUCT_ITEM_BASE_URL,
      { id, quantity, price, productImage },
      { headers: authHeader() }
    );
  }
}
export default new ProductService();
