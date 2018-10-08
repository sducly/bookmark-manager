import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import * as React from 'react';
import { Redirect } from 'react-router';
import { IDialogProps, IDialogState } from '../type';

function Transition(props: {}) {
    return <Slide direction="up" {...props} />;
}

/**
 * Dialog Component
 */
export default class AlertDialog extends React.Component<IDialogProps, IDialogState> {

    constructor(props: IDialogProps) {
        super(props);

        this.state = {
            open: false
        };

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOnConfirm = this.handleOnConfirm.bind(this);
    }

    public render() {
        const { children } = this.props;

        if (!children) {
            return <React.Fragment />
        }

        if(this.state.redirectUrl) {
            return <Redirect to={this.state.redirectUrl}/>
        }

        return (
            <div>
                {children(this.handleClickOpen)}
                <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted={true}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {this.props.title}
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {this.props.content}
                        </DialogContentText>
                    </DialogContent>

                    {/* ACTIONS */}
                    <DialogActions>

                        <Button onClick={this.handleClose} color="primary">
                            Disagree
                        </Button>

                        <Button onClick={this.handleOnConfirm} color="primary">
                            Agree
                        </Button>

                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    /**
     * If dialog is confirm. call the callback and close the dialog
     */
    private async handleOnConfirm() {
        const hasDeleted = await this.props.onConfirm(this.props.confirmParams);
        
        if(hasDeleted && this.props.redirectUrl) {
            this.setState({
                redirectUrl: this.props.redirectUrl
            })
        }

        this.handleClose();
    }

    /**
     * Open the dialog modal
     */
    private handleClickOpen = () => {
        this.setState({ open: true });
    };

    /**
     * Close the dialog modal
     */
    private handleClose = () => {
        this.setState({ open: false });
    };
}