import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 35,
    margin: '25px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '32px 45px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
    transition: 'box-shadow 0.75s ease, transform 0.75s ease',
    transform: 'scale(0.99)',
    '&:hover': {
      boxShadow: '0 15px 15px 5px rgba(0,0,0,0.2)',
      cursor: 'pointer',
      transform: 'scale(1)',
    },
    backgroundColor: theme.palette.type === 'dark' ? 'black' : 'inherit',
  },
  heading: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 300,
  },
  image: {
    marginLeft: '10px',
    marginTop: '5px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      marginTop: 20,
      justifyContent: 'center',
    },
  },
  logout: {
    marginLeft: '20px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  // New styles for the About page
  
  modalContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    [theme.breakpoints.down('md')]: {
      height: 'auto',
    },
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    maxHeight: '80vh',
   
    overflowY: 'scroll',
    position: 'relative',
    minWidth: '300px',
    maxWidth: '90%',
    [theme.breakpoints.down('md')]: {
      maxWidth: '95%',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },

  greyText: {
    color: '#808080',
  },
  evenGreyerText: {
    color: '#A0A0A0',
    padding: '20px',
  },

  
}));