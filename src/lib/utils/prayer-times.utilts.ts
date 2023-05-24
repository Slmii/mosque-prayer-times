import { startOfTomorrow } from 'date-fns';

import { PrayerTimes } from 'lib/context/PrayerTimes.context';

export function isBetween(startTime: string, endTime: string) {
	const currentTime = new Date();

	const startTimeParts = startTime.split(':');
	const startDateTime = new Date();

	const endTimeParts = endTime.split(':');
	const endDateTime = new Date();

	startDateTime.setHours(Number(startTimeParts[0]), Number(startTimeParts[1]), 0);
	endDateTime.setHours(Number(endTimeParts[0]), Number(endTimeParts[1]), 0);

	return currentTime >= startDateTime && currentTime <= endDateTime;
}

export const isBefore = (time: string) => {
	const currentTime = new Date();
	const timeParts = time.split(':');
	const timeDateTime = new Date();

	timeDateTime.setHours(Number(timeParts[0]), Number(timeParts[1]), 0);

	return currentTime <= timeDateTime;
};

export const isAfter = (time: string) => {
	const currentTime = new Date();
	const timeParts = time.split(':');
	const timeDateTime = new Date();

	timeDateTime.setHours(Number(timeParts[0]), Number(timeParts[1]), 0);

	return currentTime >= timeDateTime;
};

export const translations: Record<keyof PrayerTimes, string> = {
	Aksam: 'Akşam',
	Ikindi: 'İkindi',
	Gunes: 'Güneş',
	Yatsi: 'Yatsı',
	Imsak: 'İmsak',
	Ogle: 'Öğle',
	HicriDate: 'Hicri Tarih'
};

export function getTodayDateWithTimestamp(time: string) {
	const currentDate = new Date();
	const [hours, minutes] = time.split(':');

	const todayDateWithTimestamp = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		currentDate.getDate(),
		// This is a fix for the time difference between Turkey and the Netherlands.
		Number(hours) - 1,
		Number(minutes)
	);

	return todayDateWithTimestamp;
}

export function getTomorrowDateWithTimestamp(time: string) {
	const tomorrowDate = startOfTomorrow();
	const [hours, minutes] = time.split(':');

	const tomorrowDateWithTimestamp = new Date(
		tomorrowDate.getFullYear(),
		tomorrowDate.getMonth(),
		tomorrowDate.getDate(),
		// This is a fix for the time difference between Turkey and the Netherlands.
		Number(hours) - 1,
		Number(minutes)
	);

	console.log({ tomorrowDateWithTimestamp });

	return tomorrowDateWithTimestamp;
}
