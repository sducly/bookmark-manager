import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import * as React from "react";
import { Header } from '..';
import { RemoveToken } from '../../user';
import { ComponentsPathEnum, redirect } from '../../workflow';
import Styles from "../styles";
import { ILayoutProps } from '../types';
import Drawer from './Includes/Drawer';

class Layout extends React.Component<ILayoutProps, { open: boolean }> {

  constructor(props: ILayoutProps) {
    super(props);

    this.state = {
      open: true
    }
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  public render() {
    const { classes, user } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />

        <div className={classes.root}>
          
          <Header user={user} handleDrawerOpen={this.handleDrawerOpen} isOpen={this.state.open} logOut={this.logOut}/>
          
          <Drawer handleDrawerClose={this.handleDrawerClose} isOpen={this.state.open}/>

          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
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