import React from "react"
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";

import "./App.css";

//Pages 
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Dashboard from "./Pages/Dashboard";

//Utils
import { initialAuth, AuthReducer } from "./Utils/auth";

// sauvegarde de la data user
export const AuthContext = React.createContext();


function App() {
  
  const [AuthState, dispatchAuthState] = React.useReducer(AuthReducer, initialAuth)
const routes
 
if (AuthState.isAuthenticated) {
  routes = (
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/articles" exact component={ArticlePage} />
        <Route path="/profile" exact component={ProfilePage} />
        <Route path="/members" exact component={MembersPage} />
        <Route component={NotFoundPage} />
      </Switch>
  )
} else {
  routes = (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={LoginPage} />
        <Redirect to='/login' component={LoginPage}  />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  )
}

return (
  <AuthContext.Provider
    value={{
      AuthState,
      dispatchAuthState,
    }}
  >
    {routes}
  </AuthContext.Provider>
)
}


export default App;
