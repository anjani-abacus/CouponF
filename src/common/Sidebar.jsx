import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Divider, Typography, Box,} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SpaceDashboardSharpIcon from "@mui/icons-material/SpaceDashboardSharp";
import SettingsIcon from "@mui/icons-material/Settings";

import { useLocation, useNavigate } from "react-router-dom";
import {  OfflineShareRounded, ProductionQuantityLimits } from "@mui/icons-material";
const iconstyle = {
  borderRadius: "10px",
  backgroundColor: "rgb(233, 236, 239)",
  padding: "5px",
  boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.5)",
};
const menu = [
  {
    icon: <DashboardIcon sx={iconstyle} />,
    title: "Dashboard",
    path: "/dashboard",
  },
  
  {
    icon: <ProductionQuantityLimits sx={iconstyle}/>,
    title: "Products",
    path :"/product",
  
  },
  {
    icon: <OfflineShareRounded sx={iconstyle}/>,
    title: "Coupons",
    path :"/coupon",
  
  },
  {
    icon: <SettingsIcon sx={iconstyle} />,
    title: "Setting",
    path: "/setting",
  },
 
  
   
];

const Sidebar = () => {
  const navigate = useNavigate();
  const query = useLocation();
  console.log({ query: query.pathname });

  return (
    <Drawer
      variant="permanent"
      elevation={0}
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          borderRight: "none",
          padding: "10px",
          borderTopRightRadius: "20px",
          borderBottomRightRadius: "20px",
          height: "100vh",
          overflowY: "auto",
          backgroundColor: "#ffffff",
          boxShadow: 2,
        },
      }}
    >
      <Box sx={{ textAlign: "center", padding: "20px", fontWeight: "bold" }}>
        <SpaceDashboardSharpIcon />
        <Typography variant="h6">Dashboard</Typography>
      </Box>
      <Divider></Divider>

      <List>
        {menu.map((item, index) => (
          <ListItemButton
            sx={{
              "&:hover .MuiListItemIcon-root": { color: "#fba23c" },
              color: item.path === query.pathname ? "white" : "inherit",
              bgcolor: item.path === query.pathname ? "#fba23c" : "inherit",
              borderTopRightRadius:
                item.path === query.pathname ? 30 : "inherit",
              borderBottomRightRadius:
                item.path === query.pathname ? 30 : "inherit",
                "&:hover": item.path === query.pathname
                ? {
                    bgcolor: "#e8912d", // Slightly darker shade for hover effect
                    color: "black",
                  }
                : {},
            }}
            onClick={() => navigate(item.path)}
            key={index}
          >
            {" "}
            <Box>
              <ListItemIcon
              className="MuiListItemIcon-root"
                sx={{

                  color: item.path === query.pathname ? "#fba23c" : "inherit",
                }}
              >
                {item.icon}
              </ListItemIcon>
            </Box>
            <ListItemText primary={item.title} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
