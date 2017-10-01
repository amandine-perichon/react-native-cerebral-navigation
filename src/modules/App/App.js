import { set } from 'cerebral/operators'
import { state } from 'cerebral/tags'

export default {
  state: {
    currentPage: 'firstScreen',
    text: 'Kangaroo'
  },
  signals: {
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
