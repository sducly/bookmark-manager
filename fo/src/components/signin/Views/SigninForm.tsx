import * as React from "react";

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import { Grid } from "@material-ui/core";
import { ISiginFormProps } from "../";
import { ComponentsPathEnum } from '../../workflow';

/**
 * Signin Form
 */
export default class SigninForm extends React.Component<ISiginFormProps, {}> {
    public render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                
                <FormControl margin="normal" required={true} fullWidth={true}>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input id="email" name="email" autoComplete="email" autoFocus={true} />
                </FormControl>

                <FormControl margin="normal" required={true} fullWidth={true}>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        name="password"
                        type="password"
                        id="password"
                        autoComplete="current-password"/>
                </FormControl>

                <Grid container={true} alignContent="flex-end" spacing={24}>
                
                    <Grid item={true} xs={12} sm={4}>
                        <Button
                            type="submit"
                            variant="raised"
                            color="primary"
                            className={classes.submit}>
                            Sign in
                        </Button>
                    </Grid>

                    <Grid item={true} xs={12} sm={8}>
                        <Button
                            href={ComponentsPathEnum.CREATE_ACCOUNT}
                            className={classes.submit}>
                            Create an account
                        </Button>
                    </Grid>

                </Grid>


            </React.Fragment>
        )
    }
}