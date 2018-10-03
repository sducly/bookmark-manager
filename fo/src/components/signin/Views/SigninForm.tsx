import * as React from "react";

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import { ISiginFormProps } from "../";
import { ComponentsPathEnum } from '../../workflow';

export default class SigninForm extends React.Component<ISiginFormProps, {}> {
    public render() {
        const { classes } = this.props;
        return <React.Fragment>
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
                    autoComplete="current-password"
                />
            </FormControl>

            <Button
                href={ComponentsPathEnum.CREATE_ACCOUNT}
                className={classes.submit}
                style={{
                    float: "right"
                }}>
                Create a account
            </Button>
            <Button
                type="submit"
                variant="raised"
                color="primary"
                className={classes.submit}
            >
                Sign in
            </Button>


        </React.Fragment>
    }
}