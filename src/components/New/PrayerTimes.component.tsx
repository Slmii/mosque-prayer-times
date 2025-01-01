import { Grid, Typography } from '@mui/material';
import Stack, { StackProps } from '@mui/material/Stack';
import { useContext } from 'react';
import { PrayerTimes as IPrayerTimes, PrayerTimesContext } from 'lib/context/PrayerTimes.context';
import { useDevice } from 'lib/hooks/useDevice';

export const PrayerTimes = () => {
	const { prayerTimes } = useContext(PrayerTimesContext);
	const { isLgDown } = useDevice();

	return (
		<>
			{isLgDown ? (
				<Stack spacing={2} flexGrow={1} justifyContent="space-between">
					<PrayerTime prayer="Fadjr / İmsak" time={prayerTimes.today.Imsak} value="Imsak" />
					<PrayerTime prayer="Shoeroeq / Güneş" time={prayerTimes.today.Gunes} value="Gunes" />
					<PrayerTime prayer="Dhoer / Öğle" time={prayerTimes.today.Ogle} value="Ogle" />
					<PrayerTime prayer="'Asr / İkindi" time={prayerTimes.today.Ikindi} value="Ikindi" />
					<PrayerTime prayer="Maghrib / Akşam" time={prayerTimes.today.Aksam} value="Aksam" />
					<PrayerTime prayer="'Isjaa / Yatsı" time={prayerTimes.today.Yatsi} value="Yatsi" />
				</Stack>
			) : (
				<Grid container spacing={4}>
					<PrayerTime prayer="Fadjr / İmsak" time={prayerTimes.today.Imsak} value="Imsak" />
					<PrayerTime prayer="Shoeroeq / Güneş" time={prayerTimes.today.Gunes} value="Gunes" />
					<PrayerTime prayer="Dhoer / Öğle" time={prayerTimes.today.Ogle} value="Ogle" />
					<PrayerTime prayer="'Asr / İkindi" time={prayerTimes.today.Ikindi} value="Ikindi" />
					<PrayerTime prayer="Maghrib / Akşam" time={prayerTimes.today.Aksam} value="Aksam" />
					<PrayerTime prayer="'Isjaa / Yatsı" time={prayerTimes.today.Yatsi} value="Yatsi" />
				</Grid>
			)}
		</>
	);
};

const PrayerTime = ({ prayer, time, value }: { prayer: string; time: string; value: keyof IPrayerTimes }) => {
	const { isLgDown } = useDevice();
	const { activePrayer } = useContext(PrayerTimesContext);
	const isActive = activePrayer === value;

	const ComponentToRender = (props: StackProps) => {
		return (
			<Stack
				direction="row"
				alignItems="center"
				justifyContent="space-between"
				p={4}
				bgcolor="#2C3344"
				borderRadius={4}
				{...props}
				sx={{
					...(isActive && {
						backgroundColor: '#1BA39C',
						color: 'white',
						textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
					}),
					...props.sx
				}}
			>
				<Typography variant="h3" fontWeight="bold" fontSize={{ xs: 24, lg: '3.5rem' }}>
					{prayer}
				</Typography>
				<Typography variant="h3" fontWeight="bold" fontSize={{ xs: 24, lg: '3.5rem' }}>
					{time}
				</Typography>
			</Stack>
		);
	};

	if (isLgDown) {
		return <ComponentToRender flexGrow={1} />;
	}

	return (
		<Grid item xs={12} lg={4}>
			<ComponentToRender />
		</Grid>
	);
};
