import * as React from "react";

import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { HiddenWidget, InputWidget, PasswordWidget } from '../../../libs/widgets';
import { User } from "../../../schema";
import { ICreateAccountFormProps } from "../types";

export default class CreateAccountForm extends React.Component<ICreateAccountFormProps, {}> {
    public render() {
        const { classes } = this.props;

        const user = (this.props.user) ? this.props.user: new User();

        return <React.Fragment>
            <Grid container={true} spacing={24}>

                <Grid item={true} xs={12}>
                    <InputWidget
                        name="email"
                        label="Email"
                        type="email"
                        defaultValue={user.email}/>
                </Grid>

                <PasswordWidget required={false} defaultValue={user.password}/>

                <Grid item={true} xs={12} sm={6}>
                    <InputWidget
                        name="firstName"
                        label="Firstname"
                        defaultValue={user.firstName}/>
                </Grid>

                <Grid item={true} xs={12} sm={6}>
                    <InputWidget
                        name="lastName"
                        label="Lastname"
                        defaultValue={user.lastName}/>
                </Grid>
            </Grid>

            <HiddenWidget name="id" value={user.id}/>

            <Button
                type="submit"
                fullWidth={true}
                variant="raised"
                color="primary"
                className={classes.submit}>
                {(user.id) ? "OK" : "Sign in"}
            </Button>
            
        </React.Fragment>
    }
}