export interface IQueryAttribute {
		name: string;
		displayName: string;
		description: string;
		min: number;
		max: number;
		step: number;
}

export interface IAttributeChangeValue {
	name: string;
	value?: number;
}

class QueryAttribute implements IQueryAttribute{
		public description: string;
		public displayName: string;
		public name: string;
		public min: number;
		public max: number;
		public step: number;
		
}
// tslint:disable-next-line:max-classes-per-file
export class MinDanceability extends QueryAttribute {
		public name: string = 'min_danceability';
		public displayName: string = 'Danceability';
		public description: string = 'Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.';
		public min: number = 0.0;
		public max: number = 1.0;
		public step: number = 0.1;
}
// tslint:disable-next-line:max-classes-per-file
export class MinInstrumentalness extends QueryAttribute {
		public name: string = 'min_instrumentalness';
		public displayName: string = 'Instrumentalness';
		public description: string = 'Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly “vocal”. The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.';
		public min: number = 0.0;
		public max: number = 1.0;
		public step: number = 0.1;
}

// tslint:disable-next-line:max-classes-per-file
export class MinPopularity extends QueryAttribute {
		public name: string = 'min_popularity';
		public displayName: string = 'Popularity';
		public description: string = 'The popularity of the track. The value will be between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are.'
		public min: number = 0;
		public max: number = 100;
		public step: number = 1;
}

// tslint:disable-next-line:max-classes-per-file
export class MinSpeechiness extends QueryAttribute {
		public name: string = 'min_speechiness';
		public displayName: string = 'Speechiness';
		public description: string = 'Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.'    
		public min: number = 0.0;
		public max: number = 1.0;
		public step: number = 0.1;
}