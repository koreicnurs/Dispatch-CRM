import {Route, Switch} from "react-router-dom";
import Layout from "./components/UI/Layout/Layout";
import Trips from "./containers/Trips/Trips";

const App = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Trips}/>
            </Switch>
        </Layout>
    );
}

export default App;