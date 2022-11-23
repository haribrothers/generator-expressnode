'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const yaml = require('js-yaml');

module.exports = class extends Generator {
  async prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the ${chalk.red('expressnode')} generator!`
      )
    );
    const prompts = [
      {
        type: 'input',
        name: 'appName',
        message: 'Provide the application name?',
        default: this.destinationRoot().split(path.sep).pop()
      },
      {
        type: 'input',
        name: 'modelFile',
        message: 'Provide the modal file name in the destination folder?',
        default: 'model.yaml'
      },
      {
        type: 'input',
        name: 'port',
        message: 'Provide the port where you want to startup your app?',
        default: '3000'
      }
    ];

    this.answers = await this.prompt(prompts);
    this.log(this.answers);
  }

  validating() {
    let doc;
    if (!this.fs.exists(this.answers.modelFile)) {
      this.log("No model found, creating test model: ");
      const route = this.templatePath("model.yaml");
      doc = yaml.load(this.fs.read(route));
      this.answers.modelFile = route;
      this.log(doc);
    } else {
      doc = yaml.load(this.fs.read(this.answers.modelFile));
    }
    this.log(doc)

  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('package.json.txt'),
      this.destinationPath('package.json'),
      {
        appName: this.answers.appName
      }
    );
    this.fs.copy(
      this.templatePath('database.txt'),
      this.destinationPath(this.answers.appName + '.db')
    );
    this.fs.copyTpl(
      this.templatePath('README.md.txt'),
      this.destinationPath('README.md'),
      {
        appName: this.answers.appName
      }
    );
    this.fs.copy(
      this.templatePath('config.ejs'),
      this.destinationPath('config.js')
    );

    let importRoutes = '';
    let registerRoutes = '';

    const doc = yaml.load(this.fs.read(this.answers.modelFile));
    let entitiesToCreate = Object.keys(doc);

    entitiesToCreate.forEach(entity => {
      let entityAttributes = Object.keys(doc[entity]);

      // const quotesRouter = require('./routes/quotes');
      // app.use('/quotes', quotesRouter);
      importRoutes += `const ${entity.toLowerCase()}sRouter = require('./routes/${entity.toLowerCase()}s');` + '\n';
      registerRoutes += `app.use('/${entity.toLowerCase()}s', ${entity.toLowerCase()}sRouter);` + '\n';

      let createFields = '';
      entityAttributes.forEach((field,i) => {
        createFields += `${field} ${doc[entity][field]}` + ((i < entityAttributes.length-1) ? ', ' : '');
      })

      this.fs.copyTpl(
        this.templatePath('routes/route.ejs'),
        this.destinationPath(`routes/${entity.toLowerCase()}s.js`),
        {
          entityName: entity
        }
      );
      this.fs.copyTpl(
        this.templatePath('services/service.ejs'),
        this.destinationPath(`services/${entity.toLowerCase()}s.js`),
        {
          entityName: entity,
          entityFields: entityAttributes,
          createFields: createFields
        }
      );

    });
    this.fs.copyTpl(
      this.templatePath('services/db.ejs'),
      this.destinationPath('services/db.js'),
      {
        appName: this.answers.appName
      }
    );
    this.fs.copyTpl(
      this.templatePath('index.ejs'),
      this.destinationPath('index.js'),
      {
        importRoutes: importRoutes,
        registerRoutes: registerRoutes,
        port: this.answers.port
      }
    );
  }

  install() {
    this.spawnCommand('npm',['install']);
  }
};
