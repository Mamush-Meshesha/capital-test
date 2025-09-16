import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchManagerRequest,
  fetchRoleRequest,
} from "../../store/slice/adminSlice";
import AdminUser from "../../components/admin/User";
import { managerRegisterRequest } from "../../store/slice/manaSlice";


const Managers = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const managers = useSelector((state) => state?.admin?.managers || []);
  const roles = useSelector((state) => state?.admin?.roles || []);

  console.log(roles);
  useEffect(() => {
    const transformedData = managers?.map((mana) => ({
      name: mana.name,
      email: mana.email,
      phone: mana.phone_number,
      role: mana.Role.name,
      restaurant: mana.restaurant,
    }));
    setData(transformedData);
  }, [managers]);
  useEffect(() => {
    dispatch(fetchManagerRequest());
  }, [dispatch]);
  useEffect(() => {
    if (!roles || roles.length === 0) {
      dispatch(fetchRoleRequest());
    }
  }, [dispatch, roles]);

  const title = "Add Manager";
  const columns = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Phone number" },
    { accessorKey: "role", header: "Role" },
    { accessorKey: "restaurant", header: "Restaurant" },
    { accessorKey: "actions", header: "Actions" },
  ];

  const formFields = [
    "name",
    "email",
    "phone_number",
    "password",
    "password_confirm",
    "location",
    "roleName",
  ];
  const roleOptions = roles.map((role) => ({
    value: role.name,
    label: role.name.charAt(0).toUpperCase() + role.name.slice(1),
  }));

  const handleSubmit = async (data) => {
    console.log("Form Data:", data);
    dispatch(managerRegisterRequest(data));
  };

  return (
    <Box>
      <AdminUser
        data={data}
        columns={columns}
        title={title}
        formFields={formFields}
        roleOptions={roleOptions}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default Managers;
