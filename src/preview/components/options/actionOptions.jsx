import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles( _ => ({
    form: {
        padding: 15
    }
}));

export function ActionOptions(props){
    const classes = useStyles();
    return (
        <div className={classes.form}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Button variant="contained" fullWidth onClick={props.willShow}>
                        Will Show
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}