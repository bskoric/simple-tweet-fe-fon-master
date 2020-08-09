import React, {Component} from "react";
import Tweets from "../Tweets/Tweets";

class Homepage extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    onShowAlert = () => {
        this.setState({showAlert: true}, () => {
            window.setTimeout(() => {
                this.setState({showAlert: false})
            }, 2000)
        });
        this.props.history.replace({state: undefined});
    };

    onDismiss() {
        this.setState({showAlert: false});
        this.props.history.replace({state: undefined});
    }

    render () {
        return (
            <React.Fragment>
                <h1>Helooo World</h1>
                <Tweets/>
            </React.Fragment>
        );
    }
}

export default Homepage;