import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import "./style.css";
export default function SideBar() {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  return (
    <div className="sideBar">
      <div className="box text-[22px] font-[500] mb-4 text-[rgba(0,0,0,0.6)">
        Danh mục
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
                  checked={checked.includes(value)}
                  tabIndex={-1}
                  disableRipple
                />

                <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
