import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'

const ENDPOINT = 'http://localhost:3000/users_fake_data.json';

// Action creator
const USERS_FETCHED = 'USERS_FETCHED';
const usersFetched = response => ({ type: USERS_FETCHED, response });

// Store
const store = createStore(function (oldState = { users: [] }, action) {
  if (action.type === USERS_FETCHED) {
    return { users: action.response.data };
  }
  return oldState;
});

// React
class App extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }
  render() {
    return (
      <div>
        {
          this.props.users.length > 0 && this.props.users.map(
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
    users: state.users
  }),
  dispatch => ({
    fetchUsers: async () => dispatch(usersFetched(await (await fetch(ENDPOINT)).json()))
  })
)(App);

// Rendering
ReactDOM.render(<Provider store={ store }><ConnectedApp /></Provider>, document.querySelector('#content'));