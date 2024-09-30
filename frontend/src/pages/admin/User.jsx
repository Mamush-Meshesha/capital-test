import AdminUser from "../../components/admin/User";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector
import { managerFetchOrdersRequest } from "../../store/slice/manaSlice";

const UserDashBoard = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]); 

  // Fetch orders from Redux store
  const orders = useSelector((state) => state.manager.orders); 

  // Transform backend data to match the component's structure
  useEffect(() => {
    const transformedData = orders.map((order) => ({
      name: order.Customer.name,
      Phone: order.Customer.phone_number,
      topping: order.OrderItems.flatMap((item) =>
        item.Toppings.map((topping) => topping.name)
      ).join(", "), 
      quantity: order.OrderItems.reduce((acc, item) => acc + item.quantity, 0),
      status: order.status, 
    }));
    setData(transformedData); 
  }, [orders]);

  const columns = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "Phone", header: "Phone number" },
    { accessorKey: "topping", header: "Topping" }, // Topping column
    { accessorKey: "quantity", header: "Quantity" }, // Quantity column
    { accessorKey: "status", header: "Status" }, // Status column
  ];

  // const handleDelete = (index) => {
  //   console.log("Delete user at index:", index);
  //   const updatedData = data.filter((_, i) => i !== index);
  //   setData(updatedData);
  // };

  useEffect(() => {
    // Dispatch action to fetch orders when the component mounts
    dispatch(managerFetchOrdersRequest());
  }, [dispatch]);

  return (
    <>
      <AdminUser
        data={data} // Pass the transformed data
        columns={columns} // Pass the required columns
      />
    </>
  );
};

export default UserDashBoard;
