import { LinearProgress, Paper, Typography, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Styles from "../styles";

/**
 * Loading Screen
 */
class Loading extends React.Component<WithStyles<any>, {}> {
    public render() {
        const {classes} = this.props;

        return <React.Fragment>
            <LinearProgress />
            <Paper className={classes.paperContainer}>
                <Typography variant="title" gutterBottom={true}>
                    [Loading...]
                    </Typography>

            </Paper>
        </React.Fragment>
    }
}

export default withStyles(Styles as any)(Loading);