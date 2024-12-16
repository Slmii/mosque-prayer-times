export interface QuranAyah {
	id: number;
	surah: number;
	ayah: number;
	language: string;
	order: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface Announcements {
	[Language.TR]: Announcement[];
	[Language.NL]: Announcement[];
	[Language.AR]: Announcement[];
}

export interface Announcement {
	id: number;
	content: string;
	language: Language;
	createdAt: Date;
	updatedAt: Date;
}

export enum Language {
	NL = 'NL',
	TR = 'TR',
	AR = 'AR'
}

export interface ApiSurah {
	number: number;
	name: string;
	englishName: string;
	englishNameTranslation: string;
	numberOfAyahs: number;
	revelationType: string;
}

export interface ApiAyah {
	number: number;
	text: string;
	surah: ApiSurah;
}
