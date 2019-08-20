import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Alert(props){
    return (
        <Dialog onClose={props.onClose} aria-labelledby="simple-dialog-title" open={props.open}>
            <DialogTitle id="simple-dialog-title">{props.text}</DialogTitle>
        </Dialog>
    );
}