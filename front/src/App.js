import {Redirect, Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";
import Layout from "./components/UI/Layout/Layout";
import Login from "./containers/Login/Login";
import Trips from "./containers/Trips/Trips";
import Carriers from "./containers/Carriers/Carriers";

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
                  path="/carriers"
                  component={Carriers}
                />
                <Route path="/login" component={Login}/>
            </Switch>
        </Layout>
    );
}

export default App;