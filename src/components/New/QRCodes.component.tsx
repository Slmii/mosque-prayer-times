import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import QRCode from 'react-qr-code';

const QR_LINKS = [
	{
		label: 'Yildirim Beyazit Camii Site',
		link: 'https://yildirim-beyazit.nl'
	},
	{
		label: 'Namaz Vakitleri / Gebedstijden',
		link: 'https://prayer-times.yildirim-beyazit.nl/new'
	},
	{
		label: 'Camiye Bağış / Donatie Moskee',
		link: 'https://betaalverzoek.rabobank.nl/betaalverzoek/?id=OHIeKVpERniSu6fB2bSNcg'
	},
	{
		label: 'Üye ol / Word lid',
		link: 'https://www.yildirim-beyazit.nl/membership'
	}
];

export const QRCodes = () => {
	return (
		<Stack direction="row" alignItems="center" justifyContent="center" gap={10}>
			{QR_LINKS.map(qr => (
				<Stack alignItems="center" key={qr.link}>
					<Stack alignItems="center" bgcolor="white" p={1} borderRadius={2}>
						<QRCode size={150} value={qr.link} viewBox={`0 0 256 256`} />
					</Stack>
					<Typography textAlign="center" variant="h6" mt={0.5}>
						{qr.label}
					</Typography>
				</Stack>
			))}
		</Stack>
	);
};
