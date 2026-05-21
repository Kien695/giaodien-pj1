import React, { useContext, useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import ProductItems from "../../components/ProductItems";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoColorFilterOutline, IoGridSharp } from "react-icons/io5";
import {
  Box,
  Button,
  Drawer,
  FormControl,
  InputLabel,
  NativeSelect,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

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
  const [openSibarMobile, setOpenSibarMobile] = React.useState(false);
  const page = parseInt(searchParams.get("page")) || 1;
  const minPrice = parseInt(searchParams.get("minPrice")) || "";
  const maxPrice = parseInt(searchParams.get("maxPrice")) || "";
  const rating = searchParams.get("rating") || "";
  const sortKey = searchParams.get("sortKey") || "";
  const sortValue = searchParams.get("sortValue") || "";
  const catId = searchParams.get("catId") || "";
  const keyword = searchParams.get("keyword") || "";
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
        const res = await getData(
          `/api/productClient/all?keyword=${keyword}&page=${page}&catId=${catId}&rating=${rating}&minPrice=${minPrice}&maxPrice=${maxPrice}&sortKey=${sortKey}&sortValue=${sortValue}`,
        );
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
  }, [page, rating, catId, minPrice, maxPrice, sortKey, sortValue, keyword]);
  const handleChange = (e) => {
    const params = new URLSearchParams(searchParams);
    const [sortKey, sortValue] = e.target.value.split("-");
    params.set("sortKey", sortKey);
    params.set("sortValue", sortValue);
    setSearchparams(params);
  };
  return (
    <div className="md:py-8 pb-8   bg-white rounded-md">
      <div className="container">
        <div
          className="inline-flex md:hidden font-[500] text-[15px] py-2 my-3 gap-2 items-center bg-gray-200 hover:text-white hover:bg-[#ff5252] px-3 rounded-lg cursor-pointer"
          onClick={() => {
            setOpenSibarMobile(true);
          }}
        >
          <IoColorFilterOutline /> Bộ lọc
        </div>
      </div>
      <Drawer
        open={openSibarMobile}
        onClose={() => {
          setOpenSibarMobile(false);
        }}
      >
        {
          <Box sx={{ width: 250 }} role="presentation">
            <SideBar minPrice={minPrice} maxPrice={maxPrice} catId={catId} />
          </Box>
        }
      </Drawer>
      <div className=" container  flex gap-3">
        <div className="sideBar md:w-[20%] hidden md:flex h-full bg-white p-3 shadow-md">
          <SideBar
            minPrice={minPrice}
            maxPrice={maxPrice}
            catId={catId}
            rating={rating}
          />
        </div>
        <div className="product md:w-[80%] w-full mx-auto">
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
              <span className="text-[15px] font-[500] pl-3 text-[rgba(0,0,0,0.7)]">
                Có {totalProduct} sản phẩm
              </span>
            </div>
            <div className="flex items-center justify-center pr-4">
              <FormControl fullWidth>
                <InputLabel
                  color="error"
                  variant="standard"
                  htmlFor="uncontrolled-native"
                >
                  Sắp xếp
                </InputLabel>
                <NativeSelect
                  color="error"
                  value={
                    sortKey && sortValue ? `${sortKey}-${sortValue}` : undefined
                  }
                  onChange={handleChange}
                >
                  <option value="price-asc">Giá tăng dần</option>
                  <option value="price-desc">Giá giảm dần</option>
                  <option value="name-asc">Tiêu đề A đến Z</option>
                  <option value="name-desc">Tiêu đề Z đến A</option>
                </NativeSelect>
              </FormControl>
            </div>
          </div>

          <ProductItems productData={productData} type={itemList} />

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
