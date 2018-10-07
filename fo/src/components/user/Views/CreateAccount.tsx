import * as React from 'react';

import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { AddUser } from '../';
import { Form } from '../../../libs/hoc';
import { User } from '../../../schema';
import Styles from '../../layout/styles';
import { ComponentsPathEnum } from '../../workflow';
import { SaveToken } from '../services';
import { ICreateAccountProps } from '../types';
import CreateAccountForm from './CreateAccountForm';

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
                        mutation={AddUser}
                        postSubmit={this.postSubmit}
                        redirectUrl={ComponentsPathEnum.HOME}>

                        {() => <CreateAccountForm classes={classes} />}

                    </Form>

                </Paper>
            </React.Fragment>
        );
    }

    private postSubmit(data: any) {
        const user: User = data.addUser;
        SaveToken(user);
    }
}

export default withStyles(Styles as any)(CreateAccount);