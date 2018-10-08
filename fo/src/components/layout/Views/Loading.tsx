import { LinearProgress, Paper, Typography } from "@material-ui/core";
import * as React from "react";

/**
 * Loading Screen
 */
export default class Loading extends React.Component {
    public render() {
        return <React.Fragment>
            <LinearProgress />
            <Paper style={{
                margin: "auto",
                marginTop: 30,
                maxWidth: 700,
                padding: 20,
                width: "calc(100%-40px)"

            }}>
                <Typography variant="title" gutterBottom={true}>
                    [Loading...]
                    </Typography>

            </Paper>
        </React.Fragment>
    }
}