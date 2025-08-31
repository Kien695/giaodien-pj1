import LayoutDefault from "../Layout/LayoutDefault";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MyAccount from "../pages/MyAccount";
import MyList from "../pages/MyList";
import MyOrder from "../pages/MyOrder";
import ProductDetail from "../pages/ProductDetail";
import ProductList from "../pages/ProductList";
import Register from "../pages/register";
import Verify from "../pages/VerifyEmail";

export const routers = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product",
        element: <ProductList />,
      },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/verify",
        element: <Verify />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/my-account",
        element: <MyAccount />,
      },
      {
        path: "/my-list",
        element: <MyList />,
      },
      {
        path: "/order",
        element: <MyOrder />,
      },
    ],
  },
];
