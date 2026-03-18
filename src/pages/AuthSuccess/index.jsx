import React from "react";
import { useEffect } from "react";
import { getData } from "../../untils/api";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import socketClient from "../../../socket";

export default function AuthSuccess() {
  const context = React.useContext(MyContext);
  const navigate = useNavigate();
  useEffect(() => {
    const authSuccess = async () => {
      const params = new URLSearchParams(window.location.search);
      const accessToken = params.get("token");
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        socketClient.auth = { token: accessToken };
        socketClient.connect();
        try {
          const res = await getData("/auth/me");
          if (res.success) {
            context.setUserData(res.user);
            navigate("/");
          }
        } catch (error) {
          console.error("Lỗi:", error);
        }
      }
    };
    authSuccess();
  }, [navigate]);
  return <div></div>;
}
