import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  InputAdornment,
} from "@mui/material";
import {
  IoCloudUploadOutline,
  IoEyeOffOutline,
  IoEyeOutline,
} from "react-icons/io5";
import { useState } from "react";

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Box sx={{ maxWidth: 980, mx: "auto", display: "grid", gap: 3 }}>
      <Paper sx={{ p: 3, borderRadius: 3 }} elevation={0}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Avatar sx={{ width: 72, height: 72, bgcolor: "#0f172a" }}>A</Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Admin Profile
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage your personal information and security settings
            </Typography>
          </Box>
          <Box sx={{ ml: "auto" }}>
            <Tooltip title="Upload new avatar">
              <IconButton color="primary">
                <IoCloudUploadOutline />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField label="Full Name" fullWidth defaultValue="Admin" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              defaultValue="admin@example.com"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Phone" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Location" fullWidth />
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button variant="contained" sx={{ background: "#ff9921" }}>
            Save changes
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, borderRadius: 3 }} elevation={0}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
          Security
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Current Password"
              type={showPassword ? "text" : "password"}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="New Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((s) => !s)}>
                      {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Confirm New Password"
              type={showPassword ? "text" : "password"}
              fullWidth
            />
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button variant="outlined" sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" sx={{ background: "#ff9921" }}>
            Update password
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
