// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  // Détecte si on est en environnement CI (comme GitHub Actions)
  const isCI = process.env.CI === 'true';

  config.set({
    // Tous vos paramètres existants sont conservés :
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // Configuration Jasmine conservée
      },
      clearContext: false
    },
    jasmineHtmlReporter: {
      suppressAll: true
    },

    // MODIFICATION: Ajout du format lcov et conservation des formats existants
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/bobapp'),
      subdir: '.',
      reporters: [
        { type: 'html' },         // Conservé - pour visualisation locale
        { type: 'text-summary' }, // Conservé - pour sortie console
        { type: 'lcovonly' }      // AJOUT - pour intégration CI/CD
      ]
    },

    reporters: ['progress', 'kjhtml'], // Conservé
    port: 9876,                        // Conservé
    colors: true,                      // Conservé
    logLevel: config.LOG_INFO,         // Conservé
    
    // AJUSTEMENTS CI: Ces paramètres s'adapteront selon l'environnement
    autoWatch: !isCI,                  // Modifié - désactivé en CI
    browsers: isCI ? ['ChromeHeadless'] : ['Chrome'], // Modifié
    singleRun: isCI,                   // Modifié - activé en CI
    restartOnFileChange: !isCI,        // Modifié - désactivé en CI

    // NOUVEAU: Configuration spécifique pour ChromeHeadless en CI
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu']
      }
    }
  });
};

// module.exports = function (config) {
//   config.set({
//     basePath: '',
//     frameworks: ['jasmine', '@angular-devkit/build-angular'],
//     plugins: [
//       require('karma-jasmine'),
//       require('karma-chrome-launcher'),
//       require('karma-jasmine-html-reporter'),
//       require('karma-coverage'),
//       require('@angular-devkit/build-angular/plugins/karma')
//     ],
//     client: {
//       jasmine: {
//         // you can add configuration options for Jasmine here
//         // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
//         // for example, you can disable the random execution with `random: false`
//         // or set a specific seed with `seed: 4321`
//       },
//       clearContext: false // leave Jasmine Spec Runner output visible in browser
//     },
//     jasmineHtmlReporter: {
//       suppressAll: true // removes the duplicated traces
//     },
//     coverageReporter: {
//       dir: require('path').join(__dirname, './coverage/bobapp'),
//       subdir: '.',
//       reporters: [
//         { type: 'html' },
//         { type: 'text-summary' }
//       ]
//     },
//     reporters: ['progress', 'kjhtml'],
//     port: 9876,
//     colors: true,
//     logLevel: config.LOG_INFO,
//     autoWatch: true,
//     browsers: ['Chrome'],
//     singleRun: false,
//     restartOnFileChange: true
//   });
// };
