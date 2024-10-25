import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

// import { useRandomHadithNumber } from 'lib/hooks/useRandomHadithNumber';
// import { HadithResponse } from 'lib/types/Hadith';
import { sliderState } from 'lib/recoil/slider.atom';
import { SliderRepsonse, TimerResponse } from 'lib/types/Sliders';
import { getImgFromHtmlString } from 'lib/utils/prayer-times.utilts';
import Stack from '@mui/material/Stack';

export const Sliders = () => {
	const [sliderIndex, setSliderIndex] = useRecoilState(sliderState);

	const { data: sliders } = useQuery<SliderRepsonse[]>({
		queryKey: ['sliders'],
		refetchInterval: 5000,
		queryFn: () => fetch('https://moskee-signage.cmswebdesign.nl/wp-json/wp/v2/posts/').then(res => res.json())
	});

	const { data: timer } = useQuery<TimerResponse>({
		queryKey: ['timer'],
		enabled: !!sliders && sliders.length > 0,
		queryFn: () =>
			fetch('https://moskee-signage.cmswebdesign.nl/wp-json/wp/v2/instellingen_slider/77').then(res => res.json())
	});

	// const hadithIndex = useRandomHadithNumber();
	// const { data: hadiths } = useQuery<HadithResponse>({
	// 	queryKey: ['hadiths'],
	// 	enabled: !!sliders && sliders.length === 0,
	// 	queryFn: () =>
	// 		fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/tur-bukhari.json').then(res => res.json())
	// });

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
						<>
							{sliders[sliderIndex].tags.includes(5) ? (
								<Box
									component="img"
									src={getImgFromHtmlString(sliders[sliderIndex].content.rendered)}
									alt={sliders[sliderIndex].title.rendered}
									width="50%"
									height="100%"
								/>
							) : (
								<Stack
									height="100%"
									alignItems="center"
									justifyContent="center"
									dangerouslySetInnerHTML={{
										__html: sliders[sliderIndex].content.rendered
									}}
								/>
							)}
						</>
					) : null}
					{!!sliders.length && (
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
					)}
				</>
			) : null}
		</>
	);
};
