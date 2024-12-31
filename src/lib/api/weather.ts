export interface WeatherResponse {
	latitude: number;
	longitude: number;
	generationtime_ms: number;
	utc_offset_seconds: number;
	timezone: string;
	timezone_abbreviation: string;
	elevation: number;
	hourly_units: {
		time: string;
		temperature_2m: string;
	};
	hourly: {
		time: string[];
		temperature_2m: number[];
	};
}

export const getWeather = async () => {
	const response = await fetch(
		'https://api.open-meteo.com/v1/forecast?latitude=52.7792&longitude=6.9069&hourly=temperature_2m&daily=weather_code&timezone=Europe%2FBerlin'
	);
	const data = (await response.json()) as WeatherResponse;

	return data;
};
