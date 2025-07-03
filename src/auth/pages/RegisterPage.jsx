import { Link as RouterLink } from "react-router";
import {
  Grid,
  TextField,
  Button,
  Link,
  Typography,
  Alert,
} from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";

const formData = {
  displayName: "",
  email: "",
  password: "",
};

const formValidations = {
  email: [(value) => value.includes("@"), "El correo debe de tener un @."],
  password: [
    (value) => value.length >= 6,
    "La contraseña debe de tener mas de 6 caracteres.",
  ],
  displayName: [(value) => value.length >= 1, "El nombre es obligatorio."],
};

export const RegisterPage = () => {
  const dispatch = useDispatch();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector((state) => state.auth);
  const isCheckingAuthentication = useMemo(
    () => status === "checking",
    [status]
  );

  const {
    displayName,
    displayNameValid,
    email,
    emailValid,
    password,
    passwordValid,
    onInputChange,
    formState,
    isFormValid,
  } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    dispatch(startCreatingUserWithEmailPassword(formState));
  };

  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Nombre completo"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          <Grid item size={12} display={!!errorMessage ? "" : "none"}>
            <Alert severity="error">{errorMessage}</Alert>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button
              disabled={isCheckingAuthentication}
              type="submit"
              fullWidth
              variant="contained"
            >
              Crear cuenta
            </Button>
          </Grid>
        </Grid>
      </form>
      <Grid
        container
        direction="row"
        justifyContent="end"
        alignItems="center"
        sx={{ mt: 2 }}
      >
        <Grid item>
          <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>
        </Grid>
        <Grid item>
          <Link component={RouterLink} color="inherit" to="/auth/login">
            Inicia sesión
          </Link>
        </Grid>
      </Grid>
    </AuthLayout>
  );
};
