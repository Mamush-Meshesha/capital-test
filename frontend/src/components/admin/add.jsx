import {
  Box,
  Button,
  Checkbox,
  Grid2,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMenuToppingRequest, uploadImageImgurRequest } from "../../store/slice/manaSlice";

const AddRecipe = () => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [name, setName] = useState(""); 
  const [price, setPrice] = useState(""); 
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const dispatch = useDispatch();

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

const handleImageChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);

    dispatch(uploadImageImgurRequest(formData));
  }
};


const data = useSelector((state) => state.manager.image.data)
  
console.log(data)
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formdata = {
      name,
      price,
      image_url: data, 
      toppings: checkedItems.map((index) => items[index]), 
    };

    dispatch(createMenuToppingRequest(formdata));
  };

  return (
    <Box display="flex" justifyContent="center">
      <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="h4" textAlign="center" paddingY="30px">
          Add Menu
        </Typography>

        <TextField
          placeholder="Name"
          type="text"
          variant="outlined"
          label="Name"
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          sx={{ width: "100%" }}
        />

        <TextField
          type="number"
          placeholder="Price"
          label="Price"
          value={price} 
          onChange={(e) => setPrice(e.target.value)}
          sx={{ width: "100%", marginTop: "20px" }}
        />

        <Typography variant="body1" marginTop="20px">
          Toppings
        </Typography>

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
                  <ListItem>
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

        <Box>
          <Box paddingTop="25px" textAlign="center">
            <Button
              variant="contained"
              component="label"
              sx={{
                marginBottom: 2,
                border: "2px dashed #000",
                backgroundColor: "#fff",
                color: "#000",
                borderRadius: "8px",
                padding: "20px 20px",
                width: "60%",
                "&:hover": {
                  border: "2px dashed #555",
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              Select Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </Button>

            {preview && (
              <Box mt={2}>
                <Typography variant="body2">
                  Selected image: {selectedImage.name}
                </Typography>
                <Box
                  component="img"
                  src={preview}
                  alt="Selected Preview"
                  sx={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                    mt: 2,
                  }}
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleRemoveImage}
                  sx={{ marginTop: 2 }}
                >
                  Remove Image
                </Button>
              </Box>
            )}
          </Box>
          <Box textAlign="center">
            <Button
              type="submit"
              variant="contained"
              sx={{
                height: "48px",
                background: "#ff9921",
                width: "60%",
                paddingY: "20px",
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddRecipe;
