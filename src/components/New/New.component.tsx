import Stack from '@mui/material/Stack';
import { Clock } from 'components/New/Clock.component';
import { RemainingTime } from 'components/New/RemainingTime.component';
import { PrayerTimes } from 'components/New/PrayerTimes.component';
import { Sliders } from 'components/New/Sliders.component';
import { QRCodes } from 'components/New/QRCodes.component';
import { Weather } from 'components/New/Weather.compnent';
import { useDevice } from 'lib/hooks/useDevice';
import { PrayerTimesContext } from 'lib/context/PrayerTimes.context';
import { useContext } from 'react';
import Typography from '@mui/material/Typography';

export const New = () => {
	const { isLgDown } = useDevice();
	const { isAdhan } = useContext(PrayerTimesContext);

	return (
		<Stack
			sx={{
				minHeight: '100vh',
				backgroundColor: '#0f172a',
				color: 'white',
				px: { xs: 2, lg: 4 },
				py: 4,
				gap: { xs: 2, lg: 4 }
			}}
		>
			{isAdhan ? (
				<>
					<Header />
					<Adhan />
				</>
			) : (
				<>
					<Header />
					<PrayerTimes />
					{!isLgDown && <Sliders />}
					{!isLgDown && <QRCodes />}
				</>
			)}
		</Stack>
	);
};

const Header = () => {
	const { isLgDown } = useDevice();

	return (
		<Stack
			direction={{ xs: 'column', lg: 'row' }}
			alignItems={{ xs: 'center', lg: 'flex-start' }}
			justifyContent={{ xs: 'center', lg: 'space-between' }}
			width="100%"
		>
			<RemainingTime />
			{!isLgDown && <Weather />}
			<Clock />
		</Stack>
	);
};

const Adhan = () => {
	return (
		<Stack
			direction="column"
			alignContent="center"
			textAlign="center"
			justifyContent="center"
			borderRadius={2}
			height="calc(100vh - 310px)"
			sx={{
				animation: 'flicker 1.5s infinite',
				'@keyframes flicker': {
					'0%': {
						backgroundColor: 'white',
						color: 'black'
					},
					'50%': {
						backgroundColor: 'red',
						color: 'white'
					},
					'100%': {
						backgroundColor: 'white',
						color: 'black'
					}
				}
			}}
		>
			<Typography variant="h1" fontWeight="bold" fontSize={200}>
				Adhan
			</Typography>
			<Typography variant="h1" fontWeight="bold" fontSize={200}>
				Ezan
			</Typography>
		</Stack>
	);
};
