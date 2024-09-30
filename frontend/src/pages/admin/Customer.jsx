import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCustomersRequest } from "../../store/slice/adminSlice"
import AdminUser from "../../components/admin/User"
const Customer = () => {
    const [data, setData] = useState([])
    const dispatch = useDispatch()
    const customers = useSelector((state) => state.admin.customers)
    useEffect(() => {
        const transformedData = customers.map((user) => ({
            name: user.name,
            Phone: user.phone_number,
            email: user.email
        }))
        setData(transformedData)
    },[customers])
    useEffect(() => {
        dispatch(fetchCustomersRequest())
    }, [dispatch])
    
  const title = "add user"
    const columns = [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "Phone", header: "Phone number" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "action", header: "Actions" },
    ];
    return (
      <Box>
        <AdminUser
          data={data} 
          columns={columns} 
          title={title}
        />
      </Box>
    );
}

export default Customer