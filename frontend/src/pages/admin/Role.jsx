/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import AdminUser from "../../components/admin/User";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createRolePermissionRequest, fetchRoleRequest } from "../../store/slice/adminSlice";
import { fetchPermissionRequest } from "../../store/slice/manaSlice";
import { Switch } from "@mui/material"; 
import VisibilityIcon from "@mui/icons-material/Visibility"; 
import DeleteIcon from "@mui/icons-material/Delete"; 
import IconButton from "@mui/material/IconButton";
const Role = () => {
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.admin.roles);
  const permissions = useSelector((state) => state.manager.permissions)
  const [data, setData] = useState([]);
  useEffect(() => {
    if (!roles || roles.length === 0) {
      dispatch(fetchRoleRequest());
    }
  }, [dispatch, roles]);

  useEffect(() => {
    if (roles && roles.length > 0) {
      const transformedData = roles.map((role) => ({
        name: role.name,
        created_at: new Date(role.created_at).toLocaleString(),
        action: (
          <>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "#e6f3e6",
                  borderRadius: "12px",
                  height: "26px",
                  paddingX: "10px",
                }}
              >
                Active
                <IconButton onClick={() => handleToggleActive(role.id)}>
                  <Switch size="small" checked={role.active} />
                </IconButton>
              </Box>
              <IconButton onClick={() => handleView(role.id)}>
                <VisibilityIcon color="#404040" />
              </IconButton>
              <IconButton onClick={() => handleDelete(role.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </>
        ), 
      }));
      setData(transformedData);
    }
  }, [roles]);
  useEffect(() => {
   dispatch(fetchPermissionRequest());
  },[dispatch])


   const handleToggleActive = (id) => {
     console.log("Toggle active status for role with ID:", id);
   };

   const handleView = (id) => {
     console.log("View role with ID:", id);
   };

   const handleDelete = (id) => {
     console.log("Delete role with ID:", id);
   };
  const formFields = ["roleName", "permissions"]; 
  const title = "add role";
  const columns = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "created_at", header: "Created At" },
    {
      accessorKey: "action",
      header: "Actions",
      enableSorting: false,
      Cell: ({ cell }) => <div>{cell.getValue()}</div>,
    },
  ];

  const handleSubmit = async (formData) => {
    const rolePayload = {
      roleName: formData.roleName,
      permissions: formData.permissions,
    };
    dispatch(createRolePermissionRequest(rolePayload));
  };

  return (
    <Box>
      <AdminUser
        data={data}
        columns={columns}
        title={title}
        formFields={formFields}
        permission={permissions}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default Role;
