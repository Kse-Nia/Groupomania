import { Suspense } from "react"; // Faire attendre le chargement des données
import { Route, Switch } from "react-router-dom";
import routes from "routes"; // Route list
/* import Spinner from 'sharedComponent/Loader'; */

const ProtectedRoutes = () => (
  <Switch>
    <Suspense /* fallback={<Spinner />} */>
      {routes.map(({ component: Component, path, exact }) => (
        <Route path={`/${path}`} key={path} exact={exact}>
          <Component />
        </Route>
      ))}
    </Suspense>
  </Switch>
);

export default ProtectedRoutes;
