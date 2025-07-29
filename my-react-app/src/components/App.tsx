import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/" exact>
                    <h1>Welcome to the App</h1>
                </Route>
            </Switch>
        </Router>
    );
};

export default App;