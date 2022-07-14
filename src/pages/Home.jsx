import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
root: {
	textAlign: "center",
	marginTop: "50px"
},
btns:{
	'& > *': {
	margin: theme.spacing(1),
	},
	marginTop: "40px"
}
}));

export default function Home() {
const classes = useStyles();

return (
	<div className={classes.root}>
	<Typography variant="h4" component="h4">
		Welcome to GFG
	</Typography>
	<div className={classes.btns}>
		<Button variant="contained">Default</Button>
		<Button variant="contained" color="primary">
		Primary
		</Button>
		<Button variant="contained" color="secondary">
		Secondary
		</Button>
		<Button variant="contained" disabled>
		Disabled
		</Button>
		<Button variant="contained" color="primary"
				href="#contained-buttons">
		Link
		</Button>
	</div>
	</div>
);
}
