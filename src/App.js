import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpComponent from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { /*getDoc, */ onSnapshot } from '@firebase/firestore';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(
      async userAuth => {
        if (userAuth) {
          const userRef = await createUserProfileDocument(userAuth);
          /*const unsubscribe = */
          onSnapshot(userRef, snapShot => {
            setCurrentUser(
              {
                // currentUser: {
                id: snapShot.id,
                ...snapShot.data(),
              }
              /* }*/
            );
          });
          // if (docSnap.exists()) {
          // console.log('Document data:', docSnap.data());
          //   this.props.setCurrentUser({
          //     currentUser: {
          //       id: docSnap.id,
          //       ...docSnap.data(),
          //     },
          //   });
          // } else {
          // doc.data() will be undefined in this case
          // console.log('No such document!');
          // this.setState({ currentUser: userAuth });
        } /*else {*/
        setCurrentUser(userAuth);
      }
      // }
      /*}*/
    );
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpComponent} />
        </Switch>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});
export default connect(null, mapDispatchToProps)(App);
