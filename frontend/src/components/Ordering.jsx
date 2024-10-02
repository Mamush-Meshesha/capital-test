import {
  Checkbox,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Grid2,
} from "@mui/material";
import { useState } from "react";

const OrderCheck = () => {
  const [checkedItems, setCheckedItems] = useState([0]);

  const items = ["Oil", "Onion", "Salad", "Flour", "Nting", "Food"];

  const handleToggle = (value) => {
    const currentIndex = checkedItems.indexOf(value);
    const newChecked = [...checkedItems];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedItems(newChecked);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 600, margin: "0 auto" }}>
      <Grid2 container spacing={2}>
        {items.map((item, index) => {
          const labelId = `checkbox-list-label-${index}`;

          return (
            <Grid2
              item
              xs={12} 
              sm={6} 
              md={4} 
              key={index}
              onClick={() => handleToggle(index)}
            >
              <ListItem
                sx={{
                }}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checkedItems.indexOf(index) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={item} />
              </ListItem>
            </Grid2>
          );
        })}
      </Grid2>
    </Box>
  );
};

export default OrderCheck;
