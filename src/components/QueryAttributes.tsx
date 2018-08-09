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
        return (
            <div className='info-container' key={attribute.name}>
                <p className='attribute-name'>{attribute.displayName}</p>
                <input className='attribute-value'
                    type="number" 
                    step={attribute.step}
                    min={attribute.min} 
                    max={attribute.max} 
                    onChange={(e) => attribute.onChange(e, this.props.onChange)} />
                <p className='attribute-description'>{attribute.description}</p>
                    
            </div>
        )
    }
    public render() {
        return (
            <div className="type-container attributes">
                    {this.state.attributes.map(this.getAttribute)}
            </div>
        );
    }
}

export default QueryAttributes;

// helpers
