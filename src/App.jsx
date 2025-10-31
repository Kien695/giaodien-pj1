import React, { createContext, useEffect } from "react";
import Header from "./components/Header";
import AllRouter from "./components/AllRouter";

import toast, { Toaster } from "react-hot-toast";

import { getData } from "./untils/api";

const MyContext = createContext();
export default function App() {
  const [active, setActive] = React.useState(null);
  const [isLogin, setIsLogin] = React.useState(false);
  const [userData, setUserData] = React.useState(null);
  const [logoData, setLogoData] = React.useState(null);
  const [catData, setCatData] = React.useState([]);
  const [productNewData, setProductNewData] = React.useState([]);
  const [productFeaturedData, setProductFeaturedData] = React.useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        setIsLogin(true);
        try {
          const resUser = await getData(`/api/user/user-detail?token=${token}`);
          if (resUser.success) {
            setUserData(resUser.data);
          }
          const resLogo = await getData("/api/logo");
          if (resLogo.success) {
            setLogoData(resLogo.data);
          }
          const resCat = await getData("/api/category/");
          if (resCat.success) {
            setCatData(resCat.data);
          }
          const resProduct = await getData("/api/productClient");
          if (resProduct.success) {
            setProductFeaturedData(resProduct.dataFeatured);
            setProductNewData(resProduct.dataNew);
          }
        } catch (error) {
          console.error("Lỗi khi fetch user:", error);
          setIsLogin(false);
        }
      } else {
        setIsLogin(false);
      }
    };

    fetchUser();
  }, []);

  const handleCloseDetail = () => {
    setOpenDetailProduct(false);
  };
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
