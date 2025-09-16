/* eslint-disable react/prop-types */
import { MaterialReactTable } from "material-react-table";
import {
  Box,
  Button,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
  Divider,
  Fade,
  Backdrop,
} from "@mui/material";
import { IoClose } from "react-icons/io5";
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
  const managers = useSelector((state) => state?.admin?.managers);
  const roles = useSelector((state) => state?.admin?.roles) || [];
  const managerOptions = managers?.map((manager) => ({
    value: manager.name,
    label: manager.name,
  }));

  const roleOptions = roles.map((role) => ({
    value: role.name,
    label: role.name,
  }));
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
    <Box>
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
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 200 } }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "92%", sm: 520 },
              maxWidth: "92%",
              maxHeight: "90vh",
              overflowY: "auto",
              bgcolor: "#ffffff",
              boxShadow: "0px 10px 30px rgba(2,6,23,0.18)",
              border: "1px solid #e2e8f0",
              borderRadius: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 3,
                py: 2,
              }}
            >
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ fontWeight: 700 }}
              >
                {title}
              </Typography>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                size="small"
                sx={{ color: "#475569" }}
              >
                <IoClose />
              </IconButton>
            </Box>
            <Divider />
            <Box sx={{ p: { xs: 2, sm: 3 } }}>
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
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default AdminUser;
