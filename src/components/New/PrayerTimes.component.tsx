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
				<Stack gap={2} flex={1} justifyContent="space-between">
					<PrayerTime prayer="İmsak" subPrayer="Fadjr" time={prayerTimes.today.Imsak} value="Imsak" />
					<PrayerTime prayer="Güneş" subPrayer="Shoeroeq" time={prayerTimes.today.Gunes} value="Gunes" />
					<PrayerTime prayer="Öğle" subPrayer="Dhoer" time={prayerTimes.today.Ogle} value="Ogle" />
					<PrayerTime prayer="İkindi" subPrayer="'Asr" time={prayerTimes.today.Ikindi} value="Ikindi" />
					<PrayerTime prayer="Akşam" subPrayer="Maghrib" time={prayerTimes.today.Aksam} value="Aksam" />
					<PrayerTime prayer="Yatsı" subPrayer="'Isjaa" time={prayerTimes.today.Yatsi} value="Yatsi" />
				</Stack>
			) : (
				<Grid container spacing={4}>
					<PrayerTime prayer="İmsak" subPrayer="Fadjr" time={prayerTimes.today.Imsak} value="Imsak" />
					<PrayerTime prayer="Güneş" subPrayer="Shoeroeq" time={prayerTimes.today.Gunes} value="Gunes" />
					<PrayerTime prayer="Öğle" subPrayer="Dhoer" time={prayerTimes.today.Ogle} value="Ogle" />
					<PrayerTime prayer="İkindi" subPrayer="'Asr" time={prayerTimes.today.Ikindi} value="Ikindi" />
					<PrayerTime prayer="Akşam" subPrayer="Maghrib" time={prayerTimes.today.Aksam} value="Aksam" />
					<PrayerTime prayer="Yatsı" subPrayer="'Isjaa" time={prayerTimes.today.Yatsi} value="Yatsi" />
				</Grid>
			)}
		</>
	);
};

const PrayerTime = ({
	prayer,
	subPrayer,
	time,
	value
}: {
	prayer: string;
	subPrayer: string;
	time: string;
	value: keyof IPrayerTimes;
}) => {
	const { isLgDown } = useDevice();
	const { activePrayer } = useContext(PrayerTimesContext);
	const isActive = activePrayer === value;

	const ComponentToRender = (props: StackProps) => {
		return (
			<Stack
				direction="column"
				alignItems="flex-start"
				justifyContent="center"
				p={2}
				bgcolor="#2C3344"
				borderRadius={2}
				{...props}
				sx={{
					background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
					backdropFilter: 'blur(10px)',
					border: '1px solid rgba(255, 255, 255, 0.3)',
					...(isActive && {
						background: 'linear-gradient(135deg, rgba(27, 163, 156, 0.8), rgba(27, 163, 156, 0.6))',
						border: '1px solid rgba(255, 255, 255, 0.3)',
						textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
					}),
					...props.sx
				}}
			>
				<Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
					<Typography variant="h3" fontWeight="bold" fontSize={{ xs: 24, lg: '4rem' }} lineHeight={1}>
						{prayer}
					</Typography>
					<Typography variant="h3" fontWeight="bold" fontSize={{ xs: 24, lg: 100 }} lineHeight={1}>
						{time}
					</Typography>
				</Stack>
				<Typography
					variant="body1"
					fontWeight="bold"
					lineHeight={1}
					sx={{
						opacity: isActive ? 1 : 0.5,
						fontSize: theme => ({ xs: theme.typography.body1.fontSize, lg: 44 })
					}}
				>
					{subPrayer}
				</Typography>
			</Stack>
		);
	};

	if (isLgDown) {
		return <ComponentToRender flex={1} />;
	}

	return (
		<Grid item xs={12} lg={4}>
			<ComponentToRender />
		</Grid>
	);
};
