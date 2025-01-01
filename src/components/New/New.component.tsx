import Stack from '@mui/material/Stack';
import { Clock } from 'components/New/Clock.component';
import { RemainingTime } from 'components/New/RemainingTime.component';
import { PrayerTimes } from 'components/New/PrayerTimes.component';
import { Sliders } from 'components/New/Sliders.component';
import { QRCodes } from 'components/New/QRCodes.component';
import { Weather } from 'components/New/Weather.compnent';
import { useDevice } from 'lib/hooks/useDevice';

export const New = () => {
	const { isLgDown } = useDevice();

	return (
		<Stack
			sx={{
				minHeight: '100vh',
				background: 'linear-gradient(135deg, #0f172a, #1e293b)',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				color: 'white',
				px: { xs: 2, lg: 8 },
				py: 4,
				gap: 4
			}}
		>
			<Stack
				direction={{ xs: 'column', lg: 'row' }}
				alignItems={{ xs: 'center', lg: 'flex-start' }}
				justifyContent={{ xs: 'center', lg: 'space-between' }}
				width="100%"
			>
				<RemainingTime />
				{!isLgDown && <Weather />}
				<Clock />
			</Stack>
			<PrayerTimes />
			{!isLgDown && <Sliders />}
			{!isLgDown && <QRCodes />}
		</Stack>
	);
};
