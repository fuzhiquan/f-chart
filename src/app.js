import React from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './pages/home'
import Chart from './pages/base'
import ChartMap from './pages/map'

export default function(props) {
    return <Router>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/base' component={Chart} />
            <Route path='/map' component={ChartMap} />
        </Switch>
    </Router>
}