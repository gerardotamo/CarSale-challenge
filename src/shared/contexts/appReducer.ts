import { Action, Type } from './actions';

import storage from '../utils/storage';
export const initialAppState = storage.get('user');
export type Appstate = typeof initialAppState;

export type ReducerActions = Action;

export function appReducer(state: Appstate, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case Type.LOGIN:
      storage.set('user', JSON.stringify(payload));
      return {
        ...state,
        auth: {
          admin: payload,
        },
      };
    case Type.LOGOUT:
      storage.remove('user');
      return {
        ...state,
        auth: {
          admin: {},
        },
      };
    default:
      return {
        ...state,
      };
  }
}
