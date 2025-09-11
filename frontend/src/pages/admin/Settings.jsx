import {
  Box,
  Paper,
  Typography,
  Switch,
  FormControlLabel,
  Divider,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Slider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useThemeMode } from "../../theme/ThemeProvider.jsx";

const Settings = () => {
  const { mode, setMode, effectiveMode } = useThemeMode();
  const [localMode, setLocalMode] = useState(mode);

  useEffect(() => setLocalMode(mode), [mode]);

  const handleSave = () => setMode(localMode);

  return (
    <Box sx={{ maxWidth: 980, mx: "auto", display: "grid", gap: 3 }}>
      {/* Preferences */}
      <Paper sx={{ p: 3, borderRadius: 3 }} elevation={0}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          Preferences
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Customize your admin experience
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="theme-mode">Theme</InputLabel>
              <Select
                labelId="theme-mode"
                value={localMode}
                label="Theme"
                onChange={(e) => {
                  const value = e.target.value;
                  setLocalMode(value);
                  setMode(value);
                }}
              >
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
                <MenuItem value="system">System</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="language">Language</InputLabel>
              <Select labelId="language" defaultValue="en" label="Language">
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="am">Amharic</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={<Switch />}
              label="Compact table density"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel control={<Switch />} label="Sticky header" />
          </Grid>
        </Grid>
      </Paper>

      {/* Notifications */}
      <Paper sx={{ p: 3, borderRadius: 3 }} elevation={0}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          Notifications
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Order updates"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel control={<Switch />} label="Weekly summaries" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Notification volume
            </Typography>
            <Slider defaultValue={70} size="small" />
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Effective: {effectiveMode}
          </Typography>
          <Button
            variant="contained"
            sx={{ background: "#ff9921" }}
            onClick={handleSave}
          >
            Save settings
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Settings;
