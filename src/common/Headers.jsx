import {useState} from "react";
import { AppBar, Toolbar, Typography, InputBase, IconButton, Box, Breadcrumbs, Link, Divider } from "@mui/material";
import { Search, Home, AccountCircle, Settings, Notifications } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import { useUserLogoutMutation } from "../store/services/authApi";
import { useDispatch } from "react-redux";
import { setToken } from "../store/feature/authSlice";
import { toast } from "react-toastify";

const Header = () => {
	 const dispatch = useDispatch();
	const navigate = useNavigate();
	const [userLogout]=useUserLogoutMutation();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose =async () => {
		setAnchorEl(null)
	};

	const query = useLocation()
	console.log({ query: query.pathname });
    
	const handleLogout=async ()=>{
		try {
			await userLogout().unwrap();
            dispatch(setToken(null)); 
			toast.warn('LogOut Successfully !');
			navigate('/login');
		} catch (error) {
			toast.error(error?.data?.message || "LogOut failed");
			console.log(error?.message )
		}
	}

	return (
		<AppBar position="static" color="default" elevation={1}
			sx={{
				backgroundColor: "rgba(255, 255, 255, 0.8)", padding: "3px", borderRadius: "10px", width: "100%"
			}}>

			<Toolbar
				sx={{ display: "flex", justifyContent: "space-between" }}>
				<Box
					sx={{ display: "flex", alignItems: "center" }}>
					<Breadcrumbs aria-label="breadcrumb">
						<Link href="dashboard" color="inherit"
							sx={{ display: "flex", alignItems: "center", }}>
							<Home fontSize="small"
								sx={{ color: "#fba23c" }} />
							Dashboard
						</Link>
						<Typography fontWeight="bold">{query.pathname?.slice(1)}</Typography>
					</Breadcrumbs>
				</Box>

				<Box sx={{ display: "flex", alignItems: "center" }}>
					<Box sx={{ display: "flex", alignItems: "center", backgroundColor: "#white", borderRadius: "10px", padding: "3px 3px", width: "250px", border: "1px solid #ccc" }}>
						<Search color="action" />
						<InputBase placeholder="Type here..." sx={{ ml: 1, flex: 1, }} />
					</Box>
					<IconButton
						id="basic-button"
						aria-controls={open ? 'basic-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={open ? 'true' : undefined}
						onClick={handleClick}>
						<AccountCircle
							sx={{ fontSize: "19px", mr: 0.5, color: "#fba23c" }} />
						<Typography variant="body1" color="black" >ANJANI</Typography>
					</IconButton>
					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						slotProps={{
							'aria-labelledby': 'basic-button',
						}}
					>
                    <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
						<MenuItem onClick={()=>{handleLogout()}}>Logout</MenuItem>
					</Menu>


					
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Header;

