import * as React from "react";

import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { InputWidget, PasswordWidget } from '../../../libs/widgets';
import { ICreateAccountFormProps } from "../types";

export default class CreateAccountForm extends React.Component<ICreateAccountFormProps, {}> {
    public render() {
        const { classes } = this.props;

        return <React.Fragment>
            <Grid container={true} spacing={24}>

                <Grid item={true} xs={12}>
                    <InputWidget
                        name="email"
                        label="Email"
                        type="email"/>
                </Grid>

                <PasswordWidget />

                <Grid item={true} xs={12} sm={6}>
                    <InputWidget
                        name="firstName"
                        label="FirstName"/>
                </Grid>

                <Grid item={true} xs={12} sm={6}>
                    <InputWidget
                        name="lastName"
                        label="LastName"/>
                </Grid>

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