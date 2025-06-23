import { Box, Typography, Paper } from "@mui/material";

export default function Dashboard() {
  return (
    <Box >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 6,
          backgroundColor: "white",
          border: "2px solid orange",
          textAlign: "center",

        }}
      >
        <Typography variant="h3" fontWeight="bold" color="orange" gutterBottom>
          Welcome to the Dashboard!
        </Typography>

        <img
          src="../../../src/assets/5124551.jpg"
          alt="Dashboard Visual"
          width="50%"
          style={{
            border: "4px solid orange",
            borderRadius: "30px",
            marginTop: "20px",
          }}
        />
      </Paper>
    </Box>
  );
}
