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
			justifyContent={{ xs: 'space-between', lg: 'flex-start' }}
			p={{ xs: 2, lg: 4 }}
			borderRadius={5}
			bgcolor="#192234"
			height="100%"
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
			p={{ xs: 2, lg: 4 }}
			sx={{
				...(isActive && {
					backgroundColor: '#1BA39C',
					borderRadius: 5,
					color: 'white',
					textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
				})
			}}
		>
			<Typography variant="h4" fontWeight="bold" fontSize={{ xs: 24, lg: '2.125rem' }}>
				{prayer}
			</Typography>
			<Typography variant="h3" fontWeight="bold" fontSize={{ xs: 32, lg: '3rem' }}>
				{time}
			</Typography>
		</Stack>
	);
};
