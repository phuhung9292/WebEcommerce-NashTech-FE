import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AddProduct from "./Components/AddProduct";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";

function App() {
  return (
    <>
      {/* <Navbar /> */}

      {/* <BrowserRouter> */}
      <Router>
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          {/* <Route index element={<Products />}></Route>
          <Route path="/" element={<Products />}></Route>
          <Route path="/productList" element={<Products />}></Route> */}
        </Routes>
      </Router>
      {/* <ProductList /> */}
      {/* </BrowserRouter> */}
      {/* <AddProduct /> */}
    </>
  );
}

export default App;
