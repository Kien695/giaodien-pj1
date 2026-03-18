import React, { createContext, useEffect } from "react";
import Header from "./components/Header";
import AllRouter from "./components/AllRouter";

import toast, { Toaster } from "react-hot-toast";

import { getData } from "./untils/api";
import socketClient from "../socket.js";

const MyContext = createContext();
export default function App() {
  const [active, setActive] = React.useState(null);
  const [isLogin, setIsLogin] = React.useState(false);
  const [userData, setUserData] = React.useState(null);
  const [logoData, setLogoData] = React.useState(null);
  const [addressData, setAddressData] = React.useState([]);
  const [catData, setCatData] = React.useState([]);
  const [productNewData, setProductNewData] = React.useState([]);
  const [productFeaturedData, setProductFeaturedData] = React.useState([]);
  const [wishlist, setWishlist] = React.useState([]);
  const [countList, setCountList] = React.useState(0);
  const [cart, setCart] = React.useState([]);
  const [countCart, setCountCart] = React.useState(0);
  const [notification, setNotification] = React.useState([]);
  const [dot, setDot] = React.useState(0);
  //no login data
  useEffect(() => {
    const fetchData = async () => {
      const resLogo = await getData("/api/logo");
      if (resLogo.success) setLogoData(resLogo.data);

      const resCat = await getData("/api/category/");
      if (resCat.success) setCatData(resCat.data);

      const resProduct = await getData("/api/productClient");
      if (resProduct.success) {
        setProductFeaturedData(resProduct.dataFeatured);
        setProductNewData(resProduct.dataNew);
      }
    };

    fetchData();
  }, []);
  //login data
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setIsLogin(false);
        return;
      }
      socketClient.auth = { token };
      if (!socketClient.connected) {
        socketClient.connect();
      }
      setIsLogin(true);

      try {
        const resUser = await getData(`/api/user/user-detail`);
        if (resUser.success) setUserData(resUser.data);

        const resAddress = await getData("/api/address");
        if (resAddress.success) setAddressData(resAddress.data);

        const resWishList = await getData("/api/myList/");
        if (resWishList.success) setWishlist(resWishList.data);

        const resCart = await getData("/api/cart/getItem");
        if (resCart.success) setCart(resCart.data);
        const unReadNoti = await getData("/api/notification/unRead");
        if (unReadNoti.success) {
          setDot(unReadNoti.unreadCount || 0);
        }
      } catch (err) {
        setIsLogin(false);
      }
    };

    fetchUser();
  }, [countList, countCart]);
  //socket
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) return;

    socketClient.auth = { token };
    if (!socketClient.connected) {
      socketClient.connect();
    }

    socketClient.on("ORDER_STATUS", (data) => {
      setNotification((prev) => [data, ...prev]);
      setDot(1);
    });

    return () => {
      socketClient.off("ORDER_STATUS");
    };
  }, []);
  const openAlertBox = (value, msg) => {
    if (value == "success") {
      toast.success(msg, { duration: 4000, dismissible: true });
    } else {
      toast.error(msg, { duration: 4000, dismissible: true });
    }
  };
  const value = {
    openAlertBox,
    isLogin,
    setIsLogin,
    userData,
    setUserData,
    catData,
    logoData,
    productFeaturedData,
    productNewData,
    addressData,
    wishlist,
    setWishlist,
    setCountList,
    cart,
    setCart,
    setCountCart,
    notification,
    setNotification,
    dot,
    setDot,
  };
  return (
    <>
      <MyContext.Provider value={value}>
        <AllRouter />
      </MyContext.Provider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </>
  );
}
export { MyContext };
