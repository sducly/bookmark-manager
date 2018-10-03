import * as React from "react";

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { Link } from 'react-router-dom';
import { ISiginFormProps } from "../";
import { ComponentsPathEnum } from '../../workflow';

export default class SigninForm extends React.Component<ISiginFormProps, {}> {
    public render() {
        const {classes} = this.props;
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
                type="submit"
                fullWidth={true}
                variant="raised"
                color="primary"
                className={classes.submit}
            >
                Sign in
            </Button>

            <Link to={ComponentsPathEnum.CREATE_ACCOUNT}>
                Create a account
            </Link>
        </React.Fragment>
    }
}