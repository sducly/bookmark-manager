import * as React from 'react';

import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { UpdateUserQuery } from '../';
import { Form } from '../../../libs/hoc';
import { User } from '../../../schema';
import Styles from '../../layout/styles';
import { ComponentsPathEnum } from '../../workflow';
import { SaveToken } from '../services';
import { ICreateAccountProps } from '../types';
import CreateAccountForm from './CreateAccountForm';

/**
 * Create Account Screen
 */
class CreateAccount extends React.Component<ICreateAccountProps, {}> {

    constructor(props: ICreateAccountProps) {
        super(props);
        this.postSubmit = this.postSubmit.bind(this);
    }

    public render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Paper className={classes.paper}>
                    <Typography
                        variant="title"
                        gutterBottom={true}>
                        Create an account
                    </Typography>

                    <Form
                        mutation={UpdateUserQuery}
                        postSubmit={this.postSubmit}
                        redirectUrl={ComponentsPathEnum.HOME}>

                        {() => <CreateAccountForm classes={classes} />}

                    </Form>

                </Paper>
            </React.Fragment>
        );
    }

    /**
     * Save user token in session_storage
     */
    private postSubmit(data: any) {
        const user: User = data.updateUser;
        SaveToken(user);
    }
}

export default withStyles(Styles as any)(CreateAccount);