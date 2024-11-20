export interface PrayerTimeResponse {
	Aksam: string;
	AyinSekliURL: string;
	GreenwichOrtalamaZamani: string;
	Gunes: string;
	GunesBatis: string;
	GunesDogus: string;
	HicriTarihKisa: string;
	HicriTarihKisaIso8601: string;
	HicriTarihUzun: string;
	HicriTarihUzunIso8601: string;
	Ikindi: string;
	Imsak: string;
	KibleSaati: string;
	MiladiTarihKisa: string;
	MiladiTarihKisaIso8601: string;
	MiladiTarihUzun: string;
	MiladiTarihUzunIso8601: string;
	Ogle: string;
	Yatsi: string;
}

export const fetchPrayerTimes = async () => {
	const response = await fetch('https://ezanvakti.emushaf.net/vakitler/13880');
	const data = (await response.json()) as PrayerTimeResponse[];

	return data;
};
