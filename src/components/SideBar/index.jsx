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

export default function SideBar() {
  const context = React.useContext(MyContext);
  const [checkedCategory, setCheckedCategory] = React.useState([0]);
  const [checkedSize, setCheckedSize] = React.useState([0]);
  const [checkedRating, setCheckedRating] = React.useState([0]);
  const [isOpenedCategory, setIsOpenedCategory] = React.useState(true);
  const [isOpenedFilter, setIsOpenedFilter] = React.useState(true);
  const handleToggle = (value) => () => {
    const currentIndex = checkedCategory.indexOf(value);
    const newChecked = [...checkedCategory];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedCategory(newChecked);
  };
  const handleToggleSize = (value) => () => {
    const currentIndex = checkedSize.indexOf(value);
    const newChecked = [...checkedSize];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedSize(newChecked);
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
  return (
    <div className="sideBar">
      <div className="">
        <div className="flex box text-[16px] font-[500] mb-2 text-[rgba(0,0,0,0.9)] items-center justify-between">
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
              maxHeight: 250,
            }}
          >
            {context?.catData.map((item, index) => {
              const labelId = `checkbox-list-label-${index}`;

              return (
                <ListItem key={index}>
                  <ListItemButton
                    role={undefined}
                    onClick={handleToggle(index)}
                    dense
                  >
                    <Checkbox
                      edge="start"
                      checked={checkedCategory.includes(index)}
                      tabIndex={-1}
                      disableRipple
                    />

                    <ListItemText id={index} primary={item.name} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      </div>
      <div className="mt-5">
        <div className="flex box text-[16px] font-[500] mb-2 text-[rgba(0,0,0,0.9)] items-center justify-between">
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
                label="Giá thấp nhất"
                size="small"
                variant="filled"
              />
              <TiArrowDownThick className="text-[17px]" />
              <TextField
                error
                id="outlined-basic"
                label="Giá cao nhất"
                size="small"
                variant="filled"
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
              >
                Tìm kiếm
              </Button>
            </div>
          </List>
        </Collapse>
      </div>

      <div className="mt-5 rating">
        <div className="text-[20px] font-[500] mb-1 text-[rgba(0,0,0,0.9)]">
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
    </div>
  );
}
