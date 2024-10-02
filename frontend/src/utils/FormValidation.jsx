/* eslint-disable react/prop-types */
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  Typography,
  // Link,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormGroup,
  Grid2,
} from "@mui/material";

const createFormSchema = (fields) => {
  const schemaFields = {};

  fields.forEach((field) => {
    switch (field) {
      case "email":
        schemaFields.email = z.string().email("Invalid email address");
        break;

      case "password":
        schemaFields.password = z
          .string()
          .min(8, "Password must be at least 8 characters");
        break;
      case "passwordConfirm":
        schemaFields.passwordConfirm = z.string();
        break;
      case "location":
        schemaFields.location = z
          .string()
          .min(2, "Location must be at least 2 characters");
        break;
      case "phone_number":
        schemaFields.phone_number = z
          .string()
          .min(10, "Phone number must be at least 10 digits");
        break;
      case "image":
        schemaFields.image = z
          .instanceof(File)
          .optional()
          .or(z.string().optional());
        break;
      case "roleName":
        schemaFields.roleName = z.string().min(1, "Role name is required");
        break;
      case "managerName":
        schemaFields.managerName = z
          .string()
          .min(1, "Manager  name is required");
        break;
      case "name":
        schemaFields.name = z
          .string()
          .min(1, "Manager  name is required");
        break;
      case "permissions":
        schemaFields.permissions = z.array(z.string());
        break;
      default:
        schemaFields[field] = z.string().optional();
    }
  });

  let schema = z.object(schemaFields);

  if (fields.includes("password") && fields.includes("passwordConfirm")) {
    schema = schema.refine((data) => data.password === data.passwordConfirm, {
      message: "Passwords don't match",
      path: ["passwordConfirm"],
    });
  }

  return schema;
};

const ReusableForm = ({
  fields,
  onSubmit,
  submitButtonText,
  roleOptions = [],
  permission = [],
  managerOptions = [],
  name=[]
}) => {
  const formSchema = createFormSchema(fields);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: fields.reduce((acc, field) => {
      if (field === "permissions") {
        acc[field] = [];
      } else {
        acc[field] = "";
      }
      return acc;
    }, {}),
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))} 
      noValidate
      sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      {fields.map((field) => (
        <Controller
          key={field}
          name={field}
          control={control}
          render={({ field: { onChange, value } }) => {
            switch (field) {
              case "image":
                return (
                  <TextField
                    fullWidth
                    type="file"
                    InputLabelProps={{ shrink: true }}
                    label="Upload Image"
                    inputProps={{ accept: "image/*" }}
                    onChange={(e) => onChange(e.target.files[0])}
                    error={!!errors[field]}
                    helperText={errors[field]?.message}
                  />
                );
              case "managerName":
                return (
                  <>
                    <FormControl fullWidth error={!!errors[field]}>
                      <InputLabel id="manager-select-label">Manager</InputLabel>
                      <Select
                        labelId="manager-select-label"
                        value={
                          managerOptions.find(
                            (option) => option.value === value
                          )
                            ? value
                            : ""
                        }
                        onChange={(e) => {
                          const selectedValue = e.target.value;
                          onChange(selectedValue); 
                        }}
                        label="Manager"
                      >
                        {managerOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors[field] && (
                        <Typography variant="caption" color="error">
                          {errors[field]?.message}
                        </Typography>
                      )}
                    </FormControl>
                  </>
                );

              case "roleName":
                return (
                  <>
                    <FormControl fullWidth error={!!errors[field]}>
                      <InputLabel id="role-select-label">Role</InputLabel>
                      <Select
                        labelId="role-select-label"
                        value={
                          roleOptions.find((option) => option.value === value)
                            ? value
                            : "new"
                        }
                        onChange={(e) => {
                          const selectedValue = e.target.value;
                          if (selectedValue === "new") {
                            onChange(""); 
                          } else {
                            onChange(selectedValue); 
                          }
                        }}
                        label="Role"
                      >
                        {roleOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                        <MenuItem value="new">Create New Role</MenuItem>
                      </Select>
                      {errors[field] && (
                        <Typography variant="caption" color="error">
                          {errors[field]?.message}
                        </Typography>
                      )}
                    </FormControl>

                    {value === "" && (
                      <TextField
                        fullWidth
                        label="New Role Name"
                        value={value}
                        onChange={(e) => onChange(e.target.value)} 
                        error={!!errors[field]}
                        helperText={errors[field]?.message}
                      />
                    )}
                  </>
                );

              case "permissions":
                return (
                  <FormControl component="fieldset" variant="standard">
                    <Typography variant="subtitle1">Permissions</Typography>
                    <FormGroup>
                      <Grid2 gap="20px">
                        {permission.map((perm) => (
                          <FormControlLabel
                            key={perm}
                            control={
                              <Checkbox
                                checked={value.includes(perm)} 
                                onChange={(e) => {
                                  const updatedPermissions = e.target.checked
                                    ? [...value, perm] 
                                    : value.filter((p) => p !== perm); 
                                  onChange(updatedPermissions); 
                                }}
                                name={perm}
                              />
                            }
                            label={perm}
                          />
                        ))}
                      </Grid2>
                    </FormGroup>
                  </FormControl>
                );
              default:
                return (
                  <TextField
                    fullWidth
                    label={
                      field.charAt(0).toUpperCase() +
                      field.slice(1).replace("_", " ")
                    }
                    type={
                      field.includes("password")
                        ? "password"
                        : field === "email"
                        ? "email"
                        : "text"
                    }
                    value={value}
                    onChange={onChange}
                    error={!!errors[field]}
                    helperText={errors[field]?.message}
                    variant="outlined"
                  />
                );
            }
          }}
        />
      ))}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ height: "48px", background: "#ff9921" }}
      >
        {submitButtonText}
      </Button>
    </Box>
  );
};

export default ReusableForm;