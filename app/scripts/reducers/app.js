import immutable from 'immutability-helper';
import { REHYDRATE } from 'redux-persist/lib/constants';
import { createReducer } from 'modules/helpers';

import { ActionTypes } from 'constants/index';

export const appState = {
  alerts: [],
  open: false,
};

export default {
  app: createReducer(appState, {
    [REHYDRATE](state) {
      return immutable(state, {
        alerts: { $set: [] },
      });
    },
    [ActionTypes.HIDE_ALERT](state, { payload: { id } }) {
      const alerts = state.alerts.filter(d => d.id !== id);

      return immutable(state, {
        alerts: { $set: alerts },
      });
    },
    [ActionTypes.SHOW_ALERT](state, { payload }) {
      return immutable(state, {
        alerts: { $push: [payload] },
      });
    },
    [ActionTypes.SHOW_MENU](state) {
      return immutable(state, {
        alerts: { $set: [] },
        open: { $set: true },
      });
    },
    [ActionTypes.HIDE_MENU](state) {
      return immutable(state, {
        alerts: { $set: [] },
        open: { $set: false },
      });
    },
  }),
};
