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
export default function Category() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <div className="p-2">
        <Link to="#">
          <img src="/src/assets/1750047766437_logo.jpg" className="h-10" />
        </Link>
      </div>
      <div className="p-2 mt-3 flex items-center justify-around">
        <div className="text-[18px] font-[500]">Shop by Category</div>
        <IoClose
          className="cursor-pointer text-[20px] font-[600]"
          onClick={toggleDrawer(false)}
        />
      </div>
      <List>
        {[
          "Inbox",
          "Starred",
          "Send email",
          "Drafts",
          "All mail",
          "Trash",
          "Spam",
        ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton className="flex">
              <ListItemText primary={text} />
              <SlPlus />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button className="!text-black gap-2 w-full" onClick={toggleDrawer(true)}>
        <RiMenu2Fill className="text-[18px]" />
        Shop by Category
        <FaAngleDown className="ml-auto" />
      </Button>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
