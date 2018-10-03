import * as React from "react";

import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { InputWidget, PasswordWidget } from '../../hoc';
import { ICreateAccountFormProps } from "../types";

export default class CreateAccountForm extends React.Component<ICreateAccountFormProps, {}> {
    public render() {
        const {classes} = this.props;
        
        return <React.Fragment>
            <Grid container={true} spacing={24}>
                <InputWidget
                    name="email"
                    label="Email"
                    type="email"
                    colSize={12} />
                <PasswordWidget />
                <InputWidget
                    name="firstName"
                    label="FirstName"
                    colSize={6} />
                <InputWidget
                    name="lastName"
                    label="LastName"
                    colSize={6} />
            </Grid>

            <Button
                type="submit"
                fullWidth={true}
                variant="raised"
                color="primary"
                className={classes.submit}>
                Sign in
            </Button>
        </React.Fragment>
    }
}