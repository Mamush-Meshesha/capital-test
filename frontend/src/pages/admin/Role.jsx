import { Box } from "@mui/material";
import AdminUser from "../../components/admin/User";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchRoleRequest } from "../../store/slice/adminSlice";

const Role = () => {
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.admin.roles);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch roles only if roles are empty
    if (!roles || roles.length === 0) {
      dispatch(fetchRoleRequest());
    }
  }, [dispatch, roles]);

  useEffect(() => {
    if (roles && roles.length > 0) {
      // Transform roles data to the format expected by the table
      const transformedData = roles.map((role) => ({
        name: role.name,
        created_at: new Date(role.created_at).toLocaleString(), // Format date as needed
        action: <button onClick={() => handleAction(role.id)}>Action</button>, // Example action button
      }));
      setData(transformedData);
    }
  }, [roles]);

  const handleAction = (id) => {
    console.log("Perform action for role with ID:", id);
    // Implement your action logic here
  };
const title = "add role"
  const columns = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "created_at", header: "Created At" },
    { accessorKey: "action", header: "Actions" },
  ];

  return (
    <Box>
      <AdminUser data={data} columns={columns} title={title} />
    </Box>
  );
};

export default Role;
