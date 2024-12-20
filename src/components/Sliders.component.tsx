import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { sliderState } from 'lib/recoil/slider.atom';
import { Announcement, Announcements, ApiAyah, QuranAyah } from 'lib/types/Sliders';
import Stack from '@mui/material/Stack';

export const Sliders = () => {
	const [sliderIndex, setSliderIndex] = useRecoilState(sliderState);

	const { data: ayahs } = useQuery<QuranAyah[]>({
		queryKey: ['ayahs'],
		refetchInterval: 60000,
		queryFn: async () => {
			const ayahs = (await fetch(`${import.meta.env.VITE_API_URL}/ayahs`).then(res => res.json())) as QuranAyah[];
			return ayahs.filter(ayah => ayah.surah !== 0 && ayah.ayah !== 0);
		}
	});

	const { data: announcements } = useQuery<Announcement[]>({
		queryKey: ['announcements'],
		refetchInterval: 60000,
		queryFn: async () => {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/announcements`);
			const data = (await response.json()) as Announcements;

			return Object.values(data).flat() as Announcement[];
		}
	});

	const slidersCount = (ayahs?.length || 0) + (announcements?.length || 0);
	const slider = useMemo(() => {
		if (!ayahs || !announcements) {
			return null;
		}

		const ayahsLength = ayahs.length;

		// If current slider index is less than the ayahs length, return the ayah
		if (sliderIndex < ayahsLength) {
			return {
				type: 'ayah',
				slider: ayahs[sliderIndex]
			};
		}

		// If current slider index is more than the ayahs length, return the announcement
		return {
			type: 'announcement',
			slider: announcements[sliderIndex - ayahsLength]
		};
	}, [ayahs, announcements, sliderIndex]);

	// Make interval that changes the index
	useEffect(() => {
		if (!ayahs) {
			return;
		}

		const interval = setInterval(() => {
			setSliderIndex(prevIndex => prevIndex + 1);
		}, 2000);

		return () => {
			clearInterval(interval);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ayahs]);

	useEffect(() => {
		// If index is the last index, set it to 0
		if (sliderIndex > slidersCount - 1) {
			setSliderIndex(0);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setSliderIndex, sliderIndex]);

	return (
		<>
			{slider?.slider && (
				<>
					{slider.type === 'ayah' ? (
						<AyahCard slider={slider.slider as QuranAyah} />
					) : (
						<Announcementcard slider={slider.slider as Announcement} />
					)}
					{!!slidersCount && (
						<Box
							sx={{
								position: 'absolute',
								bottom: 20,
								left: '50%',
								transform: 'translateX(-50%)'
							}}
						>
							<Typography variant="h3" fontWeight="bold">
								{sliderIndex + 1} / {slidersCount}
							</Typography>
						</Box>
					)}
				</>
			)}
		</>
	);
};

const AyahCard = ({ slider }: { slider: QuranAyah }) => {
	const { data, isError } = useQuery({
		queryKey: ['ayah', slider.surah, slider.ayah],
		queryFn: async () => {
			const response = await fetch(
				`https://api.alquran.cloud/v1/ayah/${slider.surah}:${slider.ayah}/${slider.language}`
			);
			return (await response.json()).data as ApiAyah;
		}
	});

	if (!data || isError) {
		return null;
	}

	return (
		<Stack height="100%">
			<Typography textAlign="center" variant="h2" fontSize={70} mb={10}>
				{data.surah.englishName} | {data.surah.name}
			</Typography>
			<Typography textAlign="center" variant="h1" fontSize={78} fontWeight="bold">
				{data.text}
			</Typography>
			<Typography textAlign="center" variant="h6" fontSize={40}>
				{data.surah.number}:{slider.ayah}
			</Typography>
		</Stack>
	);
};

const Announcementcard = ({ slider }: { slider: Announcement }) => {
	return (
		<Stack
			height="100%"
			width="100%"
			alignItems="center"
			justifyContent="center"
			dangerouslySetInnerHTML={{
				__html: slider.content
			}}
		/>
	);
};
