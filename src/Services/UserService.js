import axios from "axios";
import authHeader from "./AuthHeader";

const USER_API_BASE_URL = "http://localhost:8080/api/v1";

class UserService {
  getAllUsers() {
    return axios.get(USER_API_BASE_URL + "/user/users", {
      headers: authHeader(),
    });
  }
  // deleteUser(){
  //     return axios.delete()
  // }
  getUser() {
    return axios.get(USER_API_BASE_URL + "/user", { headers: authHeader() });
  }
}
export default new UserService();
