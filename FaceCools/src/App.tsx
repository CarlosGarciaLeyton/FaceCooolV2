import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router';

import Login from './Containers/Auth/Login';
import Register from './Containers/Auth/Register';
import NewsFeed from './Containers/NewsFeed/NewsFeed';
import NavBar from './Components/NavBar';
import Profile from './Containers/Profile/Profile';
import services from './Services';
import { History } from 'history';
import AddPost from './Containers/Profile/AddPost';

interface IAppProps {
  history: History
  loadInitialData: () => void
}


class App extends Component<IAppProps> {

  public state = {
    loading: true,
  }

  public componentDidMount() {
    const { auth } = services
    auth.onAuthStateChanged(user => {
      if (user) {
        const { loadInitialData } = this.props
        loadInitialData()
        if (['/','/register'].indexOf(location.pathname) > -1) {
          const { history } = this.props
          history.push('/App/Newsfeed')
        }
      } else if(/\app\/./.test(location.pathname)) {
        const { history } = this.props
          history.push('/')
      }
      this.setState({
        loading: false
      })
    })
  }
  render() {
    const { loading } = this.state
    return (
      loading ? 'loading' : <div className={'bg-light'}>
        <Route exact={true} path='/' component={Login}/>
        <Route exact={true} path='/Register' component={Register}/>
        <Route path='/App' component={NavBar} />
        <Route path='/App/Profile' component={AddPost}/>
        <Route exact={true} path='/App/Newsfeed' component={NewsFeed}/>
        <Route exact={true} path='/App/Profile' component={Profile} />
      </div>
    );
  }
}

export default App;
