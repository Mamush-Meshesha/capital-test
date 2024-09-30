import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchRestaurantRequest } from "../../store/slice/adminSlice"
import AdminUser from "../../components/admin/User"
const Restaurant = () => {
    const [data, setData] = useState([])
    const restaurant = useSelector((state) => state.admin.restaurant)
const dispatch = useDispatch()
   
    useEffect(() => {
        const transformedData = restaurant.map((rest) => ({
            name: rest.name,
            email: rest.email,
            phone: rest.phone_number,
            location: rest.location
        }))
        setData(transformedData)
    }, [restaurant])
    const title = "add restaurant"
    const columns = [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "Phone", header: "Phone number" },
        { accessorKey: "email", header: "Email" },
      { accessorKey: "location", header: "Location" },
      { accessorKey: "action", header: "Actions" },
    ];
    
    useEffect(() => {
        dispatch(fetchRestaurantRequest())
    },[dispatch])
    return (
        <Box>
            <AdminUser data={data} columns={columns} title={title} />
        </Box>
    )
}

export default Restaurant