import * as React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import LockIcon from '@material-ui/icons/LockOutlined';
import { ISigninProps, SigninForm } from '..';
import { Form } from '../../../libs/hoc';
import Styles from '../../layout/styles';
import { AuthenticateUser } from '../../user';
import { ComponentsPathEnum, redirect } from '../../workflow';


/**
 * Signin Screen
 */
class Signin extends React.Component<ISigninProps, {}> {

    constructor(props: ISigninProps) {
        super(props);
        this.authenticateUser = this.authenticateUser.bind(this);
    }

    public render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.paper}>

                <Avatar className={classes.avatar}>
                    <LockIcon />
                </Avatar>

                <Typography variant="headline">
                    Sign in
                </Typography>

                <Form submit={this.authenticateUser}>
                    {() => <SigninForm classes={classes} />}
                </Form>
                
            </Paper>
        )
    }

    /**
     * Try to connect the user. If success, user will be the redirect to the homepage
     * @param e FormEvent
     */
    private async authenticateUser(e: any) {
        const user = await AuthenticateUser(e);

        if (user) {
            redirect(ComponentsPathEnum.HOME);
        }
    }
}

export default withStyles(Styles as any)(Signin);