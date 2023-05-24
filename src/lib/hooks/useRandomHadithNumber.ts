import { useEffect, useState } from 'react';

const x = 1 - 1; // Lower bound
const y = 7563 - 1; // Upper bound

export const useRandomHadithNumber = () => {
	const [randomNumber, setRandomNumber] = useState<number>(0);

	useEffect(() => {
		const getRandomNumber = (min: number, max: number) => {
			return Math.floor(Math.random() * (max - min + 1) + min);
		};

		const calculateNextInterval = () => {
			const now = new Date();
			const nextInterval = new Date(now);
			nextInterval.setHours(now.getHours() + (3 - (now.getHours() % 3)), 0, 0);
			return nextInterval.getTime() - now.getTime();
		};

		const setRandomIntervalNumber = () => {
			setRandomNumber(getRandomNumber(x, y));
		};

		// Call once immediately on mount
		setRandomIntervalNumber();

		const timer = setTimeout(() => {
			setRandomIntervalNumber();
			setInterval(setRandomIntervalNumber, 3 * 60 * 60 * 1000); // Repeat every 3 hours
		}, calculateNextInterval());

		return () => clearTimeout(timer); // Clear timer on unmount
	}, []);

	return randomNumber;
};
