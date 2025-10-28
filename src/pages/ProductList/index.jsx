import React, { useContext, useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import ProductItems from "../../components/ProductItems";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoGridSharp } from "react-icons/io5";
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import ProductItemsRow from "../../components/ProductItemsRow";
import Pagination from "@mui/material/Pagination";
import { MyContext } from "../../App";
import { getData } from "../../untils/api";
import { useSearchParams } from "react-router-dom";
export default function ProductList() {
  const context = useContext(MyContext);
  const [itemList, setItemList] = React.useState("grid");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [colorButton, setColorButton] = React.useState(2);
  const [productData, setProductData] = React.useState([]);
  const [productPage, setTotalPage] = useState();
  const [totalProduct, setTotalProduct] = useState();
  const [searchParams, setSearchparams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handlePageChange = (event, newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    setSearchparams(params);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData(`/api/productClient/all?page=${page}`);
        if (res.success) {
          setProductData(res.data);
          setTotalPage(res.totalPage);
          setTotalProduct(res.totalProduct);
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
  }, [page]);
  return (
    <div className="py-8 bg-white rounded-md">
      <div className="container flex gap-3">
        <div className="sideBar w-[15%] h-full bg-white p-3 shadow-md">
          <SideBar />
        </div>
        <div className="product w-[85%] mx-auto">
          <div className="bg-[#f1f1f1] w-full p-2 mb-3 flex items-center justify-between rounded-md">
            <div className="flex items-center ">
              <Button
                className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full ${
                  colorButton == 1 ? "!text-[#ff5252]" : "!text-black"
                }`}
                onClick={() => {
                  setItemList("list");
                  setColorButton(1);
                }}
              >
                <GiHamburgerMenu />
              </Button>
              <Button
                className={` !w-[40px] !h-[40px] !min-w-[40px] !rounded-full ${
                  colorButton === 2 ? "!text-[#ff5252]" : "!text-black"
                }`}
                onClick={() => {
                  setItemList("grid");
                  setColorButton(2);
                }}
              >
                <IoGridSharp />
              </Button>
              <span className="font-[500] pl-3 text-[rgba(0,0,0,0.7)]">
                Có {totalProduct} sản phẩm
              </span>
            </div>
            <div className="flex items-center justify-center pr-4">
              <span className="mr-2">Sắp xếp: </span>
              <Button
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                className="!text-[#ff5252] !bg-white shadow-md !text-[14px] !capitalize"
              >
                Giá tăng dần
              </Button>
              <Menu
                id="fade-menu"
                slotProps={{
                  list: {
                    "aria-labelledby": "fade-button",
                  },
                }}
                slots={{ transition: Fade }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} className="!text-[15px]">
                  Giá giảm dần
                </MenuItem>
                <MenuItem onClick={handleClose} className="!text-[15px]">
                  Tên từ A đến Z
                </MenuItem>
                <MenuItem onClick={handleClose} className="!text-[15px]">
                  Tên từ Z đến A
                </MenuItem>
              </Menu>
            </div>
          </div>
          {itemList == "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {productData?.map((item, index) => (
                <ProductItems product={item} key={index} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4 ">
              {productData?.map((item, index) => (
                <ProductItemsRow product={item} key={index} />
              ))}
            </div>
          )}
          <Pagination
            count={productPage}
            page={page}
            onChange={handlePageChange}
            color="error"
            showFirstButton
            showLastButton
            className="mt-7 flex justify-center"
          />
        </div>
      </div>
    </div>
  );
}
