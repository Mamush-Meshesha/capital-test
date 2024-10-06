/* eslint-disable react/prop-types */
import { MaterialReactTable } from "material-react-table";
import { Box, Button, Modal, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import ReusableForm from "../../utils/FormValidation";
import { useSelector } from "react-redux";

const AdminUser = ({
  data,
  columns,
  formFields,
  title,
  onSubmit, 
  permission,
}) => {
  const [open, setOpen] = useState(false);
  const managers = useSelector((state) => state.admin.managers)
    const roles = useSelector((state) => state.admin.roles) || []
  const managerOptions = managers.map((manager) => ({
    value: manager.name, 
    label: manager.name, 
  }));

  const roleOptions = roles.map((role) => ({
    value: role.name,
    label: role.name
  }))
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFormSubmit = (data) => {
    onSubmit(data); 
    handleClose(); 
  };

   const theme = useTheme();
   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
   const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

   const responsiveColumns = columns.map((column) => ({
     ...column,
     size: isSmallScreen ? 100 : isMediumScreen ? 150 : 200,
   }));


  return (
    <Box >
      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <MaterialReactTable
          columns={responsiveColumns}
          data={data}
          renderTopToolbarCustomActions={() => (
            <Button
              style={{
                backgroundColor: "#ff8100",
                color: "white",
              }}
              onClick={handleOpen}
              variant="contained"
              size="small"
              sx={{ px: { xs: 1, sm: 2 } }}
            >
              {title}
            </Button>
          )}
          muiTableProps={{
            sx: {
              tableLayout: "fixed",
            },
          }}
          muiTableBodyCellProps={{
            sx: {
              whiteSpace: "normal",
              wordWrap: "break-word",
            },
          }}
          enableColumnResizing
          columnResizeMode="onChange"
          defaultColumn={{
            minSize: 50,
            maxSize: 300,
          }}
          layoutMode="grid"
          density={isSmallScreen ? "compact" : "comfortable"}
        />
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 500 },
            maxWidth: "90%",
            maxHeight: "90vh",
            overflowY: "auto",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: { xs: 2, sm: 4, md: 10 },
            borderRadius: "20px",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
            {title}
          </Typography>
          <ReusableForm
            fields={formFields}
            onSubmit={handleFormSubmit}
            submitButtonText="Submit"
            formType="admin"
            roleOptions={roleOptions}
            permission={permission}
            managerOptions={managerOptions}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default AdminUser;
