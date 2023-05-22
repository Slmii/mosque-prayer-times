import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useContext, useEffect, useMemo, useState } from 'react';

import { LOCALE } from 'lib/constants';
import { PrayerTimesContext } from 'lib/context/PrayerTimes.context';
import { translations } from 'lib/utils/prayer-times.utilts';

function getTodayDateWithTimestamp(time: string) {
	const currentDate = new Date();
	const [hours, minutes] = time.split(':');

	const todayDateWithTimestamp = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		currentDate.getDate(),
		// This is a temporary fix for the time difference between Turkey and the Netherlands.
		Number(hours) - 1,
		Number(minutes)
	);

	return todayDateWithTimestamp;
}

export const RemainingTime = () => {
	const { nextPrayer, prayerTimes } = useContext(PrayerTimesContext);
	const [remaningTime, setRemainingTime] = useState<Date | null>(null);

	useEffect(() => {
		if (!nextPrayer) return;

		const nextPrayerDate = getTodayDateWithTimestamp(prayerTimes.today[nextPrayer]);
		const interval = setInterval(() => {
			const currentDate = new Date();
			const diff = nextPrayerDate.getTime() - currentDate.getTime();

			const differenceDate = new Date(diff);
			if (differenceDate.getHours() === 0 && differenceDate.getMinutes() === 0 && differenceDate.getSeconds() === 0) {
				setRemainingTime(null);
				clearInterval(interval);
				return;
			}

			setRemainingTime(new Date(diff));
		}, 1000);

		return () => clearInterval(interval);
	}, [nextPrayer, prayerTimes]);

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
			<Typography variant="h1" fontSize={50} fontWeight="bold">
				{nextPrayer ? translations[nextPrayer] : ''} ezanına kalan süre
			</Typography>
			<Typography variant="h1" fontSize={120} fontWeight="bold" textTransform="capitalize">
				{formattedRemainingTime}
			</Typography>
		</Stack>
	);
};
