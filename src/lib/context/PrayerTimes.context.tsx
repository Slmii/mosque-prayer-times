import { createContext, PropsWithChildren, useEffect, useState } from 'react';

import { fetchPrayerTimes, PrayerTimeResponse } from '../api/prayer-timer';

export interface PrayerTimes {
	Imsak: string;
	Gunes: string;
	Ogle: string;
	Ikindi: string;
	Aksam: string;
	Yatsi: string;
	HicriDate: string;
}

interface PrayerTimesContext {
	prayerTimes: {
		today: PrayerTimes;
		tomorrow: PrayerTimes;
	};
	activePrayer: keyof PrayerTimes | null;
	setActivePrayer: (prayer: keyof PrayerTimes | null) => void;
	nextPrayer: keyof PrayerTimes | null;
	setNextPrayer: (prayer: keyof PrayerTimes | null) => void;
	isAdhan: boolean;
	setIsAdhan: (isAdhan: boolean) => void;
}

const initData: PrayerTimes = {
	Aksam: '',
	Gunes: '',
	Ikindi: '',
	Imsak: '',
	Ogle: '',
	Yatsi: '',
	HicriDate: ''
};

export const PrayerTimesContext = createContext<PrayerTimesContext>({
	prayerTimes: {
		today: initData,
		tomorrow: initData
	},
	activePrayer: null,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setActivePrayer: () => {},
	nextPrayer: null,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setNextPrayer: () => {},
	isAdhan: false,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setIsAdhan: () => {}
});

export const PrayerTimesProvider = ({ children }: PropsWithChildren) => {
	const [prayerTimes, setPrayerTimes] = useState<{
		today: PrayerTimes;
		tomorrow: PrayerTimes;
	}>({
		today: initData,
		tomorrow: initData
	});
	const [activePrayer, setActivePrayer] = useState<keyof PrayerTimes | null>(null);
	const [nextPrayer, setNextPrayer] = useState<keyof PrayerTimes | null>(null);
	const [isAdhan, setIsAdhan] = useState(false);

	// This effect checks if prayer times are in local storage
	// If not, fetch them. Do this only once
	useEffect(() => {
		const init = async () => {
			const prayerTimes = await fetchPrayerTimes();
			setTimes(prayerTimes);
		};

		init();
	}, []);

	// This effect will load new prayer times at midnight
	useEffect(() => {
		const runAtMidnightOnEveryDay = async () => {
			const now = new Date();

			// Check if it's midnight
			if (now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() === 5) {
				const prayerTimes = await fetchPrayerTimes();
				setTimes(prayerTimes);
			}
		};

		const interval = setInterval(runAtMidnightOnEveryDay, 1000);

		return () => {
			// Cleanup the interval on component unmount
			clearInterval(interval);
		};
	});

	const setTimes = (prayerTimes: PrayerTimeResponse[]) => {
		const now = new Date();
		const prayerTime = prayerTimes.find(prayerTime => {
			const prayerDate = new Date(prayerTime.MiladiTarihUzunIso8601.split('T')[0]);

			return (
				prayerDate.getDay() === now.getDay() &&
				prayerDate.getMonth() === now.getMonth() &&
				prayerDate.getFullYear() === now.getFullYear()
			);
		});

		if (!prayerTime) {
			return;
		}

		setPrayerTimes({
			today: {
				Aksam: prayerTime.Aksam,
				Gunes: prayerTime.Gunes,
				Ikindi: prayerTime.Ikindi,
				Imsak: prayerTime.Imsak,
				Ogle: prayerTime.Ogle,
				Yatsi: prayerTime.Yatsi,
				HicriDate: prayerTime.HicriTarihUzun
			},
			// TODO: get tomorrow's prayer times
			tomorrow: {
				Aksam: prayerTime.Aksam,
				Gunes: prayerTime.Gunes,
				Ikindi: prayerTime.Ikindi,
				Imsak: prayerTime.Imsak,
				Ogle: prayerTime.Ogle,
				Yatsi: prayerTime.Yatsi,
				HicriDate: prayerTime.HicriTarihUzun
			}
		});
	};

	return (
		<>
			<PrayerTimesContext.Provider
				value={{
					prayerTimes,
					activePrayer,
					setActivePrayer,
					nextPrayer,
					setNextPrayer,
					isAdhan,
					setIsAdhan
				}}
			>
				{children}
			</PrayerTimesContext.Provider>
		</>
	);
};
