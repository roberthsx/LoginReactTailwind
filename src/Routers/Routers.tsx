import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';

import Dashboard from "../Components/Dashboard/Dashboard";
import Preferences from "../Components/Preferences/Preferences";

function Routes() {
   return(
    <BrowserRouter>
        <Switch>
            <Route path="/dashboard">
                <Dashboard />
            </Route>
            <Route path="/preferences">
                <Preferences />
            </Route>
        </Switch>
    </BrowserRouter>
   )
}

export default Routes;