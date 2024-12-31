import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { Appbar } from 'components/Appbar.component';
import { Sliders } from 'components/Sliders.component';
import { PrayerTimesContext } from 'lib/context/PrayerTimes.context';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Layout } from 'components/Layout.component';
import { New } from 'components/New/New.component';

function App() {
	const { isAdhan } = useContext(PrayerTimesContext);

	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route
						index
						path="/"
						element={
							<Appbar>
								<Paper
									elevation={10}
									sx={{
										p: 2,
										minHeight: 'calc(100vh - 275px)',
										maxHeight: 'calc(100vh - 275px)',
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
						}
					/>
					<Route path="new" element={<New />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
