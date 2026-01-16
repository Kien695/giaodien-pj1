import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { RiMenu2Fill } from "react-icons/ri";
import ListItemText from "@mui/material/ListItemText";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { SlMinus, SlPlus } from "react-icons/sl";
import { MyContext } from "../../../App";
import { useState } from "react";
export default function Category() {
  const [open, setOpen] = useState(false);
  const [openItems, setOpenItems] = React.useState({});
  const context = React.useContext(MyContext);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const handleToggle = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const renderCategories = (categories, level = 0) => {
    return (
      <List disablePadding>
        {categories.map((cat) => (
          <React.Fragment key={cat._id}>
            <ListItem disablePadding>
              <ListItemButton sx={{ pl: 2 + level * 2 }}>
                <Link
                  to={`/product?catId=${cat.slug || cat._id}`}
                  className="flex-1 text-[14px] hover:text-[#ff5252]"
                >
                  {cat.name}
                </Link>

                {cat.children && cat.children.length > 0 && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation(); // Ngăn click lan ra ListItemButton
                      e.preventDefault(); // Ngăn Link chạy
                      handleToggle(cat._id);
                    }}
                    className="cursor-pointer ml-2"
                  >
                    {openItems[cat._id] ? <SlMinus /> : <SlPlus />}
                  </div>
                )}
              </ListItemButton>
            </ListItem>

            {/* Danh mục con hiển thị khi mở */}
            {cat.children && cat.children.length > 0 && openItems[cat._id] && (
              <div className="ml-3 border-l border-gray-200">
                {renderCategories(cat.children, level + 1)}
              </div>
            )}
          </React.Fragment>
        ))}
      </List>
    );
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <div className="p-2">
        <Link to="#">
          <img src={context?.logoData?.images} className="w-full h-[60px]" />
        </Link>
      </div>

      <div className="p-2 mt-3 flex items-center justify-around">
        <div className="text-[18px] font-[500]">Mua với danh mục</div>
        <IoClose
          className="cursor-pointer text-[20px] font-[600]"
          onClick={toggleDrawer(false)}
        />
      </div>

      {/* Hiển thị danh mục (cấp 1 → cấp 2 → cấp 3...) */}
      {context?.catData && renderCategories(context.catData)}
    </Box>
  );

  return (
    <div>
      <Button
        className="!text-black gap-2 w-full flex !justify-start"
        onClick={toggleDrawer(true)}
      >
        <div className="flex gap-3 items-center">
          <RiMenu2Fill className="text-[18px]" />
          Mua với danh mục
          <FaAngleDown className="ml-5" />
        </div>
      </Button>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
