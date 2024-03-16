export interface SliderRepsonse {
	id: number;
	content: {
		rendered: string;
	};
	title: {
		rendered: string;
	};
	tags: number[];
}

export interface TimerResponse {
	acf: {
		interval_in_seconden: string;
	};
}
