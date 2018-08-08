// tslint:disable:jsx-no-lambda

import * as React from 'react';
import {IQueryAttribute, MinDanceability, MinInstrumentalness, MinPopularity, MinSpeechiness} from '../Attributes'
// import * as SpotifyWebApi from 'spotify-web-api-js'

interface IProps {
    onChange(attribute: IQueryAttribute): any;
}


interface IState {
    attributes: IQueryAttribute[];
}

class QueryAttributes extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = ({
            attributes: [new MinDanceability(), new MinInstrumentalness(), new MinPopularity(), new MinSpeechiness()]
        })
    }

    public getAttribute = (attribute: IQueryAttribute) => {
        const style = {
            display: 'inline-block'
        }
        return (
            <div key={attribute.name}>
                <p style={style}>{attribute.name}</p>
                <input style={style}
                    type="number" 
                    step={attribute.step}
                    min={attribute.min} 
                    max={attribute.max} 
                    onChange={(e) => attribute.onChange(e, this.props.onChange)} />
            </div>
        )
    }
    public render() {
        return (
            <div className="hello">
                <ul>
                    {this.state.attributes.map(this.getAttribute)}
                </ul>
            </div>
        );
    }
}

export default QueryAttributes;

// helpers
