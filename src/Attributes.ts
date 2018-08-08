export interface IQueryAttribute {
    name: string;
    value?: number;
    min: number;
    max: number;
    step: number;
    onChange(e: any, cb: (attribute: IQueryAttribute) => {}): any;
}
class QueryAttribute implements IQueryAttribute{
    public name: string;
    public min: number;
    public max: number;
    public step: number;
    public value?: number | undefined;
    public onChange = (e: any, cb: (attribute: IQueryAttribute) => {}) => {
        this.value = e.target.value as number;
        cb(this);
    };
}
// tslint:disable-next-line:max-classes-per-file
export class MinDanceability extends QueryAttribute {
    public name: string = 'min_danceability';
    public min: number = 0.0;
    public max: number = 1.0;
    public step: number = 0.1;
}
// tslint:disable-next-line:max-classes-per-file
export class MinInstrumentalness extends QueryAttribute {
    public value?: number | undefined;
    public name: string = 'min_instrumentalness';
    public min: number = 0.0;
    public max: number = 1.0;
    public step: number = 0.1;
}

// tslint:disable-next-line:max-classes-per-file
export class MinPopularity extends QueryAttribute {
    public value?: number | undefined;
    public name: string = 'min_popularity';
    public min: number = 0;
    public max: number = 100;
    public step: number = 1;
}

// tslint:disable-next-line:max-classes-per-file
export class MinSpeechiness extends QueryAttribute {
    public value?: number | undefined;
    public name: string = 'min_speechiness';
    public min: number = 0.0;
    public max: number = 1.0;
    public step: number = 0.1;
}