import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import Home from "./components/common/Home";
import Register from "./components/common/Register";
import SignIn from "./components/common/signin";
import Vendor_home from "./components/vendor/v_home";
import Buyer_home from "./components/buyer/b_home";
import V_profile from "./components/vendor/v_profile"
import B_profile from "./components/buyer/b_profile";
import Add_food from "./components/vendor/add_food";
import V_foodedit from "./components/vendor/v_foodedit";
import V_orders from "./components/vendor/v_orders";
import B_wallet from "./components/buyer/b_wallet";
import B_orders from "./components/buyer/b_orders";
import B_myorders from "./components/buyer/b_myorders";
import V_statistics from "./components/vendor/v_statistics";
//import SignUp from "./signup";

const Layout = () => {
  return (
    <div>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Layout />}> 
          <Route path="/" element={<Home />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="register" element={<Register />} />
          <Route path="b_home" element={<Buyer_home />} />
          <Route path="v_home" element={<Vendor_home />} />
          <Route path="b_wallet" element={<B_wallet />} />
          <Route path="b_orders" element={<B_orders />} />
          <Route path="v_profile" element={<V_profile />} />
          <Route path="b_profile" element={<B_profile />} />
          <Route path="v_addFood" element={<Add_food />} />
          <Route path="v_statistics" element={<V_statistics />} />
          <Route path="v_editfood" element={<V_foodedit />} />
          <Route path="v_orders" element={<V_orders />} />
          <Route path="b_myorders" element={<B_myorders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
