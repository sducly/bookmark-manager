import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';

import classNames from 'classnames';
import * as React from "react";
import Styles from "../styles";

import { withStyles } from '@material-ui/core/styles';

import { mainListItems } from "../";
import { RemoveToken } from '../../user';
import { ComponentsPathEnum, redirect } from '../../workflow';
import { ILayoutProps } from '../types';

class Layout extends React.Component<ILayoutProps, {open: boolean}> {

  constructor(props: ILayoutProps) {
    super(props);

    this.state = {
      open: true
    }

    this.logOut = this.logOut.bind(this);
  }

  public render() {
    const { classes, user } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
          >
            <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  this.state.open && classes.menuButtonHidden,
                )}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap={true} className={classes.title}>
                {user.lastName} {user.firstName}
              </Typography>
              <IconButton color="inherit" onClick={this.logOut}>
                  <ExitToAppIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>{mainListItems}</List>
          </Drawer>
          <main className={classes.content}>
            {this.props.children}
          </main>
        </div>
      </React.Fragment>
    );
  }

  private logOut() {
    RemoveToken();
    redirect(ComponentsPathEnum.HOME);
  }

  private handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  private handleDrawerClose = () => {
    this.setState({ open: false });
  };
}

export default withStyles(Styles as any)(Layout);