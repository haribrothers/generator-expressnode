# generator-expressnode [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> A Express Node Generator

## Installation

First, install [Yeoman](http://yeoman.io) and generator-expressnode using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
generator-expressnode % npm install -g yo
generator-expressnode % npm link 
```
Create a new folder (outside of the generator) for your project 
```bash
generator-expressnode % cd ..
test-folder % mkdir sample-express-app
test-folder % cd sample-express-app
sample-express-app %
``` 

Create model.yaml file which will contain the database schema.
##### Example entity model in YAML format (model.yaml)

```yaml
Employee:
  employeeName: TEXT NOT NULL
  employeeEmail: TEXT NOT NULL
  employeePhone: TEXT
  employeeAge: INT
Skill:
  skillName: TEXT NOT NULL
  skillDesc: TEXT
```


Then generate your new project:

```bash
express-sample-app % yo expressnode         

     _-----_     
    |       |    ╭──────────────────────────╮
    |--(o)--|    │      Welcome to the      │
   `---------´   │  expressnode generator!  │
    ( _´U`_ )    ╰──────────────────────────╯
    /___A___\   /
     |  ~  |     
   __'.___.'__   
 ´   `  |° ´ Y ` 

? Provide the application name? express-sample-app
? Provide the modal file name in the destination folder? model.yaml
? Provide the port where you want to startup your app? 3000

identical package.json
identical express-sample.db
identical README.md
identical config.js
identical routes/employees.js
identical services/employees.js
identical routes/skills.js
identical services/skills.js
identical services/db.js
identical index.js
No change to package.json was detected. No package manager install will be executed.

added 128 packages, and audited 129 packages in 34s

18 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

Apache-2.0 © [Hari Prasad]()


[npm-image]: https://badge.fury.io/js/generator-expressnode.svg
[npm-url]: https://npmjs.org/package/generator-expressnode
[travis-image]: https://travis-ci.com/haribrothers/generator-expressnode.svg?branch=master
[travis-url]: https://travis-ci.com/haribrothers/generator-expressnode
[daviddm-image]: https://david-dm.org/haribrothers/generator-expressnode.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/haribrothers/generator-expressnode
