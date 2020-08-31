import React, { Component, useContext } from 'react';
import PropTypes from 'prop-types';

const UserContext = React.createContext({
  user: null,
});

class UserProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };

    this.setUser = this.setUser.bind(this);
  }

  setUser(user) {
    this.setState({ user });
  }

  render() {
    const { children } = this.props;

    return (
      <UserContext.Provider
        value={{
          ...this.state,
          setUser: this.setUser,
        }}
      >
        {children}
      </UserContext.Provider>
    );
  }
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserProvider, UserContext };
