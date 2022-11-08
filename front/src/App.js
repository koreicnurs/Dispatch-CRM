import {Redirect, Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";
import Layout from "./components/UI/Layout/Layout";
import Login from "./containers/Login/Login";
import Trips from "./containers/Trips/Trips";
import Drivers from './containers/Drivers/Drivers';

const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
    return isAllowed ?
        <Route {...props}/> :
        <Redirect to={redirectTo}/>
};

const App = () => {
    const user = useSelector(state => state.users.user);

    return (
        <Layout>
            <Switch>
                <ProtectedRoute
                    isAllowed={user}
                    redirectTo="/login"
                    path="/"
                    exact
                    component={Trips}
                />
                <ProtectedRoute
                    isAllowed={user}
                    redirectTo="/login"
                    path="/trips"
                    component={Trips}
                />
                <ProtectedRoute
                  isAllowed={user}
                  redirectTo="/login"
                  path="/drivers"
                  component={Drivers}
                />
                <Route path="/login" component={Login}/>
            </Switch>
        </Layout>
    );
}

export default App;