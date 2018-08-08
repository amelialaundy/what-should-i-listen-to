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
        userToken: 'BQAJIYSLJXgB4zoDUZiyuypxFsxfQvqwu-xe8Z9ZeteCfCtDwX5-1HkLyl24CSeOR6HghFgeXP-POb0YdTNJ1Yj6moEZa0F2ZRY6TKgsMY4qhdncKbfQvxhJ4XkRGI5HFsMoIA_4D-JlfF0BBg'
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
