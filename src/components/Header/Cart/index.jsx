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
import { SlPlus } from "react-icons/sl";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { MdOutlineShoppingCart } from "react-icons/md";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";

import { MyContext } from "../../../App";
import DeleteCart from "../../DeleteCart";
export default function Cart() {
  const context = React.useContext(MyContext);
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
      padding: "0 4px",
    },
  }));
  const totalPrice = context?.cart.reduce((total, item) => {
    const discountedPrice =
      item.productId.price -
      item.productId.price * (item.productId.discountPercentage / 100);
    return total + discountedPrice * item.quantity;
  }, 0);
  const DrawerList = (
    <Box sx={{ width: 380 }} role="presentation">
      <div className="p-2 mt-2 flex items-center justify-between">
        <div className="text-[18px] font-[500] text-[#ff5252]">
          Giỏ hàng ({context.countCart})
        </div>
        <IoClose
          className="cursor-pointer text-[20px] font-[600]"
          onClick={toggleDrawer(false)}
        />
      </div>
      <hr />
      <List sx={{ height: 420, overflowY: "auto", padding: 2 }}>
        {context?.cart.map((item, index) => (
          <React.Fragment key={index}>
            <div className="flex items-center  py-2">
              <div className="img w-[20%] mr-5">
                <img
                  src={item?.productId?.images[0].url}
                  alt=""
                  className="w-full rounded-md"
                />
              </div>
              <div className="info w-[65%] ">
                <Link className="line-clamp-1 text-[15px] font-[500] hover:text-[#ff5252] mb-2">
                  {item?.productId?.name}
                </Link>
                <div className="flex gap-6">
                  <div className="text-[15px] ">
                    Số lượng: <span>{item?.quantity}</span>
                  </div>
                  <div className="text-[#ff5252] text-[14px]">
                    {(
                      item?.productId?.price -
                      item?.productId?.price *
                        (item?.productId?.discountPercentage / 100)
                    ).toLocaleString("vi-VN") + " đ"}
                  </div>
                </div>
              </div>

              <DeleteCart cart={item} />
            </div>
            <hr />
          </React.Fragment>
        ))}
      </List>
      <hr />
      <List sx={{ paddingX: 2 }}>
        <div className="flex items-center justify-between p-2">
          {context?.countCart} mặt hàng
          <span className="text-[#ff5252] font-[600]">
            {Number(totalPrice).toLocaleString("vi-VN") + " đ"}
          </span>
        </div>
        <hr />

        <div className="flex items-center justify-center p-2 mt-4">
          <Link to="/cart" onClick={toggleDrawer(false)}>
            <Button variant="contained">Xem giỏ hàng</Button>
          </Link>
        </div>
      </List>
    </Box>
  );

  return (
    <div>
      <div onClick={toggleDrawer(true)}>
        <Tooltip title="Giỏ hàng">
          <IconButton aria-label="cart">
            <StyledBadge badgeContent={context.countCart} color="error">
              <MdOutlineShoppingCart className="md:text-[23px] text-[18px]" />
            </StyledBadge>
          </IconButton>
        </Tooltip>
      </div>

      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
