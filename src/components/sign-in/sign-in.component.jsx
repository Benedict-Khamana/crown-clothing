import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import { signInWithGoogle } from '../../firebase/firebase.utils.js';
import { auth } from '../../firebase/firebase.utils.js';
import { signInWithEmailAndPassword } from '@firebase/auth';

// import './sign-in.styles.scss';
import {
  ButtonsBarContainer,
  SignInContainer,
  SignInTitle,
} from './sign-in.styles';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      this.setState({ email: '', password: '' });
    } catch (err) {
      console.log(err);
    }
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;
    return (
      <SignInContainer>
        <SignInTitle>I already have an account</SignInTitle>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            type='email'
            value={email}
            name='email'
            handleChange={this.handleChange}
            label='email'
            required
          />
          <FormInput
            type='password'
            value={password}
            handleChange={this.handleChange}
            name='password'
            label='password'
            required
          />
          <ButtonsBarContainer>
            <CustomButton type='submit' value='Submit Form'>
              Sign in
            </CustomButton>

            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
              Sign in with Google
            </CustomButton>
          </ButtonsBarContainer>
        </form>
      </SignInContainer>
    );
  }
}

export default SignIn;
