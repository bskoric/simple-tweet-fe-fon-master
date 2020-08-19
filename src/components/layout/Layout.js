import React, {Component} from "react";
import {Route, Switch} from 'react-router-dom';
import Homepage from "../pages/Homepage";
import Header from "./Header";
import "./../../assets/css/main.css";
import UserTweets from "../pages/UserTweets";

class Layout extends Component {
    render() {
        const navigation = [
            { title: 'My tweets', url: '/my/tweets' },
            { title: 'Friends', url: '#' },
            { title: 'Find friends', url: '#' },
            { title: 'Profile', url: '#' },
        ];

        return (
            <div className="container-app">
                <Header title="Simple tweet" sections={navigation} headerColor={"white"} titleColor={"#50719e"}/>
                <div className="wrapper">
                    <section className="content-app">
                        <Switch>
                            <Route path='/' exact={true} component={Homepage}/>
                            <Route path='/my/tweets' exact={true} component={UserTweets}/>
                        </Switch>
                    </section>
                    <footer>
                    </footer>
                </div>
            </div>
        );
    }
}

export default Layout;
