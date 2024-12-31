import Stack from '@mui/material/Stack';
import { Clock } from 'components/New/Clock.component';
import { RemainingTime } from 'components/New/RemainingTime.component';
import Grid from '@mui/material/Grid';
import { PrayerTimes } from 'components/New/PrayerTimes.component';
import { Sliders } from 'components/New/Sliders.component';
import Box from '@mui/material/Box';
import QRCode from 'react-qr-code';
import { Typography } from '@mui/material';

const QR_LINKS = [
	{
		label: 'Yildirim Beyazit Camii Site',
		link: 'https://yildirim-beyazit.nl'
	},
	{
		label: 'Namaz Vakitleri / Gebedstijden',
		link: 'https://prayer-times.yildirim-beyazit.nl/new'
	},
	{
		label: 'Camiye Bağış / Donatie Moskee',
		link: 'https://betaalverzoek.rabobank.nl/betaalverzoek/?id=OHIeKVpERniSu6fB2bSNcg'
	}
];

export const New = () => {
	return (
		<Stack
			sx={{
				minHeight: '100vh',
				background: '#0f172a',
				color: 'white',
				p: 8
			}}
			gap={8}
		>
			<Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
				<RemainingTime />
				<Clock />
			</Stack>
			<Box height="calc(100vh - 350px)">
				<Grid container spacing={2} height="100%">
					<Grid item xs={3}>
						<PrayerTimes />
					</Grid>
					<Grid item xs={6}>
						<Sliders />
					</Grid>
					<Grid item xs={3}>
						<Stack
							direction="row"
							alignItems="center"
							justifyContent="flex-start"
							flexWrap="wrap"
							p={4}
							borderRadius={5}
							bgcolor="#192234"
						>
							<Grid container spacing={2}>
								{QR_LINKS.map(qr => (
									<Grid item xs={6} key={qr.link}>
										<Box bgcolor="white" p={2} borderRadius={4} width="100%">
											<QRCode
												size={256}
												style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
												value={qr.link}
												viewBox={`0 0 256 256`}
											/>
										</Box>
										<Typography textAlign="center" variant="h6" mt={0.5}>
											{qr.label}
										</Typography>
									</Grid>
								))}
							</Grid>
						</Stack>
					</Grid>
				</Grid>
			</Box>
		</Stack>
	);
};
