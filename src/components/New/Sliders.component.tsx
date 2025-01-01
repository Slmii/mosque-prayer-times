import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { sliderState } from 'lib/recoil/slider.atom';
import { Announcement, Announcements, ApiAyah, ApiSingleSurah, QuranAyah } from 'lib/types/Sliders';
import Stack from '@mui/material/Stack';

export const Sliders = () => {
	const [sliderIndex, setSliderIndex] = useRecoilState(sliderState);

	const { data: ayahs } = useQuery<QuranAyah[]>({
		queryKey: ['ayahs'],
		refetchInterval: 60000,
		queryFn: async () => {
			return (await fetch(`${import.meta.env.VITE_API_URL}/ayahs`).then(res => res.json())) as QuranAyah[];
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
		}, 15000);

		return () => {
			clearInterval(interval);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ayahs]);

	useEffect(() => {
		// Reset
		if (sliderIndex === slidersCount) {
			setSliderIndex(0);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setSliderIndex, sliderIndex]);

	if (!slider?.slider) {
		return null;
	}

	return (
		<Stack
			bgcolor="#ffffff"
			p={4}
			borderRadius={5}
			height="calc(100vh - 850px)"
			alignItems="center"
			justifyContent="center"
			sx={{
				overflowY: 'auto'
			}}
		>
			{slider.type === 'ayah' ? (
				<AyahCard slider={slider.slider as QuranAyah} />
			) : (
				<Announcementcard slider={slider.slider as Announcement} />
			)}
			{/* {!!slidersCount && (
				<Typography textAlign="center" variant="h6" fontSize={20} mt={6} fontWeight="bold" color="#000000">
					{sliderIndex + 1} / {slidersCount}
				</Typography>
			)} */}
		</Stack>
	);
};

const AyahCard = ({ slider }: { slider: QuranAyah }) => {
	const isAyahEnabled = !slider.completeSurah && !!slider.surah && !!slider.ayah;
	const { data: ayahData, isError: isAyahError } = useQuery({
		queryKey: ['ayah', slider.surah, slider.ayah, slider.language],
		enabled: isAyahEnabled,
		queryFn: async () => {
			const response = await fetch(
				`https://api.alquran.cloud/v1/ayah/${slider.surah}:${slider.ayah}/${slider.language}`
			);
			return (await response.json()).data as ApiAyah;
		}
	});

	const isSurahEnabled = slider.completeSurah && !!slider.surah;
	const { data: surahData, isError: isSurahError } = useQuery({
		queryKey: ['surah', slider.surah, slider.language],
		enabled: isSurahEnabled,
		queryFn: async () => {
			const response = await fetch(`https://api.alquran.cloud/v1/surah/${slider.surah}/${slider.language}`);
			return (await response.json()).data as ApiSingleSurah;
		}
	});

	// Memo for name, ayahs and verse number
	const data = useMemo(() => {
		if (!slider.completeSurah && ayahData) {
			return {
				name: ayahData.surah.englishName,
				arabicName: ayahData.surah.name,
				text: ayahData.text,
				verse: `${ayahData.surah.number}:${slider.ayah}`
			};
		}

		if (slider.completeSurah && surahData) {
			return {
				name: surahData.englishName,
				arabicName: surahData.name,
				text: surahData.ayahs.map(ayah => ayah.text).join(' '),
				verse: surahData.number
			};
		}

		return null;
	}, [slider, ayahData, surahData]);

	if (!data || isAyahError || isSurahError) {
		return null;
	}

	return (
		<>
			<Typography textAlign="center" variant="h1" fontSize={64} fontWeight="bold" mb={2} color="#000000">
				{data.text}
			</Typography>
			<Typography textAlign="center" variant="h6" fontSize={32} sx={{ opacity: 0.7 }} color="#000000">
				{data.name} {data.verse}
			</Typography>
		</>
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
