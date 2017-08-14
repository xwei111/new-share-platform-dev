import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { LoginForm } from 'components/home';
import { AUTH_SUCCESS, handleAuth, setLoginName, clearError } from 'redux/modules/auth';

@connect(
  ({auth}) => ({error: auth.error, username: auth.username}),
  { handleAuth, setLoginName, clearError }
)
export default class LoginContainer extends Component {
  static propTypes = {
    error: PropTypes.string,
    handleAuth: PropTypes.func.isRequired,
    setLoginName: PropTypes.func.isRequired,
    clearError: PropTypes.func.isRequired
  }
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  handleBlur() {
    this.props.clearError();
  }
  handleSubmit(data) {
    const loginName = data.accountId;
    this.props.handleAuth(data)
      .then(data => {
        if (data.type === AUTH_SUCCESS) {
          this.context.router.replaceWith('/admin');
          this.props.setLoginName(loginName);
        }
      });
  }
  render() {
    const { error, handleAuth } = this.props;
    return (
      <LoginForm
        className={this.props.className}
        error={error}
        onBlur={::this.handleBlur}
        onSubmit={::this.handleSubmit}/>
    );
  }
}
