import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { LOCALE } from 'lib/constants';
import { Clock } from './Clock.component';
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
				<Typography variant="h2" fontSize={50} fontWeight="bold" textTransform="capitalize">
					{new Intl.DateTimeFormat(LOCALE, {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
						weekday: 'long'
					}).format(new Date())}
				</Typography>
				<Clock />
			</Grid>
		</Grid>
	);
};
