import axios from "axios";
import authHeader from "./AuthHeader";
import React, { Component } from "react";
const ORDER_USER_URL = "http://localhost:8080/api/v1/order";
class Order {
  postOrder() {
    console.log(authHeader());
    return axios.post(ORDER_USER_URL, {}, { headers: authHeader() });
  }
}
export default new Order();
