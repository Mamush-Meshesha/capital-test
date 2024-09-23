import { Box } from "@mui/material";
import { MaterialReactTable } from "material-react-table";

const AddRecipe = () => {
  const columns = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "Topping", header: "Topping" },
    { accessorKey: "quantity", header: "Quantity" },
    { accessorKey: "phone", header: "Phone number" },
    { accessorKey: "time", header: "Created_at" },
    { accessorKey: "status", header: "Status" },
  ];

  const data = [
    {
      name: "Pizza",
      Topping: "Pepperoni",
      quantity: 2,
      phone: "0938301620",
      time: "2024-09-20 12:45:00",
      status: "Delivered",
    },
    {
      name: "Burger",
      Topping: "Mushroom",
      quantity: 1,
      phone: "0938301621",
      time: "2024-09-20 13:00:00",
      status: "Pending",
    },
    {
      name: "Lazagna",
      Topping: "Cheese",
      quantity: 3,
      phone: "0938301622",
      time: "2024-09-20 13:30:00",
      status: "Cancelled",
    },
    {
      name: "Shiro",
      Topping: "Olives",
      quantity: 1,
      phone: "0938301623",
      time: "2024-09-20 14:00:00",
      status: "Preparing",
    },
    {
      name: "Atikilt",
      Topping: "Sausage",
      quantity: 2,
      phone: "0938301624",
      time: "2024-09-20 14:15:00",
      status: "Delivered",
    },
  ];

  return (
    <Box>
      <MaterialReactTable columns={columns} data={data} />
    </Box>
  );
};

export default AddRecipe;
