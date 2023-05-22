import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

interface SliderRepsonse {
	id: number;
	content: {
		rendered: string;
	};
}

interface TimerResponse {
	acf: {
		interval_in_seconden: string;
	};
}

export const Sliders = () => {
	const [index, setIndex] = useState(0);

	const { data: sliders } = useQuery<SliderRepsonse[]>({
		queryKey: ['sliders'],
		refetchInterval: 5000,
		queryFn: () => fetch('https://moskee-signage.cmswebdesign.nl/wp-json/wp/v2/posts/').then(res => res.json())
	});

	const { data: timer } = useQuery<TimerResponse>({
		queryKey: ['timer'],
		queryFn: () =>
			fetch('https://moskee-signage.cmswebdesign.nl/wp-json/wp/v2/instellingen_slider/77').then(res => res.json())
	});

	// Make interval that changes the index
	useEffect(() => {
		if (!timer || !sliders) {
			return;
		}

		const interval = setInterval(() => {
			// If index is the last index, set it to 0
			if (index === sliders.length - 1) {
				setIndex(0);
				return;
			}

			// Else, increment the index
			setIndex(index + 1);
		}, Number(timer.acf.interval_in_seconden) * 1000);

		return () => {
			clearInterval(interval);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [timer, sliders]);

	return (
		<Paper
			elevation={10}
			sx={{
				p: 2,
				height: 'calc(100vh - 275px)',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				position: 'relative'
			}}
		>
			{sliders ? (
				<>
					<Box
						dangerouslySetInnerHTML={{
							__html: sliders[index].content.rendered
						}}
					/>
					<Box
						sx={{
							position: 'absolute',
							bottom: 20,
							left: '50%',
							transform: 'translateX(-50%)'
						}}
					>
						<Typography variant="h3" fontWeight="bold">
							{index + 1} / {sliders.length}
						</Typography>
					</Box>
				</>
			) : null}
		</Paper>
	);
};
