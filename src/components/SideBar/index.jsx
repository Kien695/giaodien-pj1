import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { TiArrowDownThick } from "react-icons/ti";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import { Collapse } from "react-collapse";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import RangeSlider from "react-range-slider-input";

import "react-range-slider-input/dist/style.css";
import Rating from "@mui/material/Rating";
import "./style.css";
import { Button, TextField } from "@mui/material";
import { MyContext } from "../../App";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";

export default function SideBar({ minPrice, maxPrice,catId }) {
  const context = React.useContext(MyContext);
  const [checkedCategory, setCheckedCategory] = React.useState([0]);
  const [checkedSize, setCheckedSize] = React.useState([0]);
  const [checkedRating, setCheckedRating] = React.useState([0]);
  const [isOpenedCategory, setIsOpenedCategory] = React.useState(true);
  const [isOpenedFilter, setIsOpenedFilter] = React.useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChangeCat = (id) => {
    const params = new URLSearchParams(searchParams);
    params.set("catId", id);
    setSearchParams(params);
  };
  const handleToggleRating = (value) => () => {
    const currentIndex = checkedRating.indexOf(value);
    const newChecked = [...checkedRating];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedRating(newChecked);
  };
  const [priceData, setPriceData] = useState({
    minPrice: minPrice || "",
    maxPrice: maxPrice || "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPriceData((prev) => ({ ...prev, [name]: value }));
  };
  const handleClick = () => {
    if (priceData.minPrice == "") {
      context.openAlertBox("error", "Vui lòng nhập giá thấp nhất!");
      return;
    }
    if (priceData.maxPrice == "") {
      context.openAlertBox("error", "Vui lòng nhập giá cao nhất!");
      return;
    }

    const params = new URLSearchParams(searchParams);
    if (priceData.minPrice) {
      params.set("minPrice", priceData.minPrice);
    }
    if (priceData.maxPrice) {
      params.set("maxPrice", priceData.maxPrice);
    }
    setSearchParams(params);
  };
  return (
    <div className="sideBar">
      <div className="">
        <div className="flex box text-[16px] font-[600] mb-2 text-[rgba(0,0,0,0.9)] items-center justify-between">
          Danh mục
          <Button
            className="!text-black !rounded-full !w-[30px] !h-[30px] !min-w-[30px]"
            onClick={() => setIsOpenedCategory(!isOpenedCategory)}
          >
            {isOpenedCategory == true ? <FaAngleDown /> : <FaAngleUp />}
          </Button>
        </div>
        <Collapse isOpened={isOpenedCategory}>
          <List
            sx={{
              width: "100%",
              maxWidth: 300,
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",
              maxHeight: 230,
            }}
          >
            {context?.catData.map((item, index) => (
              <div
                key={index}
                className={`text-[15px] ${
                  catId === item._id
                    ? "text-[#ff5252] "
                    : "hover:text-[#ff5252] hover:bg-gray-100"
                }  font-[500] w-full justify-start cursor-pointer py-1`}
                onClick={() => handleChangeCat(item._id)}
              >
                <Checkbox
                  checked={catId === item._id}
                  size="small"
                  color="error"
                />
                {item.name}
              </div>
            ))}
          </List>
        </Collapse>
      </div>
      <div className="mt-5">
        <div className="flex box text-[16px] font-[600] mb-2 text-[rgba(0,0,0,0.9)] items-center justify-between">
          Giá tiền
          <Button
            className="!text-black !rounded-full !w-[30px] !h-[30px] !min-w-[30px]"
            onClick={() => setIsOpenedFilter(!isOpenedFilter)}
          >
            {isOpenedFilter == true ? <FaAngleDown /> : <FaAngleUp />}
          </Button>
        </div>
        <Collapse isOpened={isOpenedFilter}>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",
              maxHeight: 250,
            }}
          >
            <div className="flex flex-col gap-1 items-center justify-center">
              <TextField
                error
                id="outlined-basic"
                name="minPrice"
                label="Giá thấp nhất"
                size="small"
                type="number"
                variant="filled"
                InputProps={{ inputProps: { min: 1 } }}
                value={priceData.minPrice}
                onChange={handleChange}
              />
              <TiArrowDownThick className="text-[17px]" />
              <TextField
                error
                name="maxPrice"
                id="outlined-basic"
                label="Giá cao nhất"
                size="small"
                type="number"
                InputProps={{ inputProps: { min: 1 } }}
                variant="filled"
                value={priceData.maxPrice}
                onChange={handleChange}
              />
              <Button
                sx={{
                  marginTop: "10px",

                  "&:hover": {
                    background: "#ff5252",
                    color: "white",
                  },
                }}
                size="small"
                color="error"
                variant="outlined"
                onClick={handleClick}
              >
                Tìm kiếm
              </Button>
            </div>
          </List>
        </Collapse>
      </div>

      <div className="mt-5 rating">
        <div className="flex box text-[16px] font-[600] mb-2 text-[rgba(0,0,0,0.9)] items-center justify-between">
          Đánh giá
        </div>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
            maxHeight: 250,
          }}
        >
          {[5, 4, 3, 2, 1].map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem key={value}>
                <ListItemButton
                  role={undefined}
                  onClick={handleToggleRating(value)}
                  dense
                >
                  <Checkbox
                    edge="start"
                    checked={checkedRating.includes(value)}
                    tabIndex={-1}
                    disableRipple
                  />

                  <Rating size="small" value={value} readOnly />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </div>
      <div className="flex justify-center mt-4">
        <Button
          color="error"
          size="small"
          variant="contained"
          onClick={() => setSearchParams(new URLSearchParams())}
        >
          Xóa lọc tất cả
        </Button>
      </div>
    </div>
  );
}
