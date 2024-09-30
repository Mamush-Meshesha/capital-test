import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchManagerRequest } from "../../store/slice/adminSlice"
import AdminUser from "../../components/admin/User"

const Managers = () => {

    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const managers = useSelector((state) => state.admin.managers)
    useEffect(() => {
        const transformedData = managers.map((mana) => ({
            name: mana.name,
            email: mana.email,
            phone: mana.phone_number,
            role: mana.Role.name,
            restaurant: mana.restaurant
        }))
        setData(transformedData)
},[managers])
    useEffect(() => {

        dispatch(fetchManagerRequest());
    }, [dispatch])
    const title = "Add Manager"
    const columns = [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "phone", header: "Phone number" },
      { accessorKey: "role", header: "Role" },
      { accessorKey: "restaurant", header: "Restaurant" },
      { accessorKey: "actions", header: "Actions" },
    ];
    return (
        <Box>
<AdminUser data={data} columns={columns} title={title} />
        </Box>
    )
}

export default Managers