import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SettingsIcon from '@material-ui/icons/Settings';
import clsx from 'clsx';
import React from 'react';
import ActionTabs from '../components/actionTabs';
import AppPreview from '../components/appPreview';
import {DataOptions, CustomOptions, ActionOptions} from '../components/options';
import Fab from '@material-ui/core/Fab';
import ResolveRSS from '../services/rssService';
import Alert from '../components/alert';

const drawerWidth = 440;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  runButton: {
    margin: "3%",
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1000
  }
}));

export default function AppView(props) {
  const rssService = new ResolveRSS();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [dataUrL, setDataUrl] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [openAlert, setOpenAlert] = React.useState(false);
  const [data, setData] = React.useState([{
    title: 'adMooH App',
    description: 'A simple sample',
    linkfoto: 'https://i.imgur.com/nX9AVtA.jpg'
  }]);
  const [customData, setCustomData] = React.useState({});
  const [app, setApp] = React.useState({});


  function setAppRef(ref){
    setApp(ref);
  }

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  function willShow(){
    if(app.willShow !== undefined)
      app.willShow();
  }

  function runApp(){
    setStatus('Loading items...');
    setOpenAlert(true);
    rssService.getRSSItems(dataUrL).then(items => {
      setData(items);
      setOpenAlert(false);
    }).catch(err => {
        console.error(err);
        setOpenAlert(false);
    });

  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Fab color="primary"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={classes.fab}>
        <SettingsIcon />
      </Fab>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <AppPreview
          getApp={props.getApp}
          data={data}
          custom={customData}
          setApp={setAppRef}
          />
      </main>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <ActionTabs tabs={[
          <DataOptions onChange={setDataUrl}/>,
          <CustomOptions onChange={setCustomData}/>,
          <ActionOptions willShow={willShow}/>
        ]}/>
        <Button 
            className={classes.runButton}
            type="submit"
            variant="contained"
            color="primary"
            onClick={runApp}
        >Run
        </Button>
      </Drawer>
      <Alert text={status} open={openAlert} />
    </div>
  );
}
