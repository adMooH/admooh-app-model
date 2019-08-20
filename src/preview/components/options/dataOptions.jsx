import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import ResolveRSS from '../../services/rssService';
import ReactJson from 'react-json-view'
import Alert from '../alert';


const useStyles = makeStyles( _ => ({
    form: {
        padding: 15,
    },
    submit: {
		marginTop: "5%"
	},
}));

export function DataOptions(props){
    const classes = useStyles();
    const rssService = new ResolveRSS();

    const [status, setStatus] = React.useState('');
    const [openPreview, setOpenPreview] = React.useState(false);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [dataUrL, setDataUrl] = React.useState('');
    const [data, setData] = React.useState([]);
   
    function onDataUrlChange(event){
        setDataUrl(event.target.value);
        if(props.onChange !== undefined)
            props.onChange(event.target.value);
    }
    function handleClickOpen() {
        setStatus('Loading items...')
        setOpenAlert(true);
        rssService.getRSSItems(dataUrL).then(items => {
            setData(items);
            setOpenAlert(false);
            setOpenPreview(true);
        }).catch(err => {
            console.error(err);
            setOpenAlert(false);
        });
    }    
    
    function handleClosePreview() {
        setOpenPreview(false);
    }
    
    return (
    <div className={classes.form}>
        <Grid container direction="column" justify="center" alignItems="center">
            <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="template">Template</InputLabel>
                <Input
                    disabled
                    name="template"
                    type="text"
                    value={process.env.ADMOOH_TEMPLATE} />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="url">URL</InputLabel>
                <Input
                    value={dataUrL}
                    onChange={onDataUrlChange}
                    name="url"
                    type="url"
                    id="url"
                    />
            </FormControl>            
            <Button
                type="button"
                variant="contained"
                color="default"
                fullWidth
                onClick={handleClickOpen}
            >Preview Data
            </Button>
        </Grid>
        <Dialog
            open={openPreview}
            onClose={handleClosePreview}
            fullScreen
        >
            <DialogTitle>Data Preview</DialogTitle>
            <DialogContent>
                <ReactJson style={{ marginTop: "2%" }} src={data} theme="monokai" collapsed={false} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClosePreview} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
        <Alert text={status} open={openAlert} />
    </div>
    );
}