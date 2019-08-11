// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/**
 * Sets Production Environment to Disabled
 */
export const environment = {
  production: false,

  firebaseConfig: {
    apiKey            : 'AIzaSyDDpHaPU_JxdJF62QK4aZvGol1kxUVsKTg',
    authDomain        : 'hashmaporbyt.firebaseapp.com',
    databaseURL       : 'https://hashmaporbyt.firebaseio.com',
    projectId         : 'hashmaporbyt',
    storageBucket     : 'hashmaporbyt.appspot.com',
    messagingSenderId : '988913741592',
    appId             : '1:988913741592:web:7044428c9379127f'
  },


};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
