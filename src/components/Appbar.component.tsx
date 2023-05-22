import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';

import { Header } from './Header.component';
import { PrayerTimes } from './PrayerTimes.component';

const drawerWidth = 500;
const backgroundColor = '#0081A7';

export const Appbar = ({ children }: PropsWithChildren) => {
	const [appbarHeight, setAppbarHeight] = useState(60);
	const appbarRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const handleResize = () => {
			if (appbarRef.current) {
				const height = appbarRef.current.clientHeight;
				setAppbarHeight(height);
			}
		};

		// Attach the resize event listener
		window.addEventListener('resize', handleResize);

		// Call the handleResize function initially to set the initial height
		handleResize();

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar
				ref={appbarRef}
				position="fixed"
				sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor }}
			>
				<Toolbar disableGutters>
					<Header />
				</Toolbar>
			</AppBar>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box'
					}
				}}
				PaperProps={{
					sx: {
						backgroundColor,
						color: 'white'
					}
				}}
				variant="permanent"
				anchor="left"
			>
				<PrayerTimes />
			</Drawer>
			<Box
				component="main"
				sx={{ flexGrow: 1, bgcolor: theme => theme.palette.grey[300], p: 3, marginTop: `${appbarHeight}px` }}
			>
				{children}
			</Box>
		</Box>
	);
};
