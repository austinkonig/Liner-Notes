import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    borderRadius: '5%',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0px 40px 40px rgba(0, 0, 0, 0.1)',
    },
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      transition: 'transform 0.3s, box-shadow 0.3s',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0px 40px 40px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  avatar: {
    // Existing styles
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '24%',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0px 40px 40px rgba(0, 0, 0, 0.1)',
    },
  },
  form: {
    // Existing styles
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    borderRadius: '5%',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0px 40px 40px rgba(0, 0, 0, 0.1)',
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0px 40px 40px rgba(0, 0, 0, 0.1)',
    },
  },
  googleButton: {
    marginBottom: theme.spacing(2),
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0px 40px 40px rgba(0, 0, 0, 0.1)',
    },
  },
}));
