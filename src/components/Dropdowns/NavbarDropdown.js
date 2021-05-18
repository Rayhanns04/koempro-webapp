import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router";
// @material-ui/icons components
import DirectionsRun from "@material-ui/icons/DirectionsRun";
// import EventNote from "@material-ui/icons/EventNote";
// import LiveHelp from "@material-ui/icons/LiveHelp";
// import Settings from "@material-ui/icons/Settings";
import Person from "@material-ui/icons/Person";

// core components
import componentStyles from "assets/theme/components/navbar-dropdown.js";

// Addons components
import IntekLogo from "../../assets/images/logo-intek.png";

const useStyles = makeStyles(componentStyles);

export default function NavbarDropdown() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  let history = useHistory();

  const signOut = () => {
    sessionStorage.removeItem("accessToken");
    history.push("/");
  };

  const handleToDashboard = () => {
    history.push("/");
  };

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Typography
        variant="h6"
        component="h6"
        classes={{ root: classes.menuTitle }}
      >
        Welcome!
      </Typography>

      <Box
        display="flex!important"
        alignItems="center!important"
        component={MenuItem}
        onClick={() => handleToDashboard()}
        to="/admin/projects"
      >
        <Box
          component={Person}
          width="1.25rem!important"
          height="1.25rem!important"
          marginRight="1rem"
        />
        <span>User Page</span>
      </Box>
      <Divider component="div" classes={{ root: classes.dividerRoot }} />
      <Box
        display="flex!important"
        alignItems="center!important"
        component={MenuItem}
        onClick={() => signOut()}
      >
        <Box
          component={DirectionsRun}
          width="1.25rem!important"
          height="1.25rem!important"
          marginRight="1rem"
        />
        <span>Logout</span>
      </Box>
    </Menu>
  );

  return (
    <>
      <Button
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
        classes={{
          label: classes.buttonLabel,
          root: classes.buttonRoot,
        }}
      >
        <Avatar
          alt="..."
          src={IntekLogo}
          classes={{
            root: classes.avatarRoot,
          }}
        />
        <Hidden smDown>Admin Koempro</Hidden>
      </Button>
      {renderMenu}
    </>
  );
}
