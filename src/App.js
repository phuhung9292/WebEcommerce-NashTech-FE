import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import ImageGrid from "./Components/ImageGrid";
import Navbar from "./Components/Navbar";
import UploadForm from "./Components/UploadForm";
import Home from "./Pages/Home";
import AddProduct from "./Components/pages/AddProduct";
// import "swipe";
import Login from "./Components/login/Login";
import ProductDetail from "./Components/pages/ProductDetails";
import { useState, useEffect } from "react";
import AuthService from "./Services/AuthService";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchIcon from "@mui/icons-material/Search";
import { Badge } from "@mui/material";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { color } from "@mui/system";
import CartDetail from "./Components/pages/CartDetail";
import ProfileUser from "./Components/pages/ProfileUser";
import OrderHistory from "./Components/pages/OrderHistory";
import Registor from "./Components/pages/Registor";
import AdminPage from "./Components/pages/AdminPage";
import ManageProduct from "./Components/ManageProduct";
import UserManage from "./Components/UserManage";
import CategoryDetail from "./Components/pages/CategoryDetail";
import CategoryAdd from "./Components/pages/CategoryAdd";
import AdminGetAllProduct from "./Components/pages/AdminGetAllProduct";
import Variation from "./Components/pages/Variation";
import Variations from "./Components/pages/Variations";
import OptionAdd from "./Components/pages/OptionAdd";
import UpdateProduct from "./Components/pages/UpdateProduct";
import AdminProductItem from "./Components/pages/AdminProductItem";
import AddProductItem from "./Components/pages/AddProductItem";
import UpdateProductItem from "./Components/pages/UpdateProductItem";
import ManageUser from "./Components/pages/ManageUser";
import ManageOrders from "./Components/pages/ManageOrders";

function App() {
  const styleLink = "textDecoration: 'none' color: black";
  const style = "text-[14px] cursor-pointer ml-[25px] ";
  const [showAdminPage, setShowAdminPage] = useState(false);
  const [showUserPage, setShowUserPage] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setCurrentUser(AuthService.getCurrentUser());
  }, []);

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);
      if (currentUser.role[0].authority == "Customer") {
        setShowUserPage(true);
        console.log(showUserPage);
      }
      if (currentUser.role[0].authority == "Admin") {
        setShowAdminPage(true);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  const logOut = () => {
    setCurrentUser(AuthService.logout());
    setShowAdminPage(false);
    setShowUserPage(false);
  };

  return (
    <Router>
      <div className="navbar h-[60px] shadow-md relative z-10 w-full">
        <div className="wrapper pl-[20px] pr-[20px] pt-[10px] pb-[10px] flex justify-between items-center flex-row w-full">
          {showUserPage && (
            <div className="left flex flex-1 items-center">
              <div className="language cursor-pointer text-[16px]"> Search</div>
              <div
                className="searchInput flex border-[2px] border-solid border-lighgrey rounded-md items-center ml-[10px] p-[5px]
            focus-within:border-[#8a4af3] transition-all"
              >
                <input className="input" type="text" />
                <SearchIcon className="" style={{ fontSize: "16px" }} />
              </div>
            </div>
          )}

          <div className="center flex-1 text-center ">
            <div className="logo font-bold text-lg"> Shoppi</div>
          </div>
          <div className="right flex flex-1 items-center justify-end">
            {currentUser ? (
              <div className="right flex flex-1 items-center justify-end">
                <div>
                  <Link
                    to={"/profile"}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {currentUser.email}
                  </Link>
                </div>
                <div className="pl-[20px]">
                  <Link
                    to={"/login"}
                    style={{ textDecoration: "none", color: "black" }}
                    onClick={logOut}
                  >
                    Logout
                  </Link>
                </div>
              </div>
            ) : (
              <div className="right flex flex-1 items-center justify-end">
                <div className={style}>
                  {" "}
                  <Link to={"/login"} className="nav-Link">
                    Login
                  </Link>
                </div>
                <div className={style}>
                  {" "}
                  <Link to={"/registor"} className="nav-Link">
                    Sign Up
                  </Link>
                </div>
              </div>
            )}
            {showUserPage && (
              <div className={style}>
                <Badge color="primary">
                  <Link to={"/cart-detail"}>
                    <ShoppingCartOutlined></ShoppingCartOutlined>
                  </Link>
                </Badge>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="container mt-3">
          <Routes>
            <Route path="/home" index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart-detail" element={<CartDetail />} />
            <Route path="/profile" element={<ProfileUser />} />
            <Route path="/registor" element={<Registor />} />
            <Route path="/admin" element={<AdminPage />}>
              <Route path="management-user" element={<ManageUser />}></Route>
              <Route path="manage-orders" element={<ManageOrders />}>
                <Route
                  path="admin-order-detail/:orderid"
                  element={<OrderHistory />}
                />
              </Route>
              <Route path="product-manage" element={<ManageProduct />}>
                <Route
                  path="edit-category/:id"
                  element={<CategoryDetail />}
                ></Route>
                <Route path="variation/:vid" element={<Variation />}>
                  <Route path="variations/:vsid" element={<Variations />}>
                    <Route
                      path="addOption/:aoid"
                      element={<OptionAdd />}
                    ></Route>
                  </Route>
                </Route>
                <Route path="add" element={<CategoryAdd />}></Route>
                <Route
                  exact
                  path="view-products/:id"
                  element={<AdminGetAllProduct />}
                >
                  <Route
                    path="addProduct/:cateid"
                    element={<AddProduct />}
                  ></Route>
                  <Route
                    exact
                    path="updateProduct/:productid"
                    element={<UpdateProduct />}
                  ></Route>
                  <Route
                    exact
                    path="adminProductItem/:proid"
                    element={<AdminProductItem />}
                  >
                    <Route
                      path="addProductItem/:productid"
                      element={<AddProductItem />}
                    />
                    <Route
                      path="updateProductItem/:productItemId"
                      element={<UpdateProductItem />}
                    />
                  </Route>
                </Route>
              </Route>
              <Route path="user-manage" element={<UserManage />}></Route>
            </Route>
            <Route
              path="/productDetail/:productid"
              element={<ProductDetail />}
            />
            <Route path="/orderDetail/:orderid" element={<OrderHistory />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
