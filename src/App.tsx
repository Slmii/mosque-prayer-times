import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Appbar } from 'components/Appbar.component';
import { Sliders } from 'components/Sliders.component';
import { PrayerTimesProvider } from 'lib/context/PrayerTimes.context';

const queryClient = new QueryClient();

function App() {
	return (
		<PrayerTimesProvider>
			<QueryClientProvider client={queryClient}>
				<CssBaseline />
				<Appbar>
					<Sliders />
				</Appbar>
			</QueryClientProvider>
		</PrayerTimesProvider>
	);
}

export default App;
