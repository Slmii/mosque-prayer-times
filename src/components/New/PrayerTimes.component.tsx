import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useContext } from 'react';
import { PrayerTimes as IPrayerTimes, PrayerTimesContext } from 'lib/context/PrayerTimes.context';

export const PrayerTimes = () => {
	const { prayerTimes } = useContext(PrayerTimesContext);

	return (
		<Stack
			direction="column"
			alignItems="flex-start"
			justifyContent="center"
			px={4}
			py={2}
			borderRadius={5}
			bgcolor="#192234"
		>
			<PrayerTime prayer="Fadjr / İmsak" time={prayerTimes.today.Imsak} value="Imsak" />
			<PrayerTime prayer="Shoeroeq / Güneş" time={prayerTimes.today.Gunes} value="Gunes" />
			<PrayerTime prayer="Dhoer / Öğle" time={prayerTimes.today.Ogle} value="Ogle" />
			<PrayerTime prayer="'Asr / İkindi" time={prayerTimes.today.Ikindi} value="Ikindi" />
			<PrayerTime prayer="Maghrib / Akşam" time={prayerTimes.today.Aksam} value="Aksam" />
			<PrayerTime prayer="'Isjaa / Yatsı" time={prayerTimes.today.Yatsi} value="Yatsi" />
		</Stack>
	);
};

const PrayerTime = ({ prayer, time, value }: { prayer: string; time: string; value: keyof IPrayerTimes }) => {
	const { activePrayer } = useContext(PrayerTimesContext);
	const isActive = activePrayer === value;

	return (
		<Stack
			direction="row"
			justifyContent="space-between"
			width="100%"
			alignItems="center"
			px={4}
			py={2}
			sx={{
				...(isActive && {
					backgroundColor: '#253246',
					border: '2px solid #fff',
					borderRadius: 5
				})
			}}
		>
			<Typography variant="h4" fontWeight="bold">
				{prayer}
			</Typography>
			<Typography variant="h3" fontWeight="bold">
				{time}
			</Typography>
		</Stack>
	);
};
