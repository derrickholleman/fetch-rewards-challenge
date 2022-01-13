import "./App.css";
import Header from "./Common/Header";
import Form from "./Components/Form/Form";
import Success from "./Common/Success";
import NotFound from "./Common/NotFound";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        
        <Switch>
          <Route exact path="/">
            <Form />
          </Route>

          <Route exact path="/success">
            <Success />
          </Route>

          <Route exact path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
