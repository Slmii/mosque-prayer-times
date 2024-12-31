import Typography from '@mui/material/Typography';
import { useContext, useEffect, useMemo, useState } from 'react';
import { LOCALE } from 'lib/constants';
import { PrayerTimesContext } from 'lib/context/PrayerTimes.context';
import { isAfter, isBefore, isBetween } from 'lib/utils/prayer-times.utilts';
import Stack from '@mui/material/Stack';
import { Weather } from 'components/New/Weather.compnent';

export const Clock = () => {
	const { setActivePrayer, prayerTimes, activePrayer, setNextPrayer } = useContext(PrayerTimesContext);
	const [currentTime, setCurrentTime] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			if (isBetween(prayerTimes.today.Imsak, prayerTimes.today.Gunes)) {
				setActivePrayer('Imsak');
			} else if (isBetween(prayerTimes.today.Gunes, prayerTimes.today.Ogle)) {
				setActivePrayer('Gunes');
			} else if (isBetween(prayerTimes.today.Ogle, prayerTimes.today.Ikindi)) {
				setActivePrayer('Ogle');
			} else if (isBetween(prayerTimes.today.Ikindi, prayerTimes.today.Aksam)) {
				setActivePrayer('Ikindi');
			} else if (isBetween(prayerTimes.today.Aksam, prayerTimes.today.Yatsi)) {
				setActivePrayer('Aksam');
			} else if (isAfter(prayerTimes.today.Yatsi) || isBefore(prayerTimes.today.Imsak)) {
				setActivePrayer('Yatsi');
			}

			setCurrentTime(new Date());
		}, 1000);

		return () => {
			clearInterval(interval);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [prayerTimes]);

	useEffect(() => {
		switch (activePrayer) {
			case 'Imsak':
				return setNextPrayer('Gunes');
			case 'Gunes':
				return setNextPrayer('Ogle');
			case 'Ogle':
				return setNextPrayer('Ikindi');
			case 'Ikindi':
				return setNextPrayer('Aksam');
			case 'Aksam':
				return setNextPrayer('Yatsi');
			case 'Yatsi':
				return setNextPrayer('Imsak');
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activePrayer]);

	const formattedTime = useMemo(
		() =>
			currentTime.toLocaleTimeString(LOCALE, {
				hour: '2-digit',
				minute: '2-digit'
			}),
		[currentTime]
	);

	return (
		<Stack direction="row" alignItems="flex-start" gap={6}>
			<Stack alignItems="center">
				<Typography variant="h2" fontSize={50} fontWeight="bold" textTransform="capitalize">
					{new Intl.DateTimeFormat(LOCALE, {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
						weekday: 'long'
					}).format(new Date())}
				</Typography>
				<Typography variant="h1" fontSize={120} fontWeight="bold" textTransform="capitalize">
					{formattedTime}
				</Typography>
			</Stack>
			<Weather />
		</Stack>
	);
};
