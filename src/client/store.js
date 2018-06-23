import { USERS_FETCHED } from './constants';
import { createStore } from 'redux';
import reducer from './reducer';

export default () => createStore(reducer);