import AdminUser from "../../components/admin/User";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { managerFetchOrdersRequest, updateOrderStatus } from "../../store/slice/manaSlice";
import { MenuItem, FormControl, Select, } from "@mui/material";
import {orderStatusRequest} from "../../store/slice/userSlice"

const UserDashBoard = () => {
  const dispatch = useDispatch();
  const statuses = useSelector((state) => state.customer.orderStatus.status) || []
  console.log(statuses)
  const orders = useSelector((state) => state.manager.orders) || []
const [data,setData] = useState([])
  const handleStatusChange = (event, orderId) => {
    const newStatus = event.target.value;
    console.log(`Change status of order ${orderId} to ${newStatus}`);

    dispatch(updateOrderStatus({ orderId, status: newStatus }));
  };


  useEffect(() => {
    dispatch(orderStatusRequest());
  }, [dispatch])

  const renderStatusDropdown = (order) => {
    return (
      <FormControl fullWidth size="small" sx={{ marginBottom: 2 }}>
        <Select
          value={order.status}
          onChange={(event) => handleStatusChange(event, order.id)}
          sx={{
            backgroundColor:
              status === "Preparing"
                ? "#ffcc80"
                : status === "Ready"
                ? "#aed581"
                : "#90caf9", 
            fontSize: "0.875rem",
            height: "35px",
            borderRadius: "8px", 
            border: "none",
            boxShadow: "none", 
            "&:hover": {
              backgroundColor:
                status === "Preparing"
                  ? "#ffa726"
                  : status === "Ready"
                  ? "#81c784"
                  : "#64b5f6", 
            },
            "& .MuiSelect-select": {
              padding: "8px",
            },
          }}
          disableUnderline
          displayEmpty
        >
          {statuses.map((status) => (
            <MenuItem
              key={status}
              value={status}
              sx={{
                backgroundColor:
                  status === "Preparing"
                    ? "#ffa500"
                    : status === "Ready"
                    ? "#008000"
                    : "#90caf9",
                "&:hover": {
                  backgroundColor:
                    status === "Preparing"
                      ? "#ffa726"
                      : status === "Ready"
                      ? "#81c784"
                      : "#64b5f6",
                },
              }}
            >
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };


  useEffect(() => {
    const transformedData = orders.map((order) => ({
      name: order.Customer.name,
      Phone: order.Customer.phone_number,
      topping: order.OrderItems.flatMap((item) =>
        item.Toppings.map((topping) => topping.name)
      ).join(", "),
      quantity: order.OrderItems.reduce((acc, item) => acc + item.quantity, 0),
      status: renderStatusDropdown(order),
    }));
    setData(transformedData);
  }, [orders]);

  const columns = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "Phone", header: "Phone number" },
    { accessorKey: "topping", header: "Topping" },
    { accessorKey: "quantity", header: "Quantity" },
    { accessorKey: "status", header: "Status" },
  ];

  useEffect(() => {
    dispatch(managerFetchOrdersRequest());
  }, [dispatch]);

  const title = "Packages";

  return (
    <>
      <AdminUser data={data} columns={columns} title={title} />
    </>
  );
};

export default UserDashBoard;
