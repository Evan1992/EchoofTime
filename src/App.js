import { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Plans from './components/Plans/Plans';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import AuthContext from './store/auth-context';

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          {!isLoggedIn && (
            <Route path='/' exact>
              <HomePage />
            </Route>
          )}
          
          {!isLoggedIn && (
            <Route path='/auth'>
              <AuthPage />
            </Route>
          )}
          
          {isLoggedIn && (
            <Route path='/plans'>
              <div className="App">
                <Plans />
              </div>
            </Route>
          )}
          
          {
          //<Route path='*'>
            //<Redirect to='/' />
          //</Route>
          }
        </Switch>   
      </Layout>
    </BrowserRouter>
    
    
    
  );
}

export default App;
