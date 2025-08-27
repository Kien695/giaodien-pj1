import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

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
import { Button } from "@mui/material";

export default function SideBar() {
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
        <div className="flex box text-[20px] font-[500] mb-4 text-[rgba(0,0,0,0.9)] items-center justify-between">
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
              maxWidth: 360,
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",
              maxHeight: 250,
            }}
          >
            {[0, 1, 2, 3, 4, 5, 6].map((value) => {
              const labelId = `checkbox-list-label-${value}`;

              return (
                <ListItem key={value}>
                  <ListItemButton
                    role={undefined}
                    onClick={handleToggle(value)}
                    dense
                  >
                    <Checkbox
                      edge="start"
                      checked={checkedCategory.includes(value)}
                      tabIndex={-1}
                      disableRipple
                    />

                    <ListItemText
                      id={labelId}
                      primary={`Line item ${value + 1}`}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      </div>
      <div className="mt-5">
        <div className="flex box text-[20px] font-[500] mb-4 text-[rgba(0,0,0,0.9)] items-center justify-between">
          Kích thước
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
            {[0, 1, 2, 3, 4, 5].map((value) => {
              const labelId = `checkbox-list-label-${value}`;

              return (
                <ListItem key={value}>
                  <ListItemButton
                    role={undefined}
                    onClick={handleToggleSize(value)}
                    dense
                  >
                    <Checkbox
                      edge="start"
                      checked={checkedSize.includes(value)}
                      tabIndex={-1}
                      disableRipple
                    />

                    <ListItemText id={labelId} primary={`Size ${value + 1}`} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      </div>
      <div className="mt-5">
        <div className="text-[20px] font-[500] mb-4 text-[rgba(0,0,0,0.9)] ">
          Giá tiền
        </div>
        <RangeSlider />
        <div className="flex items-center justify-between mt-5">
          <div className="font-[500]">0Đ</div>
          <div>Đến</div>
          <div className="font-[500]">100000Đ</div>
        </div>
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
