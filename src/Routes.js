import React from "react";
import {Router, Switch, Route} from "react-router-dom"

import Tic from "./Tic/Tic";
import Home from "./Home/Home"
import history from './history'

class Routes extends React.Component{

    render(){
        return(
            <Router history={history}>
            <Switch>
                <Route path="/Home" component={Home}/>
                <Route path="/Tic" component={Tic}/>
            </Switch>
            </Router>
        )
    }
}

export default Routes