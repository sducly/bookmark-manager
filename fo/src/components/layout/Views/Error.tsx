import { Paper, Typography, withStyles } from "@material-ui/core";
import * as React from "react";
import { IErrorProps } from "../";
import Styles from "../styles";

/**
 * Error Screen
 */
class Error extends React.Component<IErrorProps, {}> {
    public render() {
        const {classes} = this.props;
        const { error } = this.props;

        return <Paper className={classes.paperContainer}>
            <Typography variant="title" gutterBottom={true}>
                [Hum... Houston, we have a problem]
            </Typography>

            {(error.networkError) ?
                <div>
                    <p>[Initialization]: BO is being deployed</p>
                    <p>Please wait, the page will refresh automatically</p>
                </div> :
                <p>{error.name}: {error.message}</p>
            }
        </Paper>

    }

}

export default withStyles(Styles as any)(Error);