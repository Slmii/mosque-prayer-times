import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useContext } from 'react';

import { PrayerTimes as IPrayerTimes, PrayerTimesContext } from 'lib/context/PrayerTimes.context';

export const PrayerTimes = () => {
	const { prayerTimes } = useContext(PrayerTimesContext);

	return (
		<Stack direction="column" height="100%" alignItems="center" justifyContent="center">
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

	return (
		<Stack
			direction="column"
			alignItems="center"
			justifyContent="center"
			flex={1}
			sx={{
				color: 'white',
				backgroundColor: activePrayer === value ? '#00a77a' : '#0081A7',
				width: '100%',
				borderBottom: theme => `1px solid ${activePrayer === value ? '#00100C' : theme.palette.divider}`,
				borderTop: activePrayer === value ? '1px solid #00100C' : undefined
			}}
		>
			<Typography variant="h2" fontSize={50} fontWeight="bold">
				{prayer}
			</Typography>
			<Typography variant="h1" fontSize={100} fontWeight="bold">
				{time}
			</Typography>
		</Stack>
	);
};
