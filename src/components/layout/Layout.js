import React, {Component} from "react";
import {Route, Switch} from 'react-router-dom';
import Homepage from "../pages/Homepage";
import Header from "./Header";
import "./../../assets/css/main.css";
import UserTweetsPage from "../pages/UserTweetsPage";
import FriendsPage from "../pages/FriendsPage";
import NonfriendsPage from "../pages/NonfriendsPage";
import UserPage from "../pages/UserPage";

class Layout extends Component {
    render() {
        const navigation = [
            { title: 'My tweets', url: '/my/tweets' },
            { title: 'Friends', url: '/friends' },
            { title: 'Find friends', url: '/find-friends' },
            { title: 'Profile', url: '/profile' },
        ];

        return (
            <div className="container-app">
                <Header title="Simple tweet" sections={navigation} headerColor={"white"} titleColor={"#50719e"}/>
                <div className="wrapper">
                    <section className="content-app">
                        <Switch>
                            <Route path='/' exact={true} component={Homepage}/>
                            <Route path='/my/tweets' exact={true} component={UserTweetsPage}/>
                            <Route path='/friends' exact={true} component={FriendsPage}/>
                            <Route path='/find-friends' exact={true} component={NonfriendsPage}/>
                            <Route path='/profile' exact={true} component={UserPage}/>
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
