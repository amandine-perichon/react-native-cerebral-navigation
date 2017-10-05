import { set } from 'cerebral/operators';
import { state, props, string } from 'cerebral/tags';
import { httpGet } from '@cerebral/http/operators';
import { USER_ASSIGNED } from '../../constants/api';
import login from './signals/login';
import logout from './signals/logout';
import restoreSession from './signals/restoreSession';

export default {
  state: {
    currentPage: 'firstScreen',
    loading: false,
    text: 'Kangaroo',
    data: {},
    currentUser: {}
  },
  signals: {
    login,
    logout,
    restoreSession,
    appRouted: [
      set(state`App.currentPage`, 'login')
    ],
    firstScreenMounted: [
      set(state`App.loading`, true),
      httpGet(string`${USER_ASSIGNED}${state`App.currentUser.id`}`), {
        success: [
          set(state`App.data`, props`response.result`),
          set(state`App.loading`, false)
        ],
        error: [
          set(state`App.loading`, false),
          set(state`App.text`, 'Error')
        ]
      }
    ],
    firstScreenRouted: [
      set(state`App.currentPage`, 'firstScreen')
    ],
    someOtherScreenRouted: [
      set(state`App.currentPage`, 'someOtherScreen'),
      set(state`App.text`, 'Balls')
    ],
    errorRouted: [
      set(state`App.currentPage`, 'ErrorScreen')
    ]
  }
};
