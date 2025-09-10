import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { store } from "./store/store";
import { Provider } from "react-redux";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Approval from "./pages/Register/Approval";
import Layout from "./Layout";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Cart from "./pages/Cart/Cart";
import SelectAddress from "./pages/CheckOut/SelectAddress";
import SelectShipping from "./pages/CheckOut/SelectShipping";
import PlaceOrder from "./pages/CheckOut/PlaceOrder";
import ProfileSetting from "./pages/ProfileSetting/ProfileSetting";
import AdminLayout from "./AdminLayout";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import ProductManagement from "./pages/Admin/ProductManagement/ProductManagement";
import UserManagement from "./pages/Admin/UserManagement/UserManagement";
import OrderManagement from "./pages/Admin/OrderManagement/OrderManagement";
import CategoryManagement from "./pages/Admin/CategoryManagement/CategoryManagement";
import AddProduct from "./pages/Admin/ProductManagement/AddProduct";
import { Toaster } from "react-hot-toast";
import NewLogin from "./pages/Login/NewLogin";
import LoginLayout from "./LoginLayout";
import LikedItems from "./pages/ProfileSetting/LikedItems";
import Auth from "./pages/Auth/Auth";
import EditProduct from "./pages/Admin/ProductManagement/EditProduct";
import OrderDetail from "./pages/Admin/OrderManagement/OrderDetail";
import UserDetail from "./pages/Admin/UserManagement/UserDetail";
import MyProfile from "./pages/Admin/MyProfile/MyProfile";

const getCurrentRole = () => localStorage.getItem("role");

// importer of computer Accessories

const loginRouter = createBrowserRouter([
  {
    path: "/",
    element: <LoginLayout />,
    children: [
      { path: "auth", element: <Auth /> },
      { path: "approval", element: <Approval /> },
      { path: "", element: <Navigate to="/auth" /> }, // Redirects to /auth for the base path
    ],
  },
  {
    path: "*",
    element: <Navigate to="/auth" />, // Handles all other undefined routes
  },
]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/product-detail/:id",
        element: <ProductDetail />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout/select-address",
        element: <SelectAddress />,
      },
      {
        path: "/checkout/select-shipping",
        element: <SelectShipping />,
      },
      {
        path: "/checkout/place-order",
        element: <PlaceOrder />,
      },
      {
        path: "/profile",
        element: <ProfileSetting />,
      },
      {
        path: "/order/:id",
        element: <OrderDetail />,
      },
      {
        path: "",
        element: <Home />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
const adminRouter = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <ProductManagement />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "edit-product/:id",
        element: <EditProduct />,
      },
      {
        path: "users",
        element: <UserManagement />,
      },
      {
        path: "user/:id",
        element: <UserDetail />,
      },
      {
        path: "category",
        element: <CategoryManagement />,
      },
      {
        path: "orders",
        element: <OrderManagement />,
      },
      {
        path: "order/:id",
        element: <OrderDetail />,
      },
      {
        path: "my-profile",
        element: <MyProfile />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/admin" />,
  },
]);

// const currentRouter = router;
const currentRouter = getCurrentRole() === "1" ? adminRouter : loginRouter;

console.log(currentRouter);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={currentRouter} />
      <Toaster position="top-right" reverseOrder={false} />
    </Provider>
  </React.StrictMode>
);
