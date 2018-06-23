import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { USERS_FETCHED } from './constants';
import { getUsers } from './selectors';

const ENDPOINT = 'http://localhost:3000/users_fake_data.json';

// Action creator
const usersFetched = response => ({ type: USERS_FETCHED, response });

// React
class App extends React.Component {
  componentWillMount() {
    if (this.props.users === null) {
      this.props.fetchUsers();
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

// Wiring with Redux
const ConnectedApp = connect(
  state => ({
    users: getUsers(state)
  }),
  dispatch => ({
    fetchUsers: async () => dispatch(usersFetched(await (await fetch(ENDPOINT)).json()))
  })
)(App);

export default ConnectedApp;