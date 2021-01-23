import React from 'react';
import { connect } from 'react-redux';
import {signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    const clientId = '1081275343455-tclk57o78ktb10uca119pkoj763knfnr.apps.googleusercontent.com';
    const scope = 'email';

    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: clientId,
        scope: scope
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = (isSignedIn) => {
//    console.log(isSignedIn);
    if (isSignedIn) this.props.signIn(this.auth.currentUser.get().getId());
    else this.props.signOut();
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Logout
        </button>
      );
    } else return (
      <button onClick={this.onSignInClick} className="ui red google button">
        <i className="google icon" />
        Sign in with Google
      </button>
      );
  }

  render () {
    return (
      <div>{this.renderAuthButton()}</div>
    );
  };
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps,{ signIn, signOut })(GoogleAuth);
// Client-ID: 1081275343455-tclk57o78ktb10uca119pkoj763knfnr.apps.googleusercontent.com
// Secret Z8Obc2029XytA3daUgWHmjfK
