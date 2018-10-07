import { AppBar, withStyles } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import * as React from "react";
import Styles from "../../styles";
import { IHeaderProps } from "../../types";

class Header extends React.Component<IHeaderProps, {}> {
    public render() {
        const { classes, isOpen, handleDrawerOpen, user, logOut } = this.props;
        return <AppBar
        position="absolute"
        className={classNames(classes.appBar, isOpen && classes.appBarShift)}
      >
        <Toolbar disableGutters={!isOpen} className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={classNames(
              classes.menuButton,
              isOpen && classes.menuButtonHidden,
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" noWrap={true} className={classes.title}>
            {user.lastName} {user.firstName}
          </Typography>
          <IconButton color="inherit" onClick={logOut}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    }
}

export default withStyles(Styles as any)(Header);