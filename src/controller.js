import { Controller, provide } from 'cerebral';
import Devtools from 'cerebral/devtools';

// Providers
import navigationProvider from './navigationProvider';

// Modules
import App from './modules/App/App';

const controller = Controller({
  modules: {
    App
  },
  providers: [
    provide('navigation', navigationProvider)
  ],
  devtools: Devtools({
    // Connect to Electron debugger (external debugger). It will fall back to
    // chrome extension if unable to connect
    remoteDebugger: 'localhost:8585',

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
