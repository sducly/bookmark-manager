import { Divider, Drawer, IconButton, List, withStyles } from "@material-ui/core";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import * as classNames from "classnames";
import * as React from "react";
import Styles from "../../styles";
import { IDrawerProps } from "../../types";
import { mainListItems } from "./Items";

class DrawerView extends React.Component<IDrawerProps, {}> {
    
    public render() {
        const { classes, isOpen, handleDrawerClose } = this.props;

        return <Drawer
            variant="permanent"
            classes={{
                paper: classNames(classes.drawerPaper, !isOpen && classes.drawerPaperClose),
            }}
            open={isOpen}>

            <div className={classes.toolbarIcon}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>

            <Divider />
            <List>
                {mainListItems}
            </List>
        </Drawer>
    }
}

export default withStyles(Styles as any)(DrawerView);