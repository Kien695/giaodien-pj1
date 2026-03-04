import React from "react";
import { useEffect } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { getData, postData } from "../../untils/api";
import { useState } from "react";
import { Alert, Button, CircularProgress, Container } from "@mui/material";
import { MyContext } from "../../App";
import { useContext } from "react";
import success from "../../assets/successful-logo-01.png";
import error from "../../assets/error.png";
import { MdOutlineAssignmentReturn } from "react-icons/md";
export default function CheckoutResult() {
  const context = useContext(MyContext);
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const paymentMethod = sessionStorage.getItem("paymentMethod");
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (paymentMethod === "mo-mo") {
          const res = await postData("/api/checkout/result-momo");
          if (res.data.resultCode == "0") {
            sessionStorage.removeItem("paymentMethod");
            setStatus("success");
            setTitle(
              "Thanh toán thành công! Vui lòng kiểm tra đơn hàng của bạn." ||
                res.message,
            );
          } else {
            setTitle("Thanh toán thất bại!" || res.message);
            setStatus("error");
          }
          return;
        } else {
          const res = await getData(
            `/api/checkout/result?${searchParams.toString()}`,
          );
          if (res.data.vnp_ResponseCode == "00") {
            sessionStorage.removeItem("paymentMethod");
            setStatus("success");
            setTitle(
              "Thanh toán thành công! Vui lòng kiểm tra đơn hàng của bạn." ||
                res.message,
            );
          } else {
            setTitle("Thanh toán thất bại!" || res.message);
            setStatus("error");
          }
        }
      } catch (error) {
        if (error.response?.data?.message) {
          context.openAlertBox("error", error.response.data.message);
        } else {
          context.openAlertBox("error", "Không thể kết nối server!");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchParams]);
  if (loading) {
    return (
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }
  return (
    <div className="flex flex-col gap-3 justify-center items-center py-10 ">
      {status == "success" ? (
        <div>
          <img src={success} alt="" className="w-[200px]" />
        </div>
      ) : (
        <div>
          <img src={error} alt="" className="w-[150px]" />
        </div>
      )}
      <div className="font-[600] md:text-[18px] text-[15px] text-[#ff5252] text-center">
        {title}
      </div>
      <Button>
        <Link to="/" className="text-[12px] flex items-center gap-1">
          <MdOutlineAssignmentReturn className="text-[18px]" />
          Quay về trang chủ
        </Link>
      </Button>
    </div>
  );
}
