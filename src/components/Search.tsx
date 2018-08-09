// src/components/search.tsx

import * as React from 'react';

export interface IProps {
    userToken?: string;
    onSubmit(userToken: string): void;
}
interface IState {
    userToken: string;
}

class AccessToken extends React.Component<IProps, IState> {
    public static defaultProps: Partial<IProps> = {
        userToken: 'BQBw3-HSFX3QgQ8DL_7Tm9z_YAV-4yDN4T3dMIxMp7_J3AokUf9U5WeF-kXPcTvSsAhPAU5vwO8AVZcg1aKa2z7v6U5MbAEyxJnYKadn0Hqp3FMmd7mMUz1UyrymvT5K9Ixnb-HS7uHby_Ny7w'
    }

    constructor(props: IProps) {
        super(props)
        this.state = { userToken: this.props.userToken as string}
    }

    public updateInput = (event: any) => {
        this.setState({userToken : event.target.value})
    }

    public onSubmit = (e: any) => {
        e.preventDefault()
        // tslint:disable-next-line:no-console
        this.props.onSubmit(this.state.userToken);
    }

    public render() {
        return (
            <div className="hello">
            <form onSubmit={this.onSubmit}>
                <label>
                Enter user access token:
                <input type="text" name="userToken" placeholder={this.props.userToken} onChange={this.updateInput} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            </div>
        );
    }
}

export default AccessToken;

// helpers
