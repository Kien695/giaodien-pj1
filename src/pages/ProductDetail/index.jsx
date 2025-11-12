import React, { useContext, useEffect } from "react";
import Rating from "@mui/material/Rating";
import ZoomImage from "../../components/ImageZoom";
import { Button, List, TextField } from "@mui/material";
import { BsCart3 } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import "./style.css";
import ProductSlider from "../../components/ProductLasted";
import { MyContext } from "../../App";
import { getData, postData } from "../../untils/api";
import { useNavigate, useParams } from "react-router-dom";
import ListLikeProduct from "../../components/ListLikeProduct";
export default function ProductDetail() {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const [active, setActive] = React.useState(null);
  const [activeDes, setActiveDes] = React.useState(1);
  const [product, getProduct] = React.useState("");
  const [quantity, setQuantity] = React.useState(1);
  const [size, setSize] = React.useState("");

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData(`/api/productClient/${id}`);
        if (res.success) {
          getProduct(res.data);
        }
      } catch (error) {
        if (error.response) {
          context.openAlertBox("error", error.response.data.message);
        } else {
          context.openAlertBox("error", "Không thể kết nối server!");
        }
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      let totalPrice =
        (product.price -
          product.price * ((product.discountPercentage || 0) / 100)) *
        quantity;

      const res = await postData("/api/cart/add", {
        productId: product._id,
        quantity: quantity,
        size: size,
        price: totalPrice,
      });
      if (res.success) {
        context.openAlertBox("success", res.message);
        context.setCountList((prev) => prev + 1);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        context.openAlertBox("error", error.response.data.message);
      } else {
        context.openAlertBox("error", "Không thể kết nối server!");
      }
    }
  };
  const handleBuy = (item, qty, size) => {
    navigate("/checkout", { state: { item, quantity: qty, size: size || "" } });
  };

  return (
    <div className="container ">
      <div className=" flex gap-5 mt-5 p-4 bg-white rounded-md">
        <div className="imageZoom w-[30%]">
          <ZoomImage images={product.images || []} />
        </div>
        <div className=" p-6 infoProduct w-[70%] flex flex-col gap-5">
          <div className="font-[600] text-[25px] text-[rgba(0,0,0,0.8)]">
            {product.name}
          </div>
          <div className="info flex gap-5">
            <div>
              <span className="text-[rgba(0,0,0,0.5)]">Thương hiệu:</span>{" "}
              {product.brand}
            </div>
            <Rating name="read-only" size="small" value={3} readOnly />
            <div>Đánh giá(0)</div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[rgba(0,0,0,0.6)]">Voucher của shop:</span>
            <span className="w-[70px] h-[30px]  bg-[#F45930] text-[13px] flex items-center justify-center text-white rounded-md">
              Giảm {product.discountPercentage + "%"}
            </span>
          </div>
          <div className="flex items-center  font-[500]  gap-5">
            <div className="flex items-center gap-3">
              <div className="priceOld line-through text-gray-500">
                {Number(product.price).toLocaleString("vi-VN") + " đ"}
              </div>
              <div className="priceNew text-[#ff5252] ">
                {(
                  product.price -
                  product.price * (product.discountPercentage / 100)
                ).toLocaleString("vi-VN") + " đ"}
              </div>
            </div>
            <div>
              <span className="text-[rgba(0,0,0,0.5)]">Còn:</span>{" "}
              <span className="text-[#ff5252]">
                {product.countInStock} sản phẩm
              </span>
            </div>
          </div>
          <div
            className="text-[rgba(0,0,0,0.6)] text-[15px] line-clamp-3"
            dangerouslySetInnerHTML={{
              __html: product.description || "",
            }}
          ></div>
          <div className="flex items-center gap-3 mb-6">
            {product?.size?.length > 0 && (
              <div className="flex items-center gap-3">
                <div>Kích thước:</div>
                <div className="flex !w-[30px] !h-[30px] !min-w-[30px] gap-2 action ">
                  {product.size.map((size, index) => (
                    <Button
                      key={index}
                      className={`${
                        active == index
                          ? "!bg-[#ff5252] !text-white !border-none"
                          : ""
                      }`}
                      onClick={() => {
                        setActive(index);
                        setSize(size);
                      }}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <TextField
              size="small"
              type="number"
              name="quantity"
              onChange={(e) => setQuantity(e.target.value)}
              defaultValue={1}
              InputProps={{ inputProps: { min: 1 } }}
              sx={{ width: "70px", fontSize: "14px" }}
            />
            <Button
              variant="outlined"
              color="error"
              sx={{
                backgroundColor: "white",
                color: "#ff5252",
                "&:hover": {
                  backgroundColor: "black",
                  color: "#f1f1f1",
                },
              }}
              className=" flex items-center justify-center gap-2 !text-[15px] !ml-6"
              onClick={() => {
                handleAddToCart(product);
              }}
            >
              <BsCart3 />
              <span>Thêm vào giỏ hàng</span>
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleBuy(product, quantity, size)}
            >
              Mua ngay
            </Button>
          </div>
          <ListLikeProduct item={product} type="heartSmall" />
        </div>
      </div>
      <div className="py-8">
        <div className="flex items-center gap-5 mb-5">
          <div
            className={`text-[20px] cursor-pointer font-[500] ${
              activeDes == 1 ? "!text-[#ff5252]  !border-none" : ""
            } `}
            onClick={() => setActiveDes(1)}
          >
            Chi tiết sản phẩm
          </div>
          <div
            className={`text-[20px] cursor-pointer font-[500] ${
              activeDes == 2 ? "!text-[#ff5252]  !border-none" : ""
            } `}
            onClick={() => setActiveDes(2)}
          >
            Mô tả
          </div>
          <div
            className={`text-[20px] cursor-pointer font-[500] ${
              activeDes == 3 ? "!text-[#ff5252]  !border-none" : ""
            } `}
            onClick={() => setActiveDes(3)}
          >
            Đánh giá (10)
          </div>
        </div>

        {activeDes == 2 && (
          <div
            className="shadow-lg w-full p-5 bg-white rounded-md"
            dangerouslySetInnerHTML={{
              __html: product.description || "",
            }}
          ></div>
        )}
        {activeDes == 1 && (
          <div className="shadow-lg w-full p-5 bg-white rounded-md">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                    <th scope="col" className="px-6 py-3">
                      Tên sản phẩm
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase"
                    >
                      {product.name}
                    </th>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                    <th scope="col" className="px-6 py-3">
                      Kho
                    </th>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {product?.countInStock > 0 ? "Còn hàng" : "Hết hàng"}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                    <th scope="col" className="px-6 py-3">
                      Danh mục
                    </th>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {product?.category?.name}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                    <th scope="col" className="px-6 py-3">
                      Thương hiệu
                    </th>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {product.brand}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                    <th scope="col" className="px-6 py-3">
                      Giá
                    </th>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {Number(product.price).toLocaleString("vi-VN") + " đ"}
                    </td>
                  </tr>

                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                    <th scope="col" className="px-6 py-3">
                      Địa chỉ
                    </th>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      TP.HCM
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeDes == 3 && (
          <div className="shadow-lg max-w-[75%] p-5 bg-white rounded-md p-8">
            <div className="font-[500] mb-8">Đánh giá của khách hàng</div>
            <div className="scroll max-h-[300px] overflow-y-scroll flex flex-col gap-3 overflow-y-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <img
                    src="/src/assets/tải xuống.jfif"
                    alt=""
                    className="w-[80px] h-auto rounded-full"
                  />
                  <div className="info flex flex-col">
                    <div className="text-[16px] font-[500]">Tấn Kiên</div>
                    <div className="text-[13px]">8-28-2025</div>
                    <div className="text-[14px]">Sản phẩm quá tốt</div>
                  </div>
                </div>
                <Rating
                  size="small"
                  name="read-only"
                  value={4}
                  readOnly
                  className="mr-4"
                />
              </div>
              <hr />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <img
                    src="/src/assets/tải xuống.jfif"
                    alt=""
                    className="w-[80px] h-auto rounded-full"
                  />
                  <div className="info flex flex-col">
                    <div className="text-[16px] font-[500]">Tấn Kiên</div>
                    <div className="text-[13px]">8-28-2025</div>
                    <div className="text-[14px]">Sản phẩm quá tốt</div>
                  </div>
                </div>
                <Rating
                  size="small"
                  name="read-only"
                  value={4}
                  readOnly
                  className="mr-4"
                />
              </div>
              <hr />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <img
                    src="/src/assets/tải xuống.jfif"
                    alt=""
                    className="w-[80px] h-auto rounded-full"
                  />
                  <div className="info flex flex-col">
                    <div className="text-[16px] font-[500]">Tấn Kiên</div>
                    <div className="text-[13px]">8-28-2025</div>
                    <div className="text-[14px]">Sản phẩm quá tốt</div>
                  </div>
                </div>
                <Rating
                  size="small"
                  name="read-only"
                  value={4}
                  readOnly
                  className="mr-4"
                />
              </div>
              <hr />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <img
                    src="/src/assets/tải xuống.jfif"
                    alt=""
                    className="w-[80px] h-auto rounded-full"
                  />
                  <div className="info flex flex-col">
                    <div className="text-[16px] font-[500]">Tấn Kiên</div>
                    <div className="text-[13px]">8-28-2025</div>
                    <div className="text-[14px]">Sản phẩm quá tốt</div>
                  </div>
                </div>
                <Rating
                  size="small"
                  name="read-only"
                  value={4}
                  readOnly
                  className="mr-4"
                />
              </div>
              <hr />
            </div>
            <div className="bg-[#f5f0f0] mt-8 p-6 flex flex-col gap-5 rounded-md">
              <div className="font-[500] ">Thêm đánh giá</div>
              <TextField
                label="Viết đánh giá..."
                type="text"
                multiline
                rows={4}
                sx={{ width: "100%" }}
              />
              <Rating name="size-medium" defaultValue={2} />
              <Button
                variant="contained"
                color="error"
                className="w-auto self-center"
              >
                Gửi đánh giá
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="py-4">
        <div className="text-[22px] font-[500]">Sản phẩm liên quan</div>
        <ProductSlider item={5} />
      </div>
    </div>
  );
}
