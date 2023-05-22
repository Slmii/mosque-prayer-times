import Grid from '@mui/material/Grid';

import { Clock } from './Clock.component';
import { CurrentDate } from './Date.component';
import { RemainingTime } from './RemainingTime.component';

export const Header = () => {
	return (
		<Grid container>
			<Grid
				item
				lg={6}
				sx={{
					padding: '13px 20px',
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<RemainingTime />
			</Grid>
			<Grid
				item
				lg={6}
				sx={{
					backgroundColor: '#004C62',
					padding: '13px 20px',
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center'
				}}
			>
				<CurrentDate />
				<Clock />
			</Grid>
		</Grid>
	);
};
