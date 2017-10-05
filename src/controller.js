import { Controller } from 'cerebral';
import Router from '@cerebral/router';
import Devtools from 'cerebral/devtools';
import HttpProvider from '@cerebral/http'

import App from './modules/App/App';
const controller = Controller({
  modules: {
    App,
    router: Router({
      routes: [{
        path: '/',
        signal: 'App.appRouted'
      }, {
        path: '/someOtherScreen',
        signal: 'App.someOtherScreenRouted'
      }, {
        path: '/*',
        signal: 'App.errorRouted'
      }]
    })
  },
  providers: [
    HttpProvider({
      cors: true,
      baseUrl: '',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: ''
      }
    })
  ],
  devtools: Devtools({
    // Connect to Electron debugger (external debugger). It will fall back to
    // chrome extension if unable to connect
    remoteDebugger: 'localhost:8583',

    // Time travel
    storeMutations: true,

    // Warnings on mutating outside "state" API
    preventExternalMutations: true,

    // Warnings when strict render path usage is wrong
    verifyStrictRender: true,

    // Throw error when overwriting existing input property
    preventInputPropReplacement: false,

    // Shows a warning when you have components with number of state dependencies
    // or signals above the set number
    bigComponentsWarning: { state: 5, signals: 5 },

    // Will reset debugger to currently focused application
    multipleApps: true,

    // In addition to basic JavaScript types Object, Array, String, Number
    // and Boolean, File, FileList and Blob is allowed to be stored in state
    // tree. You can add additional types if you know what you are doing :)
    allowedTypes: []
  })
});

export default controller;
