import React, { useCallback, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Users from "./user/pages/Users.jsx";
import NewPlace from "./places/pages/NewPlace.jsx";
import UserPlaces from "./places/pages/UserPlaces.jsx";
import MainNavigation from "./shared/components/Navigation/MainNavigation.jsx";
import UpdatePlace from "./places/pages/UpdatePlace.jsx";
import Authenticate from "./user/pages/Authenticate.jsx";
import { AuthContext } from "./shared/context/auth-context.js";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>

        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>

        <Route path="/places/new" exact>
          <NewPlace />
        </Route>

        <Route path="/places/:placeId" exact>
          <UpdatePlace />
        </Route>

        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>

        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>

        <Route path="/auth" exact>
          <Authenticate />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userId }}>
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
