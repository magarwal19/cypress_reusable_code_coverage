### To install cypress in any new project run command :
    npm install --save-dev cypress

### For code coverage in react-redux project install:
1. npm install --save-dev @cypress/instrument-cra
2. npm install -D @cypress/code-coverage nyc istanbul-lib-coverage
3. update index.js in plugins and include below code:
   1. module.exports = (on, config) => {
   require('@cypress/code-coverage/task')(on, config)
  on(
    'file:preprocessor',
    require('@cypress/code-coverage/use-browserify-istanbul')
    )
    return config
    }

4. update index.js in support and add line
   1. import '@cypress/code-coverage/support'

5. Update command for start in scripts in package.json
   1. react-scripts -r @cypress/instrument-cra start
6. `npm install -g junit-merge`
7. `npm install -g xunit-viewer`
8. `npm start` to start the local server (this project uses create-react-app)
9. npm i cypress-multi-reporters
10. npm i mocha-junit-reporter
- `npm run testE2E -- --env env='qa' --headed --browser chrome` to run the cypress test using command line
- `npm run mergereport` to generate a merged Json file, which can be used for Jenkins /creating HTML reports
- `npm run createHTMLReport` to generate a HTML report after merging Jsons