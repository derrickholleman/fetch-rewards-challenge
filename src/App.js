import "./App.css";
import Header from "./Components/Header/Header";
import Form from "./Components/Form/Form";
import NotFound from "./NotFound";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Route exact path="/">
          <Form />
        </Route>

        <Route path="*">
          <NotFound />
        </Route>
      </Router>
    </div>
  );
}

export default App;
