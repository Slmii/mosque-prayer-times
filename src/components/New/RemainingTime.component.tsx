import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { isToday } from 'date-fns';
import { useContext, useEffect, useMemo, useState } from 'react';
import { LOCALE } from 'lib/constants';
import { PrayerTimesContext } from 'lib/context/PrayerTimes.context';
import { getTodayDate, getTomorrowDate, translations } from 'lib/utils/prayer-times.utilts';

export const RemainingTime = () => {
	const { nextPrayer, prayerTimes, isAdhan, setIsAdhan, activePrayer } = useContext(PrayerTimesContext);
	const [remaningTime, setRemainingTime] = useState<Date | null>(null);

	useEffect(() => {
		if (!nextPrayer) {
			return;
		}

		// If the next prayer is Imsak, we need to get the tomorrow's Imsak time
		const nextPrayerDate =
			nextPrayer === 'Imsak' && isToday(prayerTimes.today.date)
				? getTomorrowDate(prayerTimes.tomorrow.Imsak)
				: getTodayDate(prayerTimes.today[nextPrayer] as string);

		const interval = setInterval(() => {
			const currentDate = new Date();
			const diff = nextPrayerDate.getTime() - currentDate.getTime();

			const differenceDate = new Date(diff);
			// If the difference is 0, it means that the prayer time has come
			if (differenceDate.getHours() === 0 && differenceDate.getMinutes() === 0 && differenceDate.getSeconds() === 0) {
				// If the active prayer is Gunes, we don't need to activate adhan
				if (activePrayer !== 'Gunes') {
					setIsAdhan(true);
				}

				setRemainingTime(null);
				clearInterval(interval);
				return;
			}

			setRemainingTime(new Date(diff));
		}, 1000);

		return () => clearInterval(interval);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [nextPrayer, prayerTimes]);

	// Set the adhan back to false after 10 seconds
	useEffect(() => {
		if (!isAdhan) {
			return;
		}

		const timeout = setTimeout(() => {
			setIsAdhan(false);
		}, 10000);

		return () => clearTimeout(timeout);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAdhan]);

	const formattedRemainingTime = useMemo(() => {
		if (!remaningTime) {
			return '00:00:00';
		}

		return remaningTime.toLocaleTimeString(LOCALE, {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		});
	}, [remaningTime]);

	return (
		<Stack direction="column" alignItems="center">
			<Typography variant="h1" fontSize={{ xs: 24, lg: 50 }} fontWeight="bold">
				{nextPrayer ? (
					<>
						{nextPrayer === 'Imsak' || nextPrayer === 'Gunes'
							? `${translations[nextPrayer]} Vaktine Kalan Süre`
							: `${translations[nextPrayer]} Ezanına Kalan Süre`}
					</>
				) : null}
			</Typography>
			<Typography variant="h1" fontSize={{ xs: 80, lg: 120 }} fontWeight="bold" textTransform="capitalize">
				{formattedRemainingTime}
			</Typography>
		</Stack>
	);
};
