import React from "react";
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
  Link,
} from "@mui/material";

const createFormSchema = (fields) => {
  const schemaFields = {};

  if (fields.includes("email")) {
    schemaFields.email = z.string().email("Invalid email address");
  }

  if (fields.includes("password")) {
    schemaFields.password = z
      .string()
      .min(8, "Password must be at least 8 characters");
  }

  if (fields.includes("passwordConfirm")) {
    schemaFields.passwordConfirm = z.string();
  }

  if (fields.includes("location")) {
    schemaFields.location = z
      .string()
      .min(2, "Location must be at least 2 characters");
  }

  if (fields.includes("phone_number")) {
    schemaFields.phone_number = z
      .string()
      .min(10, "Phone number must be at least 10 digits");
  }

  let schema = z.object(schemaFields);

  if (fields.includes("password") && fields.includes("passwordConfirm")) {
    schema = schema.refine((data) => data.password === data.passwordConfirm, {
      message: "Passwords don't match",
      path: ["passwordConfirm"],
    });
  }

  return schema;
};

const ReusableForm = ({ fields, onSubmit, submitButtonText, formType }) => {
  const formSchema = createFormSchema(fields);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: fields.reduce((acc, field) => ({ ...acc, [field]: "" }), {}),
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      {fields.map((field) => (
        <Controller
          key={field}
          name={field}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              label={
                field.charAt(0).toUpperCase() + field.slice(1).replace("_", " ")
              }
              type={
                field.includes("password")
                  ? "password"
                  : field === "email"
                  ? "email"
                  : field === "phone_number"
                  ? "tel"
                  : "text"
              }
              value={value}
              onChange={onChange}
              error={!!errors[field]}
              helperText={errors[field]?.message}
              variant="outlined"
            />
          )}
        />
      ))}
      {formType === "register" && (
        <FormControlLabel
          control={<Checkbox color="primary" />}
          label="I accept the terms and conditions"
        />
      )}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ height: "48px", background: "#ff9921" }}
      >
        {submitButtonText}
      </Button>
      <Typography>
        {formType === "login" ? (
          <>
            Dont have an account? <Link href="/register">Sign up</Link>
          </>
        ) : (
          <>
            Already have an account? <Link href="/">Login</Link>
          </>
        )}
      </Typography>
    </Box>
  );
};

export default ReusableForm;
