import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate} from "react-router-dom";
import SearchBar from '../components/searchBar'


const drawerWidth = 240;
const navItems = ["New Products", "Categories", "Login"];

function Header(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 
  
  
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    navigate(`/products?search=${query}`); 
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        eCommerce
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            onClick={() => navigate("/")}
          >
            eCommerce-ReactApp
          </Typography>

          <SearchBar onSearch={handleSearch} inputColor="white" borderBottomColor="white" SearchIconColor="white" />

          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: "center" }} onClick={() => navigate("/")}>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: "center" }} onClick={() => navigate("/products")}>
                <ListItemText primary="Products" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                onClick={() => navigate("/categories")}
              >
                <ListItemText primary="Categories" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}onClick={() => navigate("/login")}>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
}



export default Header;
