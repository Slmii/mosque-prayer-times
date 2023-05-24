export interface HadithResponse {
	metadata: {
		name: string;
		sections: Record<string, string>;
	};
	hadiths: Hadith[];
}

export interface Hadith {
	text: string;
	reference: {
		book: string;
		hadith: string;
	};
}
