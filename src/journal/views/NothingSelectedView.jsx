import { Box, Grid, Typography } from "@mui/material";
import { StarOutline } from "@mui/icons-material";

export const NothingSelectedView = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "calc(99vh - 110px)",
        backgroundColor: "primary.main",
        borderRadius: 3,
      }}
    >
      <Grid item size={{ xs: 12, sm: 6 }}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <StarOutline sx={{ fontSize: 100, color: "white" }} />
        </Box>
      </Grid>
      <Grid item size={{ xs: 12, sm: 6 }}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography color="white" variant="h5">
            Selecciona o crea una entrada
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
