import * as React from 'react';

import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { UpdateUserQuery } from '..';
import { Form } from '../../../libs/hoc';
import { User } from '../../../schema';
import Styles from '../../layout/styles';
import { UserQuery } from '../queries';
import { IUpdateAccountProps } from '../types';
import CreateAccountForm from './CreateAccountForm';

class UpdateAccount extends React.Component<IUpdateAccountProps, {}> {

    constructor(props: IUpdateAccountProps) {
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
                        Update my account
                    </Typography>

                    <Form
                        query={UserQuery}
                        variables={{
                            id: this.props.user.id
                        }}
                        mutation={UpdateUserQuery}
                        postSubmit={this.postSubmit}>

                        {(result: User) => {
                            return <CreateAccountForm classes={classes} user={result}/>
                    }}

                    </Form>

                </Paper>
            </React.Fragment>
        );
    }

    private async postSubmit() {
        await this.props.getUser();
    }
}

export default withStyles(Styles as any)(UpdateAccount);