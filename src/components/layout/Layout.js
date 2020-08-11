import React, {Component} from "react";
import {Route, Switch} from 'react-router-dom';
import Homepage from "../pages/Homepage";
import Header from "./Header";

class Layout extends Component {
    render() {
        const navigation = [
            { title: 'Technology', url: '#' },
            { title: 'Design', url: '#' },
            { title: 'Culture', url: '#' },
            { title: 'Business', url: '#' },
            { title: 'Politics', url: '#' },
        ];

        return (
            <div className="wrapper">
                <Header title="Simple tweet" sections={navigation} />
                <section className="content">
                    <Switch>
                        <Route path='/' exact={true} component={Homepage}/>
                    </Switch>
                </section>
                <footer>
                </footer>
            </div>
        );
    }
}

export default Layout;
