import React from 'react';
import { connect } from 'react-redux';

import { USERS_FETCHED } from './constants';
import { getUsers } from './selectors';
import { usersFetched } from './actions';

const ENDPOINT = 'http://localhost:3000/users_fake_data.json';

class App extends React.Component {
  componentWillMount() {
    const { users, fetchUsers } = this.props;

    if (users === null) {
      fetchUsers();
    }
  }
  render() {
    const { users } = this.props;

    return (
      <div>
        {
          users && users.length > 0 && users.map(
            ({ id, first_name: firstName, last_name: lastName }) => <p key={ id }>{ `${ firstName} ${ lastName }` }</p>
          )
        }
      </div>
    );
  }
}

const ConnectedApp = connect(
  state => ({ users: getUsers(state) }),
  dispatch => ({
    fetchUsers: async () => dispatch(usersFetched(await (await fetch(ENDPOINT)).json()))
  })
)(App);

export default ConnectedApp;