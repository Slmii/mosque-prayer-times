import Stack from '@mui/material/Stack';
import { useQuery } from '@tanstack/react-query';
import { getWeather } from 'lib/api/weather';
import { useMemo } from 'react';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Typography from '@mui/material/Typography';

export const Weather = () => {
	const { data } = useQuery({
		queryKey: ['weather'],
		queryFn: () => getWeather(),
		refetchInterval: 1000 * 60 * 60 // 1 hour interval
	});

	const weather = useMemo(() => {
		if (!data) {
			return;
		}

		// Get the current date and hour in the same format
		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const day = String(now.getDate()).padStart(2, '0');
		const hour = String(now.getHours()).padStart(2, '0');

		const currentTime = `${year}-${month}-${day}T${hour}:00`;

		// Find the index of the matching timestamp
		const index = data.hourly.time.findIndex(time => time === currentTime);
		if (index === -1) {
			return;
		}

		const time = data.hourly.time[index];
		const temperature = data.hourly.temperature_2m[index];

		return {
			time,
			temperature
		};
	}, [data]);

	return (
		<Stack
			px={4}
			py={2}
			borderRadius={5}
			direction="row"
			gap={2}
			alignItems="center"
			justifyContent="center"
			bgcolor="#192234"
		>
			<WbSunnyIcon fontSize="large" />
			<Typography variant="h2" fontWeight="bold" textTransform="capitalize">
				{weather ? Math.round(weather.temperature ?? 0) : '-'}°C
			</Typography>
		</Stack>
	);
};
