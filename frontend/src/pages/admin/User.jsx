import AdminUser from "../../components/admin/User";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderStatus } from "../../store/slice/manaSlice";
import { orderRequest } from "../../store/slice/orderSlice";
import {
  Box,
  Chip,
  MenuItem,
  FormControl,
  Select,
  Typography,
} from "@mui/material";
import { orderStatusRequest } from "../../store/slice/userSlice";
import { fetchOrdersRequest } from "../../store/slice/adminSlice";

const UserDashBoard = () => {
  const dispatch = useDispatch();
  const statuses =
    useSelector((state) => state.customer.orderStatus.status) || [];
  const orders = useSelector((state) => state.admin.orders) || [];
  const [data, setData] = useState([]);

  const statusColor = useMemo(
    () => ({
      PREPARING: "warning",
      READY: "success",
      DELIVERED: "info",
      Preparing: "warning",
      Ready: "success",
      Delivered: "info",
    }),
    []
  );
  const handleStatusChange = (event, orderId) => {
    const newStatus = event.target.value;
    console.log(`Change status of order ${orderId} to ${newStatus}`);

    dispatch(updateOrderStatus({ orderId, status: newStatus }));
  };

  useEffect(() => {
    dispatch(orderStatusRequest());
    dispatch(fetchOrdersRequest());
  }, [dispatch]);

  const renderStatusDropdown = (order) => {
    const value = order.status;
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Chip
          label={value}
          color={statusColor[value] || "default"}
          size="small"
        />
        <FormControl size="small">
          <Select
            value={value}
            onChange={(event) => handleStatusChange(event, order.id)}
            sx={{ height: 32, borderRadius: 2, minWidth: 140 }}
          >
            {statuses.map((status) => (
              <MenuItem key={status} value={status}>
                <Typography variant="body2">{status}</Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  };

  useEffect(() => {
    const transformedData = orders.map((order) => {
      const customerName = order?.customer?.name || "";
      const phone = order?.customer?.phone_number || "";
      const toppings = (order?.orderItems || [])
        .flatMap((item) =>
          (item?.orderItemToppings || []).map((t) => t?.topping?.name)
        )
        .filter(Boolean)
        .join(", ");
      const qty = (order?.orderItems || []).reduce(
        (acc, item) => acc + (item?.quantity || 0),
        0
      );
      return {
        name: customerName,
        phone,
        toppings,
        quantity: qty,
        status: renderStatusDropdown(order),
      };
    });
    setData(transformedData);
  }, [orders, statuses]);

  const columns = [
    { accessorKey: "name", header: "Customer" },
    { accessorKey: "phone", header: "Phone" },
    { accessorKey: "toppings", header: "Toppings" },
    { accessorKey: "quantity", header: "Qty" },
    { accessorKey: "status", header: "Status" },
  ];

  const title = "Add Order";

  const formFields = [
    "restaurantId",
    "menuId",
    "quantity",
    "toppings", // comma-separated list
  ];

  const handleAddOrder = (values) => {
    const restaurantId = Number(values.restaurantId);
    const menuId = Number(values.menuId);
    const quantity = Number(values.quantity || 1);
    const toppings = (values.toppings || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      restaurantId,
      items: [
        {
          menuId,
          quantity,
          toppings,
        },
      ],
    };

    dispatch(orderRequest(payload));
  };

  return (
    <>
      <AdminUser
        data={data}
        columns={columns}
        title={title}
        formFields={formFields}
        onSubmit={handleAddOrder}
      />
    </>
  );
};

export default UserDashBoard;
