import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from "../actions";

class GoogleAuth extends Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '1000598842672-eqidv4nc75378fe00j7bvkdnjl8l2697.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button className="ui red google button" onClick={ this.onSignOutClick }>
                    <i className="google icon"></i>
                    Sign Out
                </button>
            );
        } else {
            return (
                <button className="ui red google button" onClick={ this.onSignInClick }>
                    <i className="google icon"></i>
                    Sign In with Google
                </button>
            );
        }
    }

    render() {
        return (
            <div className="item">
                { this.renderAuthButton() }
            </div>
        );
    }
}

const masStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(masStateToProps, { signIn, signOut })(GoogleAuth);