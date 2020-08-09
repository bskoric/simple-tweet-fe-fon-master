import React, {Component} from "react";
import {Route, Switch} from 'react-router-dom';
import Homepage from "../pages/Homepage";

class Layout extends Component {
    render() {
        return (
            <div className="wrapper">
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
