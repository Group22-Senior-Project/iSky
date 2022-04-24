import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
   formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      marginBottom: '30px',
      // alignContent: 'center',
      // textAlign: 'center',
   },
   textLabel: {
      alignContent: 'center',
      textAlign: 'center',
   },
   selectEmpty: {
      marginTop: theme.spacing(2),
   },
   loading: {
      height: '600px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
   },
   container: {
      padding: '25px',
      maxHeight: '500px',
      maxWidth: '800px',
      textAlign: 'center',
      margin: '0 auto',
      // justifyContent: 'center',
   },
   marginBottom: {
      marginBottom: '60px',
   },
   list: {
      height: '400px',
      overflow: 'auto',
      // overflowY: 'hidden',
      // overflowX: 'scroll',
   },
}));
