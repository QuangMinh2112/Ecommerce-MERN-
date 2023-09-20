import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { path } from "./utils";
import {
  Blog,
  Checkout,
  Contact,
  DetailBlog,
  Detailproduct,
  FinalRegister,
  Home,
  Login,
  Products,
  Public,
  Resetpassword,
  ShoppingCart,
} from "./pages/Public";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "./redux/app/asyncAction";
import { Cart, Modal } from "./components";
import { ToastContainer } from "react-toastify";
import { Dashboard, LayoutAdmin } from "pages/Admin";
import ManageUser from "pages/Admin/Users/Manage";
import ManageProduct from "pages/Admin/Products/Manage";
import CreateProduct from "pages/Admin/Products/Create";
import { LayoutMember, Personal } from "pages/Member";
import MyCart from "pages/Member/MyCart";
import { History } from "pages/Member/History";
import Wishlist from "pages/Member/Wishlist";
import { showCart, showSideBar } from "redux/app/appSlice";
import SidebarResponsive from "components/Sidebar/Default/SidebarResponsive";
import { getBlog } from "redux/blog/asyncAction";
function App() {
  const dispatch = useDispatch();
  const { isShowModal, modalChildren, isShowCart, isShowSideBar } = useSelector(
    (state) => state.app
  );
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBlog());
  }, [dispatch]);

  return (
    <div className="font-poppins relative">
      {isShowCart && (
        <div
          className="absolute inset-0 bg-overlay z-50 flex justify-end "
          onClick={() => dispatch(showCart({ signal: false }))}
        >
          <Cart />
        </div>
      )}
      {isShowSideBar && (
        <div
          className="absolute inset-0 bg-overlay z-50 flex justify-start "
          onClick={() => dispatch(showSideBar({ signal: false }))}
        >
          <SidebarResponsive />
        </div>
      )}
      {isShowModal && <Modal>{modalChildren}</Modal>}
      <ToastContainer autoClose={1000} draggable />
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route
            path={path.DETAIL_PRODUCT_CATEGORY_ID_TITLE}
            element={<Detailproduct />}
          />
          <Route path={path.BLOGS} element={<Blog />} />
          <Route path={path.DETAIL_BLOGS} element={<DetailBlog />} />
          <Route path={path.CONTACTS} element={<Contact />} />
          <Route path={path.ALL} element={<Home />} />
          <Route path={path.CART} element={<ShoppingCart />} />
        </Route>

        {/* ADMIN */}
        <Route path={path.ADMIN} element={<LayoutAdmin />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
          <Route path={path.MANAGE_PRODUCT} element={<ManageProduct />} />
          <Route path={path.CREATE_PRODUCT} element={<CreateProduct />} />
        </Route>
        {/* END ADMIN */}

        {/* Member */}
        <Route path={path.MEMBER} element={<LayoutMember />}>
          <Route path={path.PERSONAL} element={<Personal />} />
          <Route path={path.MY_CART} element={<MyCart />} />
          <Route path={path.HISTORY} element={<History />} />
          <Route path={path.WISHLIST} element={<Wishlist />} />
        </Route>
        {/* End-Member */}
        <Route path={path.RESET_PASSWORD} element={<Resetpassword />} />
        <Route path={path.CHECKOUT} element={<Checkout />} />

        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
      </Routes>
    </div>
  );
}

export default App;
