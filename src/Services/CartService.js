import axios from "axios";
import authHeader from "./AuthHeader";
import React from "react";
const CART_ITEM_URL = "http://localhost:8080/api/v1/cart";
class CartService {
  getCart() {
    return axios.get(CART_ITEM_URL, { headers: authHeader() });
  }
  deleteCart(productItemId) {
    return axios.delete(CART_ITEM_URL + `/${productItemId}`, {
      headers: authHeader(),
    });
  }
}
export default new CartService();
