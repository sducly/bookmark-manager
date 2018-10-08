import { Paper, Typography } from "@material-ui/core";
import * as React from "react";
import { IErrorProps } from "../";

/**
 * Error Screen
 */
export default class Error extends React.Component<IErrorProps, {}> {
    public render() {
        const { error } = this.props;

        return <Paper style={{
            margin: "auto",
            marginTop: 30,
            maxWidth: 700,
            padding: 20,
            width: "calc(100%-40px)"

        }}>
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