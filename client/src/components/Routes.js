import { useContext } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Job from '../pages/Job';
import { AuthContext } from '../utils/contexts';

const defaultPath = '/job';
const paths = [
  {
    path: '/login',
    component: Login,
    exact: true
  },
  {
    path: '/job',
    component: Job,
    needAuth: true,
  },
];

const ProtectedRoute = ({ component: Component, path, exact, needAuth }) => {
  const { authed } = useContext(AuthContext);
  const node = (props) => {
    if (needAuth && !authed) {
      return <Redirect to="/login" />;
    }
    
    return <Component />;
  }

  return (
    <Route
      path={path}
      exact={!!exact}
      render={node}
    />
  );
};

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/**
         * this is default route and must be appended with 'exact' attributes,
         * otherwise all other routes will be considered as default routes
         */}
        <Route exact path="/">
          <Redirect to={defaultPath} />
        </Route>
        {paths.map((p,i) => (
          <ProtectedRoute key={`my-route-${i}`} {...p} />
          // <Route key={`my-route-${i}`} {...p} />
        ))}
        <Route exact path="*">
          <NotFound />
        </Route>
        
        {/* another way to routing */}
        {/* <Route exact path={["/list-forum", "/forums"]} component={ForumList} /> */}
        {/* <Route path="/forum/:id" component={Forum} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
