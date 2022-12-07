import {Redirect, Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";
import Layout from "./components/UI/Layout/Layout";
import Login from "./containers/Login/Login";
import Trips from "./containers/Trips/Trips";
import Carriers from "./containers/Carriers/Carriers";
import StatusUpdate from "./containers/StatusUpdate/StatusUpdate";
import Drivers from "./containers/Drivers/Drivers";
import MyProfile from "./containers/MyProfile/MyProfile";
import Dispatchers from "./containers/Dispatchers/Dispatchers";

const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
    return isAllowed ?
        <Route {...props}/> :
        <Redirect to={redirectTo}/>
};

const RoleProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
    if (isAllowed) {
        if (isAllowed.role === "admin") {
            return <Route {...props}/>
        } else {
            return <Redirect to="/loads"/>
        }
    } else {
        return <Redirect to={redirectTo}/>
    }
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
                    path="/status-update"
                    component={StatusUpdate}
                />
                <ProtectedRoute
                    isAllowed={user}
                    redirectTo="/login"
                    path="/loads"
                    component={Trips}
                />
                <ProtectedRoute
                  isAllowed={user}
                  redirectTo="/login"
                  path="/carriers"
                  component={Carriers}
                />
                <ProtectedRoute
                  isAllowed={user}
                  redirectTo="/login"
                  path="/drivers"
                  component={Drivers}
                />
                <ProtectedRoute
                  isAllowed={user}
                  redirectTo="/login"
                  path="/my-profile"
                  component={MyProfile}
                />
                <RoleProtectedRoute
                  isAllowed={user}
                  redirectTo="/login"
                  path="/dispatchers"
                  component={Dispatchers}
                />
                <Route path="/login" component={Login}/>
            </Switch>
        </Layout>
    );
}

export default App;