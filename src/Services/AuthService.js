import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/v1/user";

class AuthService {
  login = async (email, password) => {
    const data = await axios.post(USER_API_BASE_URL + "/signin", {
      email,
      password,
    });
    console.log(data);
    return data;
  };
  logout() {
    localStorage.removeItem("user");
  }
  registor(fullName, email, password, address, phone) {
    return axios.post(USER_API_BASE_URL + "create", {
      fullName,
      email,
      password,
      address,
      phone,
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}
export default new AuthService();
