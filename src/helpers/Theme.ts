// import Button from '@material-ui/core/Button';
// import purple from '@material-ui/core/colors/purple';
import { StyleRulesCallback, Theme } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';


export const theme = createMuiTheme({
	palette: {
		primary: { 
			contrastText: 'rgba(0, 0, 0, 0.54)',
			main: '#c9f3c0'
		}, 
		secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
	},
});

export type StyleType = 'button' | 'search' ;

export const styles: StyleRulesCallback<StyleType> = (th: Theme) => ({
	button: {
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
		border: 0,
		borderRadius: 3,
		boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
		color: 'white',
		height: 48,
		padding: '0 30px',
	},
	search: {
		background: theme.palette.secondary.light,
		backgroundColor: theme.palette.secondary.main,
		boxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
		gridColumn: 'col 4 / span 1',
		gridRow: 'row 3',
		// tslint:disable-next-line:object-literal-sort-keys
		border: 0,
		borderRadius: 3,
		color: theme.palette.primary.contrastText,
		height: 48,
		padding: '0 30px',
	},
	
});
