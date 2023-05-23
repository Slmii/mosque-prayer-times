import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { sliderState } from 'lib/recoil/slider.atom';

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
	const [sliderIndex, setSliderIndex] = useRecoilState(sliderState);

	const { data: sliders } = useQuery<SliderRepsonse[]>({
		queryKey: ['sliders'],
		refetchInterval: 5000,
		queryFn: async () => {
			const data = (await fetch('https://moskee-signage.cmswebdesign.nl/wp-json/wp/v2/posts/').then(res =>
				res.json()
			)) as SliderRepsonse[];

			return data.sort((a, b) => a.id - b.id);
		}
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
			setSliderIndex(prevIndex => prevIndex + 1);
		}, Number(timer.acf.interval_in_seconden) * 1000);

		return () => {
			clearInterval(interval);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [timer, sliders]);

	useEffect(() => {
		// If index is the last index, set it to 0
		if (sliders && sliderIndex === sliders.length) {
			setSliderIndex(0);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sliderIndex, sliders?.length]);

	return (
		<>
			{sliders ? (
				<>
					{sliders[sliderIndex] ? (
						<Box
							dangerouslySetInnerHTML={{
								__html: sliders[sliderIndex].content.rendered
							}}
						/>
					) : null}
					<Box
						sx={{
							position: 'absolute',
							bottom: 20,
							left: '50%',
							transform: 'translateX(-50%)'
						}}
					>
						<Typography variant="h3" fontWeight="bold">
							{sliderIndex + 1} / {sliders.length}
						</Typography>
					</Box>
				</>
			) : null}
		</>
	);
};
