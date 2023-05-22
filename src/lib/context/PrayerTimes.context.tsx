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
			setTimes(prayerTimes, 0);
		};

		init();
	}, []);

	// This effect will load new prayer times at midnight
	useEffect(() => {
		const runAtMidnightOnEveryDay = async () => {
			const now = new Date();

			// Check if it's midnight
			if (now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() === 0) {
				const prayerTimes = await fetchPrayerTimes();
				setTimes(prayerTimes, 1);
			}
		};

		const interval = setInterval(runAtMidnightOnEveryDay, 1000);

		return () => {
			// Cleanup the interval on component unmount
			clearInterval(interval);
		};
	});

	const setTimes = (prayerTimes: PrayerTimeResponse[], index: number) => {
		setPrayerTimes({
			today: {
				Aksam: prayerTimes[index].Aksam,
				Gunes: prayerTimes[index].Gunes,
				Ikindi: prayerTimes[index].Ikindi,
				Imsak: prayerTimes[index].Imsak,
				Ogle: prayerTimes[index].Ogle,
				Yatsi: prayerTimes[index].Yatsi,
				HicriDate: prayerTimes[index].HicriTarihUzun
			},
			tomorrow: {
				Aksam: prayerTimes[index + 1].Aksam,
				Gunes: prayerTimes[index + 1].Gunes,
				Ikindi: prayerTimes[index + 1].Ikindi,
				Imsak: prayerTimes[index + 1].Imsak,
				Ogle: prayerTimes[index + 1].Ogle,
				Yatsi: prayerTimes[index + 1].Yatsi,
				HicriDate: prayerTimes[index + 1].HicriTarihUzun
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
