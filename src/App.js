import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpComponent from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { getDoc } from '@firebase/firestore';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        //GET DATA => DocumentSnapshot<any>
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          console.log('Document data:', docSnap.data());
          this.setState(
            {
              currentUser: {
                id: userRef.id,
                ...docSnap.data(),
              },
            },
            () => {
              console.log('App state:', this.state);
            }
          );
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
          this.setState({ currentUser: userAuth }, () => {
            console.log('App state:', this.state);
          });
        }
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpComponent} />
        </Switch>
      </div>
    );
  }
}

export default App;
