import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import AddProduct from "./Components/AddProduct";
import ImageGrid from "./Components/ImageGrid";
import Navbar from "./Components/Navbar";
import UploadForm from "./Components/UploadForm";
import Home from "./Pages/Home";
// import "swipe";
import Login from "./Components/login/Login";
import ProductDetail from "./Components/pages/ProductDetails";
import { useState, useEffect } from "react";
import AuthService from "./Services/AuthService";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // constructor(props) {
  //   super(props);
  //   this.logOut = this.logOut.bind(this);

  //   this.state = {
  //     showAdminPage: false,
  //     showUserPage: false,
  //     currentUser: undefined,
  //   };
  // }
  const [showAdminPage, setShowAdminPage] = useState(false);
  const [showUserPage, setShowUserPage] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  // componentDidMount() {
  //   const user = AuthService.getCurrentUser();
  //   // this.logOut();
  //   if (user) {
  //     this.setState({
  //       currentUser: user,
  //       showUserPage: user.role.authority == "Customer",
  //       showAdminPage: user.role.authority == "Admin",
  //     });
  //   }
  // }
  // useEffect(() => {
  //   const user = AuthService.getCurrentUser();
  //   setCurrentUser(user);
  // }, []);
  useEffect(
    () => {
      const user = AuthService.getCurrentUser();
      if (user) {
        setCurrentUser(user);
        if (user.role.authority == "Customer") {
          setShowUserPage(true);
        }
        if (user.role.authority == "Admin") {
          setShowAdminPage(true);
        }
      }
      console.log(user);
      // if (setCurrentUser == null) {
      //   setShowAdminPage = false;
      //   setShowUserPage = false;
      // }
      // if (user.role.authority === "Customer") {
      //   setShowUserPage = true;
      // } else if (user.role.authority === "Admin") {
      //   setShowAdminPage = true;
      // }
    },
    { currentUser }
  );

  const logOut = () => {
    setCurrentUser(AuthService.logout());
  };
  // render() {
  // const { currentUser, showAdminPage, showUserPage } = this.state;
  return (
    <Router path={"/trangchu"} forceRefresh={true}>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            {" "}
            Shoppi
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-Link">
                Home
              </Link>
            </li>
            {showUserPage && (
              <li className="nav-item">
                <Link to={"/home"} className="nav-Link">
                  UserPage
                </Link>
              </li>
            )}
            {showAdminPage && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-Link">
                  AdminPage
                </Link>
              </li>
            )}
            {/* {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-Link">
                    User
                  </Link>
                </li>
              )} */}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-Link">
                  {currentUser.email}
                </Link>
              </li>
              <li className="nav-item">
                {/* <a href="/login" className="nav-Link" onClick={this.logOut}>
                    LogOut
                  </a> */}
                <Link to={"/login"} onClick={logOut}>
                  Logout
                </Link>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-Link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/registor"} className="nav-Link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
        <div className="container mt-3">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/productDetail/:productid"
              element={<ProductDetail />}
            />

            {/* <Route exact path="/registor" component={Registor}/> */}
            {/* <Route exact path ="profile" component={Profile} /> */}
            {/* <Router path ="/user" component={UserPage} /> */}
            {/* <Route path="/admin" component={AdminPage} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// return (
//   <>
//     {/* <Navbar /> */}

//     {/* <BrowserRouter> */}
//     <Router>
//       <Routes>
//         <Route path="/home" element={<Home />}></Route>

//         <Route path="/login" element={<Login />}></Route>
//         {/* <Route index element={<Products />}></Route>
//         <Route path="/" element={<Products />}></Route>
//         <Route path="/productList" element={<Products />}></Route> */}
//         <Route path="/addProduct" element={<UploadForm />}></Route>
//         {/* <Route path="/loadProduct" element={<ImageGrid />}></Route> */}
//       </Routes>
//     </Router>
//     {/* <ProductList /> */}
//     {/* </BrowserRouter> */}
//     {/* <AddProduct /> */}
//   </>
// );
// }

export default App;
