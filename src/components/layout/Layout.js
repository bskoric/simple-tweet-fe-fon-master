import React, {Component} from "react";
import {Route, Switch} from 'react-router-dom';
import Homepage from "../pages/Homepage";
import Header from "./Header";

class Layout extends Component {
    render() {
        const navigation = [
            { title: 'My tweets', url: '#' },
            { title: 'Friends', url: '#' },
            { title: 'Find friends', url: '#' },
            { title: 'Profile', url: '#' },
        ];

        return (
            <>
            <Header title="Simple tweet" sections={navigation} headerColor={"white"} titleColor={"#50719e"}/>
            <div className="wrapper">
                <section className="content-app">
                    <Switch>
                        <Route path='/' exact={true} component={Homepage}/>
                    </Switch>
                </section>
                <footer>
                </footer>
            </div>
                </>
        );
    }
}

export default Layout;
