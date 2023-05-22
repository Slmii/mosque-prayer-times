import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';

import { PrayerTimesProvider } from 'lib/context/PrayerTimes.context.tsx';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<PrayerTimesProvider>
			<RecoilRoot>
				<App />
			</RecoilRoot>
		</PrayerTimesProvider>
	</React.StrictMode>
);
