import { USERS_FETCHED } from './constants';

export const usersFetched = response => ({ type: USERS_FETCHED, response });