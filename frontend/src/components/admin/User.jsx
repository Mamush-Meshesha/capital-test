/* eslint-disable react/prop-types */
import { MaterialReactTable } from "material-react-table";
import { Box, Button } from "@mui/material";

const AdminUser = ({ data, columns, onAddManager,title }) => {
  return (
    <Box>
      <MaterialReactTable
        columns={columns} 
        data={data}
        renderTopToolbarCustomActions={() => (
          <Button
            style={{
              backgroundColor: "#ff8100",
              color: "white", // Ensuring text is visible on orange background
            }}
            onClick={onAddManager}
            variant="contained"
          >
            {title}
          </Button>
        )}
     
      />
    </Box>
  );
};

export default AdminUser;
