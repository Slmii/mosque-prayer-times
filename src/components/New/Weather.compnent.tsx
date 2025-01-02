import Stack from '@mui/material/Stack';
import { useQuery } from '@tanstack/react-query';
import { getWeather } from 'lib/api/weather';
import Typography from '@mui/material/Typography';

export const Weather = () => {
	const { data } = useQuery({
		queryKey: ['weather'],
		queryFn: () => getWeather(),
		refetchInterval: 1000 * 60 * 60 // 1 hour interval
	});

	return (
		<Stack
			borderRadius={2}
			direction="row"
			pr={4}
			py={2}
			gap={2}
			alignItems="center"
			justifyContent="center"
			sx={{
				background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
				backdropFilter: 'blur(10px)',
				border: '1px solid rgba(255, 255, 255, 0.3)'
			}}
		>
			<img
				src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
				alt="weather"
				onError={e => (e.currentTarget.src = 'https://openweathermap.org/img/wn/01d.png')}
			/>
			<Typography variant="h1" fontWeight="bold" textTransform="capitalize">
				{data ? Math.floor(data.main.temp) : '-'}°C
			</Typography>
		</Stack>
	);
};
