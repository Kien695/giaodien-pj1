import React from "react";
import { useEffect } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
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
  const navigate = useNavigate();
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
            context.setCountCart(0);
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
            context.setCountCart(0);
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
    <div className="min-h-[70vh] flex justify-center items-center px-4">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 w-full max-w-md text-center">
        <img
          src={status === "success" ? success : error}
          alt=""
          className="w-[120px] mx-auto"
        />

        <h2
          className={`mt-4 text-2xl font-bold ${
            status === "success" ? "text-green-600" : "text-red-500"
          }`}
        >
          {status === "success"
            ? "Thanh toán thành công"
            : "Thanh toán thất bại"}
        </h2>

        <p className="mt-2 text-gray-500 text-sm">{title}</p>

        {status === "success" && (
          <div className="mt-4 bg-green-50 border border-green-100 rounded-lg p-3 text-sm text-green-700">
            Đơn hàng của bạn đã được ghi nhận và đang chờ xử lý.
          </div>
        )}

        {status === "failed" && (
          <div className="mt-4 bg-red-50 border border-red-100 rounded-lg p-3 text-sm text-red-600">
            Giao dịch không thành công. Vui lòng thử lại hoặc chọn phương thức
            thanh toán khác.
          </div>
        )}

        <div className="flex gap-3 mt-6">
          <Link to="/" className="flex-1">
            <Button variant="outlined" className="w-full !rounded-lg">
              <MdOutlineAssignmentReturn className="mr-1" />
              Trang chủ
            </Button>
          </Link>

          {status === "success" ? (
            <Link to="/order" className="flex-1">
              <Button
                variant="contained"
                color="success"
                className="w-full !rounded-lg"
              >
                Xem đơn hàng
              </Button>
            </Link>
          ) : (
            <Button
              variant="contained"
              color="error"
              className="flex-1 !rounded-lg"
              onClick={() => navigate("/checkout")}
            >
              Thanh toán lại
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
