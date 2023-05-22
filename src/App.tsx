import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useContext } from 'react';

import { Appbar } from 'components/Appbar.component';
import { Sliders } from 'components/Sliders.component';
import { PrayerTimesContext } from 'lib/context/PrayerTimes.context';

const queryClient = new QueryClient();

function App() {
	const { isAdhan } = useContext(PrayerTimesContext);

	return (
		<QueryClientProvider client={queryClient}>
			<CssBaseline />
			<Appbar>
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
					{!isAdhan ? <Sliders /> : 'ADHAN TIJD'}
				</Paper>
			</Appbar>
		</QueryClientProvider>
	);
}

export default App;
