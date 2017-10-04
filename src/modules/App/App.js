import { set } from 'cerebral/operators';
import { state, props, string } from 'cerebral/tags';
import { httpGet } from '@cerebral/http/operators';
import { USER_ASSIGNED } from '../../constants/api';

export default {
  state: {
    currentPage: 'firstScreen',
    text: 'Kangaroo',
    data: {},
    currentUser: {}
  },
  signals: {
    firstScreenRouted: [
      set(state`App.currentPage`, 'firstScreen')
    ],
    firstScreenMounted: [
      set(state`App.text`, 'Loading'),
      httpGet(string`${USER_ASSIGNED}${state`App.currentUser.id`}`), {
        success: [
          set(state`App.data`, props`response.result`),
          set(state`App.text`, 'Success')
        ],
        error: [
          set(state`App.text`, 'Error')
        ]
      }
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
