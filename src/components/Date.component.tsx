import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

import { LOCALE } from 'lib/constants';

export const CurrentDate = () => {
	const [currentDate, setCurrentDate] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentDate(new Date());
		}, 1000 * 60 * 60); // Every hour

		return () => {
			clearInterval(interval);
		};
	}, []);

	const formattedDate = new Intl.DateTimeFormat(LOCALE, {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		weekday: 'long'
	}).format(currentDate);

	return (
		<Typography variant="h2" fontSize={50} fontWeight="bold" textTransform="capitalize">
			{formattedDate}
		</Typography>
	);
};
