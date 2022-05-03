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
      padding: '25px 75px 0px',
      // maxHeight: '500px',
      maxHeight: 'fit-content',
      // maxWidth: '800px',
      textAlign: 'center',
      margin: '0 auto',
      // justifyContent: 'center',
   },
   marginBottom: {
      marginBottom: '60px',
   },
   // Div of locations of interest cards
   list: {
      // height: '575px',
      height: 'auto',
      // To enable horizontal scrolling 
      overflowX: 'scroll',
      
   },
}));
