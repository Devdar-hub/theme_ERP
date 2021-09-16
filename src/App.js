// import logo from './logo.svg';


import componentQueries from 'react-component-queries';
// import Admin  from "./pages/Admin";

import Login  from "./pages/Login";
import Convert  from "./pages/Convert";
import PageSpinner from 'components/PageSpinner';
// import Lead  from "./pages/Lead";
// import Contact  from "./pages/Contact";
import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";
import React from "react";
import './styles/reduction.scss';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';


const Admin = React.lazy(() => import('pages/Admin'));
const Lead = React.lazy(() => import('pages/Lead'));

const Contact = React.lazy(() => import('pages/Contact'));


class App extends React.Component {
  render(){
  return (

      <Router>
        <Switch>
          <Route exact path="/" layout={EmptyLayout} component={props=>(<Login {...props}/>)}>
            
          </Route>
          {/* <Route exact path="/Admin">
            <Admin />
          </Route>
          <Route exact path="/Convert">
            <Convert />
          </Route>                    
          <Route exact path="/Lead">
            <Lead />
          </Route>
          <Route exact path="/Contact">
            <Contact />
          </Route> */}
          <MainLayout breakpoint={this.props.breakpoint}>
              <React.Suspense fallback={<PageSpinner />}>
                <Route exact path="/Admin" component={Admin} />
                <Route exact path="/Lead" component={Lead} />
                <Route exact path="/Contact" component={Contact} />
                <Route exact path="/Convert" component={Convert} />
               
              </React.Suspense>
            </MainLayout>
            <Redirect to="/" />
        </Switch>
      </Router>
    
  );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
