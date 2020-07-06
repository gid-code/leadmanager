import React, {Component, Fragment} from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router,Route, Switch, Redirect} from 'react-router-dom'
import Header from './layout/Header'
import Dashboard from './leads/Dashboard'
import Alert from './layout/Alert'

import {positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import {Provider} from 'react-redux'
import store from '../store'
import Register from './accounts/Register'
import Login from './accounts/Login'
import PrivateRoute from './common/PrivateRoute'
import { loadUser } from '../actions/auth'

//alert options
const alertOptions = {
   timeout: 3000,
   position: positions.TOP_CENTER
}

class App extends Component{
   componentDidMount() {
      store.dispatch(loadUser())
   }
   
   render() {
      return (
         <Provider store={store}>
            <AlertProvider template={AlertTemplate} {...alertOptions}>
               <Router>
                  <Fragment>
                     <Header />
                     <Alert />
                     <div className="container">
                        <Switch>
                           <PrivateRoute exact path="/" component={Dashboard} />
                           <Route exact path="/register" component={Register} />
                           <Route exact path="/login" component={Login} />
                        </Switch>
                     </div>
                  </Fragment>
               </Router>
            </AlertProvider>
         </Provider>
         
      )
   }
}

ReactDOM.render(<App />, document.getElementById('app'))