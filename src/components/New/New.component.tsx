import Stack from '@mui/material/Stack';
import { Clock } from 'components/New/Clock.component';
import { RemainingTime } from 'components/New/RemainingTime.component';
import Grid from '@mui/material/Grid';
import { PrayerTimes } from 'components/New/PrayerTimes.component';
import { Sliders } from 'components/New/Sliders.component';
import { QRCodes } from 'components/New/QRCodes.component';

export const New = () => {
	return (
		<Stack
			sx={{
				minHeight: '100vh',
				background: '#0f172a',
				color: 'white',
				px: { xs: 2, lg: 8 },
				py: 4,
				gap: { xs: 2 }
			}}
		>
			<Stack
				direction={{ xs: 'column', lg: 'row' }}
				alignItems={{ xs: 'center', lg: 'flex-start' }}
				justifyContent={{ xs: 'center', lg: 'space-between' }}
				width="100%"
			>
				<RemainingTime />
				<Clock />
			</Stack>
			<Grid container spacing={2} height={{ xs: 'calc(100vh - 200px)', lg: 'unset' }}>
				<Grid item xs={12} lg={3}>
					<PrayerTimes />
				</Grid>
				<Grid item xs={6} display={{ xs: 'none', lg: 'block' }}>
					<Sliders />
				</Grid>
				<Grid item xs={3} display={{ xs: 'none', lg: 'block' }}>
					<QRCodes />
				</Grid>
			</Grid>
		</Stack>
	);
};
