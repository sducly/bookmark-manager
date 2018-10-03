import { Theme } from "@material-ui/core";

const drawerWidth = 240;

const AppStyle = (theme: Theme) => {
  return {
    appBar: {
      transition: theme.transitions.create(['width', 'margin'], {
        duration: theme.transitions.duration.leavingScreen,
        easing: theme.transitions.easing.sharp
      }),
      zIndex: theme.zIndex.drawer + 1,
    },
    appBarShift: {
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['width', 'margin'], {
        duration: theme.transitions.duration.enteringScreen,
        easing: theme.transitions.easing.sharp
      }),
      width: `calc(100% - ${drawerWidth}px)`
    },
    appBarSpacer: theme.mixins.toolbar,
    avatar: {
      backgroundColor: theme.palette.secondary.main,
      margin: theme.spacing.unit,
    },
    chartContainer: {
      marginLeft: -22,
    },
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
      padding: theme.spacing.unit * 3
    },
    drawerPaper: {
      position: 'relative',
      transition: theme.transitions.create('width', {
        duration: theme.transitions.duration.enteringScreen,
        easing: theme.transitions.easing.sharp
      }),
      whiteSpace: 'nowrap',
      width: drawerWidth,
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        duration: theme.transitions.duration.leavingScreen,
        easing: theme.transitions.easing.sharp
      }),
      width: theme.spacing.unit * 7,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing.unit * 9,
      },
    },
    form: {
      marginTop: theme.spacing.unit,
      width: '100%', // Fix IE11 issue.
    },
    layout: {
      display: 'block', // Fix IE11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      width: 'auto',
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 400,
      },
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    paper: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      margin: "auto",
      marginTop: theme.spacing.unit * 8,
      maxWidth: 400,
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    root: {
      display: 'flex',
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
    tableContainer: {
      height: 320,
    },
    title: {
      flexGrow: 1,
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    }
  }};

  export default AppStyle;