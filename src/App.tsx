import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
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
						position: 'relative',
						animation: isAdhan ? 'flicker 1.5s infinite' : undefined,
						'@keyframes flicker': {
							'0%': {
								backgroundColor: 'white',
								color: 'black'
							},
							'50%': {
								backgroundColor: 'red',
								color: 'white'
							},
							'100%': {
								backgroundColor: 'white',
								color: 'black'
							}
						}
					}}
				>
					{!isAdhan ? (
						<Sliders />
					) : (
						<Stack direction="column" alignContent="center" textAlign="center" justifyContent="center">
							<Typography variant="h1" fontWeight="bold" fontSize={200}>
								Adhan
							</Typography>
							<Typography variant="h1" fontWeight="bold" fontSize={200}>
								Ezan
							</Typography>
						</Stack>
					)}
				</Paper>
			</Appbar>
		</QueryClientProvider>
	);
}

export default App;
