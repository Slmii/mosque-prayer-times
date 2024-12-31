import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router';

const queryClient = new QueryClient();

export const Layout = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<CssBaseline />
			<Outlet />
		</QueryClientProvider>
	);
};
