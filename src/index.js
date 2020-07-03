import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Pages/Home/Home';
import Sobre from './Pages/Sobre/Sobre';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
ReactDOM.render(
<BrowserRouter>
    <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/sobre" component={Sobre} />
    </Switch>
</ BrowserRouter>
, document.getElementById('root'));