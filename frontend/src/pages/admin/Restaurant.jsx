import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createRestaurantRequest, fetchManagerRequest, fetchRestaurantRequest } from "../../store/slice/adminSlice"
import AdminUser from "../../components/admin/User"
const Restaurant = () => {
    const [data, setData] = useState([])
    const restaurant = useSelector((state) => state.admin.restaurant) 
const dispatch = useDispatch()
   
    useEffect(() => {
        const transformedData = restaurant.map((rest) => ({
            name: rest.name,
            location: rest.location,
            created_at: rest.created_at
        }))
        setData(transformedData)
    }, [restaurant])

    const title = "add restaurant"
    const columns = [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "location", header: "Location" },
      { accessorKey: "created_at", header: "CreatedAt" },
    ];

      const formFields = ["name","managerName", "location"]; 
    useEffect(() => {
    dispatch(fetchManagerRequest());
},[dispatch])
    useEffect(() => {
        dispatch(fetchManagerRequest())
    },[dispatch])
    useEffect(() => {
        dispatch(fetchRestaurantRequest())
    }, [dispatch])
    
       const handleSubmit = (formData) => {
         // Dispatch an action to add a new restaurant
         dispatch(createRestaurantRequest(formData));
       };

    return (
      <Box>
        <AdminUser
          data={data}
          columns={columns}
          title={title}
          formFields={formFields}
          onSubmit={handleSubmit}
        />
      </Box>
    );
}

export default Restaurant