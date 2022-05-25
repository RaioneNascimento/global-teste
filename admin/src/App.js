import React from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import HomePage from './pages/home/home.page';
import LoginPage from './pages/login/login.page';
import UserListPage from './pages/user-list/user-list.page';
import UserDetailPage from './pages/user-detail/user-detail.page';
import UserEditPage from './pages/user-edit/user-edit.page';
import authService from './services/auth.service';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      userData : null
    }
  }

  componentDidMount(){
    this.loadUserData()
  }
  
  loadUserData(){
    let userData = authService.getLoggedUser()
    if(userData){
      this.setState({ userData : userData })
    }
  }

  logout(){
    authService.clearLoggedUser();
    window.location.reload();
  }

  render() {
    const isLogged = localStorage.getItem('user');
    const isAdmin = JSON.parse(isLogged)?.auth;

    return (
      <BrowserRouter>
        {isLogged ? <nav className="navbar navbar-expand-lg navbar-light bg-light">
           <Link to="/" className="navbar-brand">SPA Admin</Link>
          <button className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarMenu"
            aria-controls="navbarMenu">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarMenu">
            <div className="navbar-nav">
              <Link to="/" className="nav-item nav-link">Dashboard</Link>
              {isAdmin === 'adm' ? <Link to="/user-list" className="nav-item nav-link">Users</Link> : ''}
            </div>
            {(this.state.userData) ? (
                <div className="nav-user">
                  <div className="nav-user__info">
                    <h4>Olá, {this.state.userData.name}</h4>
                  </div>
                  <button className="btn btn-outline-dark" onClick={e => this.logout()}>Sair</button>
                </div>
              ) : null}
          </div>
        </nav>
        : ''}
        <Switch>
          <Route path="/" exact={true} component={HomePage} />
          <Route path="/login" component={props => <LoginPage {...props} onLogin={() => this.loadUserData()}/>}/>
          <Route path="/user-list" component={UserListPage} />
          <Route path="/user-detail/:id" component={UserDetailPage} />
          <Route path="/user-add" component={UserEditPage} />
          <Route path="/user-edit/:id" component={UserEditPage} />
        </Switch>
      </BrowserRouter>
    );
  }

}

export default App;
