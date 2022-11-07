import axios from "axios";
import authHeader from "./AuthHeader";

const ADMIN_API_GET_ORDERS = "http://localhost:8080/api/v1/admin";
class OrderService {
  adminGetAllOrders() {
    return axios.get(ADMIN_API_GET_ORDERS + "/order", {
      headers: authHeader(),
    });
  }

  getAllStatus() {
    return axios.get(ADMIN_API_GET_ORDERS + "/order/getAllStatus", {
      headers: authHeader(),
    });
  }

  adminChangeStatusOrder(id, productId) {
    return axios.put(
      ADMIN_API_GET_ORDERS + "/order" + `/${id}` + `/${productId}`,
      {},
      { headers: authHeader() }
    );
  }
}
export default new OrderService();
