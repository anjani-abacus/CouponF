import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../common/sidebar";
import Header from "../common/Headers";
const AppLayout = () => {
  return (
    <Grid container spacing={0}> 
      <Grid sx={{ width: "265px", height: "100vh", position: "fixed", top: 0, left: 0 }}>
        <Sidebar />
      </Grid>
 
      <Grid   sx={{ marginLeft: "265px", width: "calc(100% - 265px)" }}>
        <Header />
        <Box sx={{ padding: "20px" }}>
          <Outlet />
        </Box>
      </Grid>
    </Grid>
  );
};

export default AppLayout;
