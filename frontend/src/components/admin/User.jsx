/* eslint-disable react/prop-types */
import { MaterialReactTable } from "material-react-table";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import ReusableForm from "../../utils/FormValidation";

const AdminUser = ({
  data,
  columns,
  formFields,
  title,
  onSubmit, 
  roleOptions,
  permission,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFormSubmit = (data) => {
    onSubmit(data); 
    handleClose(); 
  };

  return (
    <Box>
      <MaterialReactTable
        columns={columns}
        data={data}
        renderTopToolbarCustomActions={() => (
          <Button
            style={{
              backgroundColor: "#ff8100",
              color: "white",
            }}
            onClick={handleOpen}
            variant="contained"
          >
            {title}
          </Button>
        )}
      />
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
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 10,
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
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default AdminUser;
