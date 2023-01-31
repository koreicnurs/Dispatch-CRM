import {Redirect, Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";
import Layout from "./components/UI/Layout/Layout";
import Login from "./containers/Login/Login";
import Trips from "./containers/Trips/Trips";
import Carriers from "./containers/Carriers/Carriers";
import StatusUpdate from "./containers/StatusUpdate/StatusUpdate";
import Drivers from "./containers/Drivers/Drivers";
import Brokers from "./containers/Brokers/Brokers";
import MyProfile from "./containers/MyProfile/MyProfile";
import Dispatchers from "./containers/Dispatchers/Dispatchers";
import CarrierTrips from "./containers/CarrierTrips/CarrierTrips";
import Administrators from "./containers/Administrators/Administrators";
import UserCarriers from "./containers/UserCarriers/UserCarriers";
import Learnings from "./containers/Learnings/Learnings";
import LearningCategory from "./containers/LearningCategory/LearningCategory";
import LearningArticle from "./containers/LearningArticle/LearningArticle";

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
                    isAllowed={user?.role !== 'carrier'}
                    redirectTo="/login"
                    path="/"
                    exact
                    component={Trips}
                />
                <ProtectedRoute
                    isAllowed={user?.role !== 'carrier'}
                    redirectTo="/login"
                    path="/status-update"
                    component={StatusUpdate}
                />
                <ProtectedRoute
                    isAllowed={user?.role !== 'carrier'}
                    redirectTo="/login"
                    path="/loads"
                    component={Trips}
                />
                <ProtectedRoute
                  isAllowed={user?.role !== 'carrier'}
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
                    isAllowed={user?.role !== 'carrier'}
                    redirectTo="/login"
                    path="/brokers"
                    component={Brokers}
                />
                <ProtectedRoute
                  isAllowed={user?.role !== 'carrier'}
                  redirectTo="/login"
                  path="/learnings"
                  component={Learnings}
                />
                <ProtectedRoute
                  isAllowed={user?.role !== 'carrier'}
                  redirectTo="/login"
                  path="/learning"
                  exact
                  component={LearningCategory}
                />
                <ProtectedRoute
                  isAllowed={user?.role !== 'carrier'}
                  redirectTo="/login"
                  path="/article/:id"
                  exact
                  component={LearningArticle}
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
                <RoleProtectedRoute
                  isAllowed={user}
                  redirectTo="/login"
                  path="/administrators"
                  component={Administrators}
                />
                <RoleProtectedRoute
                  isAllowed={user}
                  redirectTo="/login"
                  path="/user-carriers"
                  component={UserCarriers}
                />
                <ProtectedRoute
                  isAllowed={user?.role === 'carrier'}
                  redirectTo="/login"
                  path="/carrier-loads"
                  component={CarrierTrips}
                />
                <ProtectedRoute
                    isAllowed={!user}
                    redirectTo={user?.role === 'carrier' ? "/carrier-loads" : "/"}
                    path="/login"
                    component={Login}
                />
                <Route render={() => <h1 style={{textAlign: 'center'}}>Error 404 Not found!</h1>}/>
            </Switch>
        </Layout>
    );
}

export default App;