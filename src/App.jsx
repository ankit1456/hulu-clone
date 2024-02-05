import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import Movie from "./components/Banner";
import Header from "./components/Header";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Results from "./components/Results";
import { auth } from "./firebase";
import requests from "./request";
import { useStateValue } from "./context/stateProvider";

const App = () => {
  const [{ user }, dispatch] = useStateValue();

  const [selectedCategory, setSelectedCategory] = useState(
    requests.fetchTrending
  );
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "LOGIN",
          payload: authUser,
        });
      } else {
        dispatch({
          type: "LOGOUT",
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);
  return !user ? (
    <Login />
  ) : (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/movie/:id">
            <Movie selectedCategory={selectedCategory} />
          </Route>
          <Route path="/">
            <Header />
            <Navbar setSelectedCategory={setSelectedCategory} />
            <Results selectedCategory={selectedCategory} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
