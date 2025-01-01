export interface WeatherResponse {
	coord: {
		lon: number;
		lat: number;
	};
	weather: { id: number; main: string; description: string; icon: string }[];
	base: string;
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		humidity: number;
		sea_level: number;
		grnd_level: number;
	};
	visibility: number;
	wind: {
		speed: number;
		deg: number;
		gust: number;
	};
	rain: {
		'1h': number;
	};
	clouds: {
		all: number;
	};
	dt: number;
	sys: {
		type: number;
		id: number;
		country: string;
		sunrise: number;
		sunset: number;
	};
	timezone: number;
	id: number;
	name: string;
	cod: number;
}

export const getWeather = async () => {
	const response = await fetch(
		'https://api.openweathermap.org/data/2.5/weather?lat=52.78576280266427&lon=6.891952075836978&units=metric&appid=57e953ad2910b108d1ee733913170c02'
	);
	const data = (await response.json()) as WeatherResponse;

	return data;
};
