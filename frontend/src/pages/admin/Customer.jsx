import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCustomersRequest } from "../../store/slice/adminSlice"
import AdminUser from "../../components/admin/User"
import { Switch } from "@mui/material"; 
import DeleteIcon from "@mui/icons-material/Delete"; 
import IconButton from "@mui/material/IconButton";
const Customer = () => {
    const [data, setData] = useState([])
    const dispatch = useDispatch()
    const customers = useSelector((state) => state.admin.customers) || []
    useEffect(() => {
        const transformedData = customers.map((user) => ({
            name: user.name,
            Phone: user.phone_number,
          email: user.email,
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
                <IconButton onClick={() => handleToggleActive(user.id)}>
                  <Switch size="small" checked={user.active} />
                </IconButton>
              </Box>
              <IconButton onClick={() => handleDelete(user.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </>
        ), 
        }))
        setData(transformedData)
    },[customers])
    useEffect(() => {
        dispatch(fetchCustomersRequest())
    }, [dispatch])
    
   const handleToggleActive = (id) => {
     console.log("Toggle active status for role with ID:", id);
   };

   const handleDelete = (id) => {
     console.log("Delete role with ID:", id);
   };
  
  const formFields = ["name", "phone_number", "email","password", "roleName"]; 
  const title = "add user"
    const columns = [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "Phone", header: "Phone number" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "action", header: "Actions", minwidth: 30 },
    ];
  
  // const handleSubmit = (formData) => {
  //   dispatch()
  // }
    return (
      <Box>
        <AdminUser
          data={data} 
          columns={columns} 
          title={title}
          formFields={formFields}
        />
      </Box>
    );
}

export default Customer